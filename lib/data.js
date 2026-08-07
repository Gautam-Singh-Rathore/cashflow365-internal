// lib/data.js
// Central data store for CashFlow365 AI Controller (Next.js / ESM version).
// All figures below are taken directly from the client's financial summaries.
// To add a new category or update numbers, edit this file only — the API
// route and frontend never need to change.

const financialData = {
  beer: {
    2023: {
      January:   { sales: 45609,  purchases: 13803, grossProfit: 31807, grossMarginPct: 70 },
      February:  { sales: 55210,  purchases: 20561, grossProfit: 34649, grossMarginPct: 63 },
      March:     { sales: 60866,  purchases: 22801, grossProfit: 38065, grossMarginPct: 63 },
      April:     { sales: 50878,  purchases: 15588, grossProfit: 35290, grossMarginPct: 69 },
      May:       { sales: 57383,  purchases: 12029, grossProfit: 45355, grossMarginPct: 79 },
      June:      { sales: 47113,  purchases: 16564, grossProfit: 30548, grossMarginPct: 65 },
      July:      { sales: 60898,  purchases: 16454, grossProfit: 44444, grossMarginPct: 73 },
      August:    { sales: 61099,  purchases: 21128, grossProfit: 39971, grossMarginPct: 65 },
      September: { sales: 62117,  purchases: 23837, grossProfit: 38280, grossMarginPct: 62 },
      October:   { sales: 63266,  purchases: 23177, grossProfit: 40090, grossMarginPct: 63 },
      November:  { sales: 68205,  purchases: 21143, grossProfit: 47063, grossMarginPct: 69 },
      December:  { sales: 62632,  purchases: 16515, grossProfit: 46116, grossMarginPct: 74 }
    },
    2024: {
      January:   { sales: 44167,  purchases: 14804, grossProfit: 29363, grossMarginPct: 66 },
      February:  { sales: 50659,  purchases: 20921, grossProfit: 29737, grossMarginPct: 59 },
      March:     { sales: 67876,  purchases: 22299, grossProfit: 45577, grossMarginPct: 67 },
      April:     { sales: 78080,  purchases: 19188, grossProfit: 58892, grossMarginPct: 75 },
      May:       { sales: 60064,  purchases: 27457, grossProfit: 32607, grossMarginPct: 54 },
      June:      { sales: 46264,  purchases: 14332, grossProfit: 31931, grossMarginPct: 69 },
      July:      { sales: 62920,  purchases: 17044, grossProfit: 45877, grossMarginPct: 73 },
      August:    { sales: 57488,  purchases: 22671, grossProfit: 34817, grossMarginPct: 61 },
      September: { sales: 68466,  purchases: 18603, grossProfit: 49864, grossMarginPct: 73 },
      October:   { sales: 67263,  purchases: 26884, grossProfit: 40379, grossMarginPct: 60 },
      November:  { sales: 67440,  purchases: 16538, grossProfit: 50902, grossMarginPct: 75 },
      December:  { sales: 55226,  purchases: 19347, grossProfit: 35879, grossMarginPct: 65 }
    },
    2025: {
      January:  { sales: 44498, purchases: 15189, grossProfit: 29309, grossMarginPct: 66 },
      February: { sales: 50744, purchases: 17485, grossProfit: 33259, grossMarginPct: 66 },
      March:    { sales: 54758, purchases: 13425, grossProfit: 41333, grossMarginPct: 75 },
      April:    { sales: 44958, purchases: 19202, grossProfit: 25756, grossMarginPct: 57 },
      May:      { sales: 55573, purchases: 14256, grossProfit: 41317, grossMarginPct: 74 },
      June:     { sales: 47990, purchases: 14770, grossProfit: 33220, grossMarginPct: 69 }
    }
  },

  food: {
    2023: {
      January:   { sales: 697077,  purchases: 226054, grossProfit: 471022, grossMarginPct: 68 },
      February:  { sales: 774690,  purchases: 238506, grossProfit: 536183, grossMarginPct: 69 },
      March:     { sales: 815034,  purchases: 280478, grossProfit: 534555, grossMarginPct: 66 },
      April:     { sales: 767944,  purchases: 235492, grossProfit: 532451, grossMarginPct: 69 },
      May:       { sales: 830247,  purchases: 315816, grossProfit: 514431, grossMarginPct: 62 },
      June:      { sales: 746441,  purchases: 269262, grossProfit: 477178, grossMarginPct: 64 },
      July:      { sales: 885505,  purchases: 280413, grossProfit: 605091, grossMarginPct: 68 },
      August:    { sales: 941937,  purchases: 307264, grossProfit: 634672, grossMarginPct: 67 },
      September: { sales: 962063,  purchases: 305524, grossProfit: 656540, grossMarginPct: 68 },
      October:   { sales: 911179,  purchases: 311741, grossProfit: 599438, grossMarginPct: 66 },
      November:  { sales: 923832,  purchases: 278518, grossProfit: 645314, grossMarginPct: 70 },
      December:  { sales: 816848,  purchases: 216070, grossProfit: 600778, grossMarginPct: 74 }
    },
    2024: {
      January:   { sales: 652458,  purchases: 266466, grossProfit: 385992, grossMarginPct: 59 },
      February:  { sales: 846385,  purchases: 291411, grossProfit: 554974, grossMarginPct: 66 },
      March:     { sales: 947272,  purchases: 289101, grossProfit: 658171, grossMarginPct: 69 },
      April:     { sales: 950278,  purchases: 307325, grossProfit: 642953, grossMarginPct: 68 },
      May:       { sales: 1016802, purchases: 366916, grossProfit: 649886, grossMarginPct: 64 },
      June:      { sales: 784067,  purchases: 292645, grossProfit: 491422, grossMarginPct: 63 },
      July:      { sales: 989473,  purchases: 294562, grossProfit: 694912, grossMarginPct: 70 },
      August:    { sales: 956832,  purchases: 339756, grossProfit: 617076, grossMarginPct: 64 },
      September: { sales: 955096,  purchases: 336951, grossProfit: 618144, grossMarginPct: 65 },
      October:   { sales: 1003566, purchases: 355473, grossProfit: 648093, grossMarginPct: 65 },
      November:  { sales: 948286,  purchases: 326527, grossProfit: 621758, grossMarginPct: 66 },
      December:  { sales: 817570,  purchases: 245338, grossProfit: 572232, grossMarginPct: 70 }
    },
    2025: {
      January:  { sales: 648761,  purchases: 276140, grossProfit: 372621, grossMarginPct: 57 },
      February: { sales: 786136,  purchases: 254226, grossProfit: 531910, grossMarginPct: 68 },
      March:    { sales: 857431,  purchases: 292287, grossProfit: 565144, grossMarginPct: 66 },
      April:    { sales: 858321,  purchases: 286856, grossProfit: 571465, grossMarginPct: 67 },
      May:      { sales: 1006075, purchases: 355511, grossProfit: 650564, grossMarginPct: 65 },
      June:     { sales: 816500,  purchases: 269414, grossProfit: 547086, grossMarginPct: 67 }
    }
  },

  wine: {
    2023: {
      January:   { sales: 200036, purchases: 49906, grossProfit: 150129, grossMarginPct: 75 },
      February:  { sales: 230293, purchases: 64275, grossProfit: 166019, grossMarginPct: 72 },
      March:     { sales: 237399, purchases: 57562, grossProfit: 179837, grossMarginPct: 76 },
      April:     { sales: 231246, purchases: 69755, grossProfit: 161492, grossMarginPct: 70 },
      May:       { sales: 246078, purchases: 85018, grossProfit: 161059, grossMarginPct: 65 },
      June:      { sales: 198004, purchases: 37873, grossProfit: 160131, grossMarginPct: 81 },
      July:      { sales: 227023, purchases: 41329, grossProfit: 185694, grossMarginPct: 82 },
      August:    { sales: 247764, purchases: 74845, grossProfit: 172919, grossMarginPct: 70 },
      September: { sales: 292190, purchases: 66372, grossProfit: 225818, grossMarginPct: 77 },
      October:   { sales: 288163, purchases: 93157, grossProfit: 195006, grossMarginPct: 68 },
      November:  { sales: 284535, purchases: 68406, grossProfit: 216129, grossMarginPct: 76 },
      December:  { sales: 272615, purchases: 52049, grossProfit: 220565, grossMarginPct: 81 },
      total:     { sales: 2955345, purchases: 760546, grossProfit: 2194799, grossMarginPct: 74 }
    },
    2024: {
      January:   { sales: 211220, purchases: 47770, grossProfit: 163450, grossMarginPct: 77 },
      February:  { sales: 255270, purchases: 80506, grossProfit: 174764, grossMarginPct: 68 },
      March:     { sales: 271027, purchases: 46077, grossProfit: 224950, grossMarginPct: 83 },
      April:     { sales: 295919, purchases: 60003, grossProfit: 235916, grossMarginPct: 80 },
      May:       { sales: 251150, purchases: 57227, grossProfit: 193924, grossMarginPct: 77 },
      June:      { sales: 209541, purchases: 56290, grossProfit: 153251, grossMarginPct: 73 },
      July:      { sales: 270146, purchases: 74114, grossProfit: 196032, grossMarginPct: 73 },
      August:    { sales: 251348, purchases: 57951, grossProfit: 193396, grossMarginPct: 77 },
      September: { sales: 302399, purchases: 76740, grossProfit: 225659, grossMarginPct: 75 },
      October:   { sales: 316359, purchases: 89304, grossProfit: 227055, grossMarginPct: 72 },
      November:  { sales: 320915, purchases: 67449, grossProfit: 253466, grossMarginPct: 79 },
      December:  { sales: 247216, purchases: 63811, grossProfit: 183404, grossMarginPct: 74 },
      total:     { sales: 3202511, purchases: 777243, grossProfit: 2425268, grossMarginPct: 76 }
    },
    2025: {
      January:  { sales: 218309, purchases: 73910, grossProfit: 144399, grossMarginPct: 66 },
      February: { sales: 254818, purchases: 64833, grossProfit: 189985, grossMarginPct: 75 },
      March:    { sales: 250599, purchases: 48076, grossProfit: 202523, grossMarginPct: 81 },
      April:    { sales: 218745, purchases: 69108, grossProfit: 149637, grossMarginPct: 68 },
      May:      { sales: 303185, purchases: 81183, grossProfit: 222002, grossMarginPct: 73 },
      June:     { sales: 239036, purchases: 56470, grossProfit: 182566, grossMarginPct: 76 },
      total:    { sales: 1484691, purchases: 393580, grossProfit: 1091111, grossMarginPct: 73 }
    }
  },

  spirits: {
    2023: {
      January:   { sales: 90213,  purchases: 12632, grossProfit: 77581,  grossMarginPct: 86 },
      February:  { sales: 84221,  purchases: 23099, grossProfit: 61122,  grossMarginPct: 73 },
      March:     { sales: 95948,  purchases: 27319, grossProfit: 68629,  grossMarginPct: 72 },
      April:     { sales: 101880, purchases: 24918, grossProfit: 76963,  grossMarginPct: 76 },
      May:       { sales: 109222, purchases: 21248, grossProfit: 87973,  grossMarginPct: 81 },
      June:      { sales: 88216,  purchases: 14323, grossProfit: 73893,  grossMarginPct: 84 },
      July:      { sales: 122609, purchases: 15205, grossProfit: 107404, grossMarginPct: 88 },
      August:    { sales: 118565, purchases: 27540, grossProfit: 91025,  grossMarginPct: 77 },
      September: { sales: 113205, purchases: 23281, grossProfit: 89924,  grossMarginPct: 79 },
      October:   { sales: 102296, purchases: 18703, grossProfit: 83594,  grossMarginPct: 82 },
      November:  { sales: 106712, purchases: 17014, grossProfit: 89699,  grossMarginPct: 84 },
      December:  { sales: 103684, purchases: 15984, grossProfit: 87700,  grossMarginPct: 85 },
      total:     { sales: 1236773, purchases: 241264, grossProfit: 995509, grossMarginPct: 80 }
    },
    2024: {
      January:   { sales: 74781,  purchases: 14749, grossProfit: 60032,  grossMarginPct: 80 },
      February:  { sales: 104990, purchases: 20527, grossProfit: 84464,  grossMarginPct: 80 },
      March:     { sales: 113758, purchases: 18493, grossProfit: 95265,  grossMarginPct: 84 },
      April:     { sales: 135282, purchases: 27809, grossProfit: 107473, grossMarginPct: 79 },
      May:       { sales: 117206, purchases: 27781, grossProfit: 89425,  grossMarginPct: 76 },
      June:      { sales: 77635,  purchases: 14499, grossProfit: 63136,  grossMarginPct: 81 },
      July:      { sales: 128367, purchases: 18945, grossProfit: 109422, grossMarginPct: 85 },
      August:    { sales: 123649, purchases: 25247, grossProfit: 98402,  grossMarginPct: 80 },
      September: { sales: 99217,  purchases: 18982, grossProfit: 80235,  grossMarginPct: 81 },
      October:   { sales: 123286, purchases: 27214, grossProfit: 96072,  grossMarginPct: 78 },
      November:  { sales: 131922, purchases: 26699, grossProfit: 105223, grossMarginPct: 80 },
      December:  { sales: 116127, purchases: 19731, grossProfit: 96396,  grossMarginPct: 83 },
      total:     { sales: 1346220, purchases: 260675, grossProfit: 1085545, grossMarginPct: 81 }
    },
    2025: {
      January:  { sales: 91442,  purchases: 25431, grossProfit: 66012, grossMarginPct: 72 },
      February: { sales: 116318, purchases: 17726, grossProfit: 98592, grossMarginPct: 85 },
      March:    { sales: 117252, purchases: 18811, grossProfit: 98441, grossMarginPct: 84 },
      April:    { sales: 104813, purchases: 26639, grossProfit: 78174, grossMarginPct: 75 },
      May:      { sales: 123840, purchases: 27654, grossProfit: 96186, grossMarginPct: 78 },
      June:     { sales: 92697,  purchases: 10848, grossProfit: 81849, grossMarginPct: 88 },
      total:    { sales: 646362, purchases: 127109, grossProfit: 519253, grossMarginPct: 80 }
    }
  },

  personnelCost: {
    2023: {
      January:   { turnover: 1037942, personnelCost: 489627, hiredStaff: 0,     pctOfTurnover: 47 },
      February:  { turnover: 1149118, personnelCost: 494900, hiredStaff: 0,     pctOfTurnover: 43 },
      March:     { turnover: 1224349, personnelCost: 420055, hiredStaff: 0,     pctOfTurnover: 34 },
      April:     { turnover: 1157516, personnelCost: 493318, hiredStaff: 14037, pctOfTurnover: 44 },
      May:       { turnover: 1249676, personnelCost: 538722, hiredStaff: 14476, pctOfTurnover: 44 },
      June:      { turnover: 1085221, personnelCost: 474293, hiredStaff: 24909, pctOfTurnover: 46 },
      July:      { turnover: 1302306, personnelCost: 537242, hiredStaff: 25836, pctOfTurnover: 43 },
      August:    { turnover: 1419847, personnelCost: 506607, hiredStaff: 60383, pctOfTurnover: 40 },
      September: { turnover: 1436421, personnelCost: 510835, hiredStaff: 47370, pctOfTurnover: 39 },
      October:   { turnover: 1372461, personnelCost: 519060, hiredStaff: 40506, pctOfTurnover: 41 },
      November:  { turnover: 1389496, personnelCost: 508886, hiredStaff: 2344,  pctOfTurnover: 37 },
      December:  { turnover: 1260227, personnelCost: 442185, hiredStaff: 82912, pctOfTurnover: 42 },
      total:     { turnover: 15084580, personnelCost: 5935732, hiredStaff: 312773, pctOfTurnover: 41 }
    },
    2024: {
      January:   { turnover: 986685,  personnelCost: 414268, hiredStaff: 49492, pctOfTurnover: 47 },
      February:  { turnover: 1262219, personnelCost: 436725, hiredStaff: 43740, pctOfTurnover: 38 },
      March:     { turnover: 1406032, personnelCost: 499966, hiredStaff: 39690, pctOfTurnover: 38 },
      April:     { turnover: 1465716, personnelCost: 517599, hiredStaff: 0,     pctOfTurnover: 35 },
      May:       { turnover: 1451602, personnelCost: 588792, hiredStaff: 44280, pctOfTurnover: 44 },
      June:      { turnover: 1123893, personnelCost: 526946, hiredStaff: 68310, pctOfTurnover: 53 },
      July:      { turnover: 1459355, personnelCost: 588166, hiredStaff: 24030, pctOfTurnover: 42 },
      August:    { turnover: 1397585, personnelCost: 551763, hiredStaff: 51840, pctOfTurnover: 43 },
      September: { turnover: 1433820, personnelCost: 573161, hiredStaff: 38070, pctOfTurnover: 43 },
      October:   { turnover: 1519718, personnelCost: 590925, hiredStaff: 44734, pctOfTurnover: 42 },
      November:  { turnover: 1476158, personnelCost: 545962, hiredStaff: 35640, pctOfTurnover: 39 },
      December:  { turnover: 1242319, personnelCost: 550276, hiredStaff: 28080, pctOfTurnover: 47 },
      total:     { turnover: 16225103, personnelCost: 6384548, hiredStaff: 467905, pctOfTurnover: 42 }
    },
    2025: {
      January:  { turnover: 1008180, personnelCost: 481251, hiredStaff: 43463, pctOfTurnover: 52 },
      February: { turnover: 1214587, personnelCost: 562658, hiredStaff: 7192,  pctOfTurnover: 47 },
      March:    { turnover: 1287131, personnelCost: 564254, hiredStaff: 35370, pctOfTurnover: 47 },
      April:    { turnover: 1233678, personnelCost: 562234, hiredStaff: 47291, pctOfTurnover: 49 },
      May:       { turnover: 1496174, personnelCost: 611785, hiredStaff: 38880, pctOfTurnover: 43 },
      June:     { turnover: 1202150, personnelCost: 523813, hiredStaff: 39690, pctOfTurnover: 47 },
      total:    { turnover: 7441900, personnelCost: 3305995, hiredStaff: 211885, pctOfTurnover: 47 }
    }
  }
};

// Rule engine thresholds (same rules used in the monthly PDF reports)
const ruleEngine = [
  { rule: "Revenue Growth < 30% target",        note: "Flags categories missing the growth target" },
  { rule: "Gross Margin <= 50%",                 note: "Near-threshold margin warning" },
  { rule: "Gross Margin <= 60%",                 note: "Triggered margin warning" },
  { rule: "Purchase ratio > 35%",                note: "Cost-of-goods pressure flag" },
  { rule: "Sequential quarterly decline",        note: "Two+ consecutive quarters of revenue decline" },
  { rule: "Non-recurring monthly shock",         note: "Single-month anomaly vs trend (e.g. isolated dip/spike)" },
  { rule: "Personnel cost ratio > 45% of turnover", note: "Labor cost pressure flag" }
];

export { financialData, ruleEngine };
