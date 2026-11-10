export interface DrugFamily {
  id: string;
  name: string;
  examples: string;
  mechanism: string;
  adverseEffects: string;
  redFlag: string;
  category: 'diuretico' | 'sraa' | 'calcioantagonista' | 'simpatico' | 'vasodilatador';
}

export const DRUG_FAMILIES: DrugFamily[] = [
  {
    id: 'tiazidas',
    name: 'Tiazidas y similares',
    examples: 'Clortalidona, hidroclorotiazida, indapamida',
    mechanism: 'Inhibición del cotransportador Na⁺/Cl⁻ (NCC) en el túbulo contorneado distal',
    adverseEffects: '↓Na⁺, ↓K⁺, ↓Mg²⁺, ↑glucosa, ↑lípidos a dosis altas, ↑urato, ↑Ca²⁺',
    redFlag: 'Hiponatremia severa en adultas mayores; precipitación de crisis de gota.',
    category: 'diuretico',
  },
  {
    id: 'asa',
    name: 'Diuréticos de asa',
    examples: 'Furosemida, torasemida, bumetanida',
    mechanism: 'Inhibición del cotransportador Na⁺/K⁺/2Cl⁻ (NKCC2) en la rama ascendente gruesa del asa de Henle',
    adverseEffects: 'Hipovolemia, ↓K⁺, ↓Mg²⁺, ↓Ca²⁺, ototoxicidad, hiperuricemia',
    redFlag: 'AINEs disminuyen su efecto diurético (competición OAT y ↓PG); aminoglucósidos potencian la ototoxicidad.',
    category: 'diuretico',
  },
  {
    id: 'ahorradores',
    name: 'Ahorradores de K⁺',
    examples: 'Espironolactona, eplerenona, amilorida, triamtereno',
    mechanism: 'Antagonismo del receptor mineralocorticoide (ARM) o bloqueo del canal epitelial de sodio (ENaC)',
    adverseEffects: 'Hiperpotasemia, ginecomastia y mastodinia (espironolactona por efecto antiandrogénico)',
    redFlag: 'ERC avanzada, combinación con IECA/ARA-II, AINEs o suplementos de K⁺ (riesgo de paro en asistolia).',
    category: 'diuretico',
  },
  {
    id: 'ieca',
    name: 'IECA ("-pril")',
    examples: 'Enalapril, lisinopril, ramipril, captopril',
    mechanism: 'Inhibición de la Enzima Convertidora de Angiotensina (= Cininasa II) → ↓Angiotensina II, ↑bradicinina',
    adverseEffects: 'Tos seca persistente (por bradicinina y sustancia P), angioedema, hiperpotasemia, ↑creatinina (dilatación de arteriola eferente)',
    redFlag: 'Embarazo (teratogenicidad), estenosis bilateral de la arteria renal, antecedente de angioedema.',
    category: 'sraa',
  },
  {
    id: 'ara2',
    name: 'ARA-II ("-sartán")',
    examples: 'Losartán, valsartán, telmisartán, candesartán',
    mechanism: 'Bloqueo competitivo selectivo del receptor AT₁ de la angiotensina II',
    adverseEffects: 'Hiperpotasemia, ↑creatinina funcional (sin acumulación de bradicinina, no provocan tos)',
    redFlag: 'Embarazo; nunca combinar con IECA (ensayo ONTARGET: más hiperpotasemia y daño renal sin beneficio).',
    category: 'sraa',
  },
  {
    id: 'arni-aliskireno',
    name: 'Aliskireno y ARNI',
    examples: 'Aliskireno (inhibidor directo de renina); Sacubitril/valsartán (ARNI)',
    mechanism: 'Aliskireno: inhibe la renina; ARNI: inhibición de neprilisina (↑péptidos natriuréticos) + bloqueo AT₁',
    adverseEffects: 'Hipotensión sintomática, hiperpotasemia, angioedema',
    redFlag: 'ARNI: esperar un periodo de lavado de 36 h tras suspender un IECA para evitar angioedema mortal; aliskireno jamás con IECA/ARA-II (ALTITUDE).',
    category: 'sraa',
  },
  {
    id: 'calcioantagonistas',
    name: 'Calcioantagonistas (BCC)',
    examples: 'Dihidropiridinas ("-dipino": amlodipino, nifedipino) | No-DHP: Verapamilo, diltiazem',
    mechanism: 'Bloqueo de canales de Ca²⁺ tipo L. Dihidropiridinas = selectividad vascular; Verapamilo/diltiazem = selectividad miocárdica (nodo AV y contractilidad)',
    adverseEffects: 'Dihidropiridinas: edema maleolar periférico, cefalea, rubor facial, taquicardia refleja. No-DHP: bradicardia, bloqueo AV, estreñimiento severo',
    redFlag: 'No-DHP estrictamente contraindicados en ICFEr (depresión miocárdica); nunca combinar verapamilo/diltiazem con betabloqueadores.',
    category: 'calcioantagonista',
  },
  {
    id: 'betabloqueadores',
    name: 'Betabloqueadores ("-olol")',
    examples: 'Metoprolol, bisoprolol, atenolol (β₁ selectivos A–M) | Propranolol, carvedilol, labetalol',
    mechanism: 'Bloqueo de receptores β-adrenérgicos → ↓frecuencia cardiaca, ↓contractilidad miocárdica, ↓liberación renal de renina',
    adverseEffects: 'Broncoespasmo (no selectivos), bradicardia, enmascaramiento de hipoglucemia (excepto diaforesis), síndrome de rebote por suspensión abrupta',
    redFlag: 'Feocromocitoma sin bloqueo α previo (la estimulación α₁ sin oposición desata crisis hipertensiva fatal).',
    category: 'simpatico',
  },
  {
    id: 'alfa1',
    name: 'Bloqueadores α₁ ("-zosina")',
    examples: 'Doxazosina, prazosina, terazosina',
    mechanism: 'Bloqueo selectivo de receptores α₁ postsinápticos en músculo liso vascular → vasodilatación arteriolar y venosa',
    adverseEffects: 'Síncope de primera dosis, hipotensión ortostática marcada, retención hidrosalina',
    redFlag: 'No son fármacos de primera línea para HTA (ensayo ALLHAT demostró mayor riesgo de insuficiencia cardiaca).',
    category: 'simpatico',
  },
  {
    id: 'centrales',
    name: 'Simpaticolíticos centrales',
    examples: 'Clonidina, metildopa',
    mechanism: 'Agonismo en receptores α₂ presinápticos en el tronco encefálico → ↓descarga simpática periférica',
    adverseEffects: 'Sedación marcada, somnolencia, boca seca, astenia; clonidina: hipertensión de rebote fulminante; metildopa: prueba de Coombs positiva y hepatitis',
    redFlag: 'Suspensión brusca de clonidina (tormenta adrenérgica); anemia hemolítica autoinmune por metildopa.',
    category: 'simpatico',
  },
  {
    id: 'vasodilatadores',
    name: 'Vasodilatadores directos',
    examples: 'Hidralazina, minoxidil, nitroprusiato de sodio',
    mechanism: 'Relajación directa del músculo liso arteriolar (minoxidil abre canales de K⁺-ATP; nitroprusiato libera óxido nítrico)',
    adverseEffects: 'Taquicardia refleja violenta y marcada retención hidrosalina (requieren diurético + betabloqueador de soporte); hidralazina: síndrome de lupus inducido; minoxidil: hipertricosis y derrame pericárdico; nitroprusiato: intoxicación por cianuro y tiocianato',
    redFlag: 'Monoterapia desastrosa: la activación simpática y del SRAA compensatoria anula el efecto y puede causar infarto miocárdico o insuficiencia aguda.',
    category: 'vasodilatador',
  },
];
