export interface ClinicalCase {
  teamId: number;
  familyTitle: string;
  codename: string;
  vignette: string;
  patientData: {
    age: string;
    keyLab: string;
    clinicalFinding: string;
  };
  guideQuestions: string[];
  expectedAnswer: {
    diagnosis: string;
    pharmacologicalMechanism: string;
    actionPlan: string;
    evidenceNotes: string;
  };
  callouts: {
    explicacion: string;
    mnemotecnia: string;
    redFlag: string;
  };
}

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    teamId: 1,
    familyTitle: 'EQUIPO 1 · TIAZIDAS Y SIMILARES',
    codename: 'La abuelita confundida',
    vignette:
      'Mujer de 79 años de edad que inició tratamiento con clortalidona hace 3 semanas por hipertensión arterial sistólica aislada. Acude traída por familiares por presentar somnolencia progresiva, desorientación y letargia. En los exámenes de laboratorio de ingreso se documenta: Na⁺ sérico 121 mEq/L y K⁺ sérico 3.2 mEq/L.',
    patientData: {
      age: '79 años',
      keyLab: 'Na⁺ 121 mEq/L (severo) | K⁺ 3.2 mEq/L',
      clinicalFinding: 'Somnolencia progresiva y confusión 3 semanas tras iniciar clortalidona',
    },
    guideQuestions: [
      '¿Por qué las tiazidas causan hiponatremia con mucha mayor frecuencia y gravedad que los diuréticos de asa?',
      '¿Cuál es la conducta terapéutica inmediata: qué fármaco suspendes, cómo corriges los electrolitos y qué familia antihipertensiva alternativa seleccionas?',
    ],
    expectedAnswer: {
      diagnosis: 'Hiponatremia hipotónica dilucional severa e hipopotasemia inducidas por tiazidas.',
      pharmacologicalMechanism:
        'Las tiazidas inhiben el cotransportador NCC en el túbulo contorneado distal, el cual es un segmento cortical dilutorio. Al bloquear la reabsorción de solutos allí, impiden que la orina se diluya normalmente, PERO no alteran el gradiente osmótico córtico-medular generado en el asa de Henle. Por tanto, ante la liberación fisiológica de vasopresina (ADH), el túbulo colector sigue reabsorbiendo agua libre de forma masiva sobre una orina incapaz de diluirse, precipitando una profunda hiponatremia dilucional (los diuréticos de asa, al destruir el gradiente medular, impiden concentrar la orina y causan menos hiponatremia).',
      actionPlan:
        '1. Suspender de inmediato la clortalidona.\n2. Corregir el sodio con cautela estricta (no superar 8 mEq/L en 24 h para prevenir síndrome de desmielinización osmótica).\n3. Reponer K⁺ y vigilar Mg²⁺ (la hipomagnesemia dificulta la corrección del potasio).\n4. Cambiar a una familia alternativa segura para esta paciente: calcioantagonista dihidropiridínico (p. ej., amlodipino) o IECA/ARA-II.',
      evidenceNotes:
        'Guía AHA/ACC 2025: la clortalidona es potente y de vida media prolongada, pero exige control electrolítico a las 2–4 semanas, especialmente en mujeres ancianas de bajo peso.',
    },
    callouts: {
      explicacion:
        'El túbulo contorneado distal aporta el "agua libre de solutos". Si bloqueas el NCC mantienes el gradiente medular intacto; la ADH reabsorbe agua pura mientras pierdes sodio. Resultado: hiponatremia dilucional severa en la paciente geriátrica.',
      mnemotecnia:
        'TIAZIDAS = "TIA-SIN-SODIO": Tía anciana que pierde Na⁺, K⁺ y Mg²⁺, pero retiene Ácido úrico, Calcio y Glucosa ("Hiper-UCG").',
      redFlag:
        '¡Alerta roja! Hiponatremia aguda sintomática en adultos mayores. Nunca corrijas el sodio a más de 8 mEq/L en 24 horas por riesgo de mielinólisis póntica central.',
    },
  },
  {
    teamId: 2,
    familyTitle: 'EQUIPO 2 · DIURÉTICOS DE ASA',
    codename: 'El triple combo',
    vignette:
      'Hombre de 70 años con diagnóstico de insuficiencia cardiaca crónica en tratamiento habitual con furosemida. Por presentar dolor incapacitante por gonartrosis, automedica ibuprofeno oral. Simultáneamente, por un cuadro infeccioso urinario complicado, recibe gentamicina intravenosa. A los 5 días el paciente refiere marcada disminución del volumen urinario matutino (oliguria) y sensación molesta de zumbido de oídos (tinnitus bilateral).',
    patientData: {
      age: '70 años',
      keyLab: 'Oliguria aguda, elevación de azoados, zumbido de oídos bilateral',
      clinicalFinding: 'Furosemida + Ibuprofeno (AINE) + Gentamicina (aminoglucósido)',
    },
    guideQuestions: [
      'Explica el mecanismo fisiopatológico y farmacológico por el cual el ibuprofeno anuló el efecto de la furosemida.',
      'Explica el mecanismo molecular de la toxicidad auditiva y renal generada por la combinación de furosemida + gentamicina, y define la conducta terapéutica.',
    ],
    expectedAnswer: {
      diagnosis: 'Lesión renal aguda farmacológica, resistencia a diuréticos y ototoxicidad bilateral sinérgica.',
      pharmacologicalMechanism:
        '1. Interacción Furosemida + AINE: La furosemida requiere ser secretada activamente al lumen tubular por transportadores de aniones orgánicos (OAT) en el túbulo proximal; los AINEs compiten fuertemente por este transportador, reduciendo la concentración luminal del diurético. Además, la furosemida induce la síntesis renal de prostaglandinas vasodilatadoras (PGE₂ y PGI₂); los AINEs bloquean la COX-1/COX-2, suprimiendo las prostaglandinas, provocando vasoconstricción de la arteriola aferente, caída del filtrado glomerular y retención de sodio/agua.\n2. Furosemida + Gentamicina: Ambos fármacos son ototóxicos y nefrotóxicos. La furosemida altera la estría vascular coclear y aumenta la permeabilidad de la membrana endolinfática, facilitando la entrada masiva del aminoglucósido a las células ciliadas sensoriales del oído interno, sinergizando la apoptosis celular coclear y vestibular irreversible.',
      actionPlan:
        '1. Suspender de inmediato el AINE (ibuprofeno).\n2. Suspender y cambiar la gentamicina por un antibiótico no ototóxico/no nefrotóxico según antibiograma.\n3. Monitorizar de forma seriada creatinina, electrolitos séricos (K⁺, Mg²⁺, Ca²⁺) y valorar audiometría clínica.\n4. Ajustar el soporte diurético de la insuficiencia cardiaca con vigilancia estrecha de la volemia.',
      evidenceNotes:
        'Goodman & Gilman (14.ª ed.) y guías AHA/HFSA 2022: los AINEs están proscritos en insuficiencia cardiaca por precipitar descompensaciones agudas y bloquear la respuesta a diuréticos.',
    },
    callouts: {
      explicacion:
        'La furosemida necesita prostaglandinas para abrir la arteriola aferente y entrar al túbulo por OAT. El ibuprofeno le cierra la puerta. La gentamicina aprovecha la alteración de la estría vascular que causa la furosemida para destruir las células ciliadas del oído.',
      mnemotecnia:
        'ASA = "A-S-A": Asfixia auditiva (ototoxicidad con aminoglucósidos) + Supresión por AINEs + Aniones perdidos (K⁺, Mg²⁺, Ca²⁺).',
      redFlag:
        '¡Alerta roja! Jamás juntes furosemida a dosis altas con aminoglucósidos en ancianos, ni permitas AINEs en insuficiencia cardiaca. Tinnitus = daño coclear en progreso.',
    },
  },
  {
    teamId: 3,
    familyTitle: 'EQUIPO 3 · AHORRADORES DE K⁺',
    codename: 'Resistente pero frágil',
    vignette:
      'Mujer de 62 años con diagnóstico de hipertensión resistente. A pesar de recibir dosis plenas optimizadas de amlodipino + losartán + clortalidona con apego confirmado, su PA se mantiene en 155/95 mmHg. Sus paraclínicos basales muestran: Tasa de Filtrado Glomerular estimada (TFGe) de 45 mL/min/1.73m² y K⁺ sérico de 4.6 mEq/L. Siguiendo las guías, su médico agrega espironolactona 25 mg/día. Cuatro meses después la paciente acude por dolor e hipersensibilidad bilateral en glándulas mamarias (mastodinia severa).',
    patientData: {
      age: '62 años',
      keyLab: 'TFGe 45 mL/min/1.73m² | K⁺ inicial 4.6 mEq/L',
      clinicalFinding: 'HTA resistente tratada con triple terapia óptima; mastodinia intensa tras añadir espironolactona',
    },
    guideQuestions: [
      '¿Por qué la espironolactona es el fármaco de elección indiscutible en hipertensión resistente según el ensayo PATHWAY-2?',
      '¿Qué parámetros de laboratorio debieron vigilarse estrictamente y en qué fechas exactas?',
      '¿Qué modificación farmacológica específica resuelve la mastodinia manteniendo el control tensional?',
    ],
    expectedAnswer: {
      diagnosis: 'Hipertensión arterial resistente con control alcanzado mediante antagonista de receptor mineralocorticoide, complicada con efecto adverso endocrino (mastodinia).',
      pharmacologicalMechanism:
        'En hipertensión resistente suele existir un estado de exceso relativo o retención de sodio mediada por aldosterona. El ensayo clínico PATHWAY-2 demostró que la espironolactona es el cuarto fármaco más efectivo comparado con placebo, bisoprolol o doxazosina. Sin embargo, la espironolactona no es selectiva: antagoniza receptores de andrógenos e interactúa con receptores de progesterona, ocasionando mastodinia, ginecomastia y trastornos menstruales.',
      actionPlan:
        '1. Plan de vigilancia obligado: Con TFGe de 45 y K⁺ basal de 4.6, el riesgo de hiperpotasemia fatal es muy elevado. Se debe monitorizar K⁺ y creatinina sérica antes de iniciar, a la 1.ª semana, a la 4.ª semana y luego periódicamente (cada 3-6 meses).\n2. Cambio terapéutico: Suspender espironolactona y cambiar a EPLERENONA (antagonista mineralocorticoide de segunda generación, altamente selectivo por el receptor de aldosterona, sin afinidad significativa por receptores androgénicos ni progestágenos, resolviendo la mastodinia).',
      evidenceNotes:
        'Ensayo PATHWAY-2 (Lancet 2015): espironolactona supera a todas las demás opciones como cuarto fármaco. Si hay efectos adversos antiandrogénicos, la eplerenona es el reemplazo de primera línea.',
    },
    callouts: {
      explicacion:
        'La espironolactona bloquea la aldosterona en el túbulo colector, pero su estructura esteroidea sucia "toca" receptores de testosterona y progesterona provocando ginecomastia y dolor mamario. La eplerenona es la versión quirúrgica y selectiva.',
      mnemotecnia:
        'ESPIRONOLACTONA vs EPLERENONA: Espirono "Lacta" (dolor de mamas y ginecomastia). Eplerenona = "Elegante y Pura" (selectiva, sin drama mamario).',
      redFlag:
        '¡Alerta roja! Espironolactona con TFGe <45 o K⁺ >4.5 mEq/L combinada con ARA-II puede disparar el potasio a >6.0 mEq/L rápidamente. Vigila al día 7 y al día 30.',
    },
  },
  {
    teamId: 4,
    familyTitle: 'EQUIPO 4 · IECA Y ARA-II',
    codename: 'La tos que no se quita',
    vignette:
      'Hombre de 58 años con diabetes mellitus tipo 2 y albuminuria persistente confirmada, en manejo con enalapril 10 mg cada 12 h. Acude a consulta refiriendo tos seca, espasmódica, sin expectoración, predominio nocturno, que inició hace 2 meses y le impide dormir. Además, en su laboratorio de control a las 2 semanas del inicio, la creatinina sérica subió de 1.0 a 1.20 mg/dL (un incremento del 20%). Su médico de primer contacto propone agregar losartán 50 mg al enalapril para "potenciar la nefroprotección diabética".',
    patientData: {
      age: '58 años',
      keyLab: 'Creatinina subió de 1.0 a 1.20 mg/dL (+20%) | Albuminuria positiva',
      clinicalFinding: 'Tos seca nocturna de 2 meses por enalapril; propuesta médica de añadir losartán',
    },
    guideQuestions: [
      '¿El aumento del 20% en la creatinina es motivo justificado para suspender el IECA? Explica el fenómeno hemodinámico glomerular.',
      '¿A qué se debe exactamente la tos seca? ¿Qué conducta tomas con el enalapril y qué opinas de la propuesta de agregar losartán apoyándote en el ensayo ONTARGET?',
    ],
    expectedAnswer: {
      diagnosis: 'Efecto de clase hemodinámico benigno del IECA sobre el glomérulo, tos inducida por bradicinina y propuesta errónea de bloqueo dual del SRAA.',
      pharmacologicalMechanism:
        '1. Creatinina: La angiotensina II vasoconstriñe selectivamente la arteriola eferente para mantener la presión de filtración glomerular. Al inhibir la ECA, el enalapril vasodilata la arteriola eferente, disminuyendo la presión intraglomerular (lo cual a largo plazo frena la esclerosis y la albuminuria). Una elevación de creatinina ≤30% respecto al valor basal es una respuesta hemodinámica esperable y benigna; NO es motivo para suspender el fármaco.\n2. Tos: La ECA es idéntica a la Cininasa II, enzima encargada de degradar la bradicinina y la sustancia P en las vías respiratorias. Al inhibirla, la bradicinina se acumula en el epitelio bronquial estimulando fibras C sensitivas.\n3. Bloqueo dual (IECA + ARA-II): Totalmente contraindicado. El estudio ONTARGET demostró que combinar enalapril/ramipril con un ARA-II no aporta reducción de eventos cardiovasculares ni renales y en cambio duplica el riesgo de hiperpotasemia, síncope y lesión renal aguda.',
      actionPlan:
        '1. Suspender el enalapril debido a la tos refractaria.\n2. Cambiar por monoterapia con un ARA-II (p. ej., losartán o telmisartán), el cual bloquea AT₁ sin inhibir la degradación de bradicinina.\n3. Rechazar rotundamente la combinación simultánea de IECA + ARA-II.\n4. Mantener la vigilancia de creatinina y potasio en 2-4 semanas.',
      evidenceNotes:
        'Ensayo ONTARGET (NEJM 2008): el bloqueo dual del SRAA no confiere beneficio y multiplica los eventos adversos graves.',
    },
    callouts: {
      explicacion:
        'El glomérulo necesita que la arteriola eferente esté cerrada para tener presión de filtrado. El IECA la abre, baja la presión (salvando el riñón a largo plazo) pero sube transitoriamente la creatinina hasta un 30%. Si tose, es bradicinina: cambias a ARA-II, pero nunca sumas los dos.',
      mnemotecnia:
        'IECA = "Inhibe Cininasa → Acumula Tos". Si tose, cámbialo a SARTÁN. "ONTARGET" = Prohibido duplicar el dardo al SRAA.',
      redFlag:
        '¡Alerta roja! Nunca combines IECA con ARA-II. Es una de las red flags farmacológicas más castigadas en medicina: sin beneficio clínico y con alto riesgo de inducir fallo renal e hiperpotasemia.',
    },
  },
  {
    teamId: 5,
    familyTitle: 'EQUIPO 5 · ARNI Y ALISKIRENO',
    codename: 'El cambio apresurado',
    vignette:
      'Paciente de 64 años con insuficiencia cardiaca con fracción de eyección reducida (ICFEr 30%) que se encuentra hospitalizado recibiendo enalapril 10 mg cada 12 h. Durante la entrega de guardia nocturna, el médico residente decide optimizar el tratamiento médico guiado por guías y prescribe iniciar sacubitril/valsartán esa misma noche (apenas 4 horas después de la dosis vespertina de enalapril). Además, con la intención de "bloquear por completo la cascada desde su origen", propone agregar aliskireno por la mañana.',
    patientData: {
      age: '64 años',
      keyLab: 'ICFEr FEVI 30%',
      clinicalFinding: 'Prescripción de Sacubitril/valsartán 4 h post-enalapril + propuesta de aliskireno',
    },
    guideQuestions: [
      '¿Cuál es el peligro de administrar sacubitril/valsartán sin respetar la ventana de lavado tras el IECA y qué tiempo exacto exige la farmacovigilancia?',
      '¿Qué evidencia científica existe sobre asociar aliskireno a un bloqueador del SRAA según el ensayo ALTITUDE?',
    ],
    expectedAnswer: {
      diagnosis: 'Riesgo inminente de angioedema potencialmente fatal por solapamiento de inhibidores de cininas, y contraindicación de bloqueo con aliskireno.',
      pharmacologicalMechanism:
        '1. Riesgo de Angioedema por Sacubitril/valsartán + IECA: Tanto la ECA (cininasa II) como la neprilisina son las dos principales peptidasas responsables de degradar la bradicinina y la sustancia P. Si se administra sacubitril (inhibidor de neprilisina) mientras la ECA sigue inhibida por enalapril, se produce una acumulación explosiva y masiva de bradicinina en el tejido submucoso orofaríngeo, desencadenando angioedema laríngeo fulminante y asfixia. Se requiere obligatoriamente un periodo de lavado libre de fármaco de al menos 36 HORAS tras la última toma del IECA antes de ingerir la primera dosis de sacubitril/valsartán.\n2. Aliskireno combinado: El ensayo clínico ALTITUDE evaluó aliskireno (inhibidor directo de renina) añadido a pacientes que ya recibían IECA o ARA-II; el estudio tuvo que ser suspendido prematuramente porque el grupo con aliskireno presentó aumento significativo de eventos adversos graves: hiperpotasemia severa, hipotensión refractaria, fallo renal e incremento en ictus sin beneficio cardiovascular.',
      actionPlan:
        '1. Cancelar de inmediato la orden de sacubitril/valsartán para esa noche.\n2. Programar una ventana de descanso de 36 horas completas desde la última toma del enalapril antes de dosificar el ARNI.\n3. Descartar definitivamente el aliskireno en este paciente.\n4. Informar al equipo de enfermería sobre signos precoces de angioedema y monitorizar presión arterial.',
      evidenceNotes:
        'Guías AHA/HFSA 2022 y ensayo ALTITUDE (NEJM 2012): la regla de oro de las 36 horas es mandato de seguridad clase I, y el aliskireno combinado está estrictamente desaconsejado.',
    },
    callouts: {
      explicacion:
        'Tanto la ECA como la neprilisina destruyen la bradicinina. Si bloqueas la ECA con enalapril y el sacubitril bloquea la neprilisina a la vez, la bradicinina inunda la vía aérea: el paciente hace angioedema de lengua y glotis.',
      mnemotecnia:
        'ARNI = "Agua de 36 Horas": Espera 36 h de reloj tras el "-pril". ALTITUDE = Aliskireno te tumba si lo combinas.',
      redFlag:
        '¡Alerta roja letal! Administrar sacubitril/valsartán menos de 36 horas después de un IECA es negligencia grave. El angioedema de vía aérea superior compromete la vida en minutos.',
    },
  },
  {
    teamId: 6,
    familyTitle: 'EQUIPO 6 · CALCIOANTAGONISTAS',
    codename: 'Tobillos y frecuencia',
    vignette:
      'Mujer de 66 años con antecedente de hipertensión arterial y fibrilación auricular permanente. Se encuentra bajo tratamiento con amlodipino 10 mg/día y metoprolol succinato 100 mg/día para control de frecuencia cardiaca (FC en reposo: 72 lpm). Desarrolla edema maleolar bilateral simétrico, blando e indoloro, de predominio vespertino. Su médico de atención médica primaria sospecha "retención de líquido" y valora cambiar el amlodipino por verapamilo 240 mg/día para resolver el edema y de paso "apoyar el ritmo cardiaco".',
    patientData: {
      age: '66 años',
      keyLab: 'FC 72 lpm | Edema maleolar ++/++++ bilateral vespertino',
      clinicalFinding: 'Amlodipino 10 mg + Metoprolol 100 mg; propuesta de cambio a Verapamilo',
    },
    guideQuestions: [
      '¿Por qué el edema por dihidropiridinas (amlodipino) NO responde a diuréticos y cuál es su mecanismo fisiopatológico?',
      '¿Por qué sustituir amlodipino por verapamilo en una paciente que ya toma metoprolol representa una contraindicación formal y un grave peligro hemodinámico?',
    ],
    expectedAnswer: {
      diagnosis: 'Edema arteriolar dependiente de dihidropiridinas e interacción farmacológica peligrosa por sinergia inotrópica y dromotrópica negativa (verapamilo + betabloqueador).',
      pharmacologicalMechanism:
        '1. Fisiopatología del edema maleolar: El amlodipino produce vasodilatación preferencial y potente del esfínter precapilar arteriolar sin dilatar de forma equitativa el lecho postcapilar venular. Esto incrementa de manera selectiva la presión hidrostática dentro del capilar perimaleolar, forzando la trasudación de líquido al intersticio por gradiente de Starling. Como NO se debe a una hipervolemia sistémica ni a retención renal de sodio, los diuréticos son ineficaces y pueden inducir hipovolemia. La adición de un IECA o ARA-II vasodilata el lecho venular postcapilar, normaliza la presión intraglomerular capilar y reduce notablemente el edema.\n2. Riesgo Verapamilo + Metoprolol: El verapamilo es un calcioantagonista no dihidropiridínico con potente acción depresora sobre el nodo sinoauricular, el nodo auriculoventricular y el inotropismo miocárdico. Al combinarse con un betabloqueador (metoprolol), se produce un bloqueo dromotrópico y cronotrópico sinérgico aditivo, desencadenando bradicardia extrema, bloqueo auriculoventricular completo (paro sinusal o bloqueo AV de tercer grado) y colapso cardiovascular.',
      actionPlan:
        '1. Rechazar el cambio a verapamilo mientras tome metoprolol.\n2. Manejar el edema por amlodipino reduciendo la dosis a 5 mg o añadiendo un IECA/ARA-II para vasodilatar la vénula postcapilar.\n3. Si fuera indispensable suspender el amlodipino, emplear otra familia compatible (tiazida o ARA-II) manteniendo el metoprolol.',
      evidenceNotes:
        'Goodman & Gilman (14.ª ed.) y Guías ESC 2024: la combinación de verapamilo o diltiazem con betabloqueadores está formalmente desaconsejada por riesgo letal de bloqueo AV.',
    },
    callouts: {
      explicacion:
        'El amlodipino abre la compuerta de entrada (arteriola) pero deja la compuerta de salida (vénula) igual: se encharca el capilar por presión hidrostática, no porque sobre agua. Verapamilo + Metoprolol frenan el nodo AV al doble: riesgo de marcapasos de urgencia.',
      mnemotecnia:
        'DHP ("-DIPINO") = Dilatación Periférica (edema en patas). NO-DHP (Verapamilo/Diltiazem) = Corazón. "Verapamilo + Betabloqueador = Paro AV Seguro".',
      redFlag:
        '¡Alerta roja! Verapamilo o diltiazem intravenoso u oral junto con metoprolol o atenolol es una de las causas más frecuentes de bloqueo AV completo yatrogénico en urgencias.',
    },
  },
  {
    teamId: 7,
    familyTitle: 'EQUIPO 7 · BETABLOQUEADORES Y BLOQUEADORES α₁',
    codename: 'Las crisis misteriosas',
    vignette:
      'Hombre de 40 años que acude a urgencias por episodios paroxísticos recurrentes de cefalea pulsátil intensa, sudoración profusa y palpitaciones taquicárdicas. Durante la valoración se registra una presión arterial alarmante de 220/120 mmHg y taquicardia sinusal de 130 lpm. El médico de guardia sospecha clínicamente un feocromocitoma y, alarmado por la frecuencia cardiaca de 130 lpm y la hipertensión, prescribe de inmediato propranolol 40 mg vía oral como fármaco inicial.',
    patientData: {
      age: '40 años',
      keyLab: 'PA 220/120 mmHg | FC 130 lpm | Paroxismos de cefalea + diaforesis',
      clinicalFinding: 'Sospecha feocromocitoma; médico indica propranolol en monoterapia inicial',
    },
    guideQuestions: [
      '¿Cuál fue el gravísimo error farmacológico cometido al administrar un betabloqueador no selectivo en esta sospecha clínica?',
      '¿Cuál es la secuencia farmacológica estricta obligatoria (el orden de bloqueo) y qué advertencia de primera dosis acompaña a los bloqueadores α₁?',
    ],
    expectedAnswer: {
      diagnosis: 'Contraindicación absoluta de betabloqueo aislado en feocromocitoma (riesgo de crisis hipertensiva por vasoconstricción α₁ no antagonizada).',
      pharmacologicalMechanism:
        'El feocromocitoma es un tumor neuroendocrino productor masivo de catecolaminas (adrenalina y noradrenalina). La noradrenalina estimula los receptores vasculares α₁ (vasoconstricción) y la adrenalina estimula los receptores β₂ (vasodilatación en lechos musculares) y β₁ (taquicardia). Si se administra un betabloqueador (propranolol) sin un bloqueo α previo, se eliminan los efectos vasodilatadores mediados por β₂ y la caída de la resistencia periférica, dejando toda la carga masiva de catecolaminas actuando sobre los receptores α₁ vasculares sin oposición alguna ("un-opposed alpha stimulation"). Esto provoca vasoconstricción periférica extrema, agravamiento explosivo de la crisis hipertensiva, hemorragia intracraneal o edema pulmonar agudo.',
      actionPlan:
        '1. Regla de oro: NUNCA betabloqueador antes de un bloqueo alfa completo. Secuencia: PRIMERO BLOQUEO ALFA, DESPUÉS BLOQUEO BETA (regla nemotécnica alfabética: "A" antes de "B").\n2. Iniciar primero un bloqueador α: antagonista irreversible como fenoxibenzamina o antagonista selectivo α₁ como doxazosina/prazosina durante al menos 10 a 14 días.\n3. Una vez alcanzado el bloqueo alfa adecuado y expandida la volemia, añadir el betabloqueador para controlar la taquicardia.\n4. Advertencia: los bloqueadores α₁ producen "síncope de primera dosis" por caída súbita del tono vascular; deben administrarse al acostarse con ingesta de agua.',
      evidenceNotes:
        'Katzung (16.ª ed.) y Goodman & Gilman (14.ª ed.): el bloqueo beta aislado en feocromocitoma es un error clásico de examen y de guardia con desenlace potencialmente mortal.',
    },
    callouts: {
      explicacion:
        'La adrenalina del tumor empuja tanto acelerador (alfa = vasoconstricción) como freno parcial (beta-2 = vasodilatación). Si apagas beta con propranolol, dejas al receptor alfa libre para estrangular todas las arterias del cuerpo. La presión sube a niveles mortales.',
      mnemotecnia:
        'ORDEN ALFABÉTICO OBLIGATORIO: Primero "A" (Alfa-bloqueo: doxazosina/fenoxibenzamina), luego "B" (Betabloqueador). Jamás la B antes de la A.',
      redFlag:
        '¡Alerta roja! Propranolol o cualquier betabloqueador administrado solo ante sospecha de feocromocitoma es yatrogenia pura: desata crisis hipertensiva con edema agudo de pulmón o ictus.',
    },
  },
  {
    teamId: 8,
    familyTitle: 'EQUIPO 8 · SIMPATICOLÍTICOS CENTRALES Y VASODILATADORES DIRECTOS',
    codename: 'La suspensión abrupta',
    vignette:
      'Paciente masculino de 52 años con hipertensión arterial severa que tomaba clonidina 0.6 mg/día en dosis divididas junto con metoprolol. Debido a que se le terminó la receta durante el fin de semana, decide suspender bruscamente ambos fármacos. Veinticuatro horas después es llevado de urgencia a choque: diaforético, tembloroso, intensamente ansioso, con taquicardia sinusal de 135 lpm y cifras tensionales de 230/130 mmHg.',
    patientData: {
      age: '52 años',
      keyLab: 'PA 230/130 mmHg | FC 135 lpm | Sudoración, temblor distal, ansiedad extrema',
      clinicalFinding: 'Suspensión súbita de Clonidina 0.6 mg/día + Metoprolol',
    },
    guideQuestions: [
      '¿Cuál es el mecanismo fisiopatológico del síndrome de abstinencia/rebote por clonidina?',
      '¿Por qué intentar controlar la crisis con un betabloqueador solo es peligroso y cuál es el manejo médico correcto?',
      'Pregunta de bonificación: ¿Qué reacción inmunológica adversa característica distingue a la hidralazina crónica y en qué perfil metabólico de pacientes es más frecuente?',
    ],
    expectedAnswer: {
      diagnosis: 'Crisis hipertensiva de rebote mediada por tormenta simpática hiperadrenérgica por retirada abrupta de clonidina.',
      pharmacologicalMechanism:
        '1. Mecanismo del rebote por clonidina: La clonidina es un agonista α₂ presináptico que frena la liberación de noradrenalina desde las terminaciones nerviosas simpáticas centrales y periféricas. La administración crónica induce una regulación al alza (up-regulation) y supersensibilidad de los receptores adrenérgicos postsinápticos y acumulación intracelular de noradrenalina en las vesículas presinápticas. Al retirar la clonidina bruscamente, se libera súbitamente el freno presináptico: torrentes masivos de catecolaminas inundan la hendidura sináptica e impactan sobre receptores hiperreactivos, desatando una tormenta adrenérgica idéntica a un feocromocitoma.\n2. Peligro del betabloqueador aislado: Al igual que en el feocromocitoma, dar un betabloqueador solo bloquea los receptores β₂ vasodilatadores, dejando la estimulación α₁ sin oposición y elevando aún más la resistencia vascular periférica.\n3. Tratamiento: Reiniciar la clonidina por vía oral si el paciente deglute, o administrar fentolamina (bloqueador α), labetalol (bloqueador mixto α/β) o nitroprusiato de sodio intravenoso. Solo se adiciona betabloqueador tras haber establecido el bloqueo α.\n4. Bonificación Hidralazina: La hidralazina induce un Síndrome de Lupus Farmacoinducido caracterizado por artralgias, mialgias, fiebre y serositis con presencia de anticuerpos antihistona positivos en más del 95% de los casos. Es notablemente más frecuente en pacientes "acetiladores lentos" (genotipo NAT2 lento), ya que su metabolismo hepático depende de la N-acetiltransferasa.',
      actionPlan:
        '1. No usar betabloqueadores solos.\n2. Reiniciar clonidina o infusión de labetalol / fentolamina / nitroprusiato.\n3. Monitorización invasiva continua de PA.\n4. Para el futuro: educar sobre el retiro escalonado (tapering) a lo largo de 1-2 semanas y jamás suspender de golpe.',
      evidenceNotes:
        'Goodman & Gilman (14.ª ed.) y Katzung (16.ª ed.): la retirada de clonidina debe ser gradual; el lupus por hidralazina correlaciona directamente con el fenotipo acetilador lento.',
    },
    callouts: {
      explicacion:
        'La clonidina funcionaba como una presa que contenía un lago inmenso de noradrenalina. Al quitarla de golpe, la presa se rompe y la noradrenalina choca contra receptores que estaban hambrientos y ultrasensibles.',
      mnemotecnia:
        'CLONIDINA = "CLONA-FRENO": Si quitas el freno, te estrellas en 24 horas. HIDRALAZINA = "Histonas y Lupus en acetiladores lentos".',
      redFlag:
        '¡Alerta roja! Nunca suspendas clonidina de forma abrupta. Y si llega en crisis de rebote, jamás metas un betabloqueador solo.',
    },
  },
];
