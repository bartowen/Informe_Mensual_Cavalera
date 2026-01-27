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
    const correctedData = applyConversionCorrection(data, startDate, endDate);

    res.status(200).json(correctedData);

  } catch (error) {
    console.error('Error en cavalera-metrics:', error);
    res.status(500).json({
      error: error.message,
      details: 'Error al conectar con Google Sheets'
    });
  }
}

function applyConversionCorrection(data, startDate, endDate) {
  // Fecha del fix del tracking (15 enero 2026)
  const FIX_DATE = new Date('2026-01-15');

  // Si no hay fechas, asumimos datos actuales (post-fix)
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
