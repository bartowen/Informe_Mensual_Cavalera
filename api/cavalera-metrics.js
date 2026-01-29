// API Route: /api/cavalera-metrics.js
// Conecta con Google Apps Script y aplica corrección de conversiones

export default async function handler(req, res) {
  const { startDate, endDate, report = 'Cavalera_Metricas_Generales' } = req.query;

  try {
    // URL del Google Apps Script
    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!appsScriptUrl) {
      return res.status(500).json({
        error: 'GOOGLE_APPS_SCRIPT_URL no configurada'
      });
    }

    // Llamar al Apps Script
    const url = `${appsScriptUrl}?report=${encodeURIComponent(report)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Apps Script error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      return res.status(500).json({
        error: data.error || 'Error al obtener datos'
      });
    }

    // Aplicar corrección de conversiones si es necesario
    const correctedData = applyConversionCorrection(data, startDate, endDate, report);

    res.status(200).json(correctedData);

  } catch (error) {
    console.error('Error en cavalera-metrics:', error);
    res.status(500).json({
      error: error.message,
      details: 'Error al conectar con Google Sheets'
    });
  }
}

/**
 * Aplica corrección de conversiones según el tipo de reporte y fechas
 * - Para Cavalera_Por_Dia: detecta automáticamente y corrige por fila
 * - Para otros reportes: usa startDate/endDate si están disponibles
 */
function applyConversionCorrection(data, startDate, endDate, report) {
  // Fecha del fix del tracking (15 enero 2026)
  const FIX_DATE = new Date('2026-01-15');

  // =====================================================
  // CASO ESPECIAL: Reporte Por_Dia - Corrección por fila
  // =====================================================
  if (report === 'Cavalera_Por_Dia' && data.data && data.data.length > 0 && data.data[0]?.Day) {
    return applyDailyCorrection(data, FIX_DATE);
  }

  // =====================================================
  // CASO ESPECIAL: Reporte Por_Hora - Filtrar campaña activa
  // =====================================================
  if (report === 'Cavalera_Por_Hora' && data.data) {
    return applyHourlyFilter(data);
  }

  // =====================================================
  // CASO ESPECIAL: Reporte Dispositivos - Filtrar campaña activa
  // =====================================================
  if (report === 'Cavalera_Dispositivos' && data.data) {
    return applyDeviceFilter(data);
  }

  // =====================================================
  // CASO GENERAL: Sin fechas específicas
  // =====================================================
  if (!startDate || !endDate) {
    return {
      ...data,
      metadata: {
        dataQuality: 'verified',
        correctionApplied: false,
        note: 'Datos verificados sin corrección'
      }
    };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Si TODO el período es POST-fix → sin corrección
  if (start >= FIX_DATE) {
    return {
      ...data,
      metadata: {
        dataQuality: 'verified',
        correctionApplied: false,
        note: 'Datos verificados con tracking optimizado'
      }
    };
  }

  // Si TODO el período es PRE-fix → aplicar corrección 4.0x
  if (end < FIX_DATE) {
    const correctedRows = data.data.map(row => ({
      ...row,
      Conversions: row.Conversions ? row.Conversions / 4.0 : 0,
      'Conv. rate': row.Conversions && row.Clicks
        ? ((row.Conversions / 4.0) / row.Clicks * 100).toFixed(2) + '%'
        : row['Conv. rate'],
      'Cost / conv.': row.Conversions && row.Cost
        ? (row.Cost / (row.Conversions / 4.0)).toFixed(0)
        : row['Cost / conv.']
    }));

    return {
      ...data,
      data: correctedRows,
      metadata: {
        dataQuality: 'corrected',
        correctionApplied: true,
        correctionFactor: 4.0,
        note: 'Datos corregidos por duplicación de tracking (factor 4.0x)'
      }
    };
  }

  // Si CRUZA el fix date → período mixto
  const totalDays = (end - start) / (1000 * 60 * 60 * 24);
  const preDays = (FIX_DATE - start) / (1000 * 60 * 60 * 24);
  const postDays = (end - FIX_DATE) / (1000 * 60 * 60 * 24);

  const correctedRows = data.data.map(row => {
    const totalConversions = row.Conversions || 0;
    const preRatio = preDays / totalDays;
    const postRatio = postDays / totalDays;

    const preConversions = (totalConversions * preRatio) / 4.0;
    const postConversions = totalConversions * postRatio;
    const correctedConversions = preConversions + postConversions;

    return {
      ...row,
      Conversions: correctedConversions,
      'Conv. rate': row.Clicks
        ? (correctedConversions / row.Clicks * 100).toFixed(2) + '%'
        : row['Conv. rate'],
      'Cost / conv.': row.Cost && correctedConversions
        ? (row.Cost / correctedConversions).toFixed(0)
        : row['Cost / conv.']
    };
  });

  return {
    ...data,
    data: correctedRows,
    metadata: {
      dataQuality: 'mixed',
      correctionApplied: true,
      note: `Período mixto: ${Math.round(preDays)} días corregidos (4.0x), ${Math.round(postDays)} días verificados`,
      periodBreakdown: {
        preFix: { days: Math.round(preDays), factor: 4.0 },
        postFix: { days: Math.round(postDays), factor: 1.0 }
      }
    }
  };
}

/**
 * Aplica corrección por fila para reporte diario
 * Cada día se corrige individualmente según si es pre o post fix
 */
function applyDailyCorrection(data, FIX_DATE) {
  // Filtrar solo la campaña activa
  const filteredData = data.data.filter(row => {
    const campaign = row.Campaign || '';
    const status = row['Campaign status'] || 'Enabled';

    // Incluir si es la campaña principal activa o si no tiene campo Campaign (agregado)
    return (
      (campaign.includes('Cavalera') || campaign.includes('Towen') || campaign === '') &&
      status !== 'Paused' &&
      status !== 'Removed'
    );
  });

  let preDays = 0;
  let postDays = 0;

  const correctedData = filteredData.map(row => {
    const rowDate = new Date(row.Day);
    const clicks = row.Clicks || 0;
    const cost = row.Cost || 0;

    // Pre-fix: dividir conversiones por 4.0
    if (rowDate < FIX_DATE) {
      preDays++;
      const originalConversions = row.Conversions || 0;
      const correctedConversions = originalConversions / 4.0;

      return {
        ...row,
        Conversions: correctedConversions,
        'Conv. rate': clicks > 0
          ? (correctedConversions / clicks * 100).toFixed(2) + '%'
          : row['Conv. rate'],
        'Cost / conv.': correctedConversions > 0
          ? (cost / correctedConversions).toFixed(0)
          : row['Cost / conv.']
      };
    }

    // Post-fix: sin corrección
    postDays++;
    return row;
  });

  return {
    ...data,
    data: correctedData,
    metadata: {
      dataQuality: preDays > 0 ? 'mixed' : 'verified',
      correctionApplied: preDays > 0,
      note: preDays > 0
        ? `Corrección aplicada: ${preDays} días pre-fix (÷4.0), ${postDays} días post-fix (sin cambio)`
        : 'Todos los datos son post-fix, sin corrección necesaria',
      totalRows: correctedData.length,
      periodBreakdown: {
        preFix: { days: preDays, factor: 4.0 },
        postFix: { days: postDays, factor: 1.0 }
      }
    }
  };
}

/**
 * Filtra datos por hora para mostrar solo campaña activa
 */
function applyHourlyFilter(data) {
  const filteredData = data.data.filter(row => {
    const campaign = row.Campaign || '';
    const status = row['Campaign status'] || 'Enabled';

    return (
      (campaign.includes('Cavalera') || campaign.includes('Towen') || campaign === '') &&
      status !== 'Paused' &&
      status !== 'Removed'
    );
  });

  return {
    ...data,
    data: filteredData,
    metadata: {
      dataQuality: 'verified',
      correctionApplied: false,
      note: 'Datos filtrados por campaña activa',
      totalRows: filteredData.length
    }
  };
}

/**
 * Filtra datos por dispositivo para mostrar solo campaña activa
 */
function applyDeviceFilter(data) {
  const filteredData = data.data.filter(row => {
    const campaign = row.Campaign || '';
    const status = row['Campaign status'] || 'Enabled';

    return (
      (campaign.includes('Cavalera') || campaign.includes('Towen') || campaign === '') &&
      status !== 'Paused' &&
      status !== 'Removed'
    );
  });

  return {
    ...data,
    data: filteredData,
    metadata: {
      dataQuality: 'verified',
      correctionApplied: false,
      note: 'Datos filtrados por campaña activa',
      totalRows: filteredData.length
    }
  };
}
