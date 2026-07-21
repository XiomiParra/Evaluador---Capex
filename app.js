const fieldIds = [
  "projectCode",
  "projectName",
  "businessArea",
  "businessUnit",
  "sponsor",
  "impactCategory",
  "annualTemplatePayload",
  "strategicFocus",
  "maltaProject",
  "otherMaltaJustification",
  "groupKpi",
  "strategicObjectives",
  "strategyAlignmentText",
  "problemSolvedText",
  "expectedImpactText",
  "projectType",
  "projectGoal",
  "projectLife",
  "equipmentCost",
  "installationCost",
  "propertyInfrastructureCost",
  "trainingCost",
  "otherCosts",
  "requiredInvestmentTotal",
  "workingCapital",
  "salvageValue",
  "residualPct",
  "implementationMonths",
  "annualRevenueIncrease",
  "annualCostSavings",
  "annualOpexIncrease",
  "riskAvoidanceBenefit",
  "annualGrowthRate",
  "salesUnitsYear1",
  "ticketPrice",
  "unitGrowthRate",
  "variableCostPct",
  "salesExpensePct",
  "fixedCommercialCost",
  "fixedCommercialCostGrowthPct",
  "annualDepreciation",
  "discountRate",
  "taxRate",
  "requiredIrr",
  "maxPayback",
  "targetRoi",
  "targetScore",
  "strategicAlignment",
  "operationalUrgency",
];

const projectTypeLabels = {
  Mantenimiento: "Mantenimiento",
  Crecimiento: "Crecimiento",
  Estrategico: "Estratégico",
  Regulatorio: "Regulatorio",
  expansion: "Crecimiento",
  productivity: "Crecimiento",
  replacement: "Mantenimiento",
  compliance: "Regulatorio",
  strategic: "Estratégico",
};

const legacyProjectTypeMap = {
  expansion: "Crecimiento",
  productivity: "Crecimiento",
  replacement: "Mantenimiento",
  compliance: "Regulatorio",
  strategic: "Estrategico",
};

const legacyKpiMap = {
  EBITDA: "Eficiencia Operativa",
  "Ventas / margen bruto": "Incremento en Ventas",
  "Productividad operativa": "Eficiencia Operativa",
  "NPS / satisfaccion de clientes": "Satisfacci\u00f3n del Cliente",
  "Cumplimiento regulatorio": "Cumplimiento Regulatorio",
  "Continuidad operacional": "Mitigaci\u00f3n de Riesgos",
};

const corporateAssumptions = {
  discountRate: 12,
  taxRate: 32,
  requiredIrr: 15,
  maxPayback: 5,
};
const strategicObjectiveSeparator = " | ";
const maltaProjectsByStrategicObjective = {
  "Consolidar Participaci\u00f3n En Mercado Automotriz": [
    "Casa Matriz Suzuki 3S",
    "Mejorar Canal DA de Motos",
    "Crecer red de Motos: CH, ES, MGA, Rivas",
    "Toyota (Plaza Tonalli / Master Plan Km 11)",
    "Hino (HQ Managua y Juigalpa)",
    "Aumentar intercambios en autos y recompra v\u00eda talleres",
    "Venta Digital 3.0 (fortalecer canal digital)",
    "Establecer Dealer Awards Sucursales Automotrices",
    "Consultor\u00eda de customer journey en Suzuki",
    "Suzuki (Estel\u00ed)",
    "Geely + FAW (Chinandega)",
    "Kia (Matagalpa)",
  ],
  "Crecer Nuestro Negocio Posventa": [
    "Taller Casa Pellas Matagalpa",
    "Venta de cascos de motos",
    "Continuar creciendo red de Talleres Express: S\u00e9baco, Managua y Le\u00f3n",
    "Fortalecer el canal para reclamo de clientes",
    "Estandarizar y desplegar programa de atenci\u00f3n al cliente corporativo",
    "PMP 2.0",
    "Reingenier\u00eda modelo taller de motos",
  ],
  "Anticipar Y Gestionar Riesgos": [
    "Seguimiento de Eficiencia por l\u00ednea de negocios",
    "Ajustar la capacidad log\u00edstica de motos",
    "Migrar deuda de corto plazo a largo plazo",
    "Crear Depto. de Cumplimiento y Legal",
    "Cultura Genchi Genbutsu (Relaciones)",
    "Expansi\u00f3n CPD",
    "Ajustar la capacidad log\u00edstica de autos",
    "Track de retorno sobre plazas y proyectos aprobados",
    "Edificio Administrativo II",
  ],
  "Desarrollar Excelente Personas Y Procesos": [
    "Finalizar sistema de taller y repuestos en JD Edwards",
    "Digitalizaci\u00f3n, simplificaci\u00f3n y estandarizaci\u00f3n de procesos e IA con SWAT team",
    "Plan de Ahorro",
    "Sistema de Financiamiento",
    "Programa Top Talent (LEAP interno)",
    "Habilitar canales alternos para recepci\u00f3n de pagos",
    "Sistema de Capital Humano sin n\u00f3mina",
    "Plan de mitigaci\u00f3n de salida de personal desarrollado (personas clave)",
  ],
  Otros: ["Otros"],
};

const maltaProjectWeights = {
  "Finalizar sistema de taller y repuestos en JD Edwards": 5,
  "Finalizar sistema de taller y repuestos en E1": 5,
  "Seguimiento de Eficiencia por l\u00ednea de negocios": 5,
  "Ajustar la capacidad log\u00edstica de motos": 5,
  "Casa Matriz Suzuki 3S": 5,
  "Taller Casa Pellas Matagalpa": 5,
  "Taller CP Matagalpa": 5,
  "Venta de cascos de motos": 5,
  "Digitalizaci\u00f3n, simplificaci\u00f3n y estandarizaci\u00f3n de procesos e IA con SWAT team": 5,
  "Digitalizaci\u00f3n, simplificaci\u00f3n y estandarizaci\u00f3n de proceso e IA": 5,
  "Plan de Ahorro": 3,
  "Sistema de Financiamiento": 3,
  "Migrar deuda de corto plazo a largo plazo": 3,
  "Crear Depto. de Cumplimiento y Legal": 3,
  "Cultura Genchi Genbutsu (Relaciones)": 3,
  "Expansi\u00f3n CPD": 3,
  "Ajustar la capacidad log\u00edstica de autos": 3,
  "Mejorar Canal DA de Motos": 3,
  "Continuar creciendo red de Talleres Express: S\u00e9baco, Managua y Le\u00f3n": 3,
  "Continuar creciendo red de Talleres Express: S\u00e9baco, Jinotega Managua y Le\u00f3n": 3,
  "Fortalecer el canal para reclamo de clientes": 3,
  "Fortalecer el canal para reclamo clientes": 3,
  "Estandarizar y desplegar programa de atenci\u00f3n al cliente corporativo": 3,
  "PMP 2.0": 3,
  "Programa Top Talent (LEAP interno)": 2,
  "Habilitar canales alternos para recepci\u00f3n de pagos": 2,
  "Sistema de Capital Humano sin n\u00f3mina": 2,
  "Sistema de CH sin n\u00f3mina": 2,
  "Track de retorno sobre plazas y proyectos aprobados": 2,
  "Edificio Administrativo II": 2,
  "Crecer red de Motos: CH, ES, MGA, Rivas": 2,
  "Toyota (Plaza Tonalli / Master Plan Km 11)": 2,
  "Toyota (Plaza Tonall\u00ed / Master Plan Km 11)": 2,
  "Hino (HQ Managua y Juigalpa)": 2,
  "Aumentar intercambios en autos y recompra v\u00eda talleres": 2,
  "Venta Digital 3.0 (fortalecer canal digital)": 2,
  "Establecer Dealer Awards Sucursales Automotrices": 2,
  "Consultor\u00eda de customer journey en Suzuki": 2,
  "Plan de mitigaci\u00f3n de salida de personal desarrollado (personas clave)": 1,
  "Plan de mitigar salida de personal desarrollado": 1,
  "Kia (Matagalpa)": 1,
  "Suzuki (Estel\u00ed)": 1,
  "Geely + FAW (Chinandega)": 1,
  "Reingenier\u00eda modelo taller de motos": 1,
  Otros: 1,
};

const capexTemplates = {
  Mantenimiento: {
    impactCategory: "No genera impacto economico",
    projectGoal: "Mantener continuidad operativa, reducir obsolescencia y proteger niveles de servicio.",
    projectLife: 5,
    equipmentCost: 180000,
    installationCost: 25000,
    propertyInfrastructureCost: 0,
    trainingCost: 8000,
    otherCosts: 12000,
    annualOpexIncrease: 15000,
    annualCostSavings: 0,
    riskAvoidanceBenefit: 0,
    annualGrowthRate: 0,
    residualPct: 0,
    annualDepreciation: 45000,
    salesUnitsYear1: 0,
    ticketPrice: 0,
    unitGrowthRate: 0,
    variableCostPct: 0,
    salesExpensePct: 0,
    fixedCommercialCost: 0,
    fixedCommercialCostGrowthPct: 0,
    targetRoi: 20,
    targetScore: 85,
    strategicAlignment: 3,
    operationalUrgency: 4,
    riskReduction: 5,
    executionReadiness: 4,
    maltaProject: "Expansi\u00f3n CPD",
    groupKpi: "Mitigaci\u00f3n de Riesgos",
    strategicObjectives: ["Anticipar Y Gestionar Riesgos"],
    strategyAlignmentText: "Cumplimiento regulatorio o continuidad del negocio",
    problemSolvedText: "Obsolescencia de equipos o sistemas",
    expectedImpactText: "Reduccion de riesgos",
  },
  Crecimiento: {
    impactCategory: "Ventas",
    projectGoal: "Incrementar ingresos, capacidad comercial y margen en lineas priorizadas.",
    projectLife: 5,
    equipmentCost: 320000,
    installationCost: 55000,
    propertyInfrastructureCost: 0,
    trainingCost: 12000,
    otherCosts: 28000,
    annualOpexIncrease: 62000,
    annualCostSavings: 0,
    riskAvoidanceBenefit: 0,
    annualGrowthRate: 4,
    residualPct: 13.3,
    annualDepreciation: 72000,
    salesUnitsYear1: 1000,
    ticketPrice: 220,
    unitGrowthRate: 20,
    variableCostPct: 47,
    salesExpensePct: 20.7,
    fixedCommercialCost: 78000,
    fixedCommercialCostGrowthPct: 0,
    targetRoi: 35,
    targetScore: 85,
    strategicAlignment: 5,
    operationalUrgency: 4,
    riskReduction: 3,
    executionReadiness: 4,
    maltaProject: "Venta Digital 3.0 (fortalecer canal digital)",
    groupKpi: "Incremento en Ventas",
    strategicObjectives: "Consolidar Participaci\u00f3n En Mercado Automotriz",
    strategyAlignmentText: "Crecimiento de ventas en lineas clave",
    problemSolvedText: "Limitacion de capacidad instalada",
    expectedImpactText: "Incremento de ingresos",
  },
  Estrategico: {
    impactCategory: "Ahorro",
    projectGoal: "Mejorar capacidades clave, productividad y trazabilidad para habilitar la estrategia del Grupo.",
    projectLife: 5,
    equipmentCost: 260000,
    installationCost: 48000,
    propertyInfrastructureCost: 0,
    trainingCost: 18000,
    otherCosts: 22000,
    annualOpexIncrease: 42000,
    annualCostSavings: 135000,
    riskAvoidanceBenefit: 35000,
    annualGrowthRate: 5,
    residualPct: 6.6,
    annualDepreciation: 65000,
    salesUnitsYear1: 0,
    ticketPrice: 0,
    unitGrowthRate: 0,
    variableCostPct: 0,
    salesExpensePct: 0,
    fixedCommercialCost: 0,
    fixedCommercialCostGrowthPct: 0,
    targetRoi: 30,
    targetScore: 88,
    strategicAlignment: 5,
    operationalUrgency: 4,
    riskReduction: 4,
    executionReadiness: 4,
    maltaProject: "Digitalizaci\u00f3n, simplificaci\u00f3n y estandarizaci\u00f3n de procesos e IA con SWAT team",
    groupKpi: "Eficiencia Operativa",
    strategicObjectives: ["Desarrollar Excelente Personas Y Procesos"],
    strategyAlignmentText: "Innovacion / transformacion digital",
    problemSolvedText: "Falta de control / visibilidad de informacion",
    expectedImpactText: "Mejora en tiempos de proceso",
  },
  Regulatorio: {
    impactCategory: "No genera impacto economico",
    projectGoal: "Asegurar cumplimiento, continuidad del negocio y mitigacion de riesgos obligatorios.",
    projectLife: 5,
    equipmentCost: 140000,
    installationCost: 30000,
    propertyInfrastructureCost: 0,
    trainingCost: 10000,
    otherCosts: 20000,
    annualOpexIncrease: 18000,
    annualCostSavings: 0,
    riskAvoidanceBenefit: 0,
    annualGrowthRate: 0,
    residualPct: 0,
    annualDepreciation: 40000,
    salesUnitsYear1: 0,
    ticketPrice: 0,
    unitGrowthRate: 0,
    variableCostPct: 0,
    salesExpensePct: 0,
    fixedCommercialCost: 0,
    fixedCommercialCostGrowthPct: 0,
    targetRoi: 15,
    targetScore: 90,
    strategicAlignment: 4,
    operationalUrgency: 5,
    riskReduction: 5,
    executionReadiness: 4,
    maltaProject: "Crear Depto. de Cumplimiento y Legal",
    groupKpi: "Cumplimiento Regulatorio",
    strategicObjectives: ["Anticipar Y Gestionar Riesgos"],
    strategyAlignmentText: "Cumplimiento regulatorio o continuidad del negocio",
    problemSolvedText: "Riesgo operativo o incumplimiento",
    expectedImpactText: "Cumplimiento normativo asegurado",
  },
};

const helpMessages = {
  projectType: "Selecciona el tipo de CAPEX. Cada tipo precarga supuestos base y umbrales de lectura distintos.",
  impactCategory: "Define si el beneficio esperado viene por ventas, ahorro o una necesidad sin retorno economico directo.",
  businessUnit: "La unidad de negocio se filtra segun la division seleccionada y define el Sponsor / Driver sugerido.",
  sponsor: "Sponsor / Driver es la persona que impulsa el caso y responde por la ejecucion ante ELE, Direccion Ejecutiva o Junta.",
  maltaProject: "Vincula el CAPEX al proyecto Malta que mas se beneficia. Esto evita justificaciones escritas desde cero.",
  otherMaltaJustification: "Explica brevemente por que la inversion se registra como Otros en Proyecto Malta.",
  groupKpi: "Selecciona el KPI del Grupo que recibira el impacto principal del proyecto.",
  strategicObjectives: "Selecciona el enfoque del Grupo que el proyecto habilita.",
  propertyInfrastructureCost: "Monto asociado a terrenos, adecuaciones, obra civil o infraestructura requerida para ejecutar el CAPEX.",
  requiredInvestmentTotal: "Suma automaticamente equipos, instalacion, propiedades e infraestructura, capacitacion y otros costos.",
  residualPct: "Porcentaje de la inversion que se espera recuperar como valor residual al final de la vida util.",
  fixedCommercialCostGrowthPct: "Porcentaje anual de crecimiento del gasto fijo incremental despues del ano 1.",
  annualDepreciation: "Depreciacion anual calculada como inversion menos valor residual, dividida entre la vida del proyecto.",
  discountRate: "WACC fijado por Finanzas. Se usa para descontar los flujos y calcular VAN.",
  taxRate: "Tasa fiscal corporativa fijada por Finanzas para estandarizar la evaluacion.",
  requiredIrr: "TIR minima corporativa. El solicitante la ve, pero no la modifica.",
  maxPayback: "Plazo maximo corporativo para recuperar la inversion.",
  strategicAlignment: "Se asigna automaticamente: 5 si el CAPEX tiene Enfoque y Proyecto Malta; 1 si queda como Otros.",
  operationalUrgency: "Se asigna automaticamente con el peso del Proyecto Malta segun el archivo de prioridades.",
};

const metricHelp = {
  VAN: "Valor actual neto: valor que crea o destruye el proyecto despues de descontar flujos al WACC.",
  TIR: "Tasa interna de retorno: rendimiento anual implicito del proyecto.",
  Payback: "Tiempo estimado para recuperar la inversion inicial.",
  EBITDA: "Resultado operativo antes de intereses, impuestos, depreciacion y amortizacion.",
  ROI: "Retorno total sobre la inversion inicial.",
  WACC: "Costo promedio ponderado de capital definido por Finanzas.",
};

const stepDefinitions = [
  { key: "type", label: "Tipo" },
  { key: "cost", label: "Inversion" },
  { key: "impact", label: "Impacto" },
  { key: "assumptions", label: "Supuestos" },
  { key: "result", label: "Resultado" },
];

const divisionUnitSponsorMap = {
  Alpesa: [
    { unit: "Agencia Aduanera", sponsor: "Marco Saenz" },
    { unit: "Almacen", sponsor: "Marco Saenz" },
    { unit: "Transporte", sponsor: "Marco Saenz" },
    { unit: "Carga Internacional", sponsor: "Marco Saenz" },
  ],
  Capesa: [
    { unit: "Agencia Seguros", sponsor: "Marco Castro" },
  ],
  "Capital Humano": [
    { unit: "Capital Humano", sponsor: "Mundo Mart\u00ednez" },
    { unit: "Mantenimiento", sponsor: "Mundo Mart\u00ednez" },
  ],
  "Contact Center": [
    { unit: "Contact Center", sponsor: "Maria Leticia Sandino" },
  ],
  "Direccion Ejecutiva": [
    { unit: "Direcci\u00f3n Ejecutiva", sponsor: "" },
  ],
  "Divisi\u00f3n Autos": [
    { unit: "Cafeter\u00eda", sponsor: "Alejandro Pellas" },
    { unit: "Toyota", sponsor: "Alejandro Pellas" },
    { unit: "Suzuki", sponsor: "Alejandro Pellas" },
    { unit: "Kia", sponsor: "Alejandro Pellas" },
    { unit: "Geely", sponsor: "Alejandro Pellas" },
    { unit: "Operaciones Autos", sponsor: "Alejandro Pellas" },
    { unit: "Auto Lote", sponsor: "Alejandro Vega" },
    { unit: "Hino", sponsor: "Alejandro Pellas" },
    { unit: "Camiones Faw", sponsor: "Alejandro Pellas" },
    { unit: "Mercadeo", sponsor: "Alejandro Pellas" },
  ],
  "Divisi\u00f3n Motos": [
    { unit: "Motos Genesis", sponsor: "Jose Luis Salinas" },
    { unit: "Motos Yamaha", sponsor: "Jose Luis Salinas" },
    { unit: "Motos Hero", sponsor: "Jose Luis Salinas" },
    { unit: "Motos Yadea", sponsor: "Jose Luis Salinas" },
    { unit: "Motores Marinos Usados", sponsor: "Jose Luis Salinas" },
    { unit: "Motores Marinos Yamaha", sponsor: "Jose Luis Salinas" },
    { unit: "Motos Usadas", sponsor: "Jose Luis Salinas" },
    { unit: "Carros De Golf", sponsor: "Jose Luis Salinas" },
    { unit: "Operaciones Motos", sponsor: "Jose Luis Salinas" },
    { unit: "Taller Motos", sponsor: "Jose Luis Salinas" },
    { unit: "Mercadeo", sponsor: "Jose Luis Salinas" },
  ],
  "Divisi\u00f3n Repuestos": [
    { unit: "Repuestos Genuinos", sponsor: "Miguel Sacasa" },
    { unit: "Repuestos Alternos", sponsor: "Miguel Sacasa" },
    { unit: "CPD Almacen", sponsor: "Miguel Sacasa" },
  ],
  "Divisi\u00f3n Talleres": [
    { unit: "Taller Mec\u00e1nica", sponsor: "Fernando Baldiz\u00f3n" },
    { unit: "Taller Enderezado y Pintura", sponsor: "Fernando Baldiz\u00f3n" },
    { unit: "Taller Express", sponsor: "Fernando Baldiz\u00f3n" },
  ],
  FIDEM: [
    { unit: "Financiamiento Motos", sponsor: "Marco Castro" },
  ],
  Finanzas: [
    { unit: "Contabilidad Y Finanzas", sponsor: "Emilia Navarro" },
    { unit: "Legal Y Cumplimiento", sponsor: "Emilia Navarro" },
  ],
  "Inform\u00e1tica": [
    { unit: "Inform\u00e1tica", sponsor: "Antonio \u00c1lvarez" },
  ],
  Maquinaria: [
    { unit: "Taller Maquinaria Liviana", sponsor: "Lenner Castillo" },
    { unit: "Taller Maquinaria Pesada", sponsor: "Lenner Castillo" },
    { unit: "Maquinaria Nueva", sponsor: "Lenner Castillo" },
    { unit: "Maquinaria Usada", sponsor: "Lenner Castillo" },
    { unit: "Renta Maquinaria", sponsor: "Lenner Castillo" },
  ],
  Otros: [
    { unit: "Servicios Administrativos", sponsor: "" },
    { unit: "Valores Agregados", sponsor: "" },
    { unit: "Nave Industrial", sponsor: "" },
    { unit: "Edificios Y M\u00f3dulos De Alquile", sponsor: "" },
    { unit: "Administraci\u00f3n Sucursal", sponsor: "" },
  ],
  "Proyectos De Construcci\u00f3n": [
    { unit: "Proyectos De Construcci\u00f3n", sponsor: "Alfredo Bland\u00f3n" },
  ],
  "Rent A Car": [
    { unit: "Rent A Car", sponsor: "Alejandro Vega" },
    { unit: "Arrendamiento Automotriz", sponsor: "Alejandro Vega" },
  ],
  RSC: [
    { unit: "RSC", sponsor: "Desiree Solorzano Pellas" },
  ],
};

const legacyBusinessAreaMap = {
  Repuestos: { division: "Divisi\u00f3n Repuestos", unit: "Repuestos Genuinos" },
  "Cpd Repuestos": { division: "Divisi\u00f3n Repuestos", unit: "CPD Almacen" },
  "Autos Nuevos Toyota": { division: "Divisi\u00f3n Autos", unit: "Toyota" },
  "Autos Nuevos Suzuki": { division: "Divisi\u00f3n Autos", unit: "Suzuki" },
  "Autos Nuevos Kia": { division: "Divisi\u00f3n Autos", unit: "Kia" },
  "Autos Nuevos Geely": { division: "Divisi\u00f3n Autos", unit: "Geely" },
  "Autos Usados": { division: "Divisi\u00f3n Autos", unit: "Auto Lote" },
  "Camiones Hino": { division: "Divisi\u00f3n Autos", unit: "Hino" },
  "Camiones Faw": { division: "Divisi\u00f3n Autos", unit: "Camiones Faw" },
  "Motos - Genesis": { division: "Divisi\u00f3n Motos", unit: "Motos Genesis" },
  "Motos - Yamaha": { division: "Divisi\u00f3n Motos", unit: "Motos Yamaha" },
  "Motos - Hero": { division: "Divisi\u00f3n Motos", unit: "Motos Hero" },
  "Motos - Yadea": { division: "Divisi\u00f3n Motos", unit: "Motos Yadea" },
  "Talleres - Autos": { division: "Divisi\u00f3n Talleres", unit: "Taller Mec\u00e1nica" },
  "Talleres - Hino": { division: "Divisi\u00f3n Talleres", unit: "Taller Mec\u00e1nica" },
  Talleres: { division: "Divisi\u00f3n Talleres", unit: "Taller Mec\u00e1nica" },
  "Talleres - Motos": { division: "Divisi\u00f3n Motos", unit: "Taller Motos" },
  Informatica: { division: "Inform\u00e1tica", unit: "Inform\u00e1tica" },
  Fidem: { division: "FIDEM", unit: "Financiamiento Motos" },
  "Call Center": { division: "Contact Center", unit: "Contact Center" },
  "Equipos Industriales": { division: "Maquinaria", unit: "Maquinaria Nueva" },
  Mercadeo: { division: "Divisi\u00f3n Autos", unit: "Mercadeo" },
};

const categoryFocusMap = {
  Ventas: "Ventas",
  Ahorro: "Ahorro",
  "No genera impacto economico": "Cumplimiento / continuidad",
};

const elements = Object.fromEntries(fieldIds.map((id) => [id, document.getElementById(id)]));
const evaluateButton = document.getElementById("evaluateProject");
const newCapexButton = document.getElementById("newCapex");
const sendSharePointButton = document.getElementById("sendSharePoint");
const downloadPdfButton = document.getElementById("downloadPdf");
const downloadExcelButton = document.getElementById("downloadExcel");
const downloadAnnualTemplateButton = document.getElementById("downloadAnnualTemplate");
const uploadAnnualTemplateInput = document.getElementById("uploadAnnualTemplate");
const annualTemplateStatus = document.getElementById("annualTemplateStatus");
const impactCategoryOptions = document.getElementById("impactCategoryOptions");
const strategyOptions = document.getElementById("strategyOptions");
const dashboard = document.querySelector(".dashboard");
const wizardSteps = Array.from(document.querySelectorAll(".wizard-step"));
const wizardStepsNav = document.querySelector(".wizard-steps");
const wizardSections = Array.from(document.querySelectorAll("[data-step-section]"));
const prevStepButton = document.getElementById("prevStep");
const nextStepButton = document.getElementById("nextStep");
const validationPanel = document.getElementById("validationPanel");
const actionsPanel = document.querySelector(".actions");
const statusNode = document.getElementById("evaluationStatus");
const decisionBadge = document.getElementById("decisionBadge");
const recommendationTag = document.getElementById("recommendationTag");
const formFlowTitle = document.querySelector(".form-flow-title");
let latestInput = null;
let latestEvaluation = null;
let currentWizardStep = 0;
let annualTemplateState = null;
const LAST_CAPEX_STORAGE_KEY = "capex:lastRegistered";
const PROJECT_CODE_SEQUENCE_KEY = "capex:projectCodeSequence";
const PROJECT_CODE_MAX_SERIAL = 999;
const ANNUAL_TEMPLATE_MAX_YEARS = 10;
const ANNUAL_TEMPLATE_MIN_YEARS = 3;
const POWER_AUTOMATE_FLOW_URL = "https://defaultc663fba5d30a453ab2819f692716d5.16.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/78854a17efc646e792183394406d43b4/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YgyruCEaCF92XG2XGYzBAOgZnuvYghTaFQ2LloiGnFg";
const POWER_AUTOMATE_FLOW_URL_STORAGE_KEY = "capex:powerAutomateFlowUrl";

function getInputValue(id) {
  const element = elements[id];
  if (!element) return "";
  if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT") {
    return element.value;
  }
  return "";
}

function normalizeStrategicObjectiveValue(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }
  if (!value) {
    return [];
  }
  return String(value)
    .split(strategicObjectiveSeparator)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getStrategicObjectiveValues() {
  return normalizeStrategicObjectiveValue(elements.strategicObjectives?.value || "");
}

function formatStrategicObjectives(value) {
  const values = normalizeStrategicObjectiveValue(value);
  return values.length ? values.join(", ") : "Sin seleccion";
}

function formatMaltaProject(input) {
  const project = stripMaltaProjectNumber(input?.maltaProject || input || "");
  if (project !== "Otros") return project || "Sin seleccion";
  const detail = String(input?.otherMaltaJustification || "").trim();
  return detail ? `Otros: ${detail}` : "Otros";
}

function formatDivisionUnit(input) {
  const division = input?.businessArea || "Sin area";
  const unit = input?.businessUnit || "";
  return unit ? `${division} / ${unit}` : division;
}

function getMaltaProjectsForObjectives(value = getStrategicObjectiveValues()) {
  const selectedObjectives = normalizeStrategicObjectiveValue(value);
  const projects = [];
  const seen = new Set();

  selectedObjectives.forEach((objective) => {
    (maltaProjectsByStrategicObjective[objective] || []).forEach((project) => {
      if (seen.has(project)) return;
      seen.add(project);
      projects.push(project);
    });
  });

  return projects;
}

function stripMaltaProjectNumber(value) {
  return String(value || "").replace(/^\s*\d+\.\s*/, "");
}

function normalizeLookupText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\u2b50/g, "")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getMaltaProjectWeight(projectValue = getInputValue("maltaProject")) {
  const project = stripMaltaProjectNumber(projectValue);
  if (!project || project === "Otros") return 1;

  const normalizedProject = normalizeLookupText(project);
  const match = Object.entries(maltaProjectWeights).find(([name]) => normalizeLookupText(name) === normalizedProject);
  return match ? match[1] : 1;
}

function isProjectInsideSelectedFocus(focusValue = getInputValue("strategicObjectives"), projectValue = getInputValue("maltaProject")) {
  const project = stripMaltaProjectNumber(projectValue);
  if (!project || project === "Otros") return false;

  const selectedObjectives = normalizeStrategicObjectiveValue(focusValue);
  const normalizedProject = normalizeLookupText(project);
  return selectedObjectives.some((objective) =>
    (maltaProjectsByStrategicObjective[objective] || []).some((item) => normalizeLookupText(item) === normalizedProject)
  );
}

function syncQualitativeScores() {
  const strategicElement = elements.strategicAlignment;
  const urgencyElement = elements.operationalUrgency;
  const project = stripMaltaProjectNumber(elements.maltaProject?.value || "");
  const hasAssignedFocusProject = isProjectInsideSelectedFocus();
  const isOther = project === "Otros";

  if (strategicElement) {
    strategicElement.value = hasAssignedFocusProject ? 5 : 1;
    strategicElement.readOnly = true;
    strategicElement.dataset.autoScore = "true";
    strategicElement.setAttribute("aria-readonly", "true");
  }

  if (urgencyElement) {
    urgencyElement.value = isOther ? 1 : getMaltaProjectWeight(project);
    urgencyElement.readOnly = true;
    urgencyElement.dataset.autoScore = "true";
    urgencyElement.setAttribute("aria-readonly", "true");
  }
}

function syncMaltaProjectOptions(preferredValue = "") {
  const select = elements.maltaProject;
  if (!select) return;

  const projects = getMaltaProjectsForObjectives();
  const cleanPreferredValue = stripMaltaProjectNumber(preferredValue);
  select.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = projects.length ? "Seleccione una opcion" : "Seleccione un enfoque primero";
  select.appendChild(placeholder);

  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project;
    option.textContent = project;
    select.appendChild(option);
  });
  if (!projects.includes("Otros")) {
    const option = document.createElement("option");
    option.value = "Otros";
    option.textContent = "Otros";
    select.appendChild(option);
  }

  select.value = [...projects, "Otros"].includes(cleanPreferredValue) ? cleanPreferredValue : "";
  syncOtherMaltaJustification();
  syncQualitativeScores();
}

function syncOtherMaltaJustification() {
  const field = document.getElementById("otherMaltaJustificationField");
  if (!field) return;

  const isOther = elements.maltaProject?.value === "Otros";
  field.hidden = !isOther;
  field.setAttribute("aria-hidden", String(!isOther));

  if (!elements.otherMaltaJustification) return;
  elements.otherMaltaJustification.required = isOther;
  if (!isOther) {
    elements.otherMaltaJustification.value = "";
  }
}

function getInputs() {
  applyCorporateAssumptions();
  syncRequiredInvestmentTotal();
  syncQualitativeScores();
  const strategicAlignmentValue = Number(getInputValue("strategicAlignment"));
  const operationalUrgencyValue = Number(getInputValue("operationalUrgency"));
  const input = {
    projectCode: getInputValue("projectCode"),
    projectName: getInputValue("projectName"),
    businessArea: getInputValue("businessArea"),
    businessUnit: getInputValue("businessUnit"),
    sponsor: getInputValue("sponsor"),
    impactCategory: getInputValue("impactCategory"),
    projectType: getInputValue("projectType"),
    strategicFocus: getInputValue("strategicFocus"),
    maltaProject: getInputValue("maltaProject"),
    otherMaltaJustification: getInputValue("otherMaltaJustification"),
    groupKpi: getInputValue("groupKpi"),
    strategicObjectives: getInputValue("strategicObjectives"),
    strategyAlignmentText: getInputValue("strategyAlignmentText"),
    problemSolvedText: getInputValue("problemSolvedText"),
    expectedImpactText: getInputValue("expectedImpactText"),
    projectGoal: getInputValue("projectGoal"),
    projectLife: Number(getInputValue("projectLife")),
    equipmentCost: Number(getInputValue("equipmentCost")),
    installationCost: Number(getInputValue("installationCost")),
    propertyInfrastructureCost: Number(getInputValue("propertyInfrastructureCost")),
    trainingCost: Number(getInputValue("trainingCost")),
    otherCosts: Number(getInputValue("otherCosts")),
    requiredInvestmentTotal: Number(getInputValue("requiredInvestmentTotal")),
    workingCapital: Number(getInputValue("workingCapital")),
    salvageValue: Number(getInputValue("salvageValue")),
    residualPct: Number(getInputValue("residualPct")),
    implementationMonths: Number(getInputValue("implementationMonths")),
    annualRevenueIncrease: Number(getInputValue("annualRevenueIncrease")),
    annualCostSavings: Number(getInputValue("annualCostSavings")),
    annualOpexIncrease: Number(getInputValue("annualOpexIncrease")),
    riskAvoidanceBenefit: Number(getInputValue("riskAvoidanceBenefit")),
    annualGrowthRate: Number(getInputValue("annualGrowthRate")),
    salesUnitsYear1: Number(getInputValue("salesUnitsYear1")),
    ticketPrice: Number(getInputValue("ticketPrice")),
    unitGrowthRate: Number(getInputValue("unitGrowthRate")),
    variableCostPct: Number(getInputValue("variableCostPct")),
    salesExpensePct: Number(getInputValue("salesExpensePct")),
    fixedCommercialCost: Number(getInputValue("fixedCommercialCost")),
    fixedCommercialCostGrowthPct: Number(getInputValue("fixedCommercialCostGrowthPct")),
    annualDepreciation: Number(getInputValue("annualDepreciation")),
    discountRate: Number(getInputValue("discountRate")),
    taxRate: Number(getInputValue("taxRate")),
    requiredIrr: Number(getInputValue("requiredIrr")),
    maxPayback: Number(getInputValue("maxPayback")),
    targetRoi: Number(getInputValue("targetRoi")),
    targetScore: Number(getInputValue("targetScore")),
    strategicAlignment: strategicAlignmentValue,
    operationalUrgency: operationalUrgencyValue,
    riskReduction: operationalUrgencyValue,
    executionReadiness: strategicAlignmentValue,
  };
  applyAnnualTemplateToInput(input);

  if (input.impactCategory === "Ahorro" && !input.annualTemplate) {
    input.annualOpexIncrease = 0;
    input.riskAvoidanceBenefit = 0;
  }

  return input;
}

function saveLastCapex(input, evaluation) {
  try {
    const formState = Object.fromEntries(fieldIds.map((id) => [id, getInputValue(id)]));
    localStorage.setItem(
      LAST_CAPEX_STORAGE_KEY,
      JSON.stringify({
        input: formState,
        savedAt: new Date().toISOString(),
        recommendation: evaluation?.recommendation?.label || "",
        score: evaluation?.score ?? null,
      })
    );
  } catch (error) {
    console.warn("No se pudo guardar el ultimo CAPEX.", error);
  }
}

function restoreLastCapex() {
  try {
    const stored = localStorage.getItem(LAST_CAPEX_STORAGE_KEY);
    if (!stored) return false;
    const parsed = JSON.parse(stored);
    if (!parsed?.input) return false;
    const restoredType = normalizeCapexType(parsed.input.projectType);

    Object.entries(parsed.input).forEach(([id, value]) => {
      setFieldValue(id, value);
    });
    let restoredAnnualTemplate = null;
    if (parsed.input.annualTemplatePayload) {
      try {
        restoredAnnualTemplate = JSON.parse(parsed.input.annualTemplatePayload);
      } catch (error) {
        restoredAnnualTemplate = null;
      }
    }
    setAnnualTemplateState(restoredAnnualTemplate);
    rememberProjectCodeSerial(parsed.input.projectCode);
    if (!getProjectCodeSerial(elements.projectCode?.value)) {
      elements.projectCode.value = generateProjectCode();
    }
    setFieldValue("projectType", restoredType);
    if (!parsed.input.strategicObjectives) {
      setFieldValue("strategicObjectives", capexTemplates[restoredType]?.strategicObjectives || []);
    }
    if (parsed.input.residualPct === undefined || parsed.input.residualPct === "") {
      setFieldValue("residualPct", capexTemplates[restoredType]?.residualPct ?? 0);
    }
    syncMaltaProjectOptions(parsed.input.maltaProject || capexTemplates[restoredType]?.maltaProject || "");
    if (!elements.maltaProject.value && capexTemplates[restoredType]?.maltaProject) {
      setFieldValue("maltaProject", capexTemplates[restoredType].maltaProject);
    }
    applyCorporateAssumptions();
    syncRequiredInvestmentTotal();
    syncImpactCategory(parsed.input.impactCategory || "Ventas");
    syncStrategicFocus(parsed.input.strategicFocus || "Ventas");
    syncOtherMaltaJustification();
    if (restoredAnnualTemplate) {
      applyAnnualTemplateToForm(restoredAnnualTemplate);
    }
    return true;
  } catch (error) {
    console.warn("No se pudo recuperar el ultimo CAPEX.", error);
    return false;
  }
}

function getAreaCode(area) {
  return String(area || "CAPEX")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part) => part.slice(0, 3).toUpperCase())
    .slice(0, 3)
    .join("");
}

function generateProjectCode() {
  const areaCode = getAreaCode(elements.businessArea.value);
  const year = new Date().getFullYear();
  const currentSerial = getProjectCodeSerial(elements.projectCode?.value);
  const serial = currentSerial || getNextProjectCodeSerial();
  return `CAPEX - ${areaCode} - ${year} - ${formatProjectCodeSerial(serial)}`;
}

function getProjectCodeSerial(code) {
  const match = String(code || "").match(/-\s*(\d+)\s*$/);
  const serial = match ? Number(match[1]) : 0;
  return serial > 0 && serial <= PROJECT_CODE_MAX_SERIAL ? serial : 0;
}

function formatProjectCodeSerial(serial) {
  return String(Math.max(1, Number(serial) || 1)).padStart(2, "0");
}

function getNextProjectCodeSerial() {
  const stored = Number(localStorage.getItem(PROJECT_CODE_SEQUENCE_KEY) || 0);
  const current = stored > 0 && stored <= PROJECT_CODE_MAX_SERIAL ? stored : 0;
  const next = current + 1;
  localStorage.setItem(PROJECT_CODE_SEQUENCE_KEY, String(next));
  return next;
}

function rememberProjectCodeSerial(code) {
  const serial = getProjectCodeSerial(code);
  if (!serial) return;

  const stored = Number(localStorage.getItem(PROJECT_CODE_SEQUENCE_KEY) || 0);
  const current = stored > 0 && stored <= PROJECT_CODE_MAX_SERIAL ? stored : 0;
  if (serial > current) {
    localStorage.setItem(PROJECT_CODE_SEQUENCE_KEY, String(serial));
  }
}

function getCanonicalDivision(value) {
  const normalizedValue = normalizeLookupText(value);
  return Object.keys(divisionUnitSponsorMap).find((division) => normalizeLookupText(division) === normalizedValue) || "Divisi\u00f3n Repuestos";
}

function getBusinessUnitRecords(division) {
  const canonicalDivision = getCanonicalDivision(division);
  const seen = new Set();
  return (divisionUnitSponsorMap[canonicalDivision] || []).filter((record) => {
    const key = normalizeLookupText(record.unit);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeSponsorValue(value) {
  const sponsor = String(value || "").trim();
  return /^dejar espacio en blanco$/i.test(sponsor) ? "" : sponsor;
}

function populateBusinessAreaOptions(preferredValue = "") {
  const select = elements.businessArea;
  if (!select) return;

  const currentValue = getCanonicalDivision(preferredValue || select.value || "Divisi\u00f3n Repuestos");
  const seen = new Set();
  select.innerHTML = "";
  Object.keys(divisionUnitSponsorMap).forEach((division) => {
    const key = normalizeLookupText(division);
    if (seen.has(key)) return;
    seen.add(key);
    const option = document.createElement("option");
    option.value = division;
    option.textContent = division;
    select.appendChild(option);
  });
  select.value = currentValue;
}

function syncSponsorByArea(preferredUnit = "") {
  const selectedArea = getCanonicalDivision(elements.businessArea.value);
  elements.businessArea.value = selectedArea;
  const records = getBusinessUnitRecords(selectedArea);
  const selectedUnit = preferredUnit || elements.businessUnit?.value || "";

  if (elements.businessUnit) {
    elements.businessUnit.innerHTML = "";
    records.forEach((record) => {
      const option = document.createElement("option");
      option.value = record.unit;
      option.textContent = record.unit;
      elements.businessUnit.appendChild(option);
    });
    const hasPreferredUnit = records.some((record) => record.unit === selectedUnit);
    elements.businessUnit.value = hasPreferredUnit ? selectedUnit : (records[0]?.unit || "");
  }

  const activeUnit = elements.businessUnit?.value || "";
  const selectedRecord = records.find((record) => record.unit === activeUnit);
  elements.sponsor.value = normalizeSponsorValue(selectedRecord?.sponsor || "");
  elements.projectCode.value = generateProjectCode();
}

function syncRequiredInvestmentTotal() {
  const total =
    Number(elements.equipmentCost.value || 0) +
    Number(elements.installationCost.value || 0) +
    Number(elements.propertyInfrastructureCost.value || 0) +
    Number(elements.trainingCost.value || 0) +
    Number(elements.otherCosts.value || 0);
  elements.requiredInvestmentTotal.value = total;
  const residualPct = clamp(Number(elements.residualPct?.value || 0), 0, 100);
  const projectLife = Math.max(1, Number(elements.projectLife?.value || 5));
  const salvageValue = total * (residualPct / 100);
  const annualDepreciation = Math.max(total - salvageValue, 0) / projectLife;

  if (elements.salvageValue) {
    elements.salvageValue.value = Math.round(salvageValue);
  }
  if (elements.annualDepreciation) {
    elements.annualDepreciation.value = Math.round(annualDepreciation);
  }
}

function syncStrategicFocus(value) {
  elements.strategicFocus.value = value;
  document.querySelectorAll("#strategyOptions .strategy-pill").forEach((button) => {
    button.classList.toggle("active", button.dataset.value === value);
  });
}

function syncImpactCategory(value) {
  const selectedValue = value || "Ventas";
  elements.impactCategory.value = selectedValue;
  document.querySelectorAll("#impactCategoryOptions button").forEach((button) => {
    button.classList.toggle("active", button.dataset.value === selectedValue);
  });
  applyImpactMode(selectedValue);
  if (selectedValue === "Ahorro") {
    elements.annualOpexIncrease.value = 0;
    elements.riskAvoidanceBenefit.value = 0;
  }

  if (categoryFocusMap[selectedValue]) {
    syncStrategicFocus(categoryFocusMap[selectedValue]);
  }
}

function applyImpactMode(value) {
  document.querySelectorAll("[data-impact]").forEach((element) => {
    if (element.dataset.templateOnly === "true") {
      element.hidden = true;
      return;
    }
    const modes = String(element.dataset.impact || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    element.hidden = !modes.includes(value);
  });
}

function setFieldValue(id, value) {
  if (id === "strategicObjectives") {
    const selectedValues = normalizeStrategicObjectiveValue(value);
    if (elements.strategicObjectives) {
      elements.strategicObjectives.value = selectedValues[0] || "";
    }
    syncMaltaProjectOptions(elements.maltaProject?.value || "");
    return;
  }
  if (id === "businessArea" && elements.businessArea) {
    const legacySelection = legacyBusinessAreaMap[value];
    const division = getCanonicalDivision(legacySelection?.division || value || "Divisi\u00f3n Repuestos");
    elements.businessArea.value = division;
    syncSponsorByArea(legacySelection?.unit || elements.businessUnit?.value || "");
    return;
  }
  if (id === "businessUnit" && elements.businessUnit) {
    syncSponsorByArea(value);
    return;
  }
  if (elements[id]) {
    const normalizedValue = id === "maltaProject"
      ? stripMaltaProjectNumber(value)
      : id === "groupKpi"
        ? legacyKpiMap[value] || value
        : value;
    elements[id].value = normalizedValue;
    if (id === "maltaProject") {
      syncOtherMaltaJustification();
      syncQualitativeScores();
    }
  }
}

function normalizeCapexType(value) {
  return capexTemplates[value] ? value : (legacyProjectTypeMap[value] || "Crecimiento");
}

function applyCorporateAssumptions() {
  Object.entries(corporateAssumptions).forEach(([id, value]) => {
    const element = elements[id];
    if (!element) return;
    element.value = value;
    element.readOnly = true;
    element.dataset.corporate = "true";
    element.setAttribute("aria-readonly", "true");
  });
}

function applyCapexTemplate(type, options = {}) {
  const selectedType = normalizeCapexType(type);
  const template = capexTemplates[selectedType] || capexTemplates.Crecimiento;

  setFieldValue("projectType", selectedType);
  Object.entries(template).forEach(([id, value]) => {
    setFieldValue(id, value);
  });
  syncMaltaProjectOptions(template.maltaProject);
  setFieldValue("maltaProject", template.maltaProject);

  applyCorporateAssumptions();
  syncRequiredInvestmentTotal();
  syncImpactCategory(template.impactCategory);

  if (options.updateStatus !== false && statusNode) {
    statusNode.textContent = `Plantilla "${projectTypeLabels[selectedType]}" aplicada.`;
  }
}

function attachHelpDots() {
  Object.entries(helpMessages).forEach(([id, message]) => {
    if (elements[id]) {
      elements[id].title = message;
    }
  });

  document.querySelectorAll("label").forEach((label) => {
    const control = label.querySelector("input[id], select[id], textarea[id]");
    const textNode = label.querySelector("span");
    if (
      !control ||
      control.dataset.corporate === "true" ||
      !textNode ||
      !helpMessages[control.id] ||
      textNode.querySelector(".help-dot")
    ) {
      return;
    }

    const help = document.createElement("span");
    help.className = "help-dot";
    help.tabIndex = 0;
    help.textContent = "?";
    help.title = helpMessages[control.id];
    textNode.appendChild(help);
  });
}

function hideTemplateOnlyGovernanceRows() {
  ["strategyAlignmentText", "problemSolvedText", "expectedImpactText"].forEach((id) => {
    const row = elements[id]?.closest("tr");
    if (row) row.hidden = true;
  });
}

function setWizardStep(index) {
  const safeIndex = clamp(index, 0, Math.max(wizardSteps.length - 1, 0));
  const selectedStep = wizardSteps[safeIndex]?.dataset.step || "type";
  const isResultStep = selectedStep === "result";
  currentWizardStep = safeIndex;

  wizardSteps.forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === safeIndex);
    button.classList.toggle("done", buttonIndex < safeIndex);
    button.setAttribute("aria-current", buttonIndex === safeIndex ? "step" : "false");
  });

  wizardSections.forEach((section) => {
    section.hidden = section.dataset.stepSection !== selectedStep;
  });

  if (wizardStepsNav) {
    wizardStepsNav.hidden = isResultStep;
  }
  if (formFlowTitle) {
    formFlowTitle.textContent = isResultStep
      ? "Alertas y Cumplimiento del Proyecto"
      : "Completa el Formulario por Etapas";
  }
  if (prevStepButton) {
    prevStepButton.disabled = safeIndex === 0;
  }
  if (nextStepButton) {
    if (safeIndex === wizardSteps.length - 2) {
      nextStepButton.textContent = "Evaluar";
    } else if (safeIndex === wizardSteps.length - 1) {
      nextStepButton.textContent = "Actualizar evaluacion";
    } else {
      nextStepButton.textContent = "Siguiente";
    }
  }
  if (dashboard) {
    dashboard.classList.toggle("show-results", isResultStep);
  }
  if (actionsPanel) {
    actionsPanel.hidden = !isResultStep;
  }
  if (isResultStep) {
    evaluateProject({ persist: false });
  }
}

function getValidationMessages(input, evaluation) {
  const messages = [];
  const add = (tone, title, detail) => messages.push({ tone, title, detail });
  const totalSalesCostPct = input.variableCostPct + input.salesExpensePct;
  const selectedStep = wizardSteps[currentWizardStep]?.dataset.step || "type";

  if (selectedStep === "type") {
    if (!String(input.projectName || "").trim()) {
      add("warning", "Nombre pendiente", "Agrega un nombre de proyecto para continuar.");
    }
    if (!String(input.sponsor || "").trim()) {
      add("warning", "Sponsor / Driver pendiente", "Indica quien impulsa y responde por el caso.");
    }
    if (!input.businessUnit) {
      add("warning", "Unidad pendiente", "Selecciona la unidad de negocio asociada al area.");
    }
    if (!input.maltaProject) {
      add("warning", "Proyecto Malta pendiente", "Selecciona el Proyecto Malta Asociado.");
    }
    if (input.maltaProject === "Otros" && !String(input.otherMaltaJustification || "").trim()) {
      add("warning", "Justificacion pendiente", "Especifica por que la inversion se registra como Otros.");
    }
    if (!input.groupKpi) {
      add("warning", "KPI Grupo pendiente", "Selecciona el KPI Grupo que Impacta.");
    }
    if (!input.strategicObjectives.length) {
      add("warning", "Enfoque pendiente", "Selecciona el enfoque del Grupo.");
    }
    if (!String(input.projectGoal || "").trim()) {
      add("warning", "Objetivo pendiente", "Resume el objetivo del proyecto.");
    }
    return messages;
  }

  if (selectedStep === "cost") {
    if (evaluation.totalInvestment <= 0) {
      add("danger", "Inversion sin monto", "El CAPEX debe tener al menos un costo inicial mayor que cero.");
    }
    ["equipmentCost", "installationCost", "propertyInfrastructureCost", "trainingCost", "otherCosts"].forEach((id) => {
      if (Number(getInputValue(id)) < 0) {
        add("danger", "Monto invalido", "Los costos de inversion no pueden ser negativos.");
      }
    });
    return messages.slice(0, 4);
  }

  if (selectedStep === "impact") {
    if (input.impactCategory === "Ventas") {
      if (input.salesUnitsYear1 <= 0 || input.ticketPrice <= 0) {
        add("danger", "Ventas incompletas", "Para ventas, unidades y precio promedio deben ser mayores que cero.");
      }
      if (totalSalesCostPct >= 100) {
        add("danger", "Margen negativo", "La suma de costo variable y % Costo de Venta debe ser menor que 100%.");
      }
      if (evaluation.breakEvenMonthlyUnits && input.salesUnitsYear1 / 12 < evaluation.breakEvenMonthlyUnits) {
        add("warning", "Punto de equilibrio alto", "Las unidades esperadas del ano 1 no cubren el punto de equilibrio mensual.");
      }
    }
    if (input.impactCategory === "Ahorro" && input.annualCostSavings <= 0) {
      add("warning", "Ahorro pendiente", "Indica el ahorro anual en costos esperado.");
    }
    return messages.slice(0, 4);
  }

  if (selectedStep === "assumptions") {
    const residualPct = Number(getInputValue("residualPct"));
    if (residualPct < 0 || residualPct > 100) {
      add("warning", "Residual fuera de rango", "El valor residual debe estar entre 0% y 100%.");
    }
    ["strategicAlignment", "operationalUrgency"].forEach((id) => {
      const value = Number(getInputValue(id));
      if (value < 1 || value > 5) {
        add("warning", "Alineacion fuera de rango", "Usa una escala de 1 a 5 para el peso estrategico Malta.");
      }
    });
    return messages.slice(0, 4);
  }

  if (!String(input.projectName || "").trim()) {
    add("warning", "Nombre pendiente", "Agrega un nombre de proyecto antes de enviarlo a aprobacion.");
  }
  if (!input.maltaProject) {
    add("warning", "Falta vinculo Malta", "Selecciona el proyecto Malta al que contribuye este CAPEX.");
  }
  if (input.maltaProject === "Otros" && !String(input.otherMaltaJustification || "").trim()) {
    add("warning", "Falta justificacion", "Explica por que la inversion se registra como Otros en Proyecto Malta.");
  }
  if (!input.groupKpi) {
    add("warning", "Falta KPI del Grupo", "Selecciona el KPI principal que recibira el impacto del proyecto.");
  }
  if (!input.strategicObjectives.length) {
    add("warning", "Falta enfoque", "Selecciona el enfoque del Grupo.");
  }
  if (evaluation.totalInvestment <= 0) {
    add("danger", "Inversion sin monto", "El CAPEX debe tener al menos un costo inicial mayor que cero.");
  }
  if (input.impactCategory === "Ventas") {
    if (input.salesUnitsYear1 <= 0 || input.ticketPrice <= 0) {
      add("danger", "Ventas incompletas", "Para un CAPEX de crecimiento, unidades y precio promedio deben ser mayores que cero.");
    }
    if (totalSalesCostPct >= 100) {
      add("danger", "Margen negativo", "La suma de costo variable y % Costo de Venta no deberia llegar a 100% de ventas.");
    }
    if (evaluation.breakEvenMonthlyUnits && input.salesUnitsYear1 / 12 < evaluation.breakEvenMonthlyUnits) {
      add("warning", "Punto de equilibrio alto", "Las unidades esperadas del ano 1 no cubren el punto de equilibrio mensual.");
    }
  }
  if (input.impactCategory === "Ahorro" && input.annualCostSavings <= 0) {
    add("warning", "Ahorro pendiente", "Indica el ahorro anual en costos esperado.");
  }
  if (input.impactCategory !== "No genera impacto economico") {
    if (evaluation.npv < 0) {
      add("danger", "VAN negativo", "Con el WACC corporativo, el proyecto destruye valor financiero.");
    } else {
      add("success", "VAN positivo", "El proyecto crea valor financiero despues de descontar los flujos al WACC.");
    }
    if ((evaluation.irrPct || 0) < input.requiredIrr) {
      add("warning", "TIR bajo minimo", "La TIR queda por debajo del umbral fijado por Finanzas.");
    } else {
      add("success", "TIR cumple minimo", "La rentabilidad esperada supera el umbral corporativo de Finanzas.");
    }
    if (evaluation.payback === null || evaluation.payback > input.maxPayback) {
      add("warning", "Payback fuera de politica", "La recuperacion supera el maximo corporativo visible para el solicitante.");
    } else {
      add("success", "Payback dentro de politica", "La inversion se recupera dentro del plazo corporativo esperado.");
    }
  }
  if (evaluation.score >= 60) {
    add("success", "Alineacion Malta suficiente", "El proyecto esta vinculado a una prioridad Malta con peso estrategico relevante.");
  } else {
    add("warning", "Alineacion por reforzar", "Revisa si el Proyecto Malta seleccionado refleja la prioridad real del CAPEX.");
  }

  return messages.slice(0, 5);
}

function renderValidationMessages(input, evaluation) {
  if (!validationPanel) return;

  const messages = getValidationMessages(input, evaluation);
  if (!messages.length) {
    validationPanel.innerHTML = "";
    return;
  }

  validationPanel.innerHTML = messages
    .map(
      (message) => `
        <div class="validation-item ${message.tone}" title="${message.detail}">
          <strong>${message.title}</strong>
          <span>${message.detail}</span>
        </div>
      `
    )
    .join("");
}

function clearFieldErrors() {
  document.querySelectorAll(".field-error").forEach((node) => node.remove());
  document.querySelectorAll(".field-invalid").forEach((node) => node.classList.remove("field-invalid"));
}

function setFieldError(id, message) {
  const element = elements[id] || document.getElementById(id);
  if (!element) return;

  const target = id === "impactCategory"
    ? impactCategoryOptions
    : id === "strategicObjectives"
      ? elements.strategicObjectives
      : element;
  target.classList.add("field-invalid");

  const container = target.closest("label") || target.closest("fieldset") || target.parentElement;
  if (!container || container.querySelector(".field-error")) return;

  const error = document.createElement("span");
  error.className = "field-error";
  error.textContent = message;
  container.appendChild(error);
}

function validateCurrentStep() {
  clearFieldErrors();
  const input = getInputs();
  const messages = [];
  const add = (id, message) => {
    messages.push(message);
    setFieldError(id, message);
  };
  const selectedStep = wizardSteps[currentWizardStep]?.dataset.step || "type";

  if (selectedStep === "type") {
    if (!input.projectType) add("projectType", "Selecciona el tipo de CAPEX.");
    if (!String(input.projectName || "").trim()) add("projectName", "Ingresa el nombre del proyecto.");
    if (!input.businessArea) add("businessArea", "Selecciona el area solicitante.");
    if (!input.businessUnit) add("businessUnit", "Selecciona la unidad de negocio.");
    if (!String(input.sponsor || "").trim()) add("sponsor", "Indica el Sponsor / Driver.");
    if (!input.maltaProject) add("maltaProject", "Selecciona el Proyecto Malta Asociado.");
    if (input.maltaProject === "Otros" && !String(input.otherMaltaJustification || "").trim()) {
      add("otherMaltaJustification", "Especifica la justificacion de la inversion.");
    }
    if (!input.groupKpi) add("groupKpi", "Selecciona el KPI Grupo que Impacta.");
    if (!input.strategicObjectives.length) add("strategicObjectives", "Selecciona el enfoque.");
    if (!String(input.projectGoal || "").trim()) add("projectGoal", "Resume el objetivo del proyecto.");
  }

  if (selectedStep === "cost") {
    if (input.requiredInvestmentTotal <= 0) {
      add("requiredInvestmentTotal", "La inversion total debe ser mayor que cero.");
    }
    ["equipmentCost", "installationCost", "propertyInfrastructureCost", "trainingCost", "otherCosts"].forEach((id) => {
      if (Number(getInputValue(id)) < 0) add(id, "El monto no puede ser negativo.");
    });
  }

  if (selectedStep === "impact") {
    if (!input.impactCategory) add("impactCategory", "Selecciona ventas, ahorro o sin impacto economico.");
    if (input.impactCategory === "Ventas") {
      if (input.salesUnitsYear1 <= 0) add("salesUnitsYear1", "Ingresa unidades estimadas mayores que cero.");
      if (input.ticketPrice <= 0) add("ticketPrice", "Ingresa un precio promedio mayor que cero.");
      if (input.variableCostPct + input.salesExpensePct >= 100) {
        add("salesExpensePct", "La suma de costo variable y % Costo de Venta debe ser menor a 100%.");
      }
      if (input.fixedCommercialCostGrowthPct < -100 || input.fixedCommercialCostGrowthPct > 100) {
        add("fixedCommercialCostGrowthPct", "Usa un porcentaje de gasto fijo entre -100% y 100%.");
      }
    }
    if (input.impactCategory === "Ahorro" && input.annualCostSavings <= 0) {
      add("annualCostSavings", "Indica el ahorro anual en costos.");
    }
  }

  if (selectedStep === "assumptions") {
    const residualPct = Number(getInputValue("residualPct"));
    if (residualPct < 0 || residualPct > 100) add("residualPct", "Usa un residual entre 0% y 100%.");
    ["strategicAlignment", "operationalUrgency"].forEach((id) => {
      const value = Number(getInputValue(id));
      if (value < 1 || value > 5) add(id, "Usa una escala de 1 a 5.");
    });
  }

  if (messages.length) {
    if (validationPanel) {
      validationPanel.innerHTML = messages
        .map(
          (message) => `
            <div class="validation-item warning">
              <strong>Completa esta seccion</strong>
              <span>${message}</span>
            </div>
          `
        )
        .join("");
    }
    statusNode.textContent = messages[0];
    return false;
  }

  if (validationPanel) {
    validationPanel.innerHTML = "";
  }
  statusNode.textContent = "Paso validado.";
  return true;
}

function startNewCapex() {
  const defaults = {
    projectCode: "",
    projectName: "",
    businessArea: "Divisi\u00f3n Repuestos",
    businessUnit: "Repuestos Genuinos",
    impactCategory: "Ventas",
    annualTemplatePayload: "",
    projectType: "Crecimiento",
    projectGoal: "",
    maltaProject: "",
    otherMaltaJustification: "",
    groupKpi: "",
    strategicObjectives: [],
    strategyAlignmentText: "",
    problemSolvedText: "",
    expectedImpactText: "",
    projectLife: 5,
    equipmentCost: 0,
    installationCost: 0,
    propertyInfrastructureCost: 0,
    trainingCost: 0,
    otherCosts: 0,
    workingCapital: 0,
    salvageValue: 0,
    residualPct: 0,
    implementationMonths: 6,
    annualRevenueIncrease: 0,
    annualCostSavings: 0,
    annualOpexIncrease: 0,
    riskAvoidanceBenefit: 0,
    annualGrowthRate: 0,
    salesUnitsYear1: 1000,
    ticketPrice: 220,
    unitGrowthRate: 20,
    variableCostPct: 47,
    salesExpensePct: 20.7,
    fixedCommercialCost: 78000,
    fixedCommercialCostGrowthPct: 0,
    annualDepreciation: 0,
    discountRate: 12,
    taxRate: 32,
    requiredIrr: 15,
    maxPayback: 5,
    targetRoi: 35,
    targetScore: 85,
    strategicAlignment: 3,
    operationalUrgency: 3,
    riskReduction: 3,
    executionReadiness: 3,
  };

  Object.entries(defaults).forEach(([id, value]) => setFieldValue(id, value));
  setAnnualTemplateState(null);
  syncSponsorByArea();
  applyCapexTemplate("Crecimiento", { updateStatus: false });
  setWizardStep(0);
  evaluateProject({ persist: false });
  window.setTimeout(() => {
    statusNode.textContent = "Nuevo CAPEX listo para ingresar.";
  }, 80);
  elements.projectName.focus();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function currency(value) {
  return new Intl.NumberFormat("es-NI", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function number(value, digits = 1) {
  return new Intl.NumberFormat("es-NI", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function percent(value, digits = 1) {
  return `${number(value, digits)}%`;
}

function slugify(value) {
  return String(value || "capex")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sanitizePdfText(value) {
  return String(value)
    .replace(/\u00a0/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\\()]/g, "\\$&");
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function openBlob(blob) {
  const url = URL.createObjectURL(blob);
  const popup = window.open(url, "_blank");
  if (!popup) {
    window.location.href = url;
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 60000);
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function parseTemplateNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const negative = /^\(.*\)$/.test(raw);
  let normalized = raw
    .replace(/\u00a0/g, " ")
    .replace(/USD/gi, "")
    .replace(/C\$/gi, "")
    .replace(/\$/g, "")
    .replace(/%/g, "")
    .replace(/[()]/g, "")
    .trim();

  if (normalized.includes(",") && normalized.includes(".")) {
    normalized = normalized.replace(/,/g, "");
  } else if (normalized.includes(",") && !normalized.includes(".")) {
    normalized = normalized.replace(",", ".");
  }

  const parsed = Number(normalized.replace(/\s+/g, ""));
  if (!Number.isFinite(parsed)) return null;
  return negative ? -parsed : parsed;
}

function normalizeImpactCategoryValue(value) {
  const normalized = normalizeLookupText(value);
  if (normalized.includes("ahorro")) return "Ahorro";
  if (normalized.includes("sin impacto") || normalized.includes("no genera")) return "No genera impacto economico";
  return "Ventas";
}

function getTemplateYears(value = getInputValue("projectLife")) {
  return Math.max(ANNUAL_TEMPLATE_MIN_YEARS, Math.min(ANNUAL_TEMPLATE_MAX_YEARS, Math.round(Number(value) || 5)));
}

function deriveAnnualTemplateRows(input, years = getTemplateYears(input.projectLife)) {
  const rows = [];
  for (let year = 1; year <= years; year += 1) {
    const unitGrowthFactor = (1 + (Number(input.unitGrowthRate) || 0) / 100) ** (year - 1);
    const savingsGrowthFactor = (1 + (Number(input.annualGrowthRate) || 0) / 100) ** (year - 1);
    const fixedGrowthFactor = (1 + (Number(input.fixedCommercialCostGrowthPct) || 0) / 100) ** (year - 1);
    rows.push({
      year,
      units: (Number(input.salesUnitsYear1) || 0) * unitGrowthFactor,
      unitGrowthPct: year === 1 ? 0 : Number(input.unitGrowthRate) || 0,
      ticketPrice: Number(input.ticketPrice) || 0,
      variableCostPct: Number(input.variableCostPct) || 0,
      salesExpensePct: Number(input.salesExpensePct) || 0,
      fixedCost: (Number(input.fixedCommercialCost) || 0) * fixedGrowthFactor,
      fixedCostGrowthPct: year === 1 ? 0 : Number(input.fixedCommercialCostGrowthPct) || 0,
      savings: (Number(input.annualCostSavings) || 0) * savingsGrowthFactor,
      savingsGrowthPct: year === 1 ? 0 : Number(input.annualGrowthRate) || 0,
      riskBenefit: (Number(input.riskAvoidanceBenefit) || 0) * savingsGrowthFactor,
      opex: (Number(input.annualOpexIncrease) || 0) * savingsGrowthFactor,
      depreciation: Number(input.annualDepreciation) || 0,
    });
  }
  return rows;
}

function buildAnnualTemplateWorkbook(input) {
  const years = getTemplateYears(input.projectLife);
  const annualRows = input.annualTemplate?.annual?.length
    ? input.annualTemplate.annual.slice(0, years)
    : deriveAnnualTemplateRows(input, years);
  const yearCells = Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS + 1 }, (_, index) => index);
  const cell = (value, style = "") => {
    const isNumber = typeof value === "number" && Number.isFinite(value);
    const type = isNumber ? "Number" : "String";
    const styleAttr = style ? ` ss:StyleID="${style}"` : "";
    return `<Cell${styleAttr}><Data ss:Type="${type}">${isNumber ? value : escapeXml(value ?? "")}</Data></Cell>`;
  };
  const row = (items, style = "") => `<Row>${items.map((item) => cell(item, style)).join("")}</Row>`;
  const annualValue = (key, year) => annualRows[year - 1]?.[key] ?? "";
  const templateRows = [
    ["impactCategory", "Tipo de impacto", input.impactCategory || "Ventas", ...Array(ANNUAL_TEMPLATE_MAX_YEARS).fill("")],
    ["projectLife", "Horizonte del analisis", years, ...Array(ANNUAL_TEMPLATE_MAX_YEARS).fill("")],
    ["equipmentCost", "Equipos principales", Number(input.equipmentCost) || 0, ...Array(ANNUAL_TEMPLATE_MAX_YEARS).fill("")],
    ["installationCost", "Instalacion y/o implementacion", Number(input.installationCost) || 0, ...Array(ANNUAL_TEMPLATE_MAX_YEARS).fill("")],
    ["propertyInfrastructureCost", "Propiedades e infraestructura", Number(input.propertyInfrastructureCost) || 0, ...Array(ANNUAL_TEMPLATE_MAX_YEARS).fill("")],
    ["trainingCost", "Capacitacion", Number(input.trainingCost) || 0, ...Array(ANNUAL_TEMPLATE_MAX_YEARS).fill("")],
    ["otherCosts", "Otros costos", Number(input.otherCosts) || 0, ...Array(ANNUAL_TEMPLATE_MAX_YEARS).fill("")],
    ["workingCapital", "Capital de trabajo", Number(input.workingCapital) || 0, ...Array(ANNUAL_TEMPLATE_MAX_YEARS).fill("")],
    ["salvageValue", "Valor residual final", Number(input.salvageValue) || 0, ...Array(ANNUAL_TEMPLATE_MAX_YEARS).fill("")],
    ["salesUnits", "Ventas: unidades", "", ...Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS }, (_, index) => annualValue("units", index + 1))],
    ["unitGrowthPct", "Ventas: crecimiento unidades %", "", ...Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS }, (_, index) => annualValue("unitGrowthPct", index + 1))],
    ["ticketPrice", "Ventas: ticket price", "", ...Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS }, (_, index) => annualValue("ticketPrice", index + 1))],
    ["variableCostPct", "Ventas: costo variable %", "", ...Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS }, (_, index) => annualValue("variableCostPct", index + 1))],
    ["salesExpensePct", "Ventas: % Costo de Venta", "", ...Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS }, (_, index) => annualValue("salesExpensePct", index + 1))],
    ["fixedCost", "Ventas: gasto fijo incremental", "", ...Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS }, (_, index) => annualValue("fixedCost", index + 1))],
    ["fixedCostGrowthPct", "Ventas: crecimiento gasto fijo %", "", ...Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS }, (_, index) => annualValue("fixedCostGrowthPct", index + 1))],
    ["savings", "Ahorro: ahorro anual", "", ...Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS }, (_, index) => annualValue("savings", index + 1))],
    ["savingsGrowthPct", "Ahorro: crecimiento ahorro %", "", ...Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS }, (_, index) => annualValue("savingsGrowthPct", index + 1))],
    ["riskBenefit", "Riesgo evitado / beneficio cualitativo", "", ...Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS }, (_, index) => annualValue("riskBenefit", index + 1))],
    ["annualOpexIncrease", "Costos operativos incrementales", "", ...Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS }, (_, index) => annualValue("opex", index + 1))],
    ["annualDepreciation", "Depreciacion anual", "", ...Array.from({ length: ANNUAL_TEMPLATE_MAX_YEARS }, (_, index) => annualValue("depreciation", index + 1))],
  ];
  const worksheetRows = [
    row(["Codigo", "Variable", ...yearCells.map((year) => `Ano ${year}`)], "Header"),
    ...templateRows.map((items) => row(items)),
  ].join("");
  const columns = Array.from({ length: 13 }, (_, index) => `<Column ss:Width="${index < 2 ? 160 : 88}"/>`).join("");
  const workbook = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Styles>
    <Style ss:ID="Default" ss:Name="Normal"><Font ss:FontName="Calibri" ss:Size="10" ss:Color="#15356F"/></Style>
    <Style ss:ID="Header"><Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#33475E" ss:Pattern="Solid"/></Style>
  </Styles>
  <Worksheet ss:Name="Plantilla CAPEX">
    <Table>${columns}${worksheetRows}</Table>
  </Worksheet>
</Workbook>`;
  return new Blob([workbook], { type: "application/vnd.ms-excel" });
}

function getSpreadsheetRowsFromText(text) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "text/xml");
  const hasParserError = xmlDoc.getElementsByTagName("parsererror").length > 0;
  const sourceDoc = hasParserError ? parser.parseFromString(text, "text/html") : xmlDoc;
  const rowNodes = Array.from(sourceDoc.getElementsByTagName("*")).filter((node) => node.localName === "Row" || node.localName === "tr");

  return rowNodes.map((rowNode) => {
    const cells = [];
    let position = 0;
    Array.from(rowNode.children || [])
      .filter((node) => node.localName === "Cell" || node.localName === "td" || node.localName === "th")
      .forEach((cellNode) => {
        const indexAttr = cellNode.getAttribute("ss:Index") || cellNode.getAttribute("Index");
        if (indexAttr) position = Math.max(0, Number(indexAttr) - 1);
        const dataNode = Array.from(cellNode.children || []).find((node) => node.localName === "Data");
        cells[position] = (dataNode || cellNode).textContent.trim();
        position += 1;
      });
    return cells;
  }).filter((rowData) => rowData.some((value) => String(value || "").trim()));
}

function parseAnnualTemplateWorkbook(text, sourceName = "plantilla") {
  const rows = getSpreadsheetRowsFromText(text);
  const rowMap = new Map();
  rows.forEach((rowData) => {
    const key = normalizeLookupText(rowData[0]);
    if (key && key !== "codigo") {
      rowMap.set(key, rowData.slice(2));
    }
  });

  const readText = (key, yearIndex = 0) => rowMap.get(normalizeLookupText(key))?.[yearIndex] || "";
  const readNumber = (key, yearIndex = 0) => parseTemplateNumber(readText(key, yearIndex));
  const impactCategory = normalizeImpactCategoryValue(readText("impactCategory") || getInputValue("impactCategory"));
  const projectLife = readNumber("projectLife") || getInputValue("projectLife");
  const years = getTemplateYears(projectLife);
  const investment = {
    equipmentCost: readNumber("equipmentCost") ?? Number(getInputValue("equipmentCost")) ?? 0,
    installationCost: readNumber("installationCost") ?? Number(getInputValue("installationCost")) ?? 0,
    propertyInfrastructureCost: readNumber("propertyInfrastructureCost") ?? Number(getInputValue("propertyInfrastructureCost")) ?? 0,
    trainingCost: readNumber("trainingCost") ?? Number(getInputValue("trainingCost")) ?? 0,
    otherCosts: readNumber("otherCosts") ?? Number(getInputValue("otherCosts")) ?? 0,
    workingCapital: readNumber("workingCapital") ?? Number(getInputValue("workingCapital")) ?? 0,
    salvageValue: readNumber("salvageValue") ?? Number(getInputValue("salvageValue")) ?? 0,
  };
  const annual = [];
  let previousUnits = readNumber("salesUnits", 1) ?? Number(getInputValue("salesUnitsYear1")) ?? 0;
  let previousFixedCost = readNumber("fixedCost", 1) ?? Number(getInputValue("fixedCommercialCost")) ?? 0;
  let previousSavings = readNumber("savings", 1) ?? Number(getInputValue("annualCostSavings")) ?? 0;

  for (let year = 1; year <= years; year += 1) {
    const growthIndex = year;
    const unitGrowthPct = readNumber("unitGrowthPct", growthIndex) ?? (year === 1 ? 0 : Number(getInputValue("unitGrowthRate")) || 0);
    const fixedGrowthPct = readNumber("fixedCostGrowthPct", growthIndex) ?? (year === 1 ? 0 : Number(getInputValue("fixedCommercialCostGrowthPct")) || 0);
    const savingsGrowthPct = readNumber("savingsGrowthPct", growthIndex) ?? (year === 1 ? 0 : Number(getInputValue("annualGrowthRate")) || 0);
    const units = readNumber("salesUnits", growthIndex) ?? (year === 1 ? previousUnits : previousUnits * (1 + unitGrowthPct / 100));
    const fixedCost = readNumber("fixedCost", growthIndex) ?? (year === 1 ? previousFixedCost : previousFixedCost * (1 + fixedGrowthPct / 100));
    const savings = readNumber("savings", growthIndex) ?? (year === 1 ? previousSavings : previousSavings * (1 + savingsGrowthPct / 100));
    previousUnits = units;
    previousFixedCost = fixedCost;
    previousSavings = savings;
    annual.push({
      year,
      units,
      unitGrowthPct,
      ticketPrice: readNumber("ticketPrice", growthIndex) ?? Number(getInputValue("ticketPrice")) ?? 0,
      variableCostPct: readNumber("variableCostPct", growthIndex) ?? Number(getInputValue("variableCostPct")) ?? 0,
      salesExpensePct: readNumber("salesExpensePct", growthIndex) ?? Number(getInputValue("salesExpensePct")) ?? 0,
      fixedCost,
      fixedCostGrowthPct: fixedGrowthPct,
      savings,
      savingsGrowthPct,
      riskBenefit: readNumber("riskBenefit", growthIndex) ?? Number(getInputValue("riskAvoidanceBenefit")) ?? 0,
      opex: readNumber("annualOpexIncrease", growthIndex) ?? Number(getInputValue("annualOpexIncrease")) ?? 0,
      depreciation: readNumber("annualDepreciation", growthIndex) ?? Number(getInputValue("annualDepreciation")) ?? 0,
    });
  }

  return {
    sourceName,
    loadedAt: new Date().toISOString(),
    impactCategory,
    years,
    investment,
    annual,
  };
}

function getXmlNodesByLocalName(doc, localName) {
  return Array.from(doc.getElementsByTagName("*")).filter((node) => node.localName === localName);
}

function getRelationshipId(node) {
  return node?.getAttribute("r:id")
    || node?.getAttribute("id")
    || node?.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id")
    || "";
}

function resolveWorkbookTarget(target) {
  const cleaned = String(target || "worksheets/sheet1.xml").replace(/^\/+/, "");
  return cleaned.startsWith("xl/") ? cleaned : `xl/${cleaned}`;
}

function getXlsxCellText(cellNode, sharedStrings) {
  const type = cellNode.getAttribute("t");
  if (type === "inlineStr") {
    return getXmlNodesByLocalName(cellNode, "t").map((node) => node.textContent || "").join("");
  }

  const valueNode = getXmlNodesByLocalName(cellNode, "v")[0];
  const value = valueNode?.textContent || "";
  if (type === "s") {
    return sharedStrings[Number(value)] || "";
  }
  if (type === "str") {
    return value || getXmlNodesByLocalName(cellNode, "t").map((node) => node.textContent || "").join("");
  }
  return value;
}

async function readXlsxSharedStrings(zip, parser) {
  const sharedFile = zip.file("xl/sharedStrings.xml");
  if (!sharedFile) return [];
  const xml = await sharedFile.async("string");
  const doc = parser.parseFromString(xml, "text/xml");
  return getXmlNodesByLocalName(doc, "si").map((item) =>
    getXmlNodesByLocalName(item, "t").map((node) => node.textContent || "").join("")
  );
}

function readXlsxCells(sheetDoc, sharedStrings) {
  const cells = {};
  getXmlNodesByLocalName(sheetDoc, "c").forEach((cellNode) => {
    const ref = String(cellNode.getAttribute("r") || "").toUpperCase();
    if (!ref) return;
    cells[ref] = getXlsxCellText(cellNode, sharedStrings);
  });
  return cells;
}

function getCellValue(cells, ref) {
  return cells[String(ref || "").toUpperCase()];
}

function getCellNumber(cells, ref, fallback = 0) {
  const value = parseTemplateNumber(getCellValue(cells, ref));
  return value ?? fallback;
}

function sumCellRange(cells, column, startRow, endRow) {
  let total = 0;
  for (let row = startRow; row <= endRow; row += 1) {
    total += getCellNumber(cells, `${column}${row}`, 0);
  }
  return total;
}

function numberToRatio(value) {
  const amount = Number(value) || 0;
  return Math.abs(amount) > 1 ? amount / 100 : amount;
}

function ratioToPercent(value) {
  const amount = Number(value) || 0;
  return Math.abs(amount) <= 1.5 ? amount * 100 : amount;
}

function buildCapexTemplateStateFromCells(cells, sourceName) {
  const investment = {
    equipmentCost: getCellNumber(cells, "D8", Number(getInputValue("equipmentCost")) || 0),
    propertyInfrastructureCost: getCellNumber(cells, "D9", Number(getInputValue("propertyInfrastructureCost")) || 0),
    installationCost: getCellNumber(cells, "D10", Number(getInputValue("installationCost")) || 0),
    trainingCost: getCellNumber(cells, "D11", Number(getInputValue("trainingCost")) || 0),
    otherCosts: getCellNumber(cells, "D12", Number(getInputValue("otherCosts")) || 0),
    workingCapital: 0,
    salvageValue: getCellNumber(cells, "L34", Number(getInputValue("salvageValue")) || 0),
  };
  const life = getCellNumber(cells, "L33", getInputValue("projectLife") || 5);
  const years = Math.min(5, getTemplateYears(life));
  const depreciableInvestment = getCellNumber(
    cells,
    "L32",
    investment.equipmentCost + investment.installationCost + investment.trainingCost + investment.otherCosts
  );
  const annualDepreciation = getCellNumber(
    cells,
    "L35",
    Math.max(depreciableInvestment - investment.salvageValue, 0) / Math.max(Number(life) || years, 1)
  );
  const growthColumns = ["E", "F", "G", "H", "I"];
  const incrementalCostColumns = ["L", "M", "N", "O", "P"];
  const savingsColumns = ["D", "E", "F", "G", "H"];
  let units = getCellNumber(cells, "D22", Number(getInputValue("salesUnitsYear1")) || 0);
  let ticketPrice = getCellNumber(cells, "D23", Number(getInputValue("ticketPrice")) || 0);
  let revenue = units * ticketPrice;
  let variableCost = numberToRatio(getCellNumber(cells, "D24", Number(getInputValue("variableCostPct")) || 0)) * revenue;
  let salesExpense = numberToRatio(getCellNumber(cells, "D25", Number(getInputValue("salesExpensePct")) || 0)) * revenue;
  let fixedCost = getCellNumber(cells, "D26", Number(getInputValue("fixedCommercialCost")) || 0);
  const baseYear = {
    units,
    ticketPrice,
    revenue,
    variableCost,
    salesExpense,
    fixedCost,
    incrementalCost: 0,
    savings: 0,
    depreciation: 0,
    operatingResult: revenue - variableCost - salesExpense - fixedCost,
  };
  const hasRevenueImpact = baseYear.revenue > 0;
  const totalSavings = savingsColumns.reduce((total, column) => total + getCellNumber(cells, `${column}38`, sumCellRange(cells, column, 32, 37)), 0);
  const impactCategory = hasRevenueImpact
    ? "Ventas"
    : totalSavings > 0
      ? "Ahorro"
      : "No genera impacto economico";
  const annual = [];

  for (let index = 0; index < years; index += 1) {
    const growthColumn = growthColumns[index];
    const incrementalCostColumn = incrementalCostColumns[index];
    const savingsColumn = savingsColumns[index];
    const unitGrowth = numberToRatio(getCellNumber(cells, `${growthColumn}22`, 0));
    const ticketGrowth = numberToRatio(getCellNumber(cells, `${growthColumn}23`, 0));
    const variableCostGrowth = numberToRatio(getCellNumber(cells, `${growthColumn}24`, 0));
    const salesExpenseGrowth = numberToRatio(getCellNumber(cells, `${growthColumn}25`, 0));
    const fixedCostGrowth = numberToRatio(getCellNumber(cells, `${growthColumn}26`, 0));

    units *= 1 + unitGrowth;
    ticketPrice *= 1 + ticketGrowth;
    revenue = units * ticketPrice;
    variableCost *= 1 + variableCostGrowth;
    salesExpense *= 1 + salesExpenseGrowth;
    fixedCost *= 1 + fixedCostGrowth;
    const incrementalCost = getCellNumber(cells, `${incrementalCostColumn}27`, sumCellRange(cells, incrementalCostColumn, 21, 26));
    const savings = getCellNumber(cells, `${savingsColumn}38`, sumCellRange(cells, savingsColumn, 32, 37));
    const operatingResult = revenue - variableCost - salesExpense - fixedCost - annualDepreciation - incrementalCost + savings;

    annual.push({
      year: index + 1,
      units,
      unitGrowthPct: unitGrowth * 100,
      ticketPrice,
      revenue,
      variableCost,
      variableCostPct: revenue ? (variableCost / revenue) * 100 : 0,
      salesExpense,
      salesExpensePct: revenue ? (salesExpense / revenue) * 100 : 0,
      fixedCost,
      fixedCostGrowthPct: fixedCostGrowth * 100,
      savings,
      savingsGrowthPct: 0,
      riskBenefit: 0,
      incrementalCost,
      opex: incrementalCost,
      depreciation: annualDepreciation,
      operatingResult,
    });
  }

  return {
    sourceName,
    loadedAt: new Date().toISOString(),
    model: "Formato Excel Datos Capex",
    cashFlowMode: "operatingCashFlowBeforeTax",
    impactCategory,
    years,
    baseYear,
    investment,
    annual,
  };
}

async function parseCapexXlsxTemplate(arrayBuffer, sourceName = "formato excel") {
  if (!window.JSZip) {
    throw new Error("No esta disponible el lector de archivos XLSX.");
  }
  const zip = await window.JSZip.loadAsync(arrayBuffer);
  const parser = new DOMParser();
  const workbookFile = zip.file("xl/workbook.xml");
  const workbookRelsFile = zip.file("xl/_rels/workbook.xml.rels");
  if (!workbookFile || !workbookRelsFile) {
    throw new Error("El archivo no parece ser un libro XLSX valido.");
  }
  const workbookDoc = parser.parseFromString(await workbookFile.async("string"), "text/xml");
  const relsDoc = parser.parseFromString(await workbookRelsFile.async("string"), "text/xml");
  const sheets = getXmlNodesByLocalName(workbookDoc, "sheet");
  const selectedSheet = sheets.find((sheet) => normalizeLookupText(sheet.getAttribute("name")).includes("plantilla capex")) || sheets[0];
  if (!selectedSheet) {
    throw new Error("No se encontro una hoja de calculo en el archivo.");
  }
  const sheetRelId = getRelationshipId(selectedSheet);
  const relationship = getXmlNodesByLocalName(relsDoc, "Relationship").find((rel) => rel.getAttribute("Id") === sheetRelId);
  const sheetPath = resolveWorkbookTarget(relationship?.getAttribute("Target"));
  const sheetFile = zip.file(sheetPath);
  if (!sheetFile) {
    throw new Error("No se pudo abrir la hoja principal del formato.");
  }
  const sharedStrings = await readXlsxSharedStrings(zip, parser);
  const sheetDoc = parser.parseFromString(await sheetFile.async("string"), "text/xml");
  const cells = readXlsxCells(sheetDoc, sharedStrings);
  return buildCapexTemplateStateFromCells(cells, sourceName);
}

function updateAnnualTemplateStatus() {
  if (!annualTemplateStatus) return;
  if (!annualTemplateState) {
    annualTemplateStatus.textContent = "Sin formato Excel cargado. El calculo usa los supuestos base del formulario.";
    return;
  }
  annualTemplateStatus.textContent = `Formato cargado: ${annualTemplateState.sourceName}. Analisis por ${annualTemplateState.years} anos.`;
}

function setAnnualTemplateState(state) {
  annualTemplateState = state || null;
  if (elements.annualTemplatePayload) {
    elements.annualTemplatePayload.value = state ? JSON.stringify(state) : "";
  }
  updateAnnualTemplateStatus();
}

function getActiveAnnualTemplate() {
  if (annualTemplateState) return annualTemplateState;
  const payload = getInputValue("annualTemplatePayload");
  if (!payload) return null;
  try {
    annualTemplateState = JSON.parse(payload);
    updateAnnualTemplateStatus();
    return annualTemplateState;
  } catch (error) {
    console.warn("No se pudo leer la plantilla anual guardada.", error);
    return null;
  }
}

function applyAnnualTemplateToInput(input) {
  const template = getActiveAnnualTemplate();
  if (!template) return input;
  input.annualTemplate = template;
  input.projectLife = template.years || input.projectLife;
  Object.entries(template.investment || {}).forEach(([key, value]) => {
    if (isFiniteNumber(value)) input[key] = value;
  });
  input.requiredInvestmentTotal =
    (Number(input.equipmentCost) || 0) +
    (Number(input.installationCost) || 0) +
    (Number(input.propertyInfrastructureCost) || 0) +
    (Number(input.trainingCost) || 0) +
    (Number(input.otherCosts) || 0);
  const firstYear = template.annual?.[0] || {};
  input.impactCategory = template.impactCategory || input.impactCategory;
  if (input.impactCategory === "Ventas") {
    if (isFiniteNumber(firstYear.units)) input.salesUnitsYear1 = firstYear.units;
    if (isFiniteNumber(firstYear.ticketPrice)) input.ticketPrice = firstYear.ticketPrice;
    if (isFiniteNumber(firstYear.variableCostPct)) input.variableCostPct = firstYear.variableCostPct;
    if (isFiniteNumber(firstYear.salesExpensePct)) input.salesExpensePct = firstYear.salesExpensePct;
    if (isFiniteNumber(firstYear.fixedCost)) input.fixedCommercialCost = firstYear.fixedCost;
  } else if (input.impactCategory === "Ahorro") {
    if (isFiniteNumber(firstYear.savings)) input.annualCostSavings = firstYear.savings;
    if (isFiniteNumber(firstYear.riskBenefit)) input.riskAvoidanceBenefit = firstYear.riskBenefit;
    if (isFiniteNumber(firstYear.opex)) input.annualOpexIncrease = firstYear.opex;
  } else if (isFiniteNumber(firstYear.opex)) {
    input.annualOpexIncrease = firstYear.opex;
  }
  if (isFiniteNumber(firstYear.depreciation) && firstYear.depreciation > 0) {
    input.annualDepreciation = firstYear.depreciation;
  }
  return input;
}

function applyAnnualTemplateToForm(state) {
  if (!state) return;
  syncImpactCategory(state.impactCategory || "Ventas");
  setFieldValue("projectLife", state.years || getInputValue("projectLife"));
  Object.entries(state.investment || {}).forEach(([id, value]) => {
    if (elements[id] && isFiniteNumber(value)) {
      setFieldValue(id, value);
    }
  });
  syncRequiredInvestmentTotal();
  const firstYear = state.annual?.[0] || {};
  if (state.impactCategory === "Ventas") {
    if (isFiniteNumber(firstYear.units)) setFieldValue("salesUnitsYear1", Math.round(firstYear.units));
    if (isFiniteNumber(firstYear.ticketPrice)) setFieldValue("ticketPrice", firstYear.ticketPrice);
    if (isFiniteNumber(firstYear.variableCostPct)) setFieldValue("variableCostPct", firstYear.variableCostPct);
    if (isFiniteNumber(firstYear.salesExpensePct)) setFieldValue("salesExpensePct", firstYear.salesExpensePct);
    if (isFiniteNumber(firstYear.fixedCost)) setFieldValue("fixedCommercialCost", Math.round(firstYear.fixedCost));
  } else if (state.impactCategory === "Ahorro") {
    if (isFiniteNumber(firstYear.savings)) setFieldValue("annualCostSavings", Math.round(firstYear.savings));
    if (isFiniteNumber(firstYear.riskBenefit)) setFieldValue("riskAvoidanceBenefit", Math.round(firstYear.riskBenefit));
    if (isFiniteNumber(firstYear.opex)) setFieldValue("annualOpexIncrease", Math.round(firstYear.opex));
  } else if (isFiniteNumber(firstYear.opex)) {
    setFieldValue("annualOpexIncrease", Math.round(firstYear.opex));
  }
  if (isFiniteNumber(firstYear.depreciation) && firstYear.depreciation > 0) {
    setFieldValue("annualDepreciation", Math.round(firstYear.depreciation));
  }
}

function exportAnnualTemplate() {
  const input = getInputs();
  const blob = buildAnnualTemplateWorkbook(input);
  downloadBlob(`plantilla-capex-${slugify(input.projectName)}.xls`, blob);
  statusNode.textContent = "Plantilla Excel de inversion e impacto generada.";
}

async function importAnnualTemplateFile(file) {
  if (!file) return;
  try {
    statusNode.textContent = `Leyendo formato "${file.name}"...`;
    const isXlsx = /\.xlsx$/i.test(file.name);
    const state = isXlsx
      ? await parseCapexXlsxTemplate(await file.arrayBuffer(), file.name)
      : parseAnnualTemplateWorkbook(await file.text(), file.name);
    setAnnualTemplateState(state);
    applyAnnualTemplateToForm(state);
    evaluateProject({ persist: false });
    statusNode.textContent = `Formato "${file.name}" cargado y analizado. El reporte usara los supuestos por ano.`;
  } catch (error) {
    console.error(error);
    statusNode.textContent = "No se pudo leer el formato. Usa el Excel descargado desde esta app y conserva la estructura de celdas.";
    setAnnualTemplateState(null);
  }
}

function getEvaluationPackage() {
  const input = getInputs();
  const evaluation = buildEvaluation(input);
  latestInput = input;
  latestEvaluation = evaluation;
  saveLastCapex(input, evaluation);
  return { input, evaluation };
}

function getPowerAutomateFlowUrl() {
  return localStorage.getItem(POWER_AUTOMATE_FLOW_URL_STORAGE_KEY) || POWER_AUTOMATE_FLOW_URL;
}

function buildSharePointPayload(input, evaluation) {
  return {
    submittedAt: new Date().toISOString(),
    source: "Evaluador CAPEX",
    projectCode: input.projectCode,
    projectName: input.projectName,
    businessArea: input.businessArea,
    businessUnit: input.businessUnit,
    sponsorDriver: input.sponsor,
    projectType: projectTypeLabels[normalizeCapexType(input.projectType)] || input.projectType,
    impactCategory: input.impactCategory,
    strategicFocus: input.strategicFocus,
    enfoque: formatStrategicObjectives(input.strategicObjectives),
    maltaProject: formatMaltaProject(input),
    groupKpi: input.groupKpi,
    projectGoal: input.projectGoal,
    annualTemplate: input.annualTemplate
      ? {
        sourceName: input.annualTemplate.sourceName,
        years: input.annualTemplate.years,
        investment: input.annualTemplate.investment,
        annual: input.annualTemplate.annual,
      }
      : null,
    otherMaltaJustification: input.otherMaltaJustification,
    recommendation: evaluation.recommendation.label,
    recommendationTone: evaluation.recommendation.tone,
    recommendationText: [evaluation.recommendation.lead, ...evaluation.recommendation.actions].join(" "),
    totalInvestment: Math.round(evaluation.totalInvestment),
    npv: Math.round(evaluation.npv),
    irrPct: Number((evaluation.irrPct || 0).toFixed(2)),
    payback: evaluation.payback === null ? null : Number(evaluation.payback.toFixed(2)),
    score: Math.round(evaluation.score),
    roiPct: Number((evaluation.roi || 0).toFixed(2)),
    evaAnnual: Math.round(evaluation.eva || 0),
    ebitdaAverage: Math.round(evaluation.ebitdaAverage || 0),
    averageNetFlow: Math.round(evaluation.annualAverageFlow || 0),
    breakEvenMonthlyRevenue: Math.round(evaluation.breakEvenMonthlyRevenue || 0),
    breakEvenMonthlyUnits: Math.round(evaluation.breakEvenMonthlyUnits || 0),
    netMarginPct: Number((evaluation.netMarginPct || 0).toFixed(2)),
    assumptions: {
      projectLife: input.projectLife,
      equipmentCost: input.equipmentCost,
      installationCost: input.installationCost,
      propertyInfrastructureCost: input.propertyInfrastructureCost,
      trainingCost: input.trainingCost,
      otherCosts: input.otherCosts,
      residualPct: input.residualPct,
      annualDepreciation: input.annualDepreciation,
      discountRate: input.discountRate,
      taxRate: input.taxRate,
      requiredIrr: input.requiredIrr,
      maxPayback: input.maxPayback,
      salesUnitsYear1: input.salesUnitsYear1,
      ticketPrice: input.ticketPrice,
      unitGrowthRate: input.unitGrowthRate,
      variableCostPct: input.variableCostPct,
      salesExpensePct: input.salesExpensePct,
      fixedCommercialCost: input.fixedCommercialCost,
      fixedCommercialCostGrowthPct: input.fixedCommercialCostGrowthPct,
      annualCostSavings: input.annualCostSavings,
      annualGrowthRate: input.annualGrowthRate,
    },
    flows: evaluation.flows.map((flow) => ({
      year: flow.year,
      revenue: Math.round(flow.revenue),
      variableCost: Math.round(flow.variableCost),
      salesExpense: Math.round(flow.salesExpense),
      fixedCost: Math.round(flow.fixedCost),
      savings: Math.round(flow.savings),
      opex: Math.round(flow.opex),
      depreciation: Math.round(flow.depreciation),
      ebit: Math.round(flow.ebit),
      taxes: Math.round(flow.taxes),
      netIncome: Math.round(flow.netIncome),
      netFlow: Math.round(flow.netFlow),
      discountedFlow: Math.round(flow.discountedFlow),
      cumulativeFlow: Math.round(flow.cumulativeFlow),
      cumulativeDiscountedFlow: Math.round(flow.cumulativeDiscountedFlow),
    })),
  };
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / (values.length || 1);
}

function calculateNpv(rate, cashFlows) {
  return cashFlows.reduce((sum, flow, index) => sum + flow / (1 + rate) ** index, 0);
}

function calculateIrr(cashFlows) {
  let low = -0.9;
  let high = 2.5;
  let npvLow = calculateNpv(low, cashFlows);
  let npvHigh = calculateNpv(high, cashFlows);

  if (npvLow * npvHigh > 0) {
    return null;
  }

  for (let iteration = 0; iteration < 100; iteration += 1) {
    const mid = (low + high) / 2;
    const npvMid = calculateNpv(mid, cashFlows);

    if (Math.abs(npvMid) < 0.0001) {
      return mid;
    }

    if (npvLow * npvMid <= 0) {
      high = mid;
      npvHigh = npvMid;
    } else {
      low = mid;
      npvLow = npvMid;
    }
  }

  return (low + high) / 2;
}

function calculatePayback(cashFlows) {
  let cumulative = cashFlows[0];

  if (cumulative >= 0) return 0;

  for (let year = 1; year < cashFlows.length; year += 1) {
    const previous = cumulative;
    cumulative += cashFlows[year];

    if (cumulative >= 0) {
      const fraction = Math.abs(previous) / Math.max(cashFlows[year], 1);
      return year - 1 + fraction;
    }
  }

  return null;
}

function calculateScore(input, metrics) {
  const project = stripMaltaProjectNumber(input.maltaProject);
  if (!project) return 0;
  const weight = getMaltaProjectWeight(project);
  return clamp((weight / 5) * 100, 0, 100);
}

function buildCashFlows(input) {
  const totalInvestment =
    input.equipmentCost +
    input.installationCost +
    input.propertyInfrastructureCost +
    input.trainingCost +
    input.otherCosts;

  const years = Math.max(3, Math.min(10, Math.round(input.projectLife)));
  const taxRate = input.taxRate / 100;
  const discountRate = input.discountRate / 100;
  const annualTemplateRows = Array.isArray(input.annualTemplate?.annual) ? input.annualTemplate.annual : [];
  const usePreTaxTemplateCashFlow = input.annualTemplate?.cashFlowMode === "operatingCashFlowBeforeTax";
  const getAnnualTemplateRow = (year) => annualTemplateRows.find((row) => Number(row.year) === year) || annualTemplateRows[year - 1] || {};
  const firstYearTemplate = getAnnualTemplateRow(1);
  const baseTicketPrice = isFiniteNumber(firstYearTemplate.ticketPrice) ? firstYearTemplate.ticketPrice : (input.ticketPrice || 0);
  const baseVariableCostPct = isFiniteNumber(firstYearTemplate.variableCostPct) ? firstYearTemplate.variableCostPct : input.variableCostPct;
  const baseSalesExpensePct = isFiniteNumber(firstYearTemplate.salesExpensePct) ? firstYearTemplate.salesExpensePct : input.salesExpensePct;
  const baseFixedCost = isFiniteNumber(firstYearTemplate.fixedCost) ? firstYearTemplate.fixedCost : input.fixedCommercialCost;
  const contributionMarginPct = clamp(1 - (baseVariableCostPct + baseSalesExpensePct) / 100, 0, 1);
  const contributionPerUnit = (baseTicketPrice || 0) * contributionMarginPct;
  const breakEvenUnits = input.impactCategory === "Ventas" && contributionPerUnit > 0
    ? Math.ceil((baseFixedCost || 0) / contributionPerUnit)
    : null;
  const flows = [];
  const cashFlows = [-totalInvestment];
  let cumulativeFlow = -totalInvestment;
  let cumulativeDiscountedFlow = -totalInvestment;

  for (let year = 1; year <= years; year += 1) {
    let units = 0;
    let revenue = 0;
    let savings = 0;
    let riskBenefit = 0;
    let variableCost = 0;
    let salesExpense = 0;
    let fixedCost = 0;
    let opex = 0;
    let incrementalOpex = 0;

    if (input.impactCategory === "Ventas") {
      const annualTemplate = getAnnualTemplateRow(year);
      const unitGrowthFactor = (1 + input.unitGrowthRate / 100) ** (year - 1);
      const ticketPrice = isFiniteNumber(annualTemplate.ticketPrice) ? annualTemplate.ticketPrice : input.ticketPrice;
      const variableCostPct = isFiniteNumber(annualTemplate.variableCostPct) ? annualTemplate.variableCostPct : input.variableCostPct;
      const salesExpensePct = isFiniteNumber(annualTemplate.salesExpensePct) ? annualTemplate.salesExpensePct : input.salesExpensePct;
      units = isFiniteNumber(annualTemplate.units) ? annualTemplate.units : input.salesUnitsYear1 * unitGrowthFactor;
      revenue = isFiniteNumber(annualTemplate.revenue) ? annualTemplate.revenue : units * ticketPrice;
      savings = isFiniteNumber(annualTemplate.savings) ? annualTemplate.savings : 0;
      riskBenefit = isFiniteNumber(annualTemplate.riskBenefit) ? annualTemplate.riskBenefit : 0;
      variableCost = isFiniteNumber(annualTemplate.variableCost)
        ? annualTemplate.variableCost
        : revenue * (variableCostPct / 100);
      salesExpense = isFiniteNumber(annualTemplate.salesExpense)
        ? annualTemplate.salesExpense
        : revenue * (salesExpensePct / 100);
      fixedCost = isFiniteNumber(annualTemplate.fixedCost)
        ? annualTemplate.fixedCost
        : input.fixedCommercialCost * (1 + (input.fixedCommercialCostGrowthPct || 0) / 100) ** (year - 1);
      incrementalOpex = isFiniteNumber(annualTemplate.incrementalCost)
        ? annualTemplate.incrementalCost
        : isFiniteNumber(annualTemplate.opex)
          ? annualTemplate.opex
          : 0;
      opex = variableCost + salesExpense + fixedCost + incrementalOpex;
    } else if (input.impactCategory === "Ahorro") {
      const annualTemplate = getAnnualTemplateRow(year);
      const growthFactor = (1 + input.annualGrowthRate / 100) ** (year - 1);
      savings = isFiniteNumber(annualTemplate.savings) ? annualTemplate.savings : input.annualCostSavings * growthFactor;
      riskBenefit = isFiniteNumber(annualTemplate.riskBenefit) ? annualTemplate.riskBenefit : input.riskAvoidanceBenefit * growthFactor;
      opex = isFiniteNumber(annualTemplate.opex) ? annualTemplate.opex : input.annualOpexIncrease * growthFactor;
    } else {
      const annualTemplate = getAnnualTemplateRow(year);
      opex = isFiniteNumber(annualTemplate.opex) ? annualTemplate.opex : input.annualOpexIncrease;
      riskBenefit = isFiniteNumber(annualTemplate.riskBenefit) ? annualTemplate.riskBenefit : 0;
      savings = 0;
    }

    const ebitda = revenue + savings + riskBenefit - opex;
    const annualTemplate = getAnnualTemplateRow(year);
    const depreciation = isFiniteNumber(annualTemplate.depreciation) && annualTemplate.depreciation > 0
      ? annualTemplate.depreciation
      : input.annualDepreciation;
    const ebit = ebitda - depreciation;
    const taxes = usePreTaxTemplateCashFlow ? 0 : Math.max(ebit, 0) * taxRate;
    const netIncome = ebit - taxes;
    const annualContributionMarginPct = revenue > 0 ? clamp((revenue - variableCost - salesExpense) / revenue, 0, 1) : contributionMarginPct;
    const annualTicketPrice = units > 0 ? revenue / units : baseTicketPrice;
    const fixedBurden = fixedCost + incrementalOpex + depreciation;
    const breakEvenMonthlyRevenue = input.impactCategory === "Ventas" && annualContributionMarginPct > 0
      ? fixedBurden / annualContributionMarginPct / 12
      : 0;
    const breakEvenMonthlyUnits = input.impactCategory === "Ventas" && annualTicketPrice > 0
      ? breakEvenMonthlyRevenue / annualTicketPrice
      : 0;
    const netMarginPct = revenue > 0 ? (netIncome / revenue) * 100 : 0;
    let netFlow = ebitda - taxes;

    if (year === years) {
      netFlow += input.salvageValue + input.workingCapital;
    }

    const discountedFlow = netFlow / (1 + discountRate) ** year;
    cumulativeFlow += netFlow;
    cumulativeDiscountedFlow += discountedFlow;

    flows.push({
      year,
      units,
      revenue,
      savings: savings + riskBenefit,
      riskBenefit,
      variableCost,
      salesExpense,
      fixedCost,
      opex,
      incrementalOpex,
      depreciation,
      netFlow,
      discountedFlow,
      ebitda,
      ebit,
      taxes,
      netIncome,
      breakEvenMonthlyRevenue,
      breakEvenMonthlyUnits,
      netMarginPct,
      cumulativeFlow,
      cumulativeDiscountedFlow,
    });
    cashFlows.push(netFlow);
  }

  return { flows, cashFlows, totalInvestment, breakEvenUnits, contributionPerUnit };
}

function buildEvaluation(input) {
  const { flows, cashFlows, totalInvestment, breakEvenUnits, contributionPerUnit } = buildCashFlows(input);
  const discountRate = input.discountRate / 100;
  const irr = calculateIrr(cashFlows);
  const npv = calculateNpv(discountRate, cashFlows);
  const payback = calculatePayback(cashFlows);
  const roi = ((flows.reduce((sum, flow) => sum + flow.netFlow, 0) - totalInvestment) / Math.max(totalInvestment, 1)) * 100;
  const annualAverageFlow = average(flows.map((flow) => flow.netFlow));
  const annualAverageRevenue = average(flows.map((flow) => flow.revenue));
  const annualAverageSavings = average(flows.map((flow) => flow.savings));
  const averageNetMarginPct = average(flows.filter((flow) => flow.revenue > 0).map((flow) => flow.netMarginPct));
  const firstYearFlow = flows[0] || {};
  const ebitdaAverage = average(flows.map((flow) => flow.ebitda));
  const ebitAverage = average(flows.map((flow) => flow.ebit));
  const eva = ebitAverage * (1 - input.taxRate / 100) - totalInvestment * discountRate;
  const irrPct = irr === null ? 0 : irr * 100;
  const paybackSafe = payback === null ? 99 : payback;
  const score = calculateScore(input, { npv, roi, irrPct, payback: paybackSafe, totalInvestment });

  let diagnosticRows = [
    {
      label: "Rentabilidad vs inversion",
      value: clamp((npv / Math.max(totalInvestment, 1)) * 100, 0, 100),
      display: `${currency(npv)} de VAN`,
      helper: npv >= 0 ? "El proyecto crea valor economico" : "El proyecto destruye valor a descuento",
    },
    {
      label: "TIR sobre minimo requerido",
      value: clamp((irrPct / Math.max(input.requiredIrr, 1)) * 100, 0, 140),
      display: irr === null ? "No calculable" : percent(irrPct),
      helper: `Minimo ${percent(input.requiredIrr)}`,
    },
    {
      label: "Recuperacion de inversion",
      value: clamp((input.maxPayback / Math.max(paybackSafe, 1)) * 100, 0, 140),
      display: payback === null ? "No recupera" : `${number(payback, 1)} anos`,
      helper: `Maximo ${number(input.maxPayback, 1)} anos`,
    },
    {
      label: "EVA anual estimado",
      value: eva > 0 ? 100 : clamp((eva / Math.max(totalInvestment, 1)) * 100, 0, 100),
      display: currency(eva),
      helper: eva >= 0 ? "Cubre el costo de capital" : "No cubre el costo de capital",
    },
  ];

  if (input.impactCategory === "Ventas") {
    const yearOneUnits = firstYearFlow.units || input.salesUnitsYear1;
    const breakEvenCoverage = breakEvenUnits ? (yearOneUnits / breakEvenUnits) * 100 : 0;
    diagnosticRows.unshift({
      label: "Punto de equilibrio unidades",
      value: clamp(breakEvenCoverage, 0, 140),
      display: breakEvenUnits ? `${number(breakEvenUnits, 0)} unid.` : "No calculable",
      helper: `Ano 1: ${number(yearOneUnits, 0)} unid.`,
    });
  }

  if (input.impactCategory === "No genera impacto economico") {
    diagnosticRows = [
      {
        label: "Costo anual estimado",
        value: 100,
        display: currency(Math.abs(annualAverageFlow)),
        helper: "Se evalua como costo de continuidad, no como retorno directo",
      },
      {
        label: "Alineacion estrategica",
        value: (input.strategicAlignment / 5) * 100,
        display: `${input.strategicAlignment}/5`,
        helper: "Vinculo con prioridades del Grupo",
      },
      {
        label: "Urgencia operativa",
        value: (input.operationalUrgency / 5) * 100,
        display: `${input.operationalUrgency}/5`,
        helper: "Peso del Proyecto Malta asociado",
      },
    ];
  }

  const maltaWeight = getMaltaProjectWeight(input.maltaProject);
  const scoreRows = [
    {
      label: "Alineacion estrategica",
      value: score,
      display: `${number(score, 0)} / 100`,
      helper: input.maltaProject
        ? `Proyecto Malta: peso ${number(maltaWeight, 0)}/5`
        : "Sin Proyecto Malta seleccionado",
    },
  ];

  const valueBridge = [
    {
      label: "Inversion total",
      amount: -totalInvestment,
      note: "Salida inicial de CAPEX y capital de trabajo.",
    },
    {
      label: "Beneficio anual promedio",
      amount: annualAverageFlow,
      note: "Flujo neto promedio despues de impuestos.",
    },
    {
      label: "EBITDA promedio",
      amount: ebitdaAverage,
      note: "Potencial operativo anual de la iniciativa.",
    },
    {
      label: "Valor residual + recuperacion WC",
      amount: input.salvageValue + input.workingCapital,
      note: "Se incorpora en el ultimo ano.",
    },
  ];

  const recommendation = buildRecommendation(input, {
    npv,
    irrPct,
    payback,
    roi,
    score,
    eva,
    totalInvestment,
    breakEvenUnits,
    contributionPerUnit,
    salesUnitsYear1: firstYearFlow.units || input.salesUnitsYear1,
    impactCategory: input.impactCategory,
  });

  return {
    totalInvestment,
    npv,
    irrPct,
    payback,
    roi,
    eva,
    impactCategory: input.impactCategory,
    baseYear: input.annualTemplate?.baseYear || null,
    cashFlowMode: input.annualTemplate?.cashFlowMode || "standardAfterTax",
    breakEvenUnits,
    contributionPerUnit,
    breakEvenMonthlyRevenue: firstYearFlow.breakEvenMonthlyRevenue || 0,
    breakEvenMonthlyUnits: firstYearFlow.breakEvenMonthlyUnits || 0,
    netMarginPct: firstYearFlow.netMarginPct || averageNetMarginPct,
    averageNetMarginPct,
    salesUnitsYear1: firstYearFlow.units || input.salesUnitsYear1,
    annualAverageFlow,
    annualAverageRevenue,
    annualAverageSavings,
    ebitdaAverage,
    score,
    flows,
    diagnosticRows,
    scoreRows,
    valueBridge,
    recommendation,
  };
}

function buildRecommendation(input, metrics) {
  const meetsFinancialThresholds =
    metrics.npv > 0 &&
    metrics.irrPct >= input.requiredIrr &&
    metrics.payback !== null &&
    metrics.payback <= input.maxPayback;
  const alignmentStrong = metrics.score >= 60;
  const lead = [];
  const actions = [];
  const yearOneUnits = metrics.salesUnitsYear1 || input.salesUnitsYear1;
  const hasBreakEvenGap =
    input.impactCategory === "Ventas" &&
    metrics.breakEvenUnits &&
    yearOneUnits < metrics.breakEvenUnits;

  if (input.impactCategory === "No genera impacto economico") {
    if (alignmentStrong) {
      lead.push("El CAPEX no genera retorno economico directo; la lectura se basa en la alineacion con Proyecto Malta y la prioridad estrategica asignada.");
      actions.push("Aprobar con una justificacion ejecutiva enfocada en riesgo, continuidad operacional y obligatoriedad del proyecto.");
      actions.push("Documentar el costo de no ejecutar y los indicadores no financieros que se van a proteger.");
      actions.push("Definir Sponsor / Driver, fecha objetivo y evidencia de cumplimiento para el cierre post-implementacion.");
      return { label: "VIABLE", tone: "success", lead: lead.join(" "), actions };
    }

    lead.push("El CAPEX no genera retorno economico directo y la alineacion estrategica registrada aun es baja para sostener la aprobacion.");
    actions.push("Reformular el caso con evidencia de riesgo, impacto operativo o requerimiento regulatorio.");
    actions.push("Comparar alternativas de menor costo antes de retomar la solicitud.");
    actions.push("Seleccionar el Proyecto Malta correcto o documentar por que debe quedar como Otros.");
    return { label: "NO VIABLE", tone: "warning", lead: lead.join(" "), actions };
  }

  if (meetsFinancialThresholds) {
    lead.push("Con base en la plantilla Excel cargada, el proyecto cumple los criterios financieros definidos: VAN positivo, TIR sobre el minimo requerido y payback dentro del plazo maximo.");
    actions.push("Aprobar el proyecto y pasar a presupuesto detallado, manteniendo los supuestos anuales del Excel como linea base de seguimiento.");
    actions.push("Monitorear los beneficios, ventas, ahorros y costos incrementales contra la plantilla cargada.");
    if (input.impactCategory === "Ventas") {
      actions.push(`Validar mensualmente unidades vendidas contra el punto de equilibrio de ${number(metrics.breakEvenUnits || 0, 0)} unidades.`);
    }
    actions.push("Definir un cierre post-implementacion para validar que VAN, TIR y Payback reales sigan en rango.");
    if (input.implementationMonths > 12) {
      actions.push("Gestionar la implementacion por hitos para evitar que el calendario largo degrade el retorno esperado.");
    }
    return { label: "VIABLE", tone: "success", lead: lead.join(" "), actions };
  }

  if (metrics.npv > 0 || metrics.irrPct >= input.requiredIrr || (metrics.payback !== null && metrics.payback <= input.maxPayback)) {
    lead.push("La plantilla Excel muestra algun indicador favorable, pero el proyecto no cumple simultaneamente VAN positivo, TIR minima y Payback maximo.");

    if (metrics.npv <= 0) {
      actions.push("Revisar inversion inicial, beneficios anuales o valor residual hasta lograr VAN positivo.");
    }
    if (metrics.irrPct < input.requiredIrr) {
      actions.push("Revisar el monto de inversion o escalonar la implementacion para elevar la TIR.");
    }
    if (metrics.payback === null || metrics.payback > input.maxPayback) {
      actions.push("Identificar beneficios de corto plazo para reducir el payback esperado.");
    }
    if (hasBreakEvenGap) {
      actions.push("Ajustar precio, margen, gasto fijo o volumen esperado para superar el punto de equilibrio en unidades.");
    }
    if (input.implementationMonths > 12) {
      actions.push("Revisar si la ejecucion puede dividirse en fases para bajar el riesgo de una implementacion extensa.");
    }

    actions.push("Volver a cargar la plantilla ajustada y recalcular antes de presentarlo al comite.");
    return { label: "NO VIABLE", tone: "warning", lead: lead.join(" "), actions };
  }

  lead.push("Con los supuestos actuales del Excel, el proyecto no cumple los criterios financieros definidos para justificar su aprobacion.");
  actions.push("Reformular el alcance o dividir la iniciativa en fases con menor desembolso inicial.");
  actions.push("Revalidar beneficios anuales, costos incrementales y valor residual con el area operativa.");
  if (hasBreakEvenGap) {
    actions.push("Para ventas, recalibrar ticket price, margen, gasto fijo y unidades esperadas antes de volver a evaluar.");
  }
  if (input.implementationMonths > 12) {
    actions.push("Reducir la ventana de implementacion o asegurar beneficios parciales por etapa antes de retomarlo.");
  }
  actions.push("Posponer la aprobacion hasta que VAN, TIR y Payback cumplan los umbrales de Finanzas.");
  return { label: "NO VIABLE", tone: "danger", lead: lead.join(" "), actions };
}

function renderHeadline(input) {
  document.getElementById("projectHeadline").textContent = input.projectName || "Proyecto CAPEX";
  document.getElementById("areaHeadline").textContent = formatDivisionUnit(input);
  document.getElementById("sponsorHeadline").textContent = input.sponsor || "Sin Sponsor / Driver";
  document.getElementById("typeHeadline").textContent = projectTypeLabels[input.projectType] || input.projectType || "Crecimiento";
}

function statusAbove(value, target, limitFactor = 0.9) {
  if (value >= target) return "success";
  if (value >= target * limitFactor) return "warning";
  return "danger";
}

function statusBelow(value, target, limitFactor = 1.15) {
  if (value !== null && value <= target) return "success";
  if (value !== null && value <= target * limitFactor) return "warning";
  return "danger";
}

function strategicScoreStatus(score) {
  if (score >= 80) return "success";
  if (score >= 60) return "warning";
  return "danger";
}

function renderCards(evaluation) {
  const expectedMonthlyUnits = evaluation.flows[0]?.units ? evaluation.flows[0].units / 12 : 0;
  const expectedMonthlyRevenue = evaluation.flows[0]?.revenue ? evaluation.flows[0].revenue / 12 : 0;
  const breakEvenUnitsStatus = evaluation.breakEvenMonthlyUnits
    ? statusAbove(expectedMonthlyUnits, evaluation.breakEvenMonthlyUnits)
    : "neutral";
  const breakEvenRevenueStatus = evaluation.breakEvenMonthlyRevenue
    ? statusAbove(expectedMonthlyRevenue, evaluation.breakEvenMonthlyRevenue)
    : "neutral";
  const heroCards = [
    {
      label: "Inversion total",
      value: currency(evaluation.totalInvestment),
      subtext: "CAPEX inicial + capital de trabajo",
      status: "neutral",
    },
    {
      label: "VAN",
      value: currency(evaluation.npv),
      subtext: `A tasa ${percent(Number(elements.discountRate.value))}`,
      status: evaluation.npv >= 0 ? "success" : evaluation.npv >= -evaluation.totalInvestment * 0.05 ? "warning" : "danger",
    },
    {
      label: "TIR",
      value: evaluation.irrPct ? percent(evaluation.irrPct) : "No calculable",
      subtext: `Minimo ${percent(Number(elements.requiredIrr.value))}`,
      status: statusAbove(evaluation.irrPct || 0, Number(elements.requiredIrr.value), 0.9),
    },
    {
      label: "Payback",
      value: evaluation.payback === null ? "No recupera" : `${number(evaluation.payback, 1)} anos`,
      subtext: `ROI total ${percent(evaluation.roi)}`,
      status: statusBelow(evaluation.payback, Number(elements.maxPayback.value), 1.15),
    },
    {
      label: "Alineacion estrategica",
      value: `${number(evaluation.score, 0)} / 100`,
      subtext: `Peso Malta ${number(getMaltaProjectWeight(getInputValue("maltaProject")), 0)}/5`,
      status: strategicScoreStatus(evaluation.score),
    },
  ];

  const detailCards = [];

  if (evaluation.impactCategory === "Ventas") {
    detailCards.push(
      {
        label: "P.E. U$ / mes",
        value: currency(evaluation.breakEvenMonthlyRevenue || 0),
        subtext: `Ventas A1/mes ${currency(expectedMonthlyRevenue)}`,
        status: breakEvenRevenueStatus,
      },
      {
        label: "P.E. unds / mes",
        value: `${number(evaluation.breakEvenMonthlyUnits || 0, 0)} unds.`,
        subtext: `Meta A1 ${number(expectedMonthlyUnits, 0)} unds.`,
        status: breakEvenUnitsStatus,
      }
    );
  }

  const renderMetricCard = (card, className) => {
    const helpKey = Object.keys(metricHelp).find((key) => card.label.includes(key));
    const help = helpKey ? metricHelp[helpKey] : "";
    return `
      <article class="metric-card ${card.status || "neutral"} ${className}" ${help ? `title="${help}"` : ""}>
        <p class="metric-label">${card.label}${help ? '<span class="metric-help">?</span>' : ""}</p>
        <p class="metric-value">${card.value}</p>
        <p class="metric-subtext">${card.subtext}</p>
      </article>
    `;
  };

  const container = document.getElementById("metricCards");
  container.innerHTML = heroCards.map((card) => renderMetricCard(card, "hero-metric")).join("");

  const detailContainer = document.getElementById("detailMetricCards");
  if (detailContainer) {
    detailContainer.hidden = detailCards.length === 0;
    detailContainer.innerHTML = detailCards.map((card) => renderMetricCard(card, "detail-metric")).join("");
  }
}

function renderProgressRows(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = rows
    .map(
      (row) => `
        <div class="probability-row">
          <strong>${row.label}</strong>
          <span>${row.display}</span>
          <span>${row.helper}</span>
          <div class="probability-bar"><i style="width:${clamp(row.value, 0, 100)}%"></i></div>
        </div>
      `
    )
    .join("");
}

function renderValueBridge(rows) {
  const container = document.getElementById("valueBridge");
  container.innerHTML = rows
    .map(
      (row) => `
        <div class="stack-item">
          <strong>${row.label}: ${currency(row.amount)}</strong>
          <p>${row.note}</p>
        </div>
      `
    )
    .join("");
  document.getElementById("valueBridgeSummary").textContent = currency(rows.reduce((sum, row) => sum + row.amount, 0));
}

function renderRecommendation(recommendation) {
  if (decisionBadge) {
    decisionBadge.textContent = recommendation.label;
    decisionBadge.className = `decision-badge ${recommendation.tone}`;
  }
  recommendationTag.textContent = recommendation.label;
  recommendationTag.className = `mini-tag recommendation-status ${recommendation.tone}`;
  const summary = [recommendation.lead, ...recommendation.actions.slice(0, 3)].join(" ");
  document.getElementById("recommendationLead").textContent = summary;
  document.getElementById("recommendationList").innerHTML = "";
}

function formatMatrixValue(value, type = "currency") {
  if (value === null || value === undefined) {
    return "";
  }
  if (type === "number") {
    return number(value, 0);
  }
  if (type === "percent") {
    return percent(value, 2);
  }
  if (value < 0) {
    return `(${compactCurrency(Math.abs(value))})`;
  }
  return compactCurrency(value);
}

function compactCurrency(value) {
  const amount = Math.abs(Number(value) || 0);
  const sign = value < 0 ? "-" : "";

  if (amount >= 1000000) {
    return `${sign}$${number(amount / 1000000, 1)}M`;
  }
  if (amount >= 1000) {
    return `${sign}$${number(amount / 1000, 0)}K`;
  }
  return `${sign}$${number(amount, 0)}`;
}

function renderCashFlowTable(flows, evaluation) {
  const head = document.getElementById("cashflowMatrixHead");
  const body = document.getElementById("cashflowBody");
  if (!head || !body) return;

  const years = flows.map((flow) => `A\u00f1o ${flow.year}`);
  const baseYear = evaluation.baseYear || {};
  const yearZero = {
    revenue: isFiniteNumber(baseYear.revenue) ? baseYear.revenue : 0,
    savings: isFiniteNumber(baseYear.savings) ? baseYear.savings : 0,
    variableCost: isFiniteNumber(baseYear.variableCost) ? baseYear.variableCost : 0,
    salesExpense: isFiniteNumber(baseYear.salesExpense) ? baseYear.salesExpense : 0,
    fixedCost: isFiniteNumber(baseYear.fixedCost) ? baseYear.fixedCost : 0,
    opex: isFiniteNumber(baseYear.incrementalCost) ? baseYear.incrementalCost : 0,
    depreciation: isFiniteNumber(baseYear.depreciation) ? baseYear.depreciation : 0,
    ebit: isFiniteNumber(baseYear.operatingResult) ? baseYear.operatingResult : 0,
    taxes: 0,
    netIncome: 0,
    breakEvenMonthlyRevenue: null,
    breakEvenMonthlyUnits: null,
    netMarginPct: null,
    netFlow: -evaluation.totalInvestment,
    discountedFlow: -evaluation.totalInvestment,
    cumulativeFlow: -evaluation.totalInvestment,
    cumulativeDiscountedFlow: -evaluation.totalInvestment,
  };

  const salesCostRows = evaluation.impactCategory === "Ventas"
    ? [
      { label: "Costo variable", values: [yearZero.variableCost, ...flows.map((flow) => flow.variableCost)] },
      { label: "Costo de venta", values: [yearZero.salesExpense, ...flows.map((flow) => flow.salesExpense)] },
      { label: "Gasto fijo", values: [yearZero.fixedCost, ...flows.map((flow) => flow.fixedCost)] },
    ]
    : [];
  const salesTemplateOperatingRows = evaluation.impactCategory === "Ventas"
    ? [
      { label: "Costos incrementales", values: [yearZero.opex, ...flows.map((flow) => flow.incrementalOpex || 0)] },
      { label: "Ahorros", values: [yearZero.savings, ...flows.map((flow) => flow.savings)] },
    ]
    : [];
  const nonSalesOperatingRows = evaluation.impactCategory !== "Ventas"
    ? [
      { label: "Ahorros", values: [yearZero.savings, ...flows.map((flow) => flow.savings)] },
      { label: "Opex", values: [yearZero.opex, ...flows.map((flow) => flow.opex)] },
    ]
    : [];
  const salesAnalysisRows = evaluation.impactCategory === "Ventas"
    ? [
      {
        label: "Punto de Equilibrio (U$ por mes)",
        values: [yearZero.breakEvenMonthlyRevenue, ...flows.map((flow) => flow.breakEvenMonthlyRevenue)],
      },
      {
        label: "Punto de Equilibrio (Unds por mes)",
        values: [yearZero.breakEvenMonthlyUnits, ...flows.map((flow) => flow.breakEvenMonthlyUnits)],
        type: "number",
      },
      {
        label: "Margen Neto",
        values: [yearZero.netMarginPct, ...flows.map((flow) => flow.netMarginPct)],
        type: "percent",
        emphasis: true,
      },
    ]
    : [];

  const rows = [
    { label: "Ventas", values: [yearZero.revenue, ...flows.map((flow) => flow.revenue)] },
    ...salesCostRows,
    ...salesTemplateOperatingRows,
    ...nonSalesOperatingRows,
    { label: "Depreciaci\u00f3n", values: [yearZero.depreciation, ...flows.map((flow) => flow.depreciation)] },
    { label: "EBITDA", values: [yearZero.ebit, ...flows.map((flow) => flow.ebitda)], emphasis: true },
    { label: "EBIT", values: [yearZero.ebit, ...flows.map((flow) => flow.ebit)], emphasis: true },
    { label: "Impuestos", values: [yearZero.taxes, ...flows.map((flow) => flow.taxes)] },
    { label: "Utilidad Neta", values: [yearZero.netIncome, ...flows.map((flow) => flow.netIncome)], emphasis: true },
    { label: "Flujo neto", values: [yearZero.netFlow, ...flows.map((flow) => flow.netFlow)], emphasis: true },
    { label: "Flujo descontado", values: [yearZero.discountedFlow, ...flows.map((flow) => flow.discountedFlow)] },
    { label: "Flujo acumulado", values: [yearZero.cumulativeFlow, ...flows.map((flow) => flow.cumulativeFlow)] },
    { label: "Flujo descontado acumulado", values: [yearZero.cumulativeDiscountedFlow, ...flows.map((flow) => flow.cumulativeDiscountedFlow)] },
    ...salesAnalysisRows,
  ];

  head.innerHTML = `
    <tr>
      <th>Supuestos</th>
      <th>A\u00f1o 0</th>
      ${years.map((year) => `<th>${year}</th>`).join("")}
    </tr>
  `;

  body.innerHTML = rows
    .map((row) => `
      <tr>
        <td class="matrix-label ${row.emphasis ? "matrix-strong" : ""}">${row.label}</td>
        ${row.values
          .map((value, index) => `
            <td class="
              ${index === 0 ? "matrix-year-zero" : ""}
              ${value < 0 ? "negative" : ""}
              ${value > 0 && row.emphasis ? "positive" : ""}
              ${row.emphasis ? "matrix-strong" : ""}
            ">
              ${formatMatrixValue(value, row.type)}
            </td>
          `)
          .join("")}
      </tr>
    `)
    .join("");
}

function drawCashFlowChart(flows, totalInvestment = 0) {
  const canvas = document.getElementById("cashFlowChart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const padding = 38;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;
  const inferredInvestment = flows[0] ? Math.max(flows[0].netFlow - flows[0].cumulativeFlow, 0) : 0;
  const initialInvestment = Math.max(Number(totalInvestment) || inferredInvestment, 0);
  const chartFlows = [
    { year: 0, netFlow: -initialInvestment },
    ...flows,
  ];
  const maxValue = Math.max(...chartFlows.map((flow) => flow.netFlow), 1);
  const minValue = Math.min(...chartFlows.map((flow) => flow.netFlow), 0);
  const span = maxValue - minValue || 1;
  const zeroY = padding + (maxValue / span) * chartHeight;
  const barWidth = chartWidth / chartFlows.length;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(29, 43, 50, 0.12)";
  ctx.lineWidth = 1;

  for (let line = 0; line <= 4; line += 1) {
    const y = padding + (chartHeight / 4) * line;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(padding, zeroY);
  ctx.lineTo(width - padding, zeroY);
  ctx.strokeStyle = "rgba(29, 43, 50, 0.24)";
  ctx.stroke();

  chartFlows.forEach((flow, index) => {
    const x = padding + index * barWidth + 8;
    const normalizedHeight = (Math.abs(flow.netFlow) / span) * chartHeight;
    const y = flow.netFlow >= 0 ? zeroY - normalizedHeight : zeroY;
    const barHeight = Math.max(normalizedHeight, 2);
    const barActualWidth = Math.max(24, barWidth - 16);
    const gradient = ctx.createLinearGradient(x, y, x, y + normalizedHeight);
    if (flow.netFlow >= 0) {
      gradient.addColorStop(0, "rgba(51, 71, 94, 0.98)");
      gradient.addColorStop(0.58, "rgba(91, 110, 130, 0.86)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.96)");
    } else {
      gradient.addColorStop(0, "rgba(204, 79, 98, 0.95)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.9)");
    }

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, y, barActualWidth, barHeight, 12);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.fillStyle = flow.netFlow >= 0 ? "#33475e" : "#a92f2f";
    ctx.font = "700 12px Calibri";
    const labelY = flow.netFlow >= 0 ? Math.max(14, y - 7) : Math.min(height - 24, y + barHeight + 15);
    ctx.fillText(compactCurrency(flow.netFlow), x + barActualWidth / 2, labelY);

    ctx.fillStyle = "rgba(29, 43, 50, 0.74)";
    ctx.font = "12px Calibri";
    ctx.fillText(`A${flow.year}`, x + barActualWidth / 2, height - 10);
  });
  ctx.textAlign = "left";
}

function wrapPdfText(text, maxChars = 90) {
  const words = sanitizePdfText(text).split(/\s+/);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });

  if (current) lines.push(current);
  return lines;
}

function hexToPdfRgb(hex) {
  const normalized = String(hex).replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => `${char}${char}`).join("")
    : normalized.padEnd(6, "0").slice(0, 6);
  const red = parseInt(value.slice(0, 2), 16) / 255;
  const green = parseInt(value.slice(2, 4), 16) / 255;
  const blue = parseInt(value.slice(4, 6), 16) / 255;
  return `${red.toFixed(3)} ${green.toFixed(3)} ${blue.toFixed(3)}`;
}

function pdfString(value) {
  return sanitizePdfText(value).replace(/\r?\n/g, " ");
}

function createPdfBlob(objects) {
  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];
  let length = 0;

  const appendBytes = (bytes) => {
    chunks.push(bytes);
    length += bytes.byteLength;
  };
  const appendText = (text) => appendBytes(encoder.encode(text));

  appendText("%PDF-1.4\n");
  objects.forEach((object, index) => {
    offsets.push(length);
    appendText(`${index + 1} 0 obj\n`);
    if (typeof object === "string") {
      appendText(`${object}\nendobj\n`);
    } else {
      appendText(object.before);
      appendBytes(object.bytes);
      appendText(object.after);
    }
  });

  const xrefPosition = length;
  appendText(`xref\n0 ${objects.length + 1}\n`);
  appendText("0000000000 65535 f \n");
  offsets.slice(1).forEach((offset) => appendText(`${String(offset).padStart(10, "0")} 00000 n \n`));
  appendText(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPosition}\n%%EOF`);
  return new Blob(chunks, { type: "application/pdf" });
}

async function buildExecutivePdf(input, evaluation) {
  const pageWidth = 612;
  const pageHeight = 792;
  const ops = [];

  const fillRect = (x, y, width, height, color) => {
    ops.push(`${hexToPdfRgb(color)} rg ${x} ${y} ${width} ${height} re f`);
  };
  const strokeRect = (x, y, width, height, color = "#d9e1ea", lineWidth = 0.8) => {
    ops.push(`${lineWidth} w ${hexToPdfRgb(color)} RG ${x} ${y} ${width} ${height} re S`);
  };
  const addText = (value, x, y, size = 10, color = "#15356f", font = "F1") => {
    ops.push(`BT /${font} ${size} Tf ${hexToPdfRgb(color)} rg 1 0 0 1 ${x} ${y} Tm (${pdfString(value)}) Tj ET`);
  };
  const wrapped = (value, x, y, width, size = 10, color = "#15356f", font = "F1", lineHeight = size + 4, maxLines = 6) => {
    const maxChars = Math.max(24, Math.floor(width / (size * 0.46)));
    const lines = wrapPdfText(value, maxChars).slice(0, maxLines);
    lines.forEach((line, index) => addText(line, x, y - index * lineHeight, size, color, font));
    return y - lines.length * lineHeight;
  };
  const sectionTitle = (label, x, y) => {
    addText(label.toUpperCase(), x, y, 9, "#0b237e", "F2");
    fillRect(x, y - 9, 82, 2, "#1f36b3");
  };
  const dataField = (label, value, x, y, width) => {
    addText(label, x, y, 7.5, "#4f6a9a", "F1");
    wrapped(value, x, y - 13, width, 9.5, "#081f63", "F2", 11, 2);
  };
  const kpiCard = (label, value, x, y, width, color) => {
    fillRect(x, y, width, 56, "#ffffff");
    fillRect(x, y + 52, width, 4, color);
    strokeRect(x, y, width, 56, "#d9e1ea", 0.7);
    wrapped(value, x + 8, y + 33, width - 16, 13, "#081f63", "F2", 14, 1);
    wrapped(label, x + 8, y + 16, width - 16, 7.8, "#4f6a9a", "F1", 9, 2);
  };

  fillRect(0, 0, pageWidth, pageHeight, "#eef2f5");
  fillRect(0, 700, pageWidth, 92, "#33475e");
  fillRect(0, 696, pageWidth, 4, "#1f36b3");

  addText("CASA PELLAS", 42, 760, 12, "#ffffff", "F2");
  addText("REPORTE EJECUTIVO CAPEX", 42, 737, 18, "#ffffff", "F2");
  wrapped(input.projectName, 42, 716, 300, 9.5, "#dce7f2", "F1", 12, 2);

  fillRect(42, 640, 528, 40, "#ffffff");
  strokeRect(42, 640, 528, 40, "#d9e1ea", 0.7);
  addText("Código único del proyecto", 58, 664, 8, "#4f6a9a", "F1");
  addText(input.projectCode, 58, 650, 12, "#081f63", "F2");
  addText(`Decisión sugerida: ${evaluation.recommendation.label}`, 366, 650, 11, "#081f63", "F2");

  fillRect(42, 532, 528, 92, "#ffffff");
  strokeRect(42, 532, 528, 92, "#d9e1ea", 0.7);
  sectionTitle("Datos generales del proyecto", 58, 606);
  dataField("Area / unidad", formatDivisionUnit(input), 58, 584, 140);
  dataField("Sponsor / Driver", input.sponsor, 212, 584, 86);
  dataField("Tipo CAPEX", projectTypeLabels[input.projectType] || input.projectType, 310, 584, 108);
  dataField("Horizonte", `${number(input.projectLife, 0)} años`, 436, 584, 90);
  dataField("Impacto economico", input.impactCategory || "Ventas", 58, 552, 150);
  dataField("Objetivo", input.projectGoal, 226, 552, 300);

  fillRect(42, 442, 528, 74, "#ffffff");
  strokeRect(42, 442, 528, 74, "#d9e1ea", 0.7);
  sectionTitle("Resumen ejecutivo", 58, 498);
  wrapped(evaluation.recommendation.lead, 58, 476, 490, 10, "#15356f", "F1", 13, 4);

  sectionTitle("Principales KPIs", 42, 412);
  const impactKpi = input.impactCategory === "Ventas"
    ? ["Punto equilibrio", `${number(evaluation.breakEvenUnits || 0, 0)} unid.`, "#33475e"]
    : input.impactCategory === "Ahorro"
      ? ["Ahorro promedio", currency(evaluation.annualAverageSavings || 0), "#1f5fa8"]
      : ["Alineacion estrategica", `${number(evaluation.score, 0)} / 100`, "#33475e"];
  const kpis = [
    ["Inversión total", currency(evaluation.totalInvestment), "#1f36b3"],
    ["VAN", currency(evaluation.npv), evaluation.npv >= 0 ? "#1f5fa8" : "#cc4f62"],
    ["TIR", evaluation.irrPct ? percent(evaluation.irrPct) : "No calculable", "#4771d6"],
    ["Payback", evaluation.payback === null ? "No recupera" : `${number(evaluation.payback, 1)} años`, "#7ea3ff"],
    ["Alineacion estrategica", `${number(evaluation.score, 0)} / 100`, strategicScoreStatus(evaluation.score) === "success" ? "#1f5fa8" : "#cc4f62"],
    impactKpi,
  ];
  kpis.forEach(([label, value, color], index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    kpiCard(label, value, 42 + col * 132, 336 - row * 70, 116, 56, color);
  });

  fillRect(42, 74, 528, 176, "#ffffff");
  strokeRect(42, 74, 528, 176, "#d9e1ea", 0.7);
  sectionTitle("Sugerencias", 58, 230);
  let actionY = 206;
  evaluation.recommendation.actions.slice(0, 5).forEach((action, index) => {
    fillRect(58, actionY - 8, 18, 18, "#1f36b3");
    addText(String(index + 1), 64, actionY - 2, 8, "#ffffff", "F2");
    actionY = wrapped(action, 86, actionY, 446, 9.5, "#15356f", "F1", 12, 2) - 6;
  });

  addText("Generado desde el Formato de Evaluación de CAPEX", 42, 34, 8, "#4f6a9a", "F1");
  addText(new Date().toLocaleDateString("es-NI"), 506, 34, 8, "#4f6a9a", "F1");

  const stream = ops.join("\n");
  const resources = "/Font << /F1 4 0 R /F2 5 0 R >>";
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << ${resources} >> /Contents 6 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${new TextEncoder().encode(stream).byteLength} >>\nstream\n${stream}\nendstream`,
  ];

  return createPdfBlob(objects);
}

async function buildDetailedExecutivePdf(input, evaluation) {
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  const pages = [];
  const encoder = new TextEncoder();

  const fillRect = (ops, x, y, width, height, color) => {
    ops.push(`${hexToPdfRgb(color)} rg ${x} ${y} ${width} ${height} re f`);
  };
  const strokeRect = (ops, x, y, width, height, color = "#d9e1ea", lineWidth = 0.7) => {
    ops.push(`${lineWidth} w ${hexToPdfRgb(color)} RG ${x} ${y} ${width} ${height} re S`);
  };
  const addText = (ops, value, x, y, size = 9, color = "#15356f", font = "F1") => {
    ops.push(`BT /${font} ${size} Tf ${hexToPdfRgb(color)} rg 1 0 0 1 ${x} ${y} Tm (${pdfString(value)}) Tj ET`);
  };
  const wrapped = (ops, value, x, y, width, size = 9, color = "#15356f", font = "F1", lineHeight = size + 3, maxLines = 4) => {
    const maxChars = Math.max(18, Math.floor(width / (size * 0.46)));
    const lines = wrapPdfText(value, maxChars).slice(0, maxLines);
    lines.forEach((line, index) => addText(ops, line, x, y - index * lineHeight, size, color, font));
    return y - lines.length * lineHeight;
  };
  const sectionTitle = (ops, label, x, y, width = 96) => {
    addText(ops, label.toUpperCase(), x, y, 8.5, "#0b237e", "F2");
    fillRect(ops, x, y - 7, width, 2, "#1f36b3");
  };
  const footer = (ops, pageNumber) => {
    addText(ops, "Generado desde el Formato de Evaluacion de CAPEX", margin, 26, 7.5, "#4f6a9a", "F1");
    addText(ops, `Pagina ${pageNumber}`, pageWidth - 88, 26, 7.5, "#4f6a9a", "F1");
  };
  const startPage = (title, subtitle) => {
    const ops = [];
    pages.push(ops);
    fillRect(ops, 0, 0, pageWidth, pageHeight, "#eef2f5");
    fillRect(ops, 0, 720, pageWidth, 72, "#33475e");
    fillRect(ops, 0, 716, pageWidth, 4, "#17885f");
    addText(ops, "CASA PELLAS", margin, 762, 11, "#ffffff", "F2");
    addText(ops, title, margin, 740, 17, "#ffffff", "F2");
    wrapped(ops, subtitle, margin, 724, 360, 8.5, "#dce7f2", "F1", 10, 2);
    footer(ops, pages.length);
    return ops;
  };
  const field = (ops, label, value, x, y, width, maxLines = 2) => {
    addText(ops, label, x, y, 7, "#4f6a9a", "F1");
    wrapped(ops, value || "-", x, y - 12, width, 8.5, "#081f63", "F2", 10, maxLines);
  };
  const colorByStatus = (status) => ({
    success: "#1d8a56",
    warning: "#e9a11b",
    danger: "#cc4f62",
    neutral: "#33475e",
  }[status] || "#33475e");
  const kpiCard = (ops, label, value, helper, x, y, width, status = "neutral") => {
    fillRect(ops, x, y, width, 54, "#ffffff");
    fillRect(ops, x, y + 50, width, 4, colorByStatus(status));
    strokeRect(ops, x, y, width, 54, "#d9e1ea", 0.6);
    wrapped(ops, label, x + 7, y + 39, width - 14, 7.2, "#4f6a9a", "F1", 8, 1);
    wrapped(ops, value, x + 7, y + 22, width - 14, 11, colorByStatus(status), "F2", 11, 1);
    wrapped(ops, helper, x + 7, y + 9, width - 14, 6.7, "#4f6a9a", "F1", 8, 1);
  };
  const scoreCard = (ops, row, x, y, width) => {
    fillRect(ops, x, y, width, 58, "#ffffff");
    strokeRect(ops, x, y, width, 58, "#d9e1ea", 0.6);
    addText(ops, row.label, x + 7, y + 41, 7.4, "#081f63", "F2");
    addText(ops, row.display, x + width - 46, y + 41, 7.4, "#15356f", "F2");
    wrapped(ops, row.helper, x + 7, y + 27, width - 14, 6.5, "#4f6a9a", "F1", 7, 1);
    fillRect(ops, x + 7, y + 10, width - 14, 6, "#e9edf5");
    fillRect(ops, x + 7, y + 10, (width - 14) * clamp(row.value, 0, 100) / 100, 6, "#1f36b3");
  };
  const expectedMonthlyRevenue = evaluation.flows[0]?.revenue ? evaluation.flows[0].revenue / 12 : 0;
  const expectedMonthlyUnits = evaluation.flows[0]?.units ? evaluation.flows[0].units / 12 : 0;
  const breakEvenRevenueStatus = evaluation.breakEvenMonthlyRevenue
    ? statusAbove(expectedMonthlyRevenue, evaluation.breakEvenMonthlyRevenue)
    : "neutral";
  const breakEvenUnitsStatus = evaluation.breakEvenMonthlyUnits
    ? statusAbove(expectedMonthlyUnits, evaluation.breakEvenMonthlyUnits)
    : "neutral";
  const marginStatus = evaluation.netMarginPct >= 10 ? "success" : evaluation.netMarginPct >= 5 ? "warning" : "danger";
  const kpis = [
    ["Inversion total", currency(evaluation.totalInvestment), "CAPEX inicial", "neutral"],
    ["VAN", currency(evaluation.npv), `Tasa ${percent(input.discountRate)}`, evaluation.npv >= 0 ? "success" : "danger"],
    ["TIR", evaluation.irrPct ? percent(evaluation.irrPct) : "No calculable", `Min. ${percent(input.requiredIrr)}`, statusAbove(evaluation.irrPct || 0, input.requiredIrr, 0.9)],
    ["Payback", evaluation.payback === null ? "No recupera" : `${number(evaluation.payback, 1)} anos`, `Max. ${number(input.maxPayback, 1)} anos`, statusBelow(evaluation.payback, input.maxPayback, 1.15)],
    ["Alineacion estrategica", `${number(evaluation.score, 0)} / 100`, `Peso Malta ${number(getMaltaProjectWeight(input.maltaProject), 0)}/5`, strategicScoreStatus(evaluation.score)],
    ["ROI", percent(evaluation.roi), `Meta ${percent(input.targetRoi)}`, statusAbove(evaluation.roi, input.targetRoi, 0.85)],
    ["EVA anual", currency(evaluation.eva), "Costo capital", evaluation.eva >= 0 ? "success" : "danger"],
    ["EBITDA prom.", currency(evaluation.ebitdaAverage || 0), "Potencial operativo", evaluation.ebitdaAverage >= 0 ? "success" : "danger"],
    ["Beneficio prom.", currency(evaluation.annualAverageFlow || 0), "Flujo neto anual", evaluation.annualAverageFlow >= 0 ? "success" : "danger"],
  ];

  if (input.impactCategory === "Ventas") {
    kpis.push(
      ["P.E. U$ / mes", currency(evaluation.breakEvenMonthlyRevenue || 0), `Ventas A1 ${currency(expectedMonthlyRevenue)}`, breakEvenRevenueStatus],
      ["P.E. unds / mes", `${number(evaluation.breakEvenMonthlyUnits || 0, 0)} unds.`, `Meta A1 ${number(expectedMonthlyUnits, 0)}`, breakEvenUnitsStatus],
      ["Margen neto", percent(evaluation.netMarginPct || 0), "Utilidad / ventas", marginStatus]
    );
  } else if (input.impactCategory === "Ahorro") {
    kpis.push(
      ["Ahorro promedio", currency(evaluation.annualAverageSavings || 0), "Promedio anual", evaluation.annualAverageSavings > 0 ? "success" : "danger"],
      ["Flujo prom.", currency(evaluation.annualAverageFlow), "Despues de impuestos", evaluation.annualAverageFlow > 0 ? "success" : "danger"]
    );
  } else {
    kpis.push(["Alineacion estrategica", `${number(evaluation.score, 0)} / 100`, "Sin retorno directo", strategicScoreStatus(evaluation.score)]);
  }

  const page1 = startPage("REPORTE EJECUTIVO CAPEX", input.projectName || "Proyecto CAPEX");
  fillRect(page1, margin, 648, contentWidth, 44, "#ffffff");
  strokeRect(page1, margin, 648, contentWidth, 44);
  field(page1, "Codigo unico del proyecto", input.projectCode, margin + 14, 675, 230);
  field(page1, "Decision sugerida", evaluation.recommendation.label, margin + 380, 675, 120);

  fillRect(page1, margin, 528, contentWidth, 100, "#ffffff");
  strokeRect(page1, margin, 528, contentWidth, 100);
  sectionTitle(page1, "Datos generales", margin + 14, 612);
  field(page1, "Area / unidad", formatDivisionUnit(input), margin + 14, 590, 220, 1);
  field(page1, "Sponsor / Driver", input.sponsor, margin + 250, 590, 120);
  field(page1, "Tipo CAPEX", projectTypeLabels[input.projectType] || input.projectType, margin + 386, 590, 82);
  field(page1, "Horizonte", `${number(input.projectLife, 0)} anos`, margin + 474, 590, 50);
  field(page1, "Proyecto Malta", formatMaltaProject(input), margin + 14, 562, 170, 1);
  field(page1, "KPI Grupo", input.groupKpi, margin + 204, 562, 120, 1);
  field(page1, "Enfoque", formatStrategicObjectives(input.strategicObjectives), margin + 340, 562, 172, 1);
  field(page1, "Objetivo", input.projectGoal, margin + 14, 542, 500, 1);

  fillRect(page1, margin, 462, contentWidth, 66, "#ffffff");
  strokeRect(page1, margin, 462, contentWidth, 66);
  sectionTitle(page1, "Resumen ejecutivo", margin + 14, 512);
  wrapped(page1, [evaluation.recommendation.lead, ...evaluation.recommendation.actions.slice(0, 2)].join(" "), margin + 14, 492, contentWidth - 28, 8.5, "#15356f", "F1", 10, 4);

  sectionTitle(page1, "KPIs principales", margin, 428);
  const kpiWidth = (contentWidth - 4 * 8) / 5;
  kpis.slice(0, 5).forEach(([label, value, helper, status], index) => {
    kpiCard(page1, label, value, helper, margin + index * (kpiWidth + 8), 350, kpiWidth, status);
  });

  const assumptionRows = [
    ["Equipo", currency(input.equipmentCost), "Instalacion", currency(input.installationCost), "Prop. e infra.", currency(input.propertyInfrastructureCost)],
    ["Capacitacion", currency(input.trainingCost), "Otros costos", currency(input.otherCosts), "WACC", percent(input.discountRate)],
    ["Impuesto", percent(input.taxRate), "Residual", percent(input.residualPct), "Valor residual", currency(input.salvageValue)],
    ["Deprec. anual", currency(input.annualDepreciation), "TIR minima", percent(input.requiredIrr), "Payback max.", `${number(input.maxPayback, 1)} anos`],
  ];
  if (input.impactCategory === "Ventas") {
    assumptionRows.push(["Unidades A1", number(input.salesUnitsYear1, 0), "Ticket price", currency(input.ticketPrice), "Crec. unidades", percent(input.unitGrowthRate)]);
    assumptionRows.push(["Costo variable", percent(input.variableCostPct), "% Costo de Venta", percent(input.salesExpensePct), "Gasto fijo", `${currency(input.fixedCommercialCost)} / ${percent(input.fixedCommercialCostGrowthPct || 0)}`]);
  } else if (input.impactCategory === "Ahorro") {
    assumptionRows.push(["Ahorro anual", currency(input.annualCostSavings), "Crec. anual", percent(input.annualGrowthRate), "Impacto", "Ahorro"]);
  } else {
    assumptionRows.push(["Impacto", "Sin retorno directo", "Opex incr.", currency(input.annualOpexIncrease), "Riesgo evitado", currency(input.riskAvoidanceBenefit)]);
  }

  fillRect(page1, margin, 220, contentWidth, 96, "#ffffff");
  strokeRect(page1, margin, 220, contentWidth, 96);
  sectionTitle(page1, "Recomendacion general", margin + 14, 298);
  wrapped(page1, [evaluation.recommendation.lead, ...evaluation.recommendation.actions.slice(0, 3)].join(" "), margin + 14, 278, contentWidth - 28, 8.3, "#15356f", "F1", 10, 5);

  fillRect(page1, margin, 58, contentWidth, 136, "#ffffff");
  strokeRect(page1, margin, 58, contentWidth, 136);
  sectionTitle(page1, "Supuestos base", margin + 14, 176);
  if (input.annualTemplate) {
    addText(page1, `Plantilla anual: ${input.annualTemplate.sourceName || "cargada"} (${input.annualTemplate.years || input.projectLife} anos)`, margin + 302, 176, 6.8, "#0f6f4d", "F2");
  }
  let assumptionY = 154;
  assumptionRows.forEach((row) => {
    [0, 1, 2].forEach((index) => {
      const x = margin + 14 + index * 168;
      addText(page1, row[index * 2], x, assumptionY, 6.8, "#4f6a9a", "F1");
      addText(page1, row[index * 2 + 1], x, assumptionY - 12, 8.2, "#081f63", "F2");
    });
    assumptionY -= 18;
  });

  const page2 = startPage("DETALLE DE FLUJOS", input.projectName || "Proyecto CAPEX");
  sectionTitle(page2, "Matriz de flujos y resultados", margin, 680, 150);
  const years = evaluation.flows.map((flow) => `A\u00f1o ${flow.year}`);
  const baseYear = input.annualTemplate?.baseYear || {};
  const yearZero = {
    units: isFiniteNumber(baseYear.units) ? baseYear.units : null,
    ticketPrice: isFiniteNumber(baseYear.ticketPrice) ? baseYear.ticketPrice : null,
    revenue: isFiniteNumber(baseYear.revenue) ? baseYear.revenue : 0,
    savings: isFiniteNumber(baseYear.savings) ? baseYear.savings : 0,
    variableCost: isFiniteNumber(baseYear.variableCost) ? baseYear.variableCost : 0,
    salesExpense: isFiniteNumber(baseYear.salesExpense) ? baseYear.salesExpense : 0,
    fixedCost: isFiniteNumber(baseYear.fixedCost) ? baseYear.fixedCost : 0,
    opex: isFiniteNumber(baseYear.incrementalCost) ? baseYear.incrementalCost : 0,
    depreciation: isFiniteNumber(baseYear.depreciation) ? baseYear.depreciation : 0,
    ebit: isFiniteNumber(baseYear.operatingResult) ? baseYear.operatingResult : 0,
    taxes: 0,
    netIncome: 0,
    netFlow: -evaluation.totalInvestment,
    discountedFlow: -evaluation.totalInvestment,
    cumulativeFlow: -evaluation.totalInvestment,
    cumulativeDiscountedFlow: -evaluation.totalInvestment,
    breakEvenMonthlyRevenue: null,
    breakEvenMonthlyUnits: null,
    netMarginPct: null,
  };
  const salesCostRows = input.impactCategory === "Ventas"
    ? [
      { label: "Costo variable", values: [yearZero.variableCost, ...evaluation.flows.map((flow) => flow.variableCost)] },
      { label: "Costo de venta", values: [yearZero.salesExpense, ...evaluation.flows.map((flow) => flow.salesExpense)] },
      { label: "Gasto fijo", values: [yearZero.fixedCost, ...evaluation.flows.map((flow) => flow.fixedCost)] },
    ]
    : [];
  const salesTemplateOperatingRows = input.impactCategory === "Ventas"
    ? [
      { label: "Costos incr.", values: [yearZero.opex, ...evaluation.flows.map((flow) => flow.incrementalOpex || 0)] },
      { label: "Ahorros", values: [yearZero.savings, ...evaluation.flows.map((flow) => flow.savings)] },
    ]
    : [];
  const nonSalesOperatingRows = input.impactCategory !== "Ventas"
    ? [
      { label: "Ahorros", values: [yearZero.savings, ...evaluation.flows.map((flow) => flow.savings)] },
      { label: "Opex", values: [yearZero.opex, ...evaluation.flows.map((flow) => flow.opex)] },
    ]
    : [];
  const salesAnalysisRows = input.impactCategory === "Ventas"
    ? [
      { label: "P.E. U$ / mes", values: [yearZero.breakEvenMonthlyRevenue, ...evaluation.flows.map((flow) => flow.breakEvenMonthlyRevenue)] },
      { label: "P.E. unds / mes", values: [yearZero.breakEvenMonthlyUnits, ...evaluation.flows.map((flow) => flow.breakEvenMonthlyUnits)], type: "number" },
      { label: "Margen Neto", values: [yearZero.netMarginPct, ...evaluation.flows.map((flow) => flow.netMarginPct)], type: "percent", emphasis: true },
    ]
    : [];
  const flowRows = [
    { label: "Unidades", values: [yearZero.units, ...evaluation.flows.map((flow) => flow.units)], type: "number" },
    { label: "Ticket price", values: [yearZero.ticketPrice, ...evaluation.flows.map((flow) => flow.units ? flow.revenue / flow.units : 0)] },
    { label: "Ventas", values: [yearZero.revenue, ...evaluation.flows.map((flow) => flow.revenue)] },
    ...salesCostRows,
    ...salesTemplateOperatingRows,
    ...nonSalesOperatingRows,
    { label: "Depreciacion", values: [yearZero.depreciation, ...evaluation.flows.map((flow) => flow.depreciation)] },
    { label: "EBITDA", values: [yearZero.ebit, ...evaluation.flows.map((flow) => flow.ebitda)], emphasis: true },
    { label: "EBIT", values: [yearZero.ebit, ...evaluation.flows.map((flow) => flow.ebit)], emphasis: true },
    { label: "Impuestos", values: [yearZero.taxes, ...evaluation.flows.map((flow) => flow.taxes)] },
    { label: "Utilidad Neta", values: [yearZero.netIncome, ...evaluation.flows.map((flow) => flow.netIncome)], emphasis: true },
    { label: "Flujo neto", values: [yearZero.netFlow, ...evaluation.flows.map((flow) => flow.netFlow)], emphasis: true },
    { label: "Flujo descontado", values: [yearZero.discountedFlow, ...evaluation.flows.map((flow) => flow.discountedFlow)] },
    { label: "Flujo acumulado", values: [yearZero.cumulativeFlow, ...evaluation.flows.map((flow) => flow.cumulativeFlow)] },
    { label: "Flujo desc. acum.", values: [yearZero.cumulativeDiscountedFlow, ...evaluation.flows.map((flow) => flow.cumulativeDiscountedFlow)] },
    ...salesAnalysisRows,
  ];
  const tableX = margin;
  const tableY = 644;
  const rowHeight = 17;
  const labelWidth = 94;
  const valueColWidth = (contentWidth - labelWidth) / (years.length + 1);
  const tableFont = valueColWidth < 44 ? 5.8 : 6.4;
  fillRect(page2, tableX, tableY, contentWidth, rowHeight, "#10253f");
  addText(page2, "Supuestos", tableX + 5, tableY + 7, 7.2, "#ffffff", "F2");
  ["A\u00f1o 0", ...years].forEach((year, index) => {
    addText(page2, year, tableX + labelWidth + index * valueColWidth + 4, tableY + 7, 7, "#ffffff", "F2");
  });
  const pdfTableValue = (value, type) => {
    if (value === null || value === undefined) return "";
    if (type === "number") return number(value, 0);
    if (type === "percent") return percent(value, 1);
    return compactCurrency(value);
  };
  flowRows.forEach((row, rowIndex) => {
    const y = tableY - (rowIndex + 1) * rowHeight;
    fillRect(page2, tableX, y, contentWidth, rowHeight, rowIndex % 2 === 0 ? "#ffffff" : "#f8fbff");
    strokeRect(page2, tableX, y, contentWidth, rowHeight, "#d9e1ea", 0.3);
    addText(page2, row.label, tableX + 5, y + 7, 6.8, "#081f63", row.emphasis ? "F2" : "F1");
    row.values.forEach((value, index) => {
      const color = value < 0 ? "#cc4f62" : row.emphasis && value > 0 ? "#1d8a56" : "#15356f";
      addText(page2, pdfTableValue(value, row.type), tableX + labelWidth + index * valueColWidth + 3, y + 7, tableFont, color, row.emphasis ? "F2" : "F1");
    });
  });

  const signatures = [
    ["Gerencia Solicitante", "Nombre y Firma"],
    ["Gerencia de Proyectos", "Nombre y Firma"],
    ["Gerencia de Finanzas", "Nombre y Firma"],
    ["CEO", "Silvio Pellas Martinez - Firma"],
  ];
  const signatureTop = 212;
  const signatureCardWidth = (contentWidth - 18) / 2;
  const signatureCardHeight = 70;
  sectionTitle(page2, "Area de firmas", margin, signatureTop + 36, 110);
  signatures.forEach(([role, helper], index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = margin + col * (signatureCardWidth + 18);
    const y = signatureTop - row * 86;
    fillRect(page2, x, y - signatureCardHeight, signatureCardWidth, signatureCardHeight, "#ffffff");
    strokeRect(page2, x, y - signatureCardHeight, signatureCardWidth, signatureCardHeight, "#d9e1ea", 0.7);
    addText(page2, role, x + 12, y - 18, 8.2, "#081f63", "F2");
    addText(page2, helper, x + 12, y - 34, 7.2, "#4f6a9a", "F1");
    strokeRect(page2, x + 12, y - 54, signatureCardWidth - 24, 0.1, "#33475e", 0.7);
  });

  const pageCount = pages.length;
  const font1Obj = 3 + pageCount * 2;
  const font2Obj = font1Obj + 1;
  const resources = `/Font << /F1 ${font1Obj} 0 R /F2 ${font2Obj} 0 R >>`;
  const pageRefs = pages.map((_, index) => `${3 + index * 2} 0 R`).join(" ");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${pageRefs}] /Count ${pageCount} >>`,
  ];

  pages.forEach((ops, index) => {
    const pageObj = 3 + index * 2;
    const contentObj = pageObj + 1;
    const stream = ops.join("\n");
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << ${resources} >> /Contents ${contentObj} 0 R >>`);
    objects.push(`<< /Length ${encoder.encode(stream).byteLength} >>\nstream\n${stream}\nendstream`);
  });

  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  return createPdfBlob(objects);
}

function buildExcelWorkbook(input, evaluation) {
  const cell = (value, options = {}) => {
    const attributes = [];
    const isNumber = typeof value === "number" && Number.isFinite(value);
    const type = options.type || (isNumber ? "Number" : "String");
    const content = type === "Number" ? value : escapeXml(value ?? "");

    if (options.style) attributes.push(`ss:StyleID="${options.style}"`);
    if (Number.isInteger(options.mergeAcross)) attributes.push(`ss:MergeAcross="${options.mergeAcross}"`);

    return `<Cell${attributes.length ? ` ${attributes.join(" ")}` : ""}><Data ss:Type="${type}">${content}</Data></Cell>`;
  };
  const row = (cells, options = {}) =>
    `<Row${options.height ? ` ss:Height="${options.height}"` : ""}>${cells.join("")}</Row>`;
  const blankRow = '<Row ss:Height="8"></Row>';
  const sectionRow = (label, mergeAcross = 7) =>
    row([cell(label, { style: "Section", mergeAcross })], { height: 24 });
  const twoColumnRow = (label, value) =>
    row([
      cell(label, { style: "Label" }),
      cell(value, { style: "Value", mergeAcross: 6 }),
    ], { height: 24 });

  const projectType = projectTypeLabels[input.projectType] || input.projectType;
  const impactKpiRow = input.impactCategory === "Ventas"
    ? ["Punto equilibrio", `${number(evaluation.breakEvenUnits || 0, 0)} unid.`, "KpiNeutral"]
    : input.impactCategory === "Ahorro"
      ? ["Ahorro promedio", currency(evaluation.annualAverageSavings || 0), "KpiGreen"]
      : ["Alineacion estrategica", `${number(evaluation.score, 0)} / 100`, "KpiNeutral"];
  const kpiRows = [
    ["Inversión total", currency(evaluation.totalInvestment), "KpiBlue"],
    ["VAN", currency(evaluation.npv), evaluation.npv >= 0 ? "KpiGreen" : "KpiRed"],
    ["TIR", evaluation.irrPct ? percent(evaluation.irrPct) : "No calculable", "KpiBlue"],
    ["Payback", evaluation.payback === null ? "No recupera" : `${number(evaluation.payback, 1)} años`, "KpiNeutral"],
    ["Alineacion estrategica", `${number(evaluation.score, 0)} / 100`, strategicScoreStatus(evaluation.score) === "success" ? "KpiGreen" : strategicScoreStatus(evaluation.score) === "warning" ? "KpiWarning" : "KpiRed"],
  ];

  const summaryRows = [
    row([cell("REPORTE EJECUTIVO CAPEX", { style: "Title", mergeAcross: 7 })], { height: 34 }),
    row([cell(input.projectName || "Proyecto CAPEX", { style: "Subtitle", mergeAcross: 7 })], { height: 24 }),
    blankRow,
    row([
      cell("Código único del proyecto", { style: "Label" }),
      cell(input.projectCode, { style: "Code", mergeAcross: 2 }),
      cell("Decisión sugerida", { style: "Label" }),
      cell(evaluation.recommendation.label, { style: `Decision${evaluation.recommendation.tone}`, mergeAcross: 2 }),
    ], { height: 28 }),
    blankRow,
    sectionRow("Datos generales del proyecto"),
    twoColumnRow("Area solicitante", input.businessArea),
    twoColumnRow("Unidad de negocio", input.businessUnit),
    twoColumnRow("Sponsor / Driver", input.sponsor),
    twoColumnRow("Tipo CAPEX", projectType),
    twoColumnRow("Proyecto Malta Asociado", formatMaltaProject(input)),
    twoColumnRow("KPI Grupo que Impacta", input.groupKpi),
    twoColumnRow("Enfoque", formatStrategicObjectives(input.strategicObjectives)),
    twoColumnRow("Impacto economico", input.impactCategory || "Ventas"),
    twoColumnRow("Horizonte", `${number(input.projectLife, 0)} años`),
    twoColumnRow("Objetivo", input.projectGoal),
    blankRow,
    sectionRow("Resumen ejecutivo"),
    row([cell(evaluation.recommendation.lead, { style: "LongText", mergeAcross: 7 })], { height: 42 }),
    blankRow,
    sectionRow("Principales KPIs"),
    ...kpiRows.reduce((rows, current, index) => {
      if (index % 4 === 0) {
        rows.push(row(kpiRows.slice(index, index + 4).flatMap(([label, value, style]) => [
          cell(label, { style: "KpiLabel" }),
          cell(value, { style }),
        ]), { height: 34 }));
      }
      return rows;
    }, []),
    blankRow,
    sectionRow("Sugerencias"),
    ...evaluation.recommendation.actions.map((action, index) =>
      row([
        cell(index + 1, { style: "ActionNumber" }),
        cell(action, { style: "LongText", mergeAcross: 6 }),
      ], { height: 34 })
    ),
  ].join("");

  const recommendationRows = [
    row([cell("SUGERENCIAS Y CONDICIONES", { style: "Title", mergeAcross: 3 })], { height: 34 }),
    row([cell(evaluation.recommendation.lead, { style: "LongText", mergeAcross: 3 })], { height: 48 }),
    blankRow,
    sectionRow("Acciones recomendadas", 3),
    ...evaluation.recommendation.actions.map((action, index) =>
      row([
        cell(index + 1, { style: "ActionNumber" }),
        cell(action, { style: "LongText", mergeAcross: 2 }),
      ], { height: 34 })
    ),
  ].join("");

  const flowRows = [
    row([cell("FLUJOS DEL PROYECTO", { style: "Title", mergeAcross: 5 })], { height: 34 }),
    blankRow,
    row(["Año", "Ingresos", "Ahorros", "Opex", "Flujo neto", "Flujo descontado"].map((label) =>
      cell(label, { style: "TableHeader" })
    ), { height: 26 }),
    ...evaluation.flows.map((flow) =>
      row([
        cell(flow.year, { style: "TableCell" }),
        cell(flow.revenue, { style: "Money" }),
        cell(flow.savings, { style: "Money" }),
        cell(flow.opex, { style: "Money" }),
        cell(flow.netFlow, { style: flow.netFlow >= 0 ? "MoneyPositive" : "MoneyNegative" }),
        cell(flow.discountedFlow, { style: flow.discountedFlow >= 0 ? "MoneyPositive" : "MoneyNegative" }),
      ], { height: 24 })
    ),
  ].join("");

  const expectedMonthlyRevenue = evaluation.flows[0]?.revenue ? evaluation.flows[0].revenue / 12 : 0;
  const expectedMonthlyUnits = evaluation.flows[0]?.units ? evaluation.flows[0].units / 12 : 0;
  const excelKpiStyleAbove = (value, target, limitFactor = 0.9) => {
    const status = statusAbove(value, target, limitFactor);
    return status === "success" ? "KpiGreen" : status === "warning" ? "KpiWarning" : "KpiRed";
  };
  const excelKpiStyleBelow = (value, target, limitFactor = 1.15) => {
    const status = statusBelow(value, target, limitFactor);
    return status === "success" ? "KpiGreen" : status === "warning" ? "KpiWarning" : "KpiRed";
  };
  const recommendationText = [evaluation.recommendation.lead, ...evaluation.recommendation.actions.slice(0, 3)].join(" ");
  const detailedKpiRows = [
    ["Inversion total", currency(evaluation.totalInvestment), "KpiNeutral"],
    ["VAN", currency(evaluation.npv), evaluation.npv >= 0 ? "KpiGreen" : "KpiRed"],
    ["TIR", evaluation.irrPct ? percent(evaluation.irrPct) : "No calculable", excelKpiStyleAbove(evaluation.irrPct || 0, input.requiredIrr, 0.9)],
    ["Payback", evaluation.payback === null ? "No recupera" : `${number(evaluation.payback, 1)} anos`, excelKpiStyleBelow(evaluation.payback, input.maxPayback, 1.15)],
    ["ROI", percent(evaluation.roi), excelKpiStyleAbove(evaluation.roi, input.targetRoi, 0.85)],
    ["EVA anual", currency(evaluation.eva), evaluation.eva >= 0 ? "KpiGreen" : "KpiRed"],
    ["EBITDA prom.", currency(evaluation.ebitdaAverage || 0), evaluation.ebitdaAverage >= 0 ? "KpiGreen" : "KpiRed"],
    ["Beneficio prom.", currency(evaluation.annualAverageFlow || 0), evaluation.annualAverageFlow >= 0 ? "KpiGreen" : "KpiRed"],
    ["Alineacion estrategica", `${number(evaluation.score, 0)} / 100`, strategicScoreStatus(evaluation.score) === "success" ? "KpiGreen" : strategicScoreStatus(evaluation.score) === "warning" ? "KpiWarning" : "KpiRed"],
  ];

  if (input.impactCategory === "Ventas") {
    detailedKpiRows.push(
      ["P.E. U$ / mes", currency(evaluation.breakEvenMonthlyRevenue || 0), excelKpiStyleAbove(expectedMonthlyRevenue, evaluation.breakEvenMonthlyRevenue || 1, 0.9)],
      ["P.E. unds / mes", `${number(evaluation.breakEvenMonthlyUnits || 0, 0)} unds.`, excelKpiStyleAbove(expectedMonthlyUnits, evaluation.breakEvenMonthlyUnits || 1, 0.9)],
      ["Margen neto", percent(evaluation.netMarginPct || 0), evaluation.netMarginPct >= 10 ? "KpiGreen" : evaluation.netMarginPct >= 5 ? "KpiWarning" : "KpiRed"]
    );
  } else if (input.impactCategory === "Ahorro") {
    detailedKpiRows.push(
      ["Ahorro promedio", currency(evaluation.annualAverageSavings || 0), evaluation.annualAverageSavings > 0 ? "KpiGreen" : "KpiRed"],
      ["Flujo prom.", currency(evaluation.annualAverageFlow || 0), evaluation.annualAverageFlow > 0 ? "KpiGreen" : "KpiRed"]
    );
  } else {
    detailedKpiRows.push(["Alineacion estrategica", `${number(evaluation.score, 0)} / 100`, strategicScoreStatus(evaluation.score) === "success" ? "KpiGreen" : strategicScoreStatus(evaluation.score) === "warning" ? "KpiWarning" : "KpiRed"]);
  }

  const detailedKpiRowsXml = detailedKpiRows.reduce((rows, current, index) => {
    if (index % 4 === 0) {
      rows.push(row(detailedKpiRows.slice(index, index + 4).flatMap(([label, value, style]) => [
        cell(label, { style: "KpiLabel" }),
        cell(value, { style }),
      ]), { height: 30 }));
    }
    return rows;
  }, []);

  const detailedSummaryRows = [
    row([cell("REPORTE EJECUTIVO CAPEX", { style: "Title", mergeAcross: 7 })], { height: 34 }),
    row([cell(input.projectName || "Proyecto CAPEX", { style: "Subtitle", mergeAcross: 7 })], { height: 24 }),
    blankRow,
    row([
      cell("Codigo unico del proyecto", { style: "Label" }),
      cell(input.projectCode, { style: "Code", mergeAcross: 2 }),
      cell("Decision sugerida", { style: "Label" }),
      cell(evaluation.recommendation.label, { style: `Decision${evaluation.recommendation.tone}`, mergeAcross: 2 }),
    ], { height: 28 }),
    blankRow,
    sectionRow("Datos generales del proyecto"),
    twoColumnRow("Area solicitante", input.businessArea),
    twoColumnRow("Unidad de negocio", input.businessUnit),
    twoColumnRow("Sponsor / Driver", input.sponsor),
    twoColumnRow("Tipo CAPEX", projectType),
    twoColumnRow("Proyecto Malta Asociado", formatMaltaProject(input)),
    twoColumnRow("KPI Grupo que Impacta", input.groupKpi),
    twoColumnRow("Enfoque", formatStrategicObjectives(input.strategicObjectives)),
    twoColumnRow("Impacto economico", input.impactCategory || "Ventas"),
    twoColumnRow("Horizonte", `${number(input.projectLife, 0)} anos`),
    twoColumnRow("Objetivo", input.projectGoal),
    blankRow,
    sectionRow("Resumen ejecutivo"),
    row([cell(recommendationText, { style: "LongText", mergeAcross: 7 })], { height: 48 }),
    blankRow,
    sectionRow("Principales KPIs"),
    ...detailedKpiRowsXml,
  ].join("");

  const assumptionRows = [
    ["Equipo", currency(input.equipmentCost), "Instalacion", currency(input.installationCost), "Prop. e infra.", currency(input.propertyInfrastructureCost)],
    ["Capacitacion", currency(input.trainingCost), "Otros costos", currency(input.otherCosts), "WACC", percent(input.discountRate)],
    ["Impuesto", percent(input.taxRate), "Residual", percent(input.residualPct), "Valor residual", currency(input.salvageValue)],
    ["Deprec. anual", currency(input.annualDepreciation), "TIR minima", percent(input.requiredIrr), "Payback max.", `${number(input.maxPayback, 1)} anos`],
  ];
  if (input.impactCategory === "Ventas") {
    assumptionRows.push(
      ["Unidades A1", number(input.salesUnitsYear1, 0), "Ticket price", currency(input.ticketPrice), "Crec. unidades", percent(input.unitGrowthRate)],
      ["Costo variable", percent(input.variableCostPct), "% Costo de Venta", percent(input.salesExpensePct), "Gasto fijo", `${currency(input.fixedCommercialCost)} / ${percent(input.fixedCommercialCostGrowthPct || 0)}`]
    );
  } else if (input.impactCategory === "Ahorro") {
    assumptionRows.push(["Ahorro anual", currency(input.annualCostSavings), "Crec. anual", percent(input.annualGrowthRate), "Impacto", "Ahorro"]);
  } else {
    assumptionRows.push(["Impacto", "Sin retorno directo", "Opex incr.", currency(input.annualOpexIncrease), "Riesgo evitado", currency(input.riskAvoidanceBenefit)]);
  }
  if (input.annualTemplate) {
    assumptionRows.push(["Plantilla anual", input.annualTemplate.sourceName || "Cargada", "Horizonte", `${number(input.annualTemplate.years || input.projectLife, 0)} anos`, "Uso", "Valores por ano"]);
  }

  const detailedResultRows = [
    row([cell("RESULTADO Y SUPUESTOS", { style: "Title", mergeAcross: 7 })], { height: 34 }),
    row([cell(input.projectName || "Proyecto CAPEX", { style: "Subtitle", mergeAcross: 7 })], { height: 24 }),
    blankRow,
    sectionRow("Alineacion estrategica"),
    row(["Indicador", "Resultado", "Lectura", "Avance"].map((label) => cell(label, { style: "TableHeader" })), { height: 24 }),
    ...evaluation.scoreRows.map((scoreRow) =>
      row([
        cell(scoreRow.label, { style: "TableCell" }),
        cell(scoreRow.display, { style: "TableCell" }),
        cell(scoreRow.helper, { style: "TableCell", mergeAcross: 1 }),
        cell(`${number(clamp(scoreRow.value, 0, 100), 0)}%`, { style: "TableCell" }),
      ], { height: 24 })
    ),
    blankRow,
    sectionRow("Recomendacion general"),
    row([cell(recommendationText, { style: "LongText", mergeAcross: 7 })], { height: 54 }),
    blankRow,
    sectionRow("Supuestos base"),
    ...assumptionRows.map((items) =>
      row(items.map((item, index) => cell(item, { style: index % 2 === 0 ? "Label" : "Value" })), { height: 26 })
    ),
  ].join("");

  const years = evaluation.flows.map((flow) => `A${flow.year}`);
  const excelBaseYear = input.annualTemplate?.baseYear || {};
  const excelYearZero = {
    units: isFiniteNumber(excelBaseYear.units) ? excelBaseYear.units : null,
    ticketPrice: isFiniteNumber(excelBaseYear.ticketPrice) ? excelBaseYear.ticketPrice : null,
    revenue: isFiniteNumber(excelBaseYear.revenue) ? excelBaseYear.revenue : 0,
    savings: isFiniteNumber(excelBaseYear.savings) ? excelBaseYear.savings : 0,
    variableCost: isFiniteNumber(excelBaseYear.variableCost) ? excelBaseYear.variableCost : 0,
    salesExpense: isFiniteNumber(excelBaseYear.salesExpense) ? excelBaseYear.salesExpense : 0,
    fixedCost: isFiniteNumber(excelBaseYear.fixedCost) ? excelBaseYear.fixedCost : 0,
    opex: isFiniteNumber(excelBaseYear.incrementalCost) ? excelBaseYear.incrementalCost : 0,
    depreciation: isFiniteNumber(excelBaseYear.depreciation) ? excelBaseYear.depreciation : 0,
    ebit: isFiniteNumber(excelBaseYear.operatingResult) ? excelBaseYear.operatingResult : 0,
    taxes: 0,
    netIncome: 0,
    netFlow: -evaluation.totalInvestment,
    discountedFlow: -evaluation.totalInvestment,
    cumulativeFlow: -evaluation.totalInvestment,
    cumulativeDiscountedFlow: -evaluation.totalInvestment,
    breakEvenMonthlyRevenue: null,
    breakEvenMonthlyUnits: null,
    netMarginPct: null,
  };
  const excelSalesCostRows = input.impactCategory === "Ventas"
    ? [
      { label: "Costo variable", values: [excelYearZero.variableCost, ...evaluation.flows.map((flow) => flow.variableCost)] },
      { label: "Costo de venta", values: [excelYearZero.salesExpense, ...evaluation.flows.map((flow) => flow.salesExpense)] },
      { label: "Gasto fijo", values: [excelYearZero.fixedCost, ...evaluation.flows.map((flow) => flow.fixedCost)] },
    ]
    : [];
  const excelSalesTemplateOperatingRows = input.impactCategory === "Ventas"
    ? [
      { label: "Costos incrementales", values: [excelYearZero.opex, ...evaluation.flows.map((flow) => flow.incrementalOpex || 0)] },
      { label: "Ahorros", values: [excelYearZero.savings, ...evaluation.flows.map((flow) => flow.savings)] },
    ]
    : [];
  const excelNonSalesOperatingRows = input.impactCategory !== "Ventas"
    ? [
      { label: "Ahorros", values: [excelYearZero.savings, ...evaluation.flows.map((flow) => flow.savings)] },
      { label: "Opex", values: [excelYearZero.opex, ...evaluation.flows.map((flow) => flow.opex)] },
    ]
    : [];
  const excelSalesAnalysisRows = input.impactCategory === "Ventas"
    ? [
      { label: "Punto de Equilibrio (U$ por mes)", values: [excelYearZero.breakEvenMonthlyRevenue, ...evaluation.flows.map((flow) => flow.breakEvenMonthlyRevenue)] },
      { label: "Punto de Equilibrio (Unds por mes)", values: [excelYearZero.breakEvenMonthlyUnits, ...evaluation.flows.map((flow) => flow.breakEvenMonthlyUnits)], type: "number" },
      { label: "Margen Neto", values: [excelYearZero.netMarginPct, ...evaluation.flows.map((flow) => flow.netMarginPct)], type: "percent", emphasis: true },
    ]
    : [];
  const excelFlowMatrixRows = [
    { label: "Unidades", values: [excelYearZero.units, ...evaluation.flows.map((flow) => flow.units)], type: "number" },
    { label: "Ticket price", values: [excelYearZero.ticketPrice, ...evaluation.flows.map((flow) => flow.units ? flow.revenue / flow.units : 0)] },
    { label: "Ventas", values: [excelYearZero.revenue, ...evaluation.flows.map((flow) => flow.revenue)] },
    ...excelSalesCostRows,
    ...excelSalesTemplateOperatingRows,
    ...excelNonSalesOperatingRows,
    { label: "Depreciaci\u00f3n", values: [excelYearZero.depreciation, ...evaluation.flows.map((flow) => flow.depreciation)] },
    { label: "EBITDA", values: [excelYearZero.ebit, ...evaluation.flows.map((flow) => flow.ebitda)], emphasis: true },
    { label: "EBIT", values: [excelYearZero.ebit, ...evaluation.flows.map((flow) => flow.ebit)], emphasis: true },
    { label: "Impuestos", values: [excelYearZero.taxes, ...evaluation.flows.map((flow) => flow.taxes)] },
    { label: "Utilidad Neta", values: [excelYearZero.netIncome, ...evaluation.flows.map((flow) => flow.netIncome)], emphasis: true },
    { label: "Flujo neto", values: [excelYearZero.netFlow, ...evaluation.flows.map((flow) => flow.netFlow)], emphasis: true },
    { label: "Flujo descontado", values: [excelYearZero.discountedFlow, ...evaluation.flows.map((flow) => flow.discountedFlow)] },
    { label: "Flujo acumulado", values: [excelYearZero.cumulativeFlow, ...evaluation.flows.map((flow) => flow.cumulativeFlow)] },
    { label: "Flujo descontado acumulado", values: [excelYearZero.cumulativeDiscountedFlow, ...evaluation.flows.map((flow) => flow.cumulativeDiscountedFlow)] },
    ...excelSalesAnalysisRows,
  ];
  const matrixValueCell = (value, rowDefinition) => {
    if (value === null || value === undefined) return cell("", { style: "TableCell" });
    if (rowDefinition.type === "number") return cell(Math.round(value), { style: "TableCell" });
    if (rowDefinition.type === "percent") return cell(percent(value, 1), { style: rowDefinition.emphasis ? "TableCellStrong" : "TableCell" });
    return cell(value, {
      style: value < 0
        ? "MoneyNegative"
        : rowDefinition.emphasis && value > 0
          ? "MoneyPositive"
          : "Money",
    });
  };
  const detailedFlowRows = [
    row([cell("DETALLE DE FLUJOS", { style: "Title", mergeAcross: years.length + 1 })], { height: 34 }),
    blankRow,
    row(["Supuestos", "A\u00f1o 0", ...years.map((year) => year.replace("A", "A\u00f1o "))].map((label) => cell(label, { style: "TableHeader" })), { height: 24 }),
    ...excelFlowMatrixRows.map((flowRow) =>
      row([
        cell(flowRow.label, { style: flowRow.emphasis ? "TableCellStrong" : "TableCell" }),
        ...flowRow.values.map((value) => matrixValueCell(value, flowRow)),
      ], { height: 22 })
    ),
  ].join("");
  const detailedFlowColumns = [
    '<Column ss:Width="118"/>',
    ...Array.from({ length: years.length + 1 }, () => '<Column ss:Width="86"/>'),
  ].join("");
  const annualTemplateWorksheet = input.annualTemplate
    ? (() => {
      const flowByYear = new Map(evaluation.flows.map((flow) => [Number(flow.year), flow]));
      const annualHeader = ["Ano", "Unidades", "Ticket price", "Ventas", "Costo variable", "Costo de venta", "Gasto fijo", "Costos incr.", "Ahorros", "Depreciacion", "Resultado op.", "Flujo neto"];
      const annualRows = [
        row([cell("SUPUESTOS ANUALES CARGADOS", { style: "Title", mergeAcross: annualHeader.length - 1 })], { height: 34 }),
        row([cell("Fuente", { style: "Label" }), cell(input.annualTemplate.sourceName || "Plantilla", { style: "Value", mergeAcross: 3 }), cell("Tipo impacto", { style: "Label" }), cell(input.annualTemplate.impactCategory || input.impactCategory, { style: "Value", mergeAcross: 3 })], { height: 24 }),
        blankRow,
        sectionRow("Inversion importada", annualHeader.length - 1),
        row(["Equipos", input.equipmentCost, "Instalacion", input.installationCost, "Prop. e infra.", input.propertyInfrastructureCost, "Capacitacion", input.trainingCost, "Otros", input.otherCosts].map((value, index) =>
          cell(value, { style: index % 2 === 0 ? "Label" : "Money" })
        ), { height: 24 }),
        blankRow,
        sectionRow("Variables por ano", annualHeader.length - 1),
        row(annualHeader.map((label) => cell(label, { style: "TableHeader" })), { height: 24 }),
        ...input.annualTemplate.annual.map((item) =>
          row([
            cell(item.year, { style: "TableCell" }),
            cell(Math.round(item.units || 0), { style: "TableCell" }),
            cell(item.ticketPrice || 0, { style: "Money" }),
            cell(item.revenue || 0, { style: "Money" }),
            cell(item.variableCost || 0, { style: "Money" }),
            cell(item.salesExpense || 0, { style: "Money" }),
            cell(item.fixedCost || 0, { style: "Money" }),
            cell(item.incrementalCost || item.opex || 0, { style: "Money" }),
            cell((item.savings || 0) + (item.riskBenefit || 0), { style: "Money" }),
            cell(item.depreciation || 0, { style: "Money" }),
            cell(item.operatingResult || flowByYear.get(Number(item.year))?.ebit || 0, { style: "Money" }),
            cell(flowByYear.get(Number(item.year))?.netFlow || 0, { style: "Money" }),
          ], { height: 22 })
        ),
      ].join("");
      return `<Worksheet ss:Name="Supuestos Anuales"><Table>${Array.from({ length: annualHeader.length }, () => '<Column ss:Width="105"/>').join("")}${annualRows}</Table></Worksheet>`;
    })()
    : "";

  const workbook = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Styles>
    <Style ss:ID="Default" ss:Name="Normal">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#15356F"/>
    </Style>
    <Style ss:ID="Title">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="18" ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#33475E" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="Subtitle">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="12" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#4A5D73" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="Section">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#0B237E"/>
      <Interior ss:Color="#DDE7FF" ss:Pattern="Solid"/>
      <Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#1F36B3"/></Borders>
    </Style>
    <Style ss:ID="Label">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#4F6A9A"/>
      <Interior ss:Color="#EEF2F5" ss:Pattern="Solid"/>
      <Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D9E1EA"/></Borders>
    </Style>
    <Style ss:ID="Value">
      <Alignment ss:Vertical="Center" ss:WrapText="1"/>
      <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#081F63"/>
      <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
      <Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D9E1EA"/></Borders>
    </Style>
    <Style ss:ID="Code">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="12" ss:Bold="1" ss:Color="#081F63"/>
      <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="LongText">
      <Alignment ss:Vertical="Center" ss:WrapText="1"/>
      <Font ss:FontName="Calibri" ss:Size="10" ss:Color="#15356F"/>
      <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="KpiLabel">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="9" ss:Bold="1" ss:Color="#4F6A9A"/>
      <Interior ss:Color="#F8FBFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="KpiBlue"><Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#081F63"/><Interior ss:Color="#EAF2FF" ss:Pattern="Solid"/></Style>
    <Style ss:ID="KpiGreen"><Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#0F6F4D"/><Interior ss:Color="#E7F6EF" ss:Pattern="Solid"/></Style>
    <Style ss:ID="KpiWarning"><Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#8A6500"/><Interior ss:Color="#FFF3CD" ss:Pattern="Solid"/></Style>
    <Style ss:ID="KpiRed"><Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#8A2636"/><Interior ss:Color="#FFE9EE" ss:Pattern="Solid"/></Style>
    <Style ss:ID="KpiNeutral"><Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#33475E"/><Interior ss:Color="#EEF2F5" ss:Pattern="Solid"/></Style>
    <Style ss:ID="ActionNumber">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#1F36B3" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="TableHeader">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#33475E" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="TableCell"><Font ss:FontName="Calibri" ss:Size="10" ss:Color="#15356F"/><Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/></Style>
    <Style ss:ID="TableCellStrong"><Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#081F63"/><Interior ss:Color="#F8FBFF" ss:Pattern="Solid"/></Style>
    <Style ss:ID="Money"><NumberFormat ss:Format="$#,##0;[Red]($#,##0)"/><Font ss:FontName="Calibri" ss:Size="10" ss:Color="#15356F"/></Style>
    <Style ss:ID="MoneyPositive"><NumberFormat ss:Format="$#,##0"/><Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#0F6F4D"/></Style>
    <Style ss:ID="MoneyNegative"><NumberFormat ss:Format="$#,##0;[Red]($#,##0)"/><Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#8A2636"/></Style>
    <Style ss:ID="Decisionsuccess"><Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#0F6F4D"/><Interior ss:Color="#E7F6EF" ss:Pattern="Solid"/></Style>
    <Style ss:ID="Decisionwarning"><Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#8A6500"/><Interior ss:Color="#FFF3CD" ss:Pattern="Solid"/></Style>
    <Style ss:ID="Decisiondanger"><Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#8A2636"/><Interior ss:Color="#FFE9EE" ss:Pattern="Solid"/></Style>
    <Style ss:ID="Empty"><Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/></Style>
  </Styles>
  <Worksheet ss:Name="Resumen Ejecutivo">
    <Table>
      <Column ss:Width="118"/><Column ss:Width="110"/><Column ss:Width="110"/><Column ss:Width="118"/><Column ss:Width="110"/><Column ss:Width="110"/><Column ss:Width="118"/><Column ss:Width="110"/>
      ${detailedSummaryRows}
    </Table>
  </Worksheet>
  <Worksheet ss:Name="Resultado y Supuestos">
    <Table>
      <Column ss:Width="118"/><Column ss:Width="110"/><Column ss:Width="110"/><Column ss:Width="118"/><Column ss:Width="110"/><Column ss:Width="110"/><Column ss:Width="118"/><Column ss:Width="110"/>
      ${detailedResultRows}
    </Table>
  </Worksheet>
  <Worksheet ss:Name="Detalle de Flujos">
    <Table>
      ${detailedFlowColumns}
      ${detailedFlowRows}
    </Table>
  </Worksheet>
  ${annualTemplateWorksheet}
</Workbook>`;

  return new Blob([workbook], { type: "application/vnd.ms-excel" });
}

async function exportExecutivePdf() {
  const { input, evaluation } = getEvaluationPackage();
  statusNode.textContent = `Generando reporte PDF para "${input.projectName}"...`;
  downloadPdfButton.disabled = true;

  try {
    const pdfBlob = await buildDetailedExecutivePdf(input, evaluation);
    openBlob(pdfBlob);
    statusNode.textContent = `Reporte PDF abierto para "${input.projectName}".`;
  } catch (error) {
    statusNode.textContent = "No se pudo generar el PDF. Revisa la consola para mas detalle.";
    console.error(error);
  } finally {
    downloadPdfButton.disabled = false;
  }
}

function exportExcelWorkbook() {
  const { input, evaluation } = getEvaluationPackage();
  const excelBlob = buildExcelWorkbook(input, evaluation);
  downloadBlob(`evaluacion-capex-${slugify(input.projectName)}.xls`, excelBlob);
  statusNode.textContent = `Archivo Excel generado para "${input.projectName}".`;
}

async function sendEvaluationToSharePoint() {
  const flowUrl = getPowerAutomateFlowUrl();
  if (!flowUrl) {
    statusNode.textContent = "Falta configurar la URL del flujo de Power Automate para guardar la solicitud.";
    return;
  }

  const { input, evaluation } = getEvaluationPackage();
  const payload = buildSharePointPayload(input, evaluation);
  sendSharePointButton.disabled = true;
  statusNode.textContent = `Guardando solicitud CAPEX "${input.projectName}"...`;

  try {
    const response = await fetch(flowUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Power Automate respondio ${response.status}`);
    }

    statusNode.textContent = `Solicitud CAPEX "${input.projectName}" guardada correctamente.`;
  } catch (error) {
    console.error(error);
    statusNode.textContent = "No se pudo guardar la solicitud. Revisa la URL del flujo, CORS o el historial de Power Automate.";
  } finally {
    sendSharePointButton.disabled = false;
  }
}

function evaluateProject(options = {}) {
  const shouldSave = options.persist !== false;
  const input = getInputs();
  statusNode.textContent = "Calculando indicadores y recomendacion...";
  if (evaluateButton) {
    evaluateButton.disabled = true;
  }

  window.setTimeout(() => {
    const evaluation = buildEvaluation(input);
    latestInput = input;
    latestEvaluation = evaluation;
    if (shouldSave) {
      saveLastCapex(input, evaluation);
    }

    renderHeadline(input);
    renderCards(evaluation);
    renderProgressRows("scoreTable", evaluation.scoreRows);
    renderValidationMessages(input, evaluation);
    renderRecommendation(evaluation.recommendation);
    renderCashFlowTable(evaluation.flows, evaluation);
    drawCashFlowChart(evaluation.flows, evaluation.totalInvestment);

    statusNode.textContent = shouldSave
      ? `Evaluacion completada y ultimo CAPEX guardado para "${input.projectName}".`
      : `Evaluacion completada para "${input.projectName}".`;
    if (evaluateButton) {
      evaluateButton.disabled = false;
    }
  }, 40);
}

if (evaluateButton) {
  evaluateButton.addEventListener("click", () => {
    if (!validateCurrentStep()) return;
    const resultIndex = wizardSteps.findIndex((button) => button.dataset.step === "result");
    if (resultIndex >= 0) {
      setWizardStep(resultIndex);
    }
    evaluateProject();
  });
}
newCapexButton.addEventListener("click", startNewCapex);
if (sendSharePointButton) {
  sendSharePointButton.addEventListener("click", sendEvaluationToSharePoint);
}
downloadPdfButton.addEventListener("click", exportExecutivePdf);
downloadExcelButton.addEventListener("click", exportExcelWorkbook);
if (downloadAnnualTemplateButton && downloadAnnualTemplateButton.tagName !== "A") {
  downloadAnnualTemplateButton.addEventListener("click", exportAnnualTemplate);
}
if (uploadAnnualTemplateInput) {
  uploadAnnualTemplateInput.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    importAnnualTemplateFile(file);
    event.target.value = "";
  });
}
elements.businessArea.addEventListener("change", () => syncSponsorByArea());
elements.businessUnit.addEventListener("change", () => syncSponsorByArea(elements.businessUnit.value));
elements.projectType.addEventListener("change", () => {
  applyCapexTemplate(elements.projectType.value);
  evaluateProject({ persist: false });
});
["equipmentCost", "installationCost", "propertyInfrastructureCost", "trainingCost", "otherCosts", "residualPct"].forEach((id) => {
  elements[id].addEventListener("input", syncRequiredInvestmentTotal);
});
impactCategoryOptions.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-value]");
  if (!button) return;
  syncImpactCategory(button.dataset.value);
  statusNode.textContent = `Impacto "${button.dataset.value}" seleccionado.`;
});
if (strategyOptions) {
  strategyOptions.addEventListener("click", (event) => {
    const button = event.target.closest(".strategy-pill");
    if (!button) return;
    syncStrategicFocus(button.dataset.value);
  });
}
elements.strategicObjectives.addEventListener("change", () => {
  syncMaltaProjectOptions();
});
elements.maltaProject.addEventListener("change", () => {
  syncOtherMaltaJustification();
  syncQualitativeScores();
});
wizardSteps.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (index > currentWizardStep && !validateCurrentStep()) return;
    setWizardStep(index > currentWizardStep + 1 ? currentWizardStep + 1 : index);
  });
});
if (prevStepButton) {
  prevStepButton.addEventListener("click", () => setWizardStep(currentWizardStep - 1));
}
if (nextStepButton) {
  nextStepButton.addEventListener("click", () => {
    if (!validateCurrentStep()) return;
    if (currentWizardStep < wizardSteps.length - 1) {
      setWizardStep(currentWizardStep + 1);
      return;
    }
    evaluateProject();
  });
}
attachHelpDots();
hideTemplateOnlyGovernanceRows();
const resultsTitle = document.querySelector(".results-panel h2");
if (resultsTitle) {
  resultsTitle.textContent = "Evaluaci\u00f3n y Recomendaci\u00f3n del Proyecto";
}
populateBusinessAreaOptions();
const restoredLastCapex = restoreLastCapex();
if (!restoredLastCapex) {
  syncSponsorByArea();
  applyCorporateAssumptions();
  applyCapexTemplate(elements.projectType.value || "Crecimiento", { updateStatus: false });
  syncStrategicFocus(elements.strategicFocus.value || "Ventas");
}
setWizardStep(0);
evaluateProject({ persist: false });
if (restoredLastCapex) {
  window.setTimeout(() => {
    statusNode.textContent = "Ultimo CAPEX registrado recuperado.";
  }, 80);
}
