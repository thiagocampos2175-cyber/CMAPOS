export interface ReferenceItem {
  id: number;
  citation: string;
  doi?: string;
  doiUrl?: string;
}

export const REFERENCES: ReferenceItem[] = [
  {
    id: 1,
    citation:
      'Jones DW, et al. 2025 AHA/ACC Guideline for the Prevention, Detection, Evaluation and Management of High Blood Pressure in Adults. Hypertension. 2025;82(10):e212–e316.',
    doi: '10.1161/HYP.0000000000000249',
    doiUrl: 'https://doi.org/10.1161/HYP.0000000000000249',
  },
  {
    id: 2,
    citation:
      'McEvoy JW, et al. 2024 ESC Guidelines for the management of elevated blood pressure and hypertension. Eur Heart J. 2024;45(38):3912–4018.',
    doi: '10.1093/eurheartj/ehae178',
    doiUrl: 'https://doi.org/10.1093/eurheartj/ehae178',
  },
  {
    id: 3,
    citation:
      'ONTARGET Investigators. Telmisartan, ramipril, or both in patients at high risk for vascular events. N Engl J Med. 2008;358:1547–1559.',
    doi: '10.1056/NEJMoa0801317',
    doiUrl: 'https://doi.org/10.1056/NEJMoa0801317',
  },
  {
    id: 4,
    citation:
      'Parving HH, et al. Cardiorenal end points in a trial of aliskiren for type 2 diabetes (ALTITUDE). N Engl J Med. 2012;367:2204–2213.',
    doi: '10.1056/NEJMoa1208799',
    doiUrl: 'https://doi.org/10.1056/NEJMoa1208799',
  },
  {
    id: 5,
    citation:
      'Williams B, et al. Spironolactone versus placebo, bisoprolol, and doxazosin in drug-resistant hypertension (PATHWAY-2). Lancet. 2015;386:2059–2068.',
    doi: '10.1016/S0140-6736(15)00257-3',
    doiUrl: 'https://doi.org/10.1016/S0140-6736(15)00257-3',
  },
  {
    id: 6,
    citation:
      'ALLHAT Collaborative Research Group. Major cardiovascular events in hypertensive patients randomized to doxazosin vs chlorthalidone. JAMA. 2000;283:1967–1975.',
    doi: '10.1001/jama.283.15.1967',
    doiUrl: 'https://doi.org/10.1001/jama.283.15.1967',
  },
  {
    id: 7,
    citation:
      'Heidenreich PA, et al. 2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure. Circulation. 2022;145:e895–e1032.',
    doi: '10.1161/CIR.0000000000001063',
    doiUrl: 'https://doi.org/10.1161/CIR.0000000000001063',
  },
  {
    id: 8,
    citation:
      'Brunton LL, Knollmann BC, eds. Goodman & Gilman. Las bases farmacológicas de la terapéutica. 14.ª ed. McGraw-Hill; 2023.',
  },
  {
    id: 9,
    citation:
      'Katzung BG, Vanderah TW, eds. Farmacología básica y clínica. 16.ª ed. McGraw-Hill; 2024.',
  },
];
