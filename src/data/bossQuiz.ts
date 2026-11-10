export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceCase: string;
}

export const BOSS_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Por qué las tiazidas causan hiponatremia severa con mayor frecuencia que los diuréticos de asa en adultos mayores?',
    options: [
      'Porque las tiazidas destruyen el gradiente córtico-medular osmótico en el asa de Henle.',
      'Porque inhiben el NCC en el túbulo distal cortical pero preservan el gradiente medular, permitiendo que la ADH siga reabsorbiendo agua libre.',
      'Porque aumentan directamente la secreción hipofisaria de oxitocina y aldosterona.',
      'Porque bloquean por completo la filtración de sodio en el glomérulo.',
    ],
    correctIndex: 1,
    explanation:
      'Las tiazidas bloquean el cotransportador NCC en el túbulo contorneado distal (segmento dilutorio). Como el gradiente córtico-medular del asa de Henle queda intacto, la vasopresina (ADH) puede actuar en el túbulo colector reabsorbiendo agua libre sobre una orina que no puede diluirse, generando hiponatremia dilucional.',
    sourceCase: 'Caso 1 · Tiazidas (La abuelita confundida)',
  },
  {
    id: 2,
    question: 'Un paciente con insuficiencia cardiaca en furosemida toma ibuprofeno y gentamicina. ¿Qué par de consecuencias farmacológicas directas ocurrirán?',
    options: [
      'Alcalosis respiratoria y fibrosis pulmonar por aumento de prostaglandinas.',
      'El AINE potencia la diuresis al abrir canales ENaC y la gentamicina previene la ototoxicidad.',
      'El AINE anula la diuresis (compite por transportador OAT y suprime prostaglandinas) y la gentamicina sinergiza daño coclear irreversible.',
      'Hipotensión severa instantánea y pérdida masiva de glucosa por orina.',
    ],
    correctIndex: 2,
    explanation:
      'Los AINEs compiten con la furosemida por la secreción tubular proximal mediada por OAT y bloquean la síntesis de prostaglandinas vasodilatadoras renales. La combinación de furosemida con aminoglucósidos lesiona la estría vascular e induce ototoxicidad sinérgica grave.',
    sourceCase: 'Caso 2 · De Asa (El triple combo)',
  },
  {
    id: 3,
    question: 'En una paciente con HTA resistente (triple esquema óptimo), ¿cuál es el 4.º fármaco de elección según el ensayo PATHWAY-2 y cómo manejas la mastodinia?',
    options: [
      'Doxazosina; si hay mastodinia, cambiar a prazosina.',
      'Espironolactona; si presenta mastodinia, sustituir por eplerenona (antagonista mineralocorticoide selectivo).',
      'Metildopa; si hay mastodinia, agregar progesterona sintética.',
      'Aliskireno; si hay mastodinia, suspender la clortalidona.',
    ],
    correctIndex: 1,
    explanation:
      'El ensayo PATHWAY-2 demostró que la espironolactona es el fármaco más eficaz como cuarto escalón. Como es un esteroide no selectivo que antagoniza andrógenos y estimula progestágenos, genera dolor mamario y ginecomastia; la eplerenona es el reemplazo de alta selectividad mineralocorticoide.',
    sourceCase: 'Caso 3 · Ahorradores de K⁺ (Resistente pero frágil)',
  },
  {
    id: 4,
    question: 'Al iniciar enalapril en un paciente con nefropatía diabética, la creatinina sérica se eleva un 20%. ¿Cuál es la interpretación fisiopatológica correcta?',
    options: [
      'Es necrosis tubular aguda tóxica; se debe suspender inmediatamente el IECA.',
      'Es un efecto hemodinámico esperado por vasodilatación de la arteriola eferente; elevaciones ≤30% no justifican suspender el fármaco.',
      'Es señal de estenosis aórtica severa que requiere cirugía valvular de urgencia.',
      'Indica que debe agregarse de inmediato un ARA-II para revertir la vasoconstricción.',
    ],
    correctIndex: 1,
    explanation:
      'La angiotensina II vasoconstriñe la arteriola eferente. Los IECA al vasodilatarla reducen la presión intraglomerular; esto protege contra la esclerosis a largo plazo, con una elevación funcional benigna esperable de hasta un 30% en la creatinina sérica.',
    sourceCase: 'Caso 4 · IECA y ARA-II (La tos que no se quita)',
  },
  {
    id: 5,
    question: '¿Qué demostró categóricamente el ensayo clínico ONTARGET respecto a la combinación simultánea de un IECA con un ARA-II?',
    options: [
      'Redujo la mortalidad cardiovascular en un 50% con excelente tolerancia renal.',
      'Provocó regresión completa de la aterosclerosis carotídea.',
      'No confirió beneficio cardiovascular adicional y aumentó significativamente el riesgo de hiperpotasemia, síncope y deterioro renal agudo.',
      'Fue la combinación de primera línea recomendada para todo paciente hipertenso.',
    ],
    correctIndex: 2,
    explanation:
      'El ensayo ONTARGET (NEJM 2008) comparó ramipril, telmisartán o ambos: el bloqueo dual no aportó beneficio adicional y duplicó la incidencia de hiperpotasemia y disfunción renal aguda. Está formalmente contraindicado.',
    sourceCase: 'Caso 4 · IECA y ARA-II (La tos que no se quita)',
  },
  {
    id: 6,
    question: '¿Cuánto tiempo obligatorio de ventana de lavado debe transcurrir entre la última dosis de un IECA y la primera toma de sacubitril/valsartán (ARNI)?',
    options: [
      'No se requiere intervalo; pueden iniciarse simultáneamente en la misma toma.',
      'Exactamente 4 horas.',
      'Al menos 36 horas completas para permitir el aclaramiento de la inhibición de la cininasa II y prevenir angioedema letal.',
      '7 días completos en régimen intrahospitalario estricto.',
    ],
    correctIndex: 2,
    explanation:
      'Tanto la ECA (cininasa II) como la neprilisina degradan la bradicinina. Bloquear ambas simultáneamente genera una acumulación explosiva de bradicinina en tejido orofaríngeo, desencadenando angioedema severo de vía aérea. La ventana obligatoria de lavado es de mínimo 36 horas.',
    sourceCase: 'Caso 5 · ARNI y Aliskireno (El cambio apresurado)',
  },
  {
    id: 7,
    question: '¿Por qué el edema maleolar provocado por amlodipino no responde adecuadamente al tratamiento con diuréticos?',
    options: [
      'Porque se debe a insuficiencia renal anúrica terminal inducida por el fármaco.',
      'Porque es un edema por aumento de presión hidrostática capilar localizado (dilatación arteriolar precapilar sin dilatación venular) y no por hipervolemia sistémica.',
      'Porque el amlodipino bloquea los receptores de vasopresina en el túbulo proximal.',
      'Porque el amlodipino destruye físicamente los vasos linfáticos de las extremidades inferiores.',
    ],
    correctIndex: 1,
    explanation:
      'Las dihidropiridinas relajan selectivamente el esfínter precapilar arteriolar pero no el lecho venular postcapilar, aumentando la presión hidrostática dentro del capilar y forzando la trasudación de líquido al tejido intersticial. No hay exceso de volumen corporal total; dar diuréticos solo deshidrata a la paciente.',
    sourceCase: 'Caso 6 · Calcioantagonistas (Tobillos y frecuencia)',
  },
  {
    id: 8,
    question: 'En un paciente con fibrilación auricular que toma metoprolol, ¿por qué es una grave contraindicación prescribir verapamilo?',
    options: [
      'Porque el metoprolol destruye químicamente al verapamilo en el estómago impidiendo su absorción.',
      'Porque causa alcalosis metabólica refractaria y convulsiones tónico-clónicas.',
      'Porque ambos deprimen fuertemente el nodo sinusal y el nodo auriculoventricular, generando riesgo inminente de bradicardia severa, paro o bloqueo AV completo.',
      'Porque estimulan de forma masiva los receptores beta-2 produciendo broncodilatación excesiva.',
    ],
    correctIndex: 2,
    explanation:
      'Tanto el verapamilo (no-DHP con tropismo miocárdico nodal) como el metoprolol (betabloqueador) tienen potentes efectos inotrópicos, cronotrópicos y dromotrópicos negativos. Su asociación puede desencadenar bloqueo AV completo de tercer grado o choque cardiogénico.',
    sourceCase: 'Caso 6 · Calcioantagonistas (Tobillos y frecuencia)',
  },
  {
    id: 9,
    question: 'Ante la sospecha fundada de un feocromocitoma con crisis hipertensiva y taquicardia, ¿cuál es el principio farmacológico inquebrantable?',
    options: [
      'Administrar inmediatamente propranolol en monoterapia para frenar la taquicardia sinusal.',
      'Primero bloquear receptores alfa (doxazosina/fenoxibenzamina) y SOLO DESPUÉS iniciar el betabloqueador (regla alfabética: "A" antes de "B").',
      'Administrar infusión de adrenalina a dosis altas para saturar receptores.',
      'Iniciar de inmediato clonidina intravenosa en bolo rápido.',
    ],
    correctIndex: 1,
    explanation:
      'Si se da un betabloqueador solo, se bloquea la vasodilatación beta-2 y se deja la carga masiva de catecolaminas actuando sin oposición sobre los receptores vasculares alfa-1 ("un-opposed alpha stimulation"), disparando la presión a niveles catastróficos. Regla nemotécnica: "A" antes de "B".',
    sourceCase: 'Caso 7 · Betabloqueadores y alfa1 (Las crisis misteriosas)',
  },
  {
    id: 10,
    question: '¿Qué cuadro fisiopatológico desencadena la suspensión abrupta de clonidina y qué fármaco directo se asocia a lupus con anticuerpos antihistona en acetiladores lentos?',
    options: [
      'Crisis de abstinencia por hipocortisolismo; nitroprusiato en acetiladores rápidos.',
      'Tormenta simpática hiperadrenérgica por noradrenalina acumulada y receptores supersensibles; hidralazina en acetiladores lentos.',
      'Hipotensión ortostática fulminante con bradicardia extrema; minoxidil en acetiladores intermedios.',
      'Coma mixedematoso por bloqueo tiroideo; amilorida en fenotipos NAT1.',
    ],
    correctIndex: 1,
    explanation:
      'La clonidina mantiene suprimida la liberación de noradrenalina. Al retirarla bruscamente, se liberan cantidades masivas de catecolaminas que impactan sobre receptores hiperreactivos provocando hipertensión de rebote fulminante. Por su parte, la hidralazina crónica causa lupus farmacoinducido (con anticuerpos antihistona) preferentemente en pacientes con acetilación hepática lenta.',
    sourceCase: 'Caso 8 · Centrales y Vasodilatadores directos (La suspensión abrupta)',
  },
];
