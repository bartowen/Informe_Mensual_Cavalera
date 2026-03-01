// src/data/allMonthsData.ts
// Fuente oficial: Admin Panel Cavalera + CSVs Google Ads / Meta + AgendaPro xlsx
// Leads Google = Google paid + Orgánico (Admin Panel)
// Leads Meta   = Instagram + Meta directo (Admin Panel)
// CAC          = Inversión Google ÷ Leads Google

const C = ['#3bc6dc','#a855f7','#f59e0b','#10b981','#ef4444','#6366f1','#ec4899','#f97316'];

export interface MonthData {
  key: string;
  label: string;
  resumen: {
    inversionTotal: number;
    formulariosTotal: number;
    leadsPagados: number;
    leadsOrganico: number;
    ventasReales: number;
    cantidadVentas: number;
    reservasAgendadas: number;
  };
  porCanal: Array<{
    canal: string;
    inversion: number;
    leads: number;
    cpl: number;
    ctr: number;
  }>;
  googleAdsMetrics: {
    leads: number;
    impresiones: number;
    clics: number;
    ctr: number;
    cpc: number;
    costo: number;
    cpl: number;
    imprPerdidasPpto: string;
    estado: string;
    nota?: string;
  };
  topKeywords: Array<{ kw: string; conv: number; clicks: number; ctr: number; cpc: number; cpa: number }>;
  topTerminos: Array<{ term: string; clicks: number; conv: number; cpa: number }>;
  topUbicaciones: Array<{ lugar: string; conv: number; clicks: number; ctr: number; cpa: number }>;
  mejoresHorarios: Array<{ dia: string; hora: string; conv: number; tasa: string; cpc: number }>;
  metaAdsMetrics: {
    leadsAdminPanel: number;
    leadsInstagram: number;
    leadsMeta: number;
    leadsCSV: number;
    impresiones: number;
    clics: number;
    ctr: number;
    costo: number;
    cpl: number;
    alcance: number;
    frecuencia: number;
  };
  metaConjuntos: Array<{
    nombre: string;
    conv: number;
    alcance: number;
    impr: number;
    clics: number;
    ctr: number;
    gasto: number;
    cpa: number;
    resultadosCSV?: number;
    resultadosReales?: number;
    cpaReal?: number;
    seguidoresIG?: number;
    visitasPerfil?: number;
  }>;
  metaAnuncios: Array<{ nombre: string; conv: number; impr: number; clics: number; ctr: number; gasto: number; cpa: number; estado: string }>;
  ventasResumen: { total: number; cantidad: number; ticket: number };
  ventasWalkIn: { total: number; cantidad: number; pct: number };
  ventasDiarias: Array<{ d: string; v: number }>;
  ventasCategorias: Array<{ cat: string; monto: number }>;
  reservasResumen: { total: number; manual: number; online: number; recaudacion: number; ticket: number };
  reservasServicios: Array<{ s: string; pct: number; color: string }>;
  reservasDias: Array<{ dia: string; pct: number; color: string }>;
  reservasHoraDia: Record<string, Record<number, number>>;
  estadisticos: {
    mejorDia: string;
    mejorDiaMonto: number;
    diaMasReservado: string;
    diaMasResPct: number;
    servicioTop: string;
    servicioTopPct: number;
  };
}

export const allMonthsData: MonthData[] = [

  // ═══════════════════════════════════════════════════════════════
  // DICIEMBRE 2025
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'diciembre2025',
    label: 'Diciembre 2025',

    resumen: {
      inversionTotal:    556668,
      formulariosTotal:  168,
      leadsPagados:      115,
      leadsOrganico:     53,
      ventasReales:      38648651,
      cantidadVentas:    368,
      reservasAgendadas: 355,
    },

    porCanal: [
      { canal:'Google Ads', inversion:318601, leads:43, cpl:7409, ctr:11.55 },
      { canal:'Meta Ads',   inversion:238067, leads:72, cpl:3307, ctr:0.83  },
    ],

    googleAdsMetrics: {
      leads:             43,
      impresiones:    11630,
      clics:           1343,
      ctr:            11.55,
      cpc:              237,
      costo:         318601,
      cpl:             7409,
      imprPerdidasPpto: '69.73%',
      estado: 'Activa – Limitada por presupuesto',
    },

    topKeywords: [
      { kw:'"estudio de tatuajes"',   conv:11.6, clicks: 526, ctr:16.47, cpc:258, cpa:11716 },
      { kw:'"tatuajes arte"',         conv: 9.9, clicks: 262, ctr: 6.07, cpc:215, cpa: 5690 },
      { kw:'"tatuajes santiago"',     conv: 6.4, clicks: 163, ctr:23.90, cpc:278, cpa: 7087 },
      { kw:'"tatuajes en el mut"',    conv: 2.8, clicks:  46, ctr:52.27, cpc:109, cpa: 1783 },
      { kw:'"tattoo studio prov."',   conv: 2.1, clicks:  58, ctr:22.57, cpc:286, cpa: 7887 },
      { kw:'[tatuajes]',              conv: 1.5, clicks:  21, ctr: 3.89, cpc:226, cpa: 3158 },
      { kw:'"tatuajes minimalistas"', conv: 1.4, clicks:  28, ctr: 9.24, cpc:212, cpa: 4230 },
      { kw:'"tatuaje artístico"',     conv: 1.3, clicks:  44, ctr: 7.53, cpc:198, cpa: 6692 },
      { kw:'[cover up tatuajes]',     conv: 1.0, clicks:  21, ctr: 8.61, cpc:261, cpa: 5487 },
      { kw:'"tatuajes providencia"',  conv: 0.9, clicks:  33, ctr:16.67, cpc:281, cpa:10319 },
    ],

    topTerminos: [
      { term:'paginas de tatuajes', clicks: 1, conv:1.9, cpa:   56 },
      { term:'tatuajes',            clicks:40, conv:1.7, cpa: 5932 },
      { term:'tatuajes santiago',   clicks:26, conv:1.4, cpa: 6101 },
      { term:'tattoo',              clicks: 8, conv:1.2, cpa: 1309 },
      { term:'cavalera',            clicks:28, conv:1.2, cpa:  128 },
      { term:'cavalera mut',        clicks:10, conv:1.1, cpa: 1042 },
    ],

    topUbicaciones: [
      { lugar:'Las Condes',   conv:31.7, clicks: 917, ctr:12.89, cpa: 6523 },
      { lugar:'Providencia',  conv: 5.0, clicks: 251, ctr: 8.39, cpa:13579 },
      { lugar:'La Reina',     conv: 4.2, clicks:  36, ctr:16.98, cpa: 1866 },
      { lugar:'Ñuñoa',        conv: 1.0, clicks:  88, ctr:11.52, cpa:21137 },
      { lugar:'Lo Barnechea', conv: 1.0, clicks:  16, ctr:11.85, cpa: 2937 },
      { lugar:'Vitacura',     conv: 0.3, clicks:  35, ctr: 8.50, cpa:40077 },
    ],

    mejoresHorarios: [
      { dia:'Martes',  hora:'17:00', conv:2.2, tasa:'24.4%', cpc:180 },
      { dia:'Sábado',  hora:'19:00', conv:2.1, tasa:'13.1%', cpc: 92 },
      { dia:'Lunes',   hora:'16:00', conv:1.5, tasa:'15.0%', cpc:143 },
      { dia:'Viernes', hora:'21:00', conv:1.4, tasa:'10.8%', cpc:208 },
      { dia:'Lunes',   hora:'12:00', conv:1.2, tasa:' 7.1%', cpc:198 },
    ],

    metaAdsMetrics: {
      leadsAdminPanel:  72,
      leadsInstagram:   58,
      leadsMeta:        14,
      leadsCSV:         17,
      impresiones:   77996,
      clics:           645,
      ctr:            0.83,
      costo:        238067,
      cpl:            3307,
      alcance:       35102,
      frecuencia:     2.22,
    },

    metaConjuntos: [
      { nombre:'BOFU Conv Santiago 18-45 Dic', conv:17, alcance:35102, impr:77996, clics:645, ctr:0.83, gasto:238067, cpa:14004,
        resultadosCSV:17, resultadosReales:14, cpaReal:17005 },
    ],

    metaAnuncios: [
      { nombre:'Video con texto v1',  conv:0,  impr:8739,  clics:62,  ctr:0.71, gasto:31343,  cpa:0,     estado:'inactive' },
      { nombre:'Video sin texto v1',  conv:2,  impr:9900,  clics:133, ctr:1.34, gasto:39537,  cpa:19768, estado:'active'   },
      { nombre:'Video sin texto v2',  conv:15, impr:59330, clics:450, ctr:0.76, gasto:167140, cpa:11143, estado:'active'   },
    ],

    ventasResumen: { total:38648651, cantidad:368, ticket:105024 },
    ventasWalkIn:  { total:8693250,  cantidad:137, pct:23.8 },

    ventasDiarias: [
      {d:'01/12',v:2266900},{d:'02/12',v:1034100},{d:'03/12',v:1092400},
      {d:'04/12',v:642000}, {d:'05/12',v:792100}, {d:'06/12',v:1090100},
      {d:'07/12',v:670700}, {d:'08/12',v:400000}, {d:'09/12',v:1934700},
      {d:'10/12',v:895000}, {d:'11/12',v:663300}, {d:'12/12',v:843400},
      {d:'13/12',v:1776600},{d:'15/12',v:1862400},{d:'16/12',v:1337700},
      {d:'17/12',v:1949200},{d:'18/12',v:1567250},{d:'19/12',v:1433100},
      {d:'20/12',v:906200}, {d:'21/12',v:1759000},{d:'22/12',v:1997300},
      {d:'23/12',v:1883000},{d:'24/12',v:1077100},{d:'26/12',v:1269100},
      {d:'27/12',v:864600}, {d:'28/12',v:584900}, {d:'29/12',v:1397800},
      {d:'30/12',v:1907401},{d:'31/12',v:657000},
    ],

    ventasCategorias: [
      { cat:'Tatuaje',           monto:25449001 },
      { cat:'Joya Titanio',      monto:6198100  },
      { cat:'Joya Oro',          monto:1716000  },
      { cat:'Piercing Oreja',    monto:1656250  },
      { cat:'Piercing Rostro',   monto:785000   },
      { cat:'Accesorios',        monto:375000   },
      { cat:'Piercing Cuerpo',   monto:230000   },
      { cat:'Revisión Piercing', monto:145000   },
    ],

    reservasResumen: { total:355, manual:268, online:68, recaudacion:27229050, ticket:76701 },

    reservasServicios: [
      { s:'Hora Consulta',     pct:28.0, color:C[0] },
      { s:'Revisión Piercing', pct:16.1, color:C[1] },
      { s:'Tatuaje 200',       pct:9.2,  color:C[2] },
      { s:'Tatuaje 250',       pct:5.1,  color:C[3] },
      { s:'Tatuaje 120',       pct:4.2,  color:C[4] },
      { s:'Hora Repaso',       pct:3.9,  color:C[5] },
      { s:'Piercing Lóbulo',   pct:3.6,  color:C[6] },
      { s:'Otros',             pct:29.9, color:C[7] },
    ],

    reservasDias: [
      { dia:'Martes',    pct:22.6, color:C[0] },
      { dia:'Miércoles', pct:19.9, color:C[1] },
      { dia:'Viernes',   pct:18.8, color:C[2] },
      { dia:'Lunes',     pct:14.3, color:C[3] },
      { dia:'Jueves',    pct:11.3, color:C[4] },
      { dia:'Sábado',    pct:10.4, color:C[5] },
      { dia:'Domingo',   pct:2.7,  color:C[6] },
    ],

    reservasHoraDia: {
      lunes:     {10:12,11:3, 12:4, 14:4, 15:8, 16:3, 17:2, 18:7, 19:5},
      martes:    {10:11,11:9, 12:4, 13:2, 14:5, 15:16,16:4, 17:7, 18:11,19:7},
      miércoles: {10:19,11:2, 12:6, 13:1, 14:9, 15:13,16:5, 17:4, 18:7, 19:1},
      jueves:    {10:15,11:2, 12:5,        14:4, 15:6, 16:2,       18:3, 19:1},
      viernes:   {10:13,11:4, 12:1, 13:6, 14:1, 15:16,16:5, 17:8, 18:4, 19:5},
      sábado:    {10:7, 11:3, 12:2, 13:4, 14:3, 15:10,16:3, 17:1, 18:1, 19:1},
      domingo:   {10:3, 11:2,             14:1, 15:1, 16:1, 17:1},
    },

    estadisticos: {
      mejorDia:'1 Dic', mejorDiaMonto:2266900,
      diaMasReservado:'Martes', diaMasResPct:22.6,
      servicioTop:'Hora Consulta', servicioTopPct:28.0,
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ENERO 2026
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'enero2026',
    label: 'Enero 2026',

    resumen: {
      inversionTotal:    1082462,
      formulariosTotal:  130,
      leadsPagados:      100,
      leadsOrganico:     30,
      ventasReales:      39239104,
      cantidadVentas:    379,
      reservasAgendadas: 369,
    },

    porCanal: [
      { canal:'Google Ads', inversion:547350, leads:46, cpl:11899, ctr:10.43 },
      { canal:'Meta Ads',   inversion:535112, leads:54, cpl:9909, ctr:0.90  },
    ],

    googleAdsMetrics: {
      leads:             46,
      impresiones:    21525,
      clics:           2244,
      ctr:            10.43,
      cpc:              244,
      costo:         547350,
      cpl:            11899,
      imprPerdidasPpto: '69.81%',
      estado: 'Activa – Limitada por presupuesto',
    },

    topKeywords: [
      { kw:'"estudio de tatuajes"',    conv:18.6, clicks: 783, ctr:17.73, cpc:248, cpa:10458 },
      { kw:'[tatuajes]',               conv: 5.4, clicks: 246, ctr: 4.91, cpc:251, cpa:11439 },
      { kw:'"tatuajes santiago"',      conv: 4.8, clicks: 236, ctr:26.14, cpc:266, cpa:13062 },
      { kw:'"tatuajes arte"',          conv: 4.5, clicks: 250, ctr: 4.83, cpc:224, cpa:12461 },
      { kw:'"tatuajes en el mut"',     conv: 2.9, clicks:  57, ctr:35.85, cpc:169, cpa: 3323 },
      { kw:'"tatuaje artístico"',      conv: 1.8, clicks:  74, ctr: 7.22, cpc:176, cpa: 7239 },
      { kw:'"tatuajes providencia"',   conv: 1.6, clicks:  60, ctr:17.05, cpc:315, cpa:11824 },
      { kw:'[cover up tatuajes]',      conv: 0.8, clicks:  44, ctr: 9.15, cpc:252, cpa:13845 },
      { kw:'"tattoo studio prov."',    conv: 0.5, clicks:  76, ctr:24.68, cpc:281, cpa:42682 },
      { kw:'"tattoo diseño pers."',    conv: 0.2, clicks:  35, ctr: 5.09, cpc:253, cpa:44270 },
    ],

    topTerminos: [
      { term:'tattoo patagonia',     clicks: 1, conv:2.3, cpa:   63 },
      { term:'tatuajes santiago',    clicks:47, conv:1.4, cpa: 8920 },
      { term:'cavalera mut',         clicks:10, conv:1.2, cpa: 1942 },
      { term:'tatuajes',             clicks:82, conv:1.1, cpa:22783 },
      { term:'tattoo',               clicks:24, conv:1.1, cpa: 1934 },
      { term:'tatuajes cotizacion',  clicks: 2, conv:1.1, cpa:  468 },
    ],

    topUbicaciones: [
      { lugar:'Las Condes',   conv:25.2, clicks:1462, ctr:11.61, cpa:13243 },
      { lugar:'Providencia',  conv: 9.3, clicks: 454, ctr: 7.29, cpa:12832 },
      { lugar:'Ñuñoa',        conv: 6.1, clicks: 163, ctr:12.54, cpa: 7405 },
      { lugar:'Vitacura',     conv: 3.4, clicks:  84, ctr:11.21, cpa: 7260 },
      { lugar:'Lo Barnechea', conv: 1.6, clicks:  45, ctr:17.31, cpa: 7248 },
      { lugar:'La Reina',     conv: 0.4, clicks:  36, ctr: 8.96, cpa:32070 },
    ],

    mejoresHorarios: [
      { dia:'Domingo',   hora:'01:00', conv:2.7, tasa:'13.5%', cpc:201 },
      { dia:'Martes',    hora:'15:00', conv:2.4, tasa:'10.0%', cpc:225 },
      { dia:'Lunes',     hora:'12:00', conv:2.0, tasa:'10.5%', cpc:354 },
      { dia:'Lunes',     hora:'13:00', conv:1.5, tasa:' 4.4%', cpc:318 },
      { dia:'Martes',    hora:'13:00', conv:1.5, tasa:' 6.5%', cpc:262 },
      { dia:'Sábado',    hora:'10:00', conv:1.3, tasa:' 3.6%', cpc:272 },
    ],

    metaAdsMetrics: {
      leadsAdminPanel:  54,
      leadsInstagram:   43,
      leadsMeta:        11,
      leadsCSV:         31,
      impresiones:  230087,
      clics:          2078,
      ctr:            0.90,
      costo:        535112,
      cpl:            9909,
      alcance:       79867,
      frecuencia:     2.88,
    },

    metaConjuntos: [
      { nombre:'BOFU Conv Santiago 18-45', conv:25, alcance:59234, impr:152800, clics:1206, ctr:0.79, gasto:375008, cpa:15000,
        resultadosCSV:37, resultadosReales:10.2, cpaReal:56287, seguidoresIG:165, visitasPerfil:1337 },
      { nombre:'Piercing enero 2026',      conv:1,  alcance:20741, impr:36111,  clics:573,  ctr:1.59, gasto:83099,  cpa:83099,
        resultadosCSV:5,  resultadosReales:1.4,  cpaReal:125043, seguidoresIG:96,  visitasPerfil:759  },
      { nombre:'Secuencia tattoo ene',     conv:5,  alcance:18868, impr:41176,  clics:299,  ctr:0.73, gasto:77005,  cpa:15401,
        resultadosCSV:9,  resultadosReales:2.5,  cpaReal:62790,  seguidoresIG:11,  visitasPerfil:230  },
    ],

    metaAnuncios: [
      { nombre:'Video sin texto v1',  conv:9,  impr:32115,  clics:335, ctr:1.04, gasto:100968, cpa:11219, estado:'active' },
      { nombre:'Video sin texto v2',  conv:16, impr:120633, clics:871, ctr:0.72, gasto:273976, cpa:17124, estado:'active' },
      { nombre:'Fotos piercings ene', conv:0,  impr:6423,   clics:36,  ctr:0.56, gasto:16428,  cpa:0,     estado:'active' },
      { nombre:'Video Piercing ene',  conv:1,  impr:29688,  clics:537, ctr:1.81, gasto:66671,  cpa:66671, estado:'active' },
      { nombre:'Secuencia mix',       conv:5,  impr:41176,  clics:299, ctr:0.73, gasto:77005,  cpa:15401, estado:'active' },
    ],

    ventasResumen: { total:39239104, cantidad:379, ticket:103533 },
    ventasWalkIn:  { total:8057200,  cantidad:126, pct:20.7 },

    ventasDiarias: [
      {d:'01/01',v:80000},  {d:'02/01',v:1196900},{d:'03/01',v:1744500},
      {d:'04/01',v:650000}, {d:'05/01',v:1132600},{d:'06/01',v:1649500},
      {d:'07/01',v:2013002},{d:'08/01',v:1318401},{d:'09/01',v:1332800},
      {d:'10/01',v:2163300},{d:'11/01',v:888400}, {d:'12/01',v:2286700},
      {d:'13/01',v:1520100},{d:'14/01',v:492400}, {d:'15/01',v:1741100},
      {d:'16/01',v:1145900},{d:'17/01',v:844900}, {d:'18/01',v:1014101},
      {d:'19/01',v:998400}, {d:'20/01',v:1353600},{d:'21/01',v:1283600},
      {d:'22/01',v:970500}, {d:'23/01',v:1499600},{d:'24/01',v:1552200},
      {d:'25/01',v:260000}, {d:'26/01',v:1115000},{d:'27/01',v:1409100},
      {d:'28/01',v:829300}, {d:'29/01',v:1363600},{d:'30/01',v:1550400},
      {d:'31/01',v:1579200},
    ],

    ventasCategorias: [
      { cat:'Tatuaje',           monto:29435003 },
      { cat:'Joya Titanio',      monto:5590600  },
      { cat:'Piercing Oreja',    monto:1645001  },
      { cat:'Piercing Rostro',   monto:690000   },
      { cat:'Piercing Cuerpo',   monto:475000   },
      { cat:'Accesorios',        monto:465000   },
      { cat:'Joya Oro',          monto:478500   },
      { cat:'Revisión Piercing', monto:130000   },
    ],

    reservasResumen: { total:369, manual:264, online:77, recaudacion:24055032, ticket:65190 },

    reservasServicios: [
      { s:'Hora Consulta',     pct:24.0, color:C[0] },
      { s:'Revisión Piercing', pct:20.5, color:C[1] },
      { s:'Tatuaje 150',       pct:7.6,  color:C[2] },
      { s:'Tatuaje 250',       pct:5.6,  color:C[3] },
      { s:'Tatuaje 300',       pct:4.1,  color:C[4] },
      { s:'Tatuaje 200',       pct:3.8,  color:C[5] },
      { s:'Piercing Lóbulo',   pct:3.8,  color:C[6] },
      { s:'Otros',             pct:30.6, color:C[7] },
    ],

    reservasDias: [
      { dia:'Viernes',   pct:20.5, color:C[0] },
      { dia:'Martes',    pct:16.1, color:C[1] },
      { dia:'Lunes',     pct:15.2, color:C[2] },
      { dia:'Sábado',    pct:15.5, color:C[3] },
      { dia:'Jueves',    pct:15.2, color:C[4] },
      { dia:'Miércoles', pct:14.1, color:C[5] },
      { dia:'Domingo',   pct:3.2,  color:C[6] },
    ],

    reservasHoraDia: {
      lunes:     {10:10,11:6, 12:2, 13:3, 14:3, 15:10,16:9, 17:2, 18:5, 19:2},
      martes:    {10:8, 11:4, 12:3, 13:6, 14:1, 15:13,16:2, 17:7, 18:8, 19:3},
      miércoles: {10:3, 11:6, 12:3, 13:5, 14:4, 15:9, 16:3, 17:5, 18:6, 19:4},
      jueves:    {10:7, 11:4, 12:5, 13:3, 14:4, 15:12,16:3, 17:5, 18:5, 19:4},
      viernes:   {10:10,11:6, 12:2, 13:5, 14:3, 15:15,16:6, 17:6, 18:13,19:4},
      sábado:    {10:13,11:9, 12:2, 13:2, 14:3, 15:13,16:3, 17:4, 18:3, 19:1},
      domingo:   {10:1, 11:2,             15:1, 16:4, 17:2,              19:1},
    },

    estadisticos: {
      mejorDia:'12 Ene', mejorDiaMonto:2286700,
      diaMasReservado:'Viernes', diaMasResPct:20.5,
      servicioTop:'Hora Consulta', servicioTopPct:24.0,
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // FEBRERO 2026
  // ═══════════════════════════════════════════════════════════════
  {
    key: 'febrero2026',
    label: 'Febrero 2026',

    resumen: {
      inversionTotal:    795785,
      formulariosTotal:  144,
      leadsPagados:      95,
      leadsOrganico:     49,
      ventasReales:      31742244,
      cantidadVentas:    343,
      reservasAgendadas: 341,
    },

    porCanal: [
      { canal:'Google Ads', inversion:433461, leads:53, cpl:8178, ctr:11.20 },
      { canal:'Meta Ads',   inversion:362324, leads:42, cpl:8627, ctr:1.05  },
    ],

    googleAdsMetrics: {
      leads:             53,
      impresiones:    20529,
      clics:           2299,
      ctr:            11.20,
      cpc:              189,
      costo:         433461,
      cpl:             8178,
      imprPerdidasPpto: '75.14%',
      estado: 'Activa – Limitada por presupuesto',
      nota: 'Presupuesto $12.000/día insuficiente — se pierden 3 de cada 4 búsquedas. Recomendación: subir a $20.000/día.',
    },

    topKeywords: [
      { kw:'"tatuajes santiago"',    conv:12.2, clicks: 296, ctr:28.77, cpc:245, cpa: 5944 },
      { kw:'"estudio de tatuajes"',  conv:11.4, clicks: 601, ctr:17.70, cpc:201, cpa:10616 },
      { kw:'"tatuajes arte"',        conv: 7.0, clicks: 245, ctr: 5.09, cpc:201, cpa: 7031 },
      { kw:'[tatuajes]',             conv: 5.9, clicks: 224, ctr: 5.12, cpc:189, cpa: 7181 },
      { kw:'[cover up tatuajes]',    conv: 3.7, clicks:  28, ctr: 7.47, cpc:195, cpa: 1473 },
      { kw:'"tatuajes en el mut"',   conv: 2.8, clicks:  91, ctr:29.35, cpc:117, cpa: 3796 },
      { kw:'"tatuajes realistas"',   conv: 1.7, clicks:  37, ctr:12.42, cpc:230, cpa: 5008 },
      { kw:'"tattoo studio prov."',  conv: 1.3, clicks:  91, ctr:21.16, cpc:199, cpa:13905 },
      { kw:'"tatuajes providencia"', conv: 1.0, clicks:  94, ctr:17.12, cpc:169, cpa:15868 },
      { kw:'"tatuaje artístico"',    conv: 0.9, clicks:  59, ctr: 6.26, cpc:160, cpa:10494 },
    ],

    topTerminos: [
      { term:'tatuajes santiago',      clicks:34, conv:3.1, cpa: 2747 },
      { term:'tatuajes',               clicks:87, conv:2.8, cpa: 6489 },
      { term:'tatuadores santiago',    clicks:48, conv:1.8, cpa: 6836 },
      { term:'tatuajes para hombres',  clicks:15, conv:1.0, cpa: 3995 },
      { term:'tatuajes para mujeres',  clicks:13, conv:0.6, cpa: 7885 },
      { term:'tatuajes chile',         clicks:13, conv:0.4, cpa: 6625 },
    ],

    topUbicaciones: [
      { lugar:'Las Condes',   conv:35.4, clicks:1518, ctr:13.06, cpa: 7851 },
      { lugar:'Providencia',  conv: 7.0, clicks: 450, ctr: 7.27, cpa:12587 },
      { lugar:'Lo Barnechea', conv: 3.8, clicks:  35, ctr:14.60, cpa: 2442 },
      { lugar:'Ñuñoa',        conv: 3.2, clicks: 173, ctr:14.63, cpa:10951 },
      { lugar:'Vitacura',     conv: 2.5, clicks:  76, ctr:12.44, cpa: 6039 },
      { lugar:'La Reina',     conv: 1.0, clicks:  47, ctr:14.79, cpa: 8079 },
    ],

    mejoresHorarios: [
      { dia:'Sábado',    hora:'20:00', conv:3.5, tasa:'26.9%', cpc:132 },
      { dia:'Lunes',     hora:'13:00', conv:1.8, tasa:' 5.0%', cpc:290 },
      { dia:'Miércoles', hora:'13:00', conv:1.7, tasa:' 5.2%', cpc:197 },
      { dia:'Miércoles', hora:'17:00', conv:1.5, tasa:' 7.1%', cpc:206 },
      { dia:'Sábado',    hora:'19:00', conv:1.3, tasa:' 5.7%', cpc:109 },
      { dia:'Domingo',   hora:'13:00', conv:1.3, tasa:' 4.2%', cpc:188 },
    ],

    metaAdsMetrics: {
      leadsAdminPanel:  42,
      leadsInstagram:   39,
      leadsMeta:         3,
      leadsCSV:         20,
      impresiones:  162791,
      clics:          1708,
      ctr:            1.05,
      costo:        362324,
      cpl:            8837,
      alcance:       60037,
      frecuencia:     2.71,
    },

    metaConjuntos: [
      { nombre:'BOFU Conv Santiago 18-45', conv:12, alcance:35806, impr:75205,  clics:773, ctr:1.03, gasto:195319, cpa:16277,
        resultadosCSV:37, resultadosReales:10.2, cpaReal:56287, seguidoresIG:165, visitasPerfil:1337 },
      { nombre:'Piercing ene 2026',        conv:4,  alcance:20395, impr:40820,  clics:708, ctr:1.73, gasto:89560,  cpa:22390,
        resultadosCSV:5,  resultadosReales:1.4,  cpaReal:125043, seguidoresIG:96,  visitasPerfil:759  },
      { nombre:'Secuencia tattoo ene',     conv:4,  alcance:21969, impr:46766,  clics:227, ctr:0.49, gasto:77445,  cpa:19361,
        resultadosCSV:9,  resultadosReales:2.5,  cpaReal:62790,  seguidoresIG:11,  visitasPerfil:230  },
    ],

    metaAnuncios: [
      { nombre:'Video sin texto v1',  conv:1,  impr:12823, clics:127, ctr:0.99, gasto:45056,  cpa:45056, estado:'active' },
      { nombre:'Video sin texto v2',  conv:11, impr:62382, clics:646, ctr:1.04, gasto:150263, cpa:13660, estado:'active' },
      { nombre:'Fotos piercings ene', conv:1,  impr:5427,  clics:31,  ctr:0.57, gasto:14390,  cpa:14390, estado:'active' },
      { nombre:'Video Piercing ene',  conv:3,  impr:35393, clics:677, ctr:1.91, gasto:75170,  cpa:25057, estado:'active' },
      { nombre:'Secuencia mix',       conv:4,  impr:46766, clics:227, ctr:0.49, gasto:77445,  cpa:19361, estado:'active' },
    ],

    ventasResumen: { total:31742244, cantidad:343, ticket:92543 },
    ventasWalkIn:  { total:4971920,  cantidad:90,  pct:16.8 },

    ventasDiarias: [
      {d:'01/02',v:208300}, {d:'02/02',v:1699400},{d:'03/02',v:1463900},
      {d:'04/02',v:1914701},{d:'05/02',v:1311701},{d:'06/02',v:970300},
      {d:'07/02',v:1310760},{d:'08/02',v:710060}, {d:'09/02',v:1417101},
      {d:'10/02',v:1999900},{d:'11/02',v:1051300},{d:'12/02',v:523600},
      {d:'13/02',v:1496600},{d:'14/02',v:1625700},{d:'15/02',v:653941},
      {d:'16/02',v:1275500},{d:'17/02',v:879940}, {d:'18/02',v:1432900},
      {d:'19/02',v:1413600},{d:'20/02',v:304500}, {d:'21/02',v:410300},
      {d:'22/02',v:375200}, {d:'23/02',v:346900}, {d:'24/02',v:1394840},
      {d:'25/02',v:1191200},{d:'26/02',v:1347100},{d:'27/02',v:786700},
    ],

    ventasCategorias: [
      { cat:'Tatuaje',           monto:20400003 },
      { cat:'Joya Titanio',      monto:5431940  },
      { cat:'Piercing Oreja',    monto:2080000  },
      { cat:'Piercing Rostro',   monto:875001   },
      { cat:'Piercing Cuerpo',   monto:220000   },
      { cat:'Accesorios',        monto:210000   },
      { cat:'Joya Oro',          monto:264000   },
      { cat:'Revisión Piercing', monto:25000    },
    ],

    reservasResumen: { total:341, manual:224, online:102, recaudacion:20510020, ticket:60147 },

    reservasServicios: [
      { s:'Hora Consulta',     pct:25.8, color:C[0] },
      { s:'Revisión Piercing', pct:19.0, color:C[1] },
      { s:'Piercing Lóbulo',   pct:7.1,  color:C[2] },
      { s:'Tatuaje 150',       pct:6.7,  color:C[3] },
      { s:'Tatuaje 250',       pct:4.6,  color:C[4] },
      { s:'Tatuaje 200',       pct:4.3,  color:C[5] },
      { s:'Tatuaje 300',       pct:3.7,  color:C[6] },
      { s:'Otros',             pct:28.8, color:C[7] },
    ],

    reservasDias: [
      { dia:'Viernes',   pct:20.6, color:C[0] },
      { dia:'Miércoles', pct:16.3, color:C[1] },
      { dia:'Martes',    pct:15.0, color:C[2] },
      { dia:'Lunes',     pct:13.5, color:C[3] },
      { dia:'Jueves',    pct:13.5, color:C[4] },
      { dia:'Sábado',    pct:12.3, color:C[5] },
      { dia:'Domingo',   pct:8.9,  color:C[6] },
    ],

    reservasHoraDia: {
      lunes:     {10:7, 11:4, 12:5, 13:1, 14:2, 15:4, 16:4, 17:5, 18:9, 19:3},
      martes:    {10:13,11:3, 12:6, 13:1,       15:7, 16:6, 17:4, 18:7, 19:2},
      miércoles: {10:8, 11:6, 12:5,       14:2, 15:8, 16:8, 17:7, 18:6, 19:3},
      jueves:    {10:7, 11:4, 12:7, 13:2, 14:5, 15:7, 16:3, 17:2, 18:4, 19:3},
      viernes:   {10:11,11:6, 12:3, 13:2, 14:10,15:11,16:9, 17:6, 18:6, 19:3},
      sábado:    {10:7, 11:5, 12:4, 13:2, 14:2, 15:10,16:4, 17:3, 18:1, 19:2},
      domingo:   {10:2, 11:5, 12:3, 13:4, 14:3, 15:4, 16:1, 17:3, 18:1, 19:3},
    },

    estadisticos: {
      mejorDia:'10 Feb', mejorDiaMonto:1999900,
      diaMasReservado:'Viernes', diaMasResPct:20.6,
      servicioTop:'Hora Consulta', servicioTopPct:25.8,
    },
  },
];

// ── TENDENCIA 3 MESES ──────────────────────────────────────────
export const tendencia3Meses = [
  { mes:'Dic 2025', leadsGoogle:43, leadsTotal:168, invGoogle:318601, invMeta:238067, cac:7409,  ventas:38648651, reservas:355 },
  { mes:'Ene 2026', leadsGoogle:46, leadsTotal:130, invGoogle:547350, invMeta:535112, cac:11899, ventas:39239104, reservas:369 },
  { mes:'Feb 2026', leadsGoogle:53, leadsTotal:144, invGoogle:433461, invMeta:362324, cac:8178,  ventas:31742244, reservas:341 },
];

export default allMonthsData;
