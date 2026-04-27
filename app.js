const fieldIds = [
  "projectCode",
  "projectName",
  "businessArea",
  "sponsor",
  "impactCategory",
  "strategicFocus",
  "strategyAlignmentText",
  "problemSolvedText",
  "expectedImpactText",
  "projectType",
  "projectGoal",
  "projectLife",
  "equipmentCost",
  "installationCost",
  "trainingCost",
  "otherCosts",
  "requiredInvestmentTotal",
  "workingCapital",
  "salvageValue",
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
  "annualDepreciation",
  "discountRate",
  "taxRate",
  "requiredIrr",
  "maxPayback",
  "targetRoi",
  "targetScore",
  "strategicAlignment",
  "operationalUrgency",
  "riskReduction",
  "executionReadiness",
];

const projectTypeLabels = {
  expansion: "Expansion",
  productivity: "Productividad",
  replacement: "Reemplazo",
  compliance: "Cumplimiento",
  strategic: "Estrategico",
};

const areaSponsorMap = {
  "Repuestos": "Miguel Sacasa",
  "Autos Nuevos Toyota": "Mariano Estrada",
  "Cpd Repuestos": "Miguel Sacasa",
  "Talleres - Autos": "Fernando Baldizon",
  "Informatica": "Antonio Alvarez",
  "Rent A Car": "Alejandro Vega",
  "Camiones Hino": "Luis Rivera",
  "Talleres - Hino": "Fernando Baldizon",
  "Talleres": "Fernando Baldizon",
  "Fidem": "Marco Castro",
  "Capital Humano": "Mundo Martinez",
  "Autos Usados": "Alejandro Vega",
  "Autos Nuevos Suzuki": "Gabriela Avellan",
  "Equipos Industriales": "Lenner Castillo",
  "Call Center": "Antonio Alvarez",
  "Capesa": "Marco Castro",
  "Talleres - Motos": "Jose Luis Salinas",
  "Mercadeo": "Roger Miranda",
  "Autos Nuevos Kia": "Jose Garcete",
  "Autos Nuevos Geely": "Roberto Rocha",
  "Camiones Faw": "Eddye Jarquin",
  "Motos - Genesis": "Jose Luis Salinas",
  "Motos - Yamaha": "Jose Luis Salinas",
  "Motos - Hero": "Jose Luis Salinas",
  "Motos - Yadea": "Jose Luis Salinas",
  "Finanzas": "Emilia Navarro",
  "Alpesa": "Marco Saenz",
};

const categoryFocusMap = {
  Ventas: "Ventas",
  Ahorro: "Ahorro",
  "No genera impacto economico": "Cumplimiento / continuidad",
};

const elements = Object.fromEntries(fieldIds.map((id) => [id, document.getElementById(id)]));
const evaluateButton = document.getElementById("evaluateProject");
const newCapexButton = document.getElementById("newCapex");
const downloadPdfButton = document.getElementById("downloadPdf");
const downloadExcelButton = document.getElementById("downloadExcel");
const impactCategoryOptions = document.getElementById("impactCategoryOptions");
const strategyOptions = document.getElementById("strategyOptions");
const statusNode = document.getElementById("evaluationStatus");
const decisionBadge = document.getElementById("decisionBadge");
const recommendationTag = document.getElementById("recommendationTag");
let latestInput = null;
let latestEvaluation = null;
const LAST_CAPEX_STORAGE_KEY = "capex:lastRegistered";

function getInputValue(id) {
  const element = elements[id];
  if (!element) return "";
  if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT") {
    return element.value;
  }
  return "";
}

function getInputs() {
  return {
    projectCode: getInputValue("projectCode"),
    projectName: getInputValue("projectName"),
    businessArea: getInputValue("businessArea"),
    sponsor: getInputValue("sponsor"),
    impactCategory: getInputValue("impactCategory"),
    projectType: getInputValue("projectType"),
    projectGoal: getInputValue("projectGoal"),
    projectLife: Number(getInputValue("projectLife")),
    equipmentCost: Number(getInputValue("equipmentCost")),
    installationCost: Number(getInputValue("installationCost")),
    trainingCost: Number(getInputValue("trainingCost")),
    otherCosts: Number(getInputValue("otherCosts")),
    requiredInvestmentTotal: Number(getInputValue("requiredInvestmentTotal")),
    workingCapital: Number(getInputValue("workingCapital")),
    salvageValue: Number(getInputValue("salvageValue")),
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
    annualDepreciation: Number(getInputValue("annualDepreciation")),
    discountRate: Number(getInputValue("discountRate")),
    taxRate: Number(getInputValue("taxRate")),
    requiredIrr: Number(getInputValue("requiredIrr")),
    maxPayback: Number(getInputValue("maxPayback")),
    targetRoi: Number(getInputValue("targetRoi")),
    targetScore: Number(getInputValue("targetScore")),
    strategicAlignment: Number(getInputValue("strategicAlignment")),
    operationalUrgency: Number(getInputValue("operationalUrgency")),
    riskReduction: Number(getInputValue("riskReduction")),
    executionReadiness: Number(getInputValue("executionReadiness")),
  };
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

    Object.entries(parsed.input).forEach(([id, value]) => {
      setFieldValue(id, value);
    });
    syncRequiredInvestmentTotal();
    syncImpactCategory(parsed.input.impactCategory || "Ventas");
    syncStrategicFocus(parsed.input.strategicFocus || "Ventas");
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
  const now = new Date();
  const year = now.getFullYear();
  const serial = String(
    now.getMonth() * 1000000 +
    now.getDate() * 10000 +
    now.getHours() * 100 +
    now.getMinutes()
  ).padStart(6, "0");
  return `CAPEX - ${areaCode} - ${year} - ${serial}`;
}

function syncSponsorByArea() {
  const selectedArea = elements.businessArea.value;
  const mappedSponsor = areaSponsorMap[selectedArea];
  if (mappedSponsor) {
    elements.sponsor.value = mappedSponsor;
  }
  elements.projectCode.value = generateProjectCode();
}

function syncRequiredInvestmentTotal() {
  const total =
    Number(elements.equipmentCost.value || 0) +
    Number(elements.installationCost.value || 0) +
    Number(elements.trainingCost.value || 0) +
    Number(elements.otherCosts.value || 0);
  elements.requiredInvestmentTotal.value = total;
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

  if (categoryFocusMap[selectedValue]) {
    syncStrategicFocus(categoryFocusMap[selectedValue]);
  }
}

function applyImpactMode(value) {
  document.querySelectorAll("[data-impact]").forEach((element) => {
    const modes = String(element.dataset.impact || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    element.hidden = !modes.includes(value);
  });
}

function setFieldValue(id, value) {
  if (elements[id]) {
    elements[id].value = value;
  }
}

function startNewCapex() {
  const defaults = {
    projectName: "",
    businessArea: "Repuestos",
    impactCategory: "Ventas",
    projectType: "productivity",
    projectGoal: "",
    strategyAlignmentText: "",
    problemSolvedText: "",
    expectedImpactText: "",
    projectLife: 5,
    equipmentCost: 0,
    installationCost: 0,
    trainingCost: 0,
    otherCosts: 0,
    workingCapital: 0,
    salvageValue: 0,
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
    annualDepreciation: 0,
    discountRate: 12,
    taxRate: 30,
    requiredIrr: 15,
    maxPayback: 4,
    targetRoi: 35,
    targetScore: 85,
    strategicAlignment: 3,
    operationalUrgency: 3,
    riskReduction: 3,
    executionReadiness: 3,
  };

  Object.entries(defaults).forEach(([id, value]) => setFieldValue(id, value));
  syncSponsorByArea();
  syncRequiredInvestmentTotal();
  syncImpactCategory("Ventas");
  syncStrategicFocus("Ventas");
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

function getEvaluationPackage() {
  const input = getInputs();
  const evaluation = buildEvaluation(input);
  latestInput = input;
  latestEvaluation = evaluation;
  saveLastCapex(input, evaluation);
  return { input, evaluation };
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
  const financialScore =
    clamp(metrics.npv / Math.max(metrics.totalInvestment, 1), -1, 1.5) * 22 +
    clamp(metrics.roi / Math.max(input.targetRoi, 1), 0, 1.5) * 16 +
    clamp(metrics.irrPct / Math.max(input.requiredIrr, 1), 0, 1.5) * 18 +
    clamp(input.maxPayback / Math.max(metrics.payback || 99, 1), 0, 1.5) * 12;

  const qualitativeScore =
    (input.strategicAlignment / 5) * 12 +
    (input.operationalUrgency / 5) * 8 +
    (input.riskReduction / 5) * 6 +
    (input.executionReadiness / 5) * 6 +
    clamp((18 - input.implementationMonths) / 18, 0, 1) * 6;

  if (input.impactCategory === "No genera impacto economico") {
    return clamp((qualitativeScore / 38) * 100, 0, 100);
  }

  return clamp(financialScore + qualitativeScore, 0, 100);
}

function buildCashFlows(input) {
  const totalInvestment =
    input.equipmentCost +
    input.installationCost +
    input.trainingCost +
    input.otherCosts;

  const years = Math.max(3, Math.min(10, Math.round(input.projectLife)));
  const taxRate = input.taxRate / 100;
  const discountRate = input.discountRate / 100;
  const contributionMarginPct = clamp(1 - (input.variableCostPct + input.salesExpensePct) / 100, 0, 1);
  const contributionPerUnit = (input.ticketPrice || 0) * contributionMarginPct;
  const breakEvenUnits = input.impactCategory === "Ventas" && contributionPerUnit > 0
    ? Math.ceil((input.fixedCommercialCost || 0) / contributionPerUnit)
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

    if (input.impactCategory === "Ventas") {
      const unitGrowthFactor = (1 + input.unitGrowthRate / 100) ** (year - 1);
      units = input.salesUnitsYear1 * unitGrowthFactor;
      revenue = units * input.ticketPrice;
      variableCost = revenue * (input.variableCostPct / 100);
      salesExpense = revenue * (input.salesExpensePct / 100);
      fixedCost = input.fixedCommercialCost;
      opex = variableCost + salesExpense + fixedCost;
    } else if (input.impactCategory === "Ahorro") {
      const growthFactor = (1 + input.annualGrowthRate / 100) ** (year - 1);
      savings = input.annualCostSavings * growthFactor;
      riskBenefit = input.riskAvoidanceBenefit * growthFactor;
      opex = input.annualOpexIncrease * growthFactor;
    } else {
      opex = input.annualOpexIncrease;
      riskBenefit = 0;
      savings = 0;
    }

    const ebitda = revenue + savings + riskBenefit - opex;
    const ebit = ebitda - input.annualDepreciation;
    const taxes = Math.max(ebit, 0) * taxRate;
    const netIncome = ebit - taxes;
    const fixedBurden = fixedCost + input.annualDepreciation;
    const breakEvenMonthlyRevenue = input.impactCategory === "Ventas" && contributionMarginPct > 0
      ? fixedBurden / contributionMarginPct / 12
      : 0;
    const breakEvenMonthlyUnits = input.impactCategory === "Ventas" && input.ticketPrice > 0
      ? breakEvenMonthlyRevenue / input.ticketPrice
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
      depreciation: input.annualDepreciation,
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
    const breakEvenCoverage = breakEvenUnits ? (input.salesUnitsYear1 / breakEvenUnits) * 100 : 0;
    diagnosticRows.unshift({
      label: "Punto de equilibrio unidades",
      value: clamp(breakEvenCoverage, 0, 140),
      display: breakEvenUnits ? `${number(breakEvenUnits, 0)} unid.` : "No calculable",
      helper: `Ano 1: ${number(input.salesUnitsYear1, 0)} unid.`,
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
        label: "Riesgo / continuidad",
        value: (input.riskReduction / 5) * 100,
        display: `${input.riskReduction}/5`,
        helper: "Peso clave para CAPEX sin impacto economico directo",
      },
      {
        label: "Urgencia operativa",
        value: (input.operationalUrgency / 5) * 100,
        display: `${input.operationalUrgency}/5`,
        helper: "Prioriza continuidad, cumplimiento y capacidad critica",
      },
      {
        label: "Preparacion de ejecucion",
        value: (input.executionReadiness / 5) * 100,
        display: `${input.executionReadiness}/5`,
        helper: "Reduce el riesgo de aprobar sin plan accionable",
      },
    ];
  }

  const scoreRows = [
    {
      label: "Score integral",
      value: score,
      display: `${number(score, 0)} / 100`,
      helper: `Meta ${number(input.targetScore, 0)}%`,
    },
    {
      label: "Alineacion",
      value: (input.strategicAlignment / 5) * 100,
      display: `${input.strategicAlignment}/5`,
      helper: "Plan estrategico",
    },
    {
      label: "Urgencia",
      value: (input.operationalUrgency / 5) * 100,
      display: `${input.operationalUrgency}/5`,
      helper: "Continuidad o capacidad",
    },
    {
      label: "Ejecucion",
      value: (input.executionReadiness / 5) * 100,
      display: `${input.executionReadiness}/5`,
      helper: "Madurez operativa",
    },
    {
      label: "Implementacion",
      value: clamp((18 - input.implementationMonths) / 18, 0, 1) * 100,
      display: `${number(input.implementationMonths, 0)} meses`,
      helper: "Duracion del proyecto",
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
    breakEvenUnits,
    contributionPerUnit,
    breakEvenMonthlyRevenue: firstYearFlow.breakEvenMonthlyRevenue || 0,
    breakEvenMonthlyUnits: firstYearFlow.breakEvenMonthlyUnits || 0,
    netMarginPct: firstYearFlow.netMarginPct || averageNetMarginPct,
    averageNetMarginPct,
    salesUnitsYear1: input.salesUnitsYear1,
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
  const meetsFinancials =
    metrics.npv > 0 &&
    metrics.irrPct >= input.requiredIrr &&
    metrics.roi >= input.targetRoi &&
    metrics.payback !== null &&
    metrics.payback <= input.maxPayback;

  const meetsScore = metrics.score >= input.targetScore;
  const lead = [];
  const actions = [];
  const hasBreakEvenGap =
    input.impactCategory === "Ventas" &&
    metrics.breakEvenUnits &&
    input.salesUnitsYear1 < metrics.breakEvenUnits;

  if (input.impactCategory === "No genera impacto economico") {
    if (meetsScore) {
      lead.push("El CAPEX no genera retorno directo, pero el score cualitativo respalda la necesidad por continuidad, cumplimiento o reduccion de riesgo.");
      actions.push("Aprobar con una justificacion ejecutiva enfocada en riesgo, continuidad operacional y obligatoriedad del proyecto.");
      actions.push("Documentar el costo de no ejecutar y los indicadores no financieros que se van a proteger.");
      actions.push("Definir responsables, fecha objetivo y evidencia de cumplimiento para el cierre post-implementacion.");
      return { label: "APROBAR", tone: "success", lead: lead.join(" "), actions };
    }

    if (metrics.score >= input.targetScore * 0.75) {
      lead.push("El CAPEX tiene una necesidad cualitativa razonable, pero requiere reforzar evidencias antes de pasar a aprobacion.");
      actions.push("Completar la justificacion de continuidad, cumplimiento o riesgo con datos verificables.");
      actions.push("Revisar si el alcance puede reducirse sin comprometer la necesidad critica.");
      actions.push("Aprobar condicionalmente solo si el area responsable documenta consecuencias, fechas y controles.");
      return { label: "REVISAR", tone: "warning", lead: lead.join(" "), actions };
    }

    lead.push("La necesidad no financiera aun no alcanza el score minimo para justificar el desembolso.");
    actions.push("Reformular el caso con evidencia de riesgo, impacto operativo o requerimiento regulatorio.");
    actions.push("Comparar alternativas de menor costo antes de retomar la solicitud.");
    actions.push("Posponer la aprobacion hasta que el score cualitativo alcance la meta definida.");
    return { label: "RECHAZAR", tone: "danger", lead: lead.join(" "), actions };
  }

  if (meetsFinancials && meetsScore && metrics.eva > 0) {
    lead.push("El proyecto muestra creacion de valor, recupera la inversion en un plazo razonable y tiene respaldo estrategico.");
    actions.push("Aprobar el proyecto y pasar a la etapa de presupuesto detallado y plan de implementacion.");
    actions.push("Monitorear durante la ejecucion los ahorros anuales y el ramp-up de productividad comprometido.");
    if (input.impactCategory === "Ventas") {
      actions.push(`Validar mensualmente unidades vendidas contra el punto de equilibrio de ${number(metrics.breakEvenUnits || 0, 0)} unidades.`);
    }
    actions.push("Definir un cierre post-implementacion para validar que el EVA y la TIR real sigan en rango.");
    if (input.implementationMonths > 12) {
      actions.push("Gestionar la implementacion por hitos para evitar que el calendario largo degrade el retorno esperado.");
    }
    return { label: "APROBAR", tone: "success", lead: lead.join(" "), actions };
  }

  if (metrics.npv > 0 && (meetsScore || metrics.eva > 0)) {
    lead.push("La iniciativa es prometedora, pero algunos supuestos financieros o de ejecucion aun requieren ajuste antes de aprobarla.");

    if (metrics.irrPct < input.requiredIrr) {
      actions.push("Revisar el monto de inversion o escalonar la implementacion para elevar la TIR.");
    }
    if (metrics.payback === null || metrics.payback > input.maxPayback) {
      actions.push("Identificar beneficios de corto plazo para reducir el payback esperado.");
    }
    if (metrics.roi < input.targetRoi) {
      actions.push("Revisar supuestos de ahorro, volumen o precio para acercar el ROI a la meta.");
    }
    if (hasBreakEvenGap) {
      actions.push("Ajustar precio, margen, gasto fijo o volumen esperado para superar el punto de equilibrio en unidades.");
    }
    if (metrics.score < input.targetScore) {
      actions.push("Fortalecer el caso estrategico y la preparacion operativa antes de presentarlo al comite.");
    }
    if (input.implementationMonths > 12) {
      actions.push("Revisar si la ejecucion puede dividirse en fases para bajar el riesgo de una implementacion extensa.");
    }

    actions.push("Aprobar condicionalmente solo si se documentan los ajustes y responsables.");
    return { label: "REVISAR", tone: "warning", lead: lead.join(" "), actions };
  }

  lead.push("Con los supuestos actuales, el proyecto no alcanza el nivel esperado de retorno o score para justificar su aprobacion.");
  actions.push("Reformular el alcance o dividir la iniciativa en fases con menor desembolso inicial.");
  actions.push("Revalidar beneficios anuales, costos incrementales y valor residual con el area operativa.");
  if (hasBreakEvenGap) {
    actions.push("Para ventas, recalibrar ticket price, margen, gasto fijo y unidades esperadas antes de volver a evaluar.");
  }
  if (input.implementationMonths > 12) {
    actions.push("Reducir la ventana de implementacion o asegurar beneficios parciales por etapa antes de retomarlo.");
  }
  actions.push("Posponer la aprobacion hasta contar con un caso financiero mas robusto o una necesidad regulatoria clara.");
  return { label: "RECHAZAR", tone: "danger", lead: lead.join(" "), actions };
}

function renderHeadline(input) {
  document.getElementById("projectHeadline").textContent = input.projectName || "Proyecto CAPEX";
  document.getElementById("areaHeadline").textContent = input.businessArea || "Sin area";
  document.getElementById("sponsorHeadline").textContent = input.sponsor || "Sin responsable";
  document.getElementById("typeHeadline").textContent = input.impactCategory || "Ventas";
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

function renderCards(evaluation) {
  const expectedMonthlyUnits = evaluation.salesUnitsYear1 / 12;
  const expectedMonthlyRevenue = evaluation.flows[0]?.revenue ? evaluation.flows[0].revenue / 12 : 0;
  const breakEvenUnitsStatus = evaluation.breakEvenMonthlyUnits
    ? statusAbove(expectedMonthlyUnits, evaluation.breakEvenMonthlyUnits)
    : "neutral";
  const breakEvenRevenueStatus = evaluation.breakEvenMonthlyRevenue
    ? statusAbove(expectedMonthlyRevenue, evaluation.breakEvenMonthlyRevenue)
    : "neutral";
  const marginStatus = evaluation.netMarginPct >= 10 ? "success" : evaluation.netMarginPct >= 5 ? "warning" : "danger";

  const categoryCards = {
    Ventas: [
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
      },
      {
        label: "Margen neto",
        value: percent(evaluation.netMarginPct || 0),
        subtext: "Utilidad neta / ventas",
        status: marginStatus,
      },
    ],
    Ahorro: [
      {
        label: "Ahorro promedio",
        value: currency(evaluation.annualAverageSavings || 0),
        subtext: `Flujo neto prom. ${currency(evaluation.annualAverageFlow)}`,
        status: evaluation.annualAverageSavings > 0 ? "success" : "danger",
      },
    ],
    "No genera impacto economico": [
      {
        label: "Score cualitativo",
        value: `${number(evaluation.score, 0)} / 100`,
        subtext: "Sin ingresos ni ahorros directos",
        status: statusAbove(evaluation.score, Number(elements.targetScore.value), 0.9),
      },
    ],
  }[evaluation.impactCategory] || [];

  const cards = [
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
      label: "ROI",
      value: percent(evaluation.roi),
      subtext: `Meta ${percent(Number(elements.targetRoi.value))}`,
      status: statusAbove(evaluation.roi, Number(elements.targetRoi.value), 0.85),
    },
    {
      label: "EVA anual",
      value: currency(evaluation.eva),
      subtext: "Luego de costo capital",
      status: evaluation.eva >= 0 ? "success" : evaluation.eva >= -evaluation.totalInvestment * 0.05 ? "warning" : "danger",
    },
    {
      label: "EBITDA prom.",
      value: currency(evaluation.ebitdaAverage || 0),
      subtext: "Potencial operativo",
      status: evaluation.ebitdaAverage >= 0 ? "success" : "danger",
    },
    {
      label: "Beneficio prom.",
      value: currency(evaluation.annualAverageFlow || 0),
      subtext: "Flujo neto anual",
      status: evaluation.annualAverageFlow >= 0 ? "success" : "danger",
    },
    {
      label: "Score",
      value: `${number(evaluation.score, 0)} / 100`,
      subtext: `Meta ${number(Number(elements.targetScore.value), 0)}%`,
      status: statusAbove(evaluation.score, Number(elements.targetScore.value), 0.9),
    },
    ...categoryCards,
  ];

  const container = document.getElementById("metricCards");
  container.innerHTML = cards
    .map(
      (card) => `
        <article class="metric-card ${card.status || "neutral"}">
          <p class="metric-label">${card.label}</p>
          <p class="metric-value">${card.value}</p>
          <p class="metric-subtext">${card.subtext}</p>
        </article>
      `
    )
    .join("");
}

function renderProgressRows(containerId, rows) {
  const container = document.getElementById(containerId);
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
  decisionBadge.textContent = recommendation.label;
  decisionBadge.className = `decision-badge ${recommendation.tone}`;
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
  const years = flows.map((flow) => `A${flow.year}`);
  const yearZero = {
    revenue: 0,
    savings: 0,
    variableCost: 0,
    salesExpense: 0,
    fixedCost: 0,
    opex: 0,
    depreciation: 0,
    ebit: 0,
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
      { label: "Costos var.", values: [yearZero.variableCost, ...flows.map((flow) => flow.variableCost)] },
      { label: "Gastos venta", values: [yearZero.salesExpense, ...flows.map((flow) => flow.salesExpense)] },
      { label: "Gasto fijo", values: [yearZero.fixedCost, ...flows.map((flow) => flow.fixedCost)] },
    ]
    : [];
  const salesAnalysisRows = evaluation.impactCategory === "Ventas"
    ? [
      {
        label: "P.E. U$ / mes",
        values: [yearZero.breakEvenMonthlyRevenue, ...flows.map((flow) => flow.breakEvenMonthlyRevenue)],
      },
      {
        label: "P.E. unds / mes",
        values: [yearZero.breakEvenMonthlyUnits, ...flows.map((flow) => flow.breakEvenMonthlyUnits)],
        type: "number",
      },
      {
        label: "Margen neto",
        values: [yearZero.netMarginPct, ...flows.map((flow) => flow.netMarginPct)],
        type: "percent",
        emphasis: true,
      },
    ]
    : [];

  const rows = [
    { label: "Ventas", values: [yearZero.revenue, ...flows.map((flow) => flow.revenue)] },
    ...salesCostRows,
    { label: "Ahorros", values: [yearZero.savings, ...flows.map((flow) => flow.savings)] },
    { label: "Opex", values: [yearZero.opex, ...flows.map((flow) => flow.opex)] },
    { label: "Deprec.", values: [yearZero.depreciation, ...flows.map((flow) => flow.depreciation)] },
    { label: "EBIT", values: [yearZero.ebit, ...flows.map((flow) => flow.ebit)], emphasis: true },
    { label: "Impuestos", values: [yearZero.taxes, ...flows.map((flow) => flow.taxes)] },
    { label: "Utilidad", values: [yearZero.netIncome, ...flows.map((flow) => flow.netIncome)], emphasis: true },
    { label: "Flujo neto", values: [yearZero.netFlow, ...flows.map((flow) => flow.netFlow)], emphasis: true },
    { label: "Flujo desc.", values: [yearZero.discountedFlow, ...flows.map((flow) => flow.discountedFlow)] },
    { label: "Acum.", values: [yearZero.cumulativeFlow, ...flows.map((flow) => flow.cumulativeFlow)] },
    { label: "Desc. acum.", values: [yearZero.cumulativeDiscountedFlow, ...flows.map((flow) => flow.cumulativeDiscountedFlow)] },
    ...salesAnalysisRows,
  ];

  head.innerHTML = `
    <tr>
      <th>Supuestos</th>
      <th>A0</th>
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

function drawCashFlowChart(flows) {
  const canvas = document.getElementById("cashFlowChart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const padding = 38;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;
  const maxValue = Math.max(...flows.map((flow) => flow.netFlow), 1);
  const minValue = Math.min(...flows.map((flow) => flow.netFlow), 0);
  const span = maxValue - minValue || 1;
  const zeroY = padding + (maxValue / span) * chartHeight;
  const barWidth = chartWidth / flows.length;

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

  flows.forEach((flow, index) => {
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
    ctx.fillText(`Y${flow.year}`, x + barActualWidth / 2, height - 10);
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
  dataField("Área solicitante", input.businessArea, 58, 584, 110);
  dataField("Responsable", input.sponsor, 184, 584, 110);
  dataField("Categoría", projectTypeLabels[input.projectType] || input.projectType, 310, 584, 108);
  dataField("Horizonte", `${number(input.projectLife, 0)} años`, 436, 584, 90);
  dataField("Impacto CAPEX", input.impactCategory || "Ventas", 58, 552, 150);
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
      : ["Score cualitativo", `${number(evaluation.score, 0)} / 100`, "#33475e"];
  const kpis = [
    ["Inversión total", currency(evaluation.totalInvestment), "#1f36b3"],
    ["VAN", currency(evaluation.npv), evaluation.npv >= 0 ? "#1f5fa8" : "#cc4f62"],
    ["TIR", evaluation.irrPct ? percent(evaluation.irrPct) : "No calculable", "#4771d6"],
    ["Payback", evaluation.payback === null ? "No recupera" : `${number(evaluation.payback, 1)} años`, "#7ea3ff"],
    ["ROI", percent(evaluation.roi), evaluation.roi >= input.targetRoi ? "#1f5fa8" : "#cc4f62"],
    ["EVA anual", currency(evaluation.eva), evaluation.eva >= 0 ? "#1f5fa8" : "#cc4f62"],
    ["Score integral", `${number(evaluation.score, 0)} / 100`, evaluation.score >= input.targetScore ? "#1f5fa8" : "#cc4f62"],
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
  const expectedMonthlyUnits = evaluation.salesUnitsYear1 ? evaluation.salesUnitsYear1 / 12 : 0;
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
    ["ROI", percent(evaluation.roi), `Meta ${percent(input.targetRoi)}`, statusAbove(evaluation.roi, input.targetRoi, 0.85)],
    ["EVA anual", currency(evaluation.eva), "Costo capital", evaluation.eva >= 0 ? "success" : "danger"],
    ["EBITDA prom.", currency(evaluation.ebitdaAverage || 0), "Potencial operativo", evaluation.ebitdaAverage >= 0 ? "success" : "danger"],
    ["Beneficio prom.", currency(evaluation.annualAverageFlow || 0), "Flujo neto anual", evaluation.annualAverageFlow >= 0 ? "success" : "danger"],
    ["Score", `${number(evaluation.score, 0)} / 100`, `Meta ${number(input.targetScore, 0)}%`, statusAbove(evaluation.score, input.targetScore, 0.9)],
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
    kpis.push(["Score cualitativo", `${number(evaluation.score, 0)} / 100`, "Sin retorno directo", statusAbove(evaluation.score, input.targetScore, 0.9)]);
  }

  const page1 = startPage("REPORTE EJECUTIVO CAPEX", input.projectName || "Proyecto CAPEX");
  fillRect(page1, margin, 648, contentWidth, 44, "#ffffff");
  strokeRect(page1, margin, 648, contentWidth, 44);
  field(page1, "Codigo unico del proyecto", input.projectCode, margin + 14, 675, 230);
  field(page1, "Decision sugerida", evaluation.recommendation.label, margin + 380, 675, 120);

  fillRect(page1, margin, 548, contentWidth, 80, "#ffffff");
  strokeRect(page1, margin, 548, contentWidth, 80);
  sectionTitle(page1, "Datos generales", margin + 14, 612);
  field(page1, "Area", input.businessArea, margin + 14, 590, 108);
  field(page1, "Responsable", input.sponsor, margin + 140, 590, 120);
  field(page1, "Impacto CAPEX", input.impactCategory || "Ventas", margin + 276, 590, 120);
  field(page1, "Horizonte", `${number(input.projectLife, 0)} anos`, margin + 418, 590, 70);
  field(page1, "Objetivo", input.projectGoal, margin + 14, 562, 500, 2);

  fillRect(page1, margin, 462, contentWidth, 66, "#ffffff");
  strokeRect(page1, margin, 462, contentWidth, 66);
  sectionTitle(page1, "Resumen ejecutivo", margin + 14, 512);
  wrapped(page1, [evaluation.recommendation.lead, ...evaluation.recommendation.actions.slice(0, 2)].join(" "), margin + 14, 492, contentWidth - 28, 8.5, "#15356f", "F1", 10, 4);

  sectionTitle(page1, "KPIs principales", margin, 428);
  const kpiWidth = (contentWidth - 3 * 8) / 4;
  kpis.slice(0, 12).forEach(([label, value, helper, status], index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    kpiCard(page1, label, value, helper, margin + col * (kpiWidth + 8), 350 - row * 64, kpiWidth, status);
  });

  const page2 = startPage("RESULTADO Y FONDO DEL CASO", input.projectName || "Proyecto CAPEX");
  sectionTitle(page2, "Score ejecutivo", margin, 680);
  const scoreWidth = (contentWidth - 4 * 8) / 5;
  evaluation.scoreRows.slice(0, 5).forEach((row, index) => {
    scoreCard(page2, row, margin + index * (scoreWidth + 8), 604, scoreWidth);
  });

  fillRect(page2, margin, 452, contentWidth, 116, "#ffffff");
  strokeRect(page2, margin, 452, contentWidth, 116);
  sectionTitle(page2, "Recomendacion general", margin + 14, 550);
  wrapped(page2, [evaluation.recommendation.lead, ...evaluation.recommendation.actions.slice(0, 3)].join(" "), margin + 14, 530, contentWidth - 28, 8.7, "#15356f", "F1", 11, 6);

  fillRect(page2, margin, 244, contentWidth, 180, "#ffffff");
  strokeRect(page2, margin, 244, contentWidth, 180);
  sectionTitle(page2, "Supuestos base", margin + 14, 406);
  const assumptionRows = [
    ["Equipo", currency(input.equipmentCost), "Instalacion", currency(input.installationCost), "Capacitacion", currency(input.trainingCost)],
    ["Otros costos", currency(input.otherCosts), "WACC", percent(input.discountRate), "Impuesto", percent(input.taxRate)],
    ["TIR minima", percent(input.requiredIrr), "Payback max.", `${number(input.maxPayback, 1)} anos`, "Meta ROI", percent(input.targetRoi)],
  ];
  if (input.impactCategory === "Ventas") {
    assumptionRows.push(["Unidades A1", number(input.salesUnitsYear1, 0), "Ticket price", currency(input.ticketPrice), "Crec. unidades", percent(input.unitGrowthRate)]);
    assumptionRows.push(["Costo variable", percent(input.variableCostPct), "Gasto ventas", percent(input.salesExpensePct), "Gasto fijo", currency(input.fixedCommercialCost)]);
  } else {
    assumptionRows.push(["Ahorro anual", currency(input.annualCostSavings), "Opex incr.", currency(input.annualOpexIncrease), "Riesgo evitado", currency(input.riskAvoidanceBenefit)]);
  }
  let assumptionY = 380;
  assumptionRows.forEach((row) => {
    [0, 1, 2].forEach((index) => {
      const x = margin + 14 + index * 168;
      addText(page2, row[index * 2], x, assumptionY, 6.8, "#4f6a9a", "F1");
      addText(page2, row[index * 2 + 1], x, assumptionY - 12, 8.2, "#081f63", "F2");
    });
    assumptionY -= 27;
  });

  const page3 = startPage("DETALLE DE FLUJOS", input.projectName || "Proyecto CAPEX");
  sectionTitle(page3, "Matriz de flujos y resultados", margin, 680, 150);
  const years = evaluation.flows.map((flow) => `A${flow.year}`);
  const yearZero = {
    revenue: 0,
    savings: 0,
    variableCost: 0,
    salesExpense: 0,
    fixedCost: 0,
    opex: 0,
    depreciation: 0,
    ebit: 0,
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
      { label: "Costos var.", values: [yearZero.variableCost, ...evaluation.flows.map((flow) => flow.variableCost)] },
      { label: "Gastos venta", values: [yearZero.salesExpense, ...evaluation.flows.map((flow) => flow.salesExpense)] },
      { label: "Gasto fijo", values: [yearZero.fixedCost, ...evaluation.flows.map((flow) => flow.fixedCost)] },
    ]
    : [];
  const salesAnalysisRows = input.impactCategory === "Ventas"
    ? [
      { label: "P.E. U$ / mes", values: [yearZero.breakEvenMonthlyRevenue, ...evaluation.flows.map((flow) => flow.breakEvenMonthlyRevenue)] },
      { label: "P.E. unds / mes", values: [yearZero.breakEvenMonthlyUnits, ...evaluation.flows.map((flow) => flow.breakEvenMonthlyUnits)], type: "number" },
      { label: "Margen neto", values: [yearZero.netMarginPct, ...evaluation.flows.map((flow) => flow.netMarginPct)], type: "percent", emphasis: true },
    ]
    : [];
  const flowRows = [
    { label: "Ventas", values: [yearZero.revenue, ...evaluation.flows.map((flow) => flow.revenue)] },
    ...salesCostRows,
    { label: "Ahorros", values: [yearZero.savings, ...evaluation.flows.map((flow) => flow.savings)] },
    { label: "Opex", values: [yearZero.opex, ...evaluation.flows.map((flow) => flow.opex)] },
    { label: "Deprec.", values: [yearZero.depreciation, ...evaluation.flows.map((flow) => flow.depreciation)] },
    { label: "EBIT", values: [yearZero.ebit, ...evaluation.flows.map((flow) => flow.ebit)], emphasis: true },
    { label: "Impuestos", values: [yearZero.taxes, ...evaluation.flows.map((flow) => flow.taxes)] },
    { label: "Utilidad", values: [yearZero.netIncome, ...evaluation.flows.map((flow) => flow.netIncome)], emphasis: true },
    { label: "Flujo neto", values: [yearZero.netFlow, ...evaluation.flows.map((flow) => flow.netFlow)], emphasis: true },
    { label: "Flujo desc.", values: [yearZero.discountedFlow, ...evaluation.flows.map((flow) => flow.discountedFlow)] },
    { label: "Acum.", values: [yearZero.cumulativeFlow, ...evaluation.flows.map((flow) => flow.cumulativeFlow)] },
    { label: "Desc. acum.", values: [yearZero.cumulativeDiscountedFlow, ...evaluation.flows.map((flow) => flow.cumulativeDiscountedFlow)] },
    ...salesAnalysisRows,
  ];
  const tableX = margin;
  const tableY = 644;
  const rowHeight = 20;
  const labelWidth = 94;
  const valueColWidth = (contentWidth - labelWidth) / (years.length + 1);
  const tableFont = valueColWidth < 44 ? 6.1 : 7;
  fillRect(page3, tableX, tableY, contentWidth, rowHeight, "#10253f");
  addText(page3, "Supuestos", tableX + 5, tableY + 7, 7.2, "#ffffff", "F2");
  ["A0", ...years].forEach((year, index) => {
    addText(page3, year, tableX + labelWidth + index * valueColWidth + 4, tableY + 7, 7, "#ffffff", "F2");
  });
  const pdfTableValue = (value, type) => {
    if (value === null || value === undefined) return "";
    if (type === "number") return number(value, 0);
    if (type === "percent") return percent(value, 1);
    return compactCurrency(value);
  };
  flowRows.forEach((row, rowIndex) => {
    const y = tableY - (rowIndex + 1) * rowHeight;
    fillRect(page3, tableX, y, contentWidth, rowHeight, rowIndex % 2 === 0 ? "#ffffff" : "#f8fbff");
    strokeRect(page3, tableX, y, contentWidth, rowHeight, "#d9e1ea", 0.3);
    addText(page3, row.label, tableX + 5, y + 7, 6.8, "#081f63", row.emphasis ? "F2" : "F1");
    row.values.forEach((value, index) => {
      const color = value < 0 ? "#cc4f62" : row.emphasis && value > 0 ? "#1d8a56" : "#15356f";
      addText(page3, pdfTableValue(value, row.type), tableX + labelWidth + index * valueColWidth + 3, y + 7, tableFont, color, row.emphasis ? "F2" : "F1");
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
  sectionTitle(page3, "Area de firmas", margin, signatureTop + 36, 110);
  signatures.forEach(([role, helper], index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = margin + col * (signatureCardWidth + 18);
    const y = signatureTop - row * 86;
    fillRect(page3, x, y - signatureCardHeight, signatureCardWidth, signatureCardHeight, "#ffffff");
    strokeRect(page3, x, y - signatureCardHeight, signatureCardWidth, signatureCardHeight, "#d9e1ea", 0.7);
    addText(page3, role, x + 12, y - 18, 8.2, "#081f63", "F2");
    addText(page3, helper, x + 12, y - 34, 7.2, "#4f6a9a", "F1");
    strokeRect(page3, x + 12, y - 54, signatureCardWidth - 24, 0.1, "#33475e", 0.7);
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
      : ["Score cualitativo", `${number(evaluation.score, 0)} / 100`, "KpiNeutral"];
  const kpiRows = [
    ["Inversión total", currency(evaluation.totalInvestment), "KpiBlue"],
    ["VAN", currency(evaluation.npv), evaluation.npv >= 0 ? "KpiGreen" : "KpiRed"],
    ["TIR", evaluation.irrPct ? percent(evaluation.irrPct) : "No calculable", "KpiBlue"],
    ["Payback", evaluation.payback === null ? "No recupera" : `${number(evaluation.payback, 1)} años`, "KpiNeutral"],
    ["ROI", percent(evaluation.roi), evaluation.roi >= input.targetRoi ? "KpiGreen" : "KpiRed"],
    ["EVA anual", currency(evaluation.eva), evaluation.eva >= 0 ? "KpiGreen" : "KpiRed"],
    ["Score integral", `${number(evaluation.score, 0)} / 100`, evaluation.score >= input.targetScore ? "KpiGreen" : "KpiRed"],
    impactKpiRow,
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
    twoColumnRow("Área solicitante", input.businessArea),
    twoColumnRow("Responsable", input.sponsor),
    twoColumnRow("Impacto CAPEX", input.impactCategory || "Ventas"),
    twoColumnRow("Categoría", projectType),
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
  const expectedMonthlyUnits = evaluation.salesUnitsYear1 ? evaluation.salesUnitsYear1 / 12 : 0;
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
    ["Score", `${number(evaluation.score, 0)} / 100`, excelKpiStyleAbove(evaluation.score, input.targetScore, 0.9)],
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
    detailedKpiRows.push(["Score cualitativo", `${number(evaluation.score, 0)} / 100`, excelKpiStyleAbove(evaluation.score, input.targetScore, 0.9)]);
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
    twoColumnRow("Responsable", input.sponsor),
    twoColumnRow("Impacto CAPEX", input.impactCategory || "Ventas"),
    twoColumnRow("Categoria", projectType),
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
    ["Equipo", currency(input.equipmentCost), "Instalacion", currency(input.installationCost), "Capacitacion", currency(input.trainingCost)],
    ["Otros costos", currency(input.otherCosts), "WACC", percent(input.discountRate), "Impuesto", percent(input.taxRate)],
    ["TIR minima", percent(input.requiredIrr), "Payback max.", `${number(input.maxPayback, 1)} anos`, "Meta ROI", percent(input.targetRoi)],
  ];
  if (input.impactCategory === "Ventas") {
    assumptionRows.push(
      ["Unidades A1", number(input.salesUnitsYear1, 0), "Ticket price", currency(input.ticketPrice), "Crec. unidades", percent(input.unitGrowthRate)],
      ["Costo variable", percent(input.variableCostPct), "Gasto ventas", percent(input.salesExpensePct), "Gasto fijo", currency(input.fixedCommercialCost)]
    );
  } else {
    assumptionRows.push(["Ahorro anual", currency(input.annualCostSavings), "Opex incr.", currency(input.annualOpexIncrease), "Riesgo evitado", currency(input.riskAvoidanceBenefit)]);
  }

  const detailedResultRows = [
    row([cell("RESULTADO Y SUPUESTOS", { style: "Title", mergeAcross: 7 })], { height: 34 }),
    row([cell(input.projectName || "Proyecto CAPEX", { style: "Subtitle", mergeAcross: 7 })], { height: 24 }),
    blankRow,
    sectionRow("Score ejecutivo"),
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
  const excelYearZero = {
    revenue: 0,
    savings: 0,
    variableCost: 0,
    salesExpense: 0,
    fixedCost: 0,
    opex: 0,
    depreciation: 0,
    ebit: 0,
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
      { label: "Costos var.", values: [excelYearZero.variableCost, ...evaluation.flows.map((flow) => flow.variableCost)] },
      { label: "Gastos venta", values: [excelYearZero.salesExpense, ...evaluation.flows.map((flow) => flow.salesExpense)] },
      { label: "Gasto fijo", values: [excelYearZero.fixedCost, ...evaluation.flows.map((flow) => flow.fixedCost)] },
    ]
    : [];
  const excelSalesAnalysisRows = input.impactCategory === "Ventas"
    ? [
      { label: "P.E. U$ / mes", values: [excelYearZero.breakEvenMonthlyRevenue, ...evaluation.flows.map((flow) => flow.breakEvenMonthlyRevenue)] },
      { label: "P.E. unds / mes", values: [excelYearZero.breakEvenMonthlyUnits, ...evaluation.flows.map((flow) => flow.breakEvenMonthlyUnits)], type: "number" },
      { label: "Margen neto", values: [excelYearZero.netMarginPct, ...evaluation.flows.map((flow) => flow.netMarginPct)], type: "percent", emphasis: true },
    ]
    : [];
  const excelFlowMatrixRows = [
    { label: "Ventas", values: [excelYearZero.revenue, ...evaluation.flows.map((flow) => flow.revenue)] },
    ...excelSalesCostRows,
    { label: "Ahorros", values: [excelYearZero.savings, ...evaluation.flows.map((flow) => flow.savings)] },
    { label: "Opex", values: [excelYearZero.opex, ...evaluation.flows.map((flow) => flow.opex)] },
    { label: "Deprec.", values: [excelYearZero.depreciation, ...evaluation.flows.map((flow) => flow.depreciation)] },
    { label: "EBIT", values: [excelYearZero.ebit, ...evaluation.flows.map((flow) => flow.ebit)], emphasis: true },
    { label: "Impuestos", values: [excelYearZero.taxes, ...evaluation.flows.map((flow) => flow.taxes)] },
    { label: "Utilidad", values: [excelYearZero.netIncome, ...evaluation.flows.map((flow) => flow.netIncome)], emphasis: true },
    { label: "Flujo neto", values: [excelYearZero.netFlow, ...evaluation.flows.map((flow) => flow.netFlow)], emphasis: true },
    { label: "Flujo desc.", values: [excelYearZero.discountedFlow, ...evaluation.flows.map((flow) => flow.discountedFlow)] },
    { label: "Acum.", values: [excelYearZero.cumulativeFlow, ...evaluation.flows.map((flow) => flow.cumulativeFlow)] },
    { label: "Desc. acum.", values: [excelYearZero.cumulativeDiscountedFlow, ...evaluation.flows.map((flow) => flow.cumulativeDiscountedFlow)] },
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
    row(["Supuestos", "A0", ...years].map((label) => cell(label, { style: "TableHeader" })), { height: 24 }),
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

function evaluateProject(options = {}) {
  const shouldSave = options.persist !== false;
  const input = getInputs();
  statusNode.textContent = "Calculando indicadores y recomendacion...";
  evaluateButton.disabled = true;

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
    renderRecommendation(evaluation.recommendation);
    renderCashFlowTable(evaluation.flows, evaluation);
    drawCashFlowChart(evaluation.flows);

    statusNode.textContent = shouldSave
      ? `Evaluacion completada y ultimo CAPEX guardado para "${input.projectName}".`
      : `Evaluacion completada para "${input.projectName}".`;
    evaluateButton.disabled = false;
  }, 40);
}

evaluateButton.addEventListener("click", evaluateProject);
newCapexButton.addEventListener("click", startNewCapex);
downloadPdfButton.addEventListener("click", exportExecutivePdf);
downloadExcelButton.addEventListener("click", exportExcelWorkbook);
elements.businessArea.addEventListener("change", syncSponsorByArea);
["equipmentCost", "installationCost", "trainingCost", "otherCosts"].forEach((id) => {
  elements[id].addEventListener("input", syncRequiredInvestmentTotal);
});
impactCategoryOptions.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-value]");
  if (!button) return;
  syncImpactCategory(button.dataset.value);
  statusNode.textContent = `Categoria "${button.dataset.value}" seleccionada.`;
});
if (strategyOptions) {
  strategyOptions.addEventListener("click", (event) => {
    const button = event.target.closest(".strategy-pill");
    if (!button) return;
    syncStrategicFocus(button.dataset.value);
  });
}
const restoredLastCapex = restoreLastCapex();
if (!restoredLastCapex) {
  syncSponsorByArea();
  syncRequiredInvestmentTotal();
  syncImpactCategory(elements.impactCategory.value || "Ventas");
  syncStrategicFocus(elements.strategicFocus.value || "Ventas");
}
evaluateProject({ persist: false });
if (restoredLastCapex) {
  window.setTimeout(() => {
    statusNode.textContent = "Ultimo CAPEX registrado recuperado.";
  }, 80);
}
