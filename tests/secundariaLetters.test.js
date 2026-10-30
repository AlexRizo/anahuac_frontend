import test from 'node:test';
import assert from 'node:assert/strict';
import {
    getPrepaResult,
    getSecundariaResult,
    getTotalScore,
    isAdmitted,
} from '../src/helpers/admission.js';
import {
    ADMISSIONS_CYCLE,
    getLetterVariant,
    getSecundariaPlan,
    parseMarkup,
} from '../src/helpers/secundariaLetters.js';
import { buildSchoolPayload, getOriginType, getSchoolFormValues, SCHOOL_OPTIONS, validateSchoolFields } from '../src/helpers/schools.js';

test('getTotalScore suma y trata vacíos como 0', () => {
    assert.equal(getTotalScore(100, 250, 260), 610);
    assert.equal(getTotalScore(undefined, null, 5), 5);
});

test('nivel de secundaria en cada frontera', () => {
    const cases = [
        [800, 'sobresaliente'], [799, 'satisfactorio'], [600, 'satisfactorio'],
        [599, 'aún no satisfactorio'], [500, 'aún no satisfactorio'], [499, 'insuficiente'], [0, 'insuficiente'],
    ];
    for (const [score, expected] of cases) assert.equal(getSecundariaResult(score), expected, String(score));
});

test('nivel de preparatoria en cada frontera', () => {
    const cases = [
        [1000, 'sobresaliente'], [999, 'muy satisfactorio'], [780, 'muy satisfactorio'],
        [779, 'satisfactorio'], [650, 'satisfactorio'], [649, 'aún no satisfactorio'],
    ];
    for (const [score, expected] of cases) assert.equal(getPrepaResult(score), expected, String(score));
});

test('isAdmitted: secundaria desde 500, preparatoria desde 650', () => {
    assert.equal(isAdmitted('SECUNDARIA', 500), true);
    assert.equal(isAdmitted('SECUNDARIA', 499), false);
    assert.equal(isAdmitted('PREPARATORIA', 650), true);
    assert.equal(isAdmitted('PREPARATORIA', 649), false);
});

test('variante de la carta por puntaje', () => {
    assert.equal(getLetterVariant(610), 'satisfactorio');
    assert.equal(getLetterVariant(600), 'satisfactorio');
    assert.equal(getLetterVariant(530), 'aunNo');
    assert.equal(getLetterVariant(500), 'aunNo');
    assert.equal(getLetterVariant(499), null);
});

const ANA = 'ANAHUAC', EXT = 'EXTERNO';
const flat = (plan) => JSON.stringify(plan);

test('rutas de admisión: pasos y promedio por resultado y procedencia (correo del colegio)', () => {
    // [puntaje, procedencia, pasos, promedio, pasos pendientes]
    const cases = [
        [850, ANA, 3, '8', 1], [610, ANA, 3, '8', 1],
        [850, EXT, 3, '8.5', 1], [610, EXT, 3, '8.5', 1],
        [530, ANA, 5, '8', 3], [530, EXT, 6, '8.5', 4],
    ];
    for (const [totalScore, originType, total, average, pending] of cases) {
        const { steps } = getSecundariaPlan({ totalScore, originType });
        const tag = `${totalScore}/${originType}`;
        assert.equal(steps.total, total, tag);
        assert.equal(steps.done.length + steps.pending.length, total, `${tag}: pasos listados`);
        assert.equal(steps.pending.length, pending, tag);
        assert.ok(flat(steps).includes(`Promedio mínimo de ${average}`), `${tag}: promedio en los documentos`);
        assert.ok(steps.pending.join(' ').toLowerCase().includes(`promedio mínimo de ${average}`), `${tag}: promedio en el paso`);
        assert.equal(steps.enrollmentDocuments.length, 6, tag);
    }
});

test('sobresaliente y satisfactorio no llevan entrevista (3 pasos); aún no sí, antes de la resolución', () => {
    for (const originType of [ANA, EXT]) {
        for (const totalScore of [850, 610]) {
            const { steps } = getSecundariaPlan({ totalScore, originType });
            assert.ok(!/entrevista/i.test(flat(steps)), `${totalScore}/${originType}`);
            assert.match(steps.pending[0], /^Solicitud de inscripción/);
            assert.equal(steps.numbered, false);
        }
        const { steps } = getSecundariaPlan({ totalScore: 530, originType });
        assert.match(steps.pending[0], /^Entrevista con el Departamento Psicopedagógico/);
        assert.match(steps.pending[1], /^Resolución de admisión/);
        assert.equal(steps.numbered, true);
    }
});

test('aún no: Anáhuac une plan de trabajo con la inscripción; externos lo separan', () => {
    assert.deepEqual(getSecundariaPlan({ totalScore: 530, originType: ANA }).steps.pending.slice(2), ['Inscripción con plan de trabajo (previa cita en Admisiones)']);
    assert.deepEqual(getSecundariaPlan({ totalScore: 530, originType: EXT }).steps.pending.slice(2), ['Plan de trabajo', 'Inscripción (previa cita en Admisiones)']);
});

test('la nota de inscripciones solo va en sobresaliente y satisfactorio, con la fecha de su procedencia', () => {
    const ana = getSecundariaPlan({ totalScore: 610, originType: ANA }).steps.notice;
    const ext = getSecundariaPlan({ totalScore: 850, originType: EXT }).steps.notice;
    assert.ok(ana.includes('lunes 30 de noviembre') && ext.includes('lunes 07 de diciembre'));
    assert.ok(ana.includes(ADMISSIONS_CYCLE.enrollmentDeadline) && ext.includes('18 de enero de 2027'));
    assert.equal(getSecundariaPlan({ totalScore: 530, originType: ANA }).steps.notice, null);
    assert.equal(getSecundariaPlan({ totalScore: 530, originType: EXT }).steps.notice, null);
});

test('el listado de requisitos es el nuevo: ficha y contrato, sin carta de buena conducta ni "original y dos copias"', () => {
    const { steps } = getSecundariaPlan({ totalScore: 610, originType: ANA });
    assert.deepEqual(steps.enrollmentRequirements, ['Llenado de ficha de inscripción y firma de contrato.', 'Recoger fichas del banco y realizar el pago.']);
    assert.deepEqual(steps.enrollmentDocuments.map((d) => d.replace(/\*\*/g, '')), [
        'Certificado de Primaria.', 'Boleta de calificaciones oficial de 6º. Promedio mínimo de 8.', 'Acta de nacimiento.',
        'CURP.', '4 fotografías tamaño infantil.', 'INE de mamá o papá.',
    ]);
    assert.ok(!/buena conducta|original/i.test(flat(steps)));
    assert.equal(steps.closing, 'Posteriormente, se agendará fecha para la realización del Examen de Ubicación de Idiomas y la Sesión de Inducción.');
});

test('insuficiente: sin carta ni pasos, con el texto formato (cambia "Colima" en externos)', () => {
    for (const originType of [ANA, EXT]) {
        for (const totalScore of [499, 0]) {
            const plan = getSecundariaPlan({ totalScore, originType });
            assert.equal(plan.result, 'insuficiente');
            assert.equal(plan.letter, null);
            assert.equal(plan.steps, null);
            assert.equal(plan.insufficientText.length, 2);
            assert.match(plan.insufficientText[0], /no cumple con los requisitos académicos/);
        }
    }
    assert.match(getSecundariaPlan({ totalScore: 100, originType: ANA }).insufficientText[0], /Secundaria Anáhuac\. Después/);
    assert.match(getSecundariaPlan({ totalScore: 100, originType: EXT }).insufficientText[0], /Secundaria Anáhuac Colima\. Después/);
});

test('el resultado de la carta sale del puntaje en cada frontera y la carta es la misma para ambas procedencias', () => {
    for (const [score, result, variant] of [[800, 'sobresaliente', 'satisfactorio'], [799, 'satisfactorio', 'satisfactorio'], [600, 'satisfactorio', 'satisfactorio'], [599, 'aún no satisfactorio', 'aunNo'], [500, 'aún no satisfactorio', 'aunNo']]) {
        const a = getSecundariaPlan({ totalScore: score, originType: ANA });
        const e = getSecundariaPlan({ totalScore: score, originType: EXT });
        assert.equal(a.result, result, String(score));
        assert.equal(a.variant, variant, String(score));
        assert.deepEqual(a.letter, e.letter, String(score));
    }
});

test('la procedencia es obligatoria y válida', () => {
    for (const originType of [undefined, null, '', 'anahuac', 'OTRA']) {
        assert.throws(() => getSecundariaPlan({ totalScore: 610, originType }), /Procedencia no válida/);
    }
});

test('parseMarkup: negritas y marcadores', () => {
    assert.deepEqual(parseMarkup('Hola **mundo** {x}', { x: 'ok' }), [{ text: 'Hola ', bold: false }, { text: 'mundo', bold: true }, { text: ' ok', bold: false }]);
    assert.deepEqual(parseMarkup('{sin} valor'), [{ text: '{sin} valor', bold: false }]);
});

test('todas las cartas, pasos y notas rellenan sus marcadores y tienen negritas balanceadas', () => {
    const values = { fecha: '12 de noviembre de 2025', resultado: 'satisfactorio', candidato: 'candidata' };
    for (const totalScore of [850, 610, 530, 100]) {
        for (const originType of [ANA, EXT]) {
            const plan = getSecundariaPlan({ totalScore, originType });
            const texts = [
                ...(plan.letter ?? []), ...(plan.insufficientText ?? []),
                ...(plan.steps ? [...plan.steps.done, ...plan.steps.pending, ...plan.steps.enrollmentDocuments, plan.steps.notice ?? ''] : []),
            ];
            for (const text of texts) {
                const filled = parseMarkup(text, values).map((r) => r.text).join('');
                assert.ok(!/\{\w+\}/.test(filled), `marcador sin rellenar: ${text.slice(0, 50)}`);
                assert.equal((text.match(/\*\*/g) ?? []).length % 2, 0, `negritas desbalanceadas: ${text.slice(0, 50)}`);
            }
        }
    }
});

test('las cartas hablan de primaria (1º de secundaria) y no de otros grados', () => {
    for (const totalScore of [610, 530]) {
        const letter = getSecundariaPlan({ totalScore, originType: ANA }).letter.join(' ');
        assert.match(letter, /Primaria/);
        assert.ok(!/segundo grado|tercer grado/i.test(letter));
    }
});

// ---- escuela de procedencia
test('clasificación: el origin_type guardado manda; sin él, se deduce del nombre (aspirantes anteriores)', () => {
    assert.equal(getOriginType({ origin_type: 'ANAHUAC', origin: 'Otra' }), ANA);
    assert.equal(getOriginType({ origin_type: 'EXTERNO', origin: 'Primaria Anáhuac' }), EXT);
    for (const origin of ['PRIMARIA ANÁHUAC', 'primaria anahuac colima', 'Colegio Anáhuac', 'ANAHUAC']) {
        assert.equal(getOriginType({ origin }), ANA, origin);
    }
    for (const origin of ['COLEGIO ARBORE', 'Escuela Benito Juárez', '', undefined]) {
        assert.equal(getOriginType({ origin }), EXT, String(origin));
    }
    assert.equal(getOriginType(), EXT);
});

test('formulario de edición: preselecciona la escuela sin reclasificar a nadie', () => {
    assert.deepEqual(getSchoolFormValues({ app_origin: 'SECUNDARIA', origin: 'PRIMARIA ANÁHUAC', origin_type: 'ANAHUAC' }), { school_option: 'PRIMARIA_ANAHUAC', old_school: '' });
    assert.deepEqual(getSchoolFormValues({ app_origin: 'SECUNDARIA', origin: 'Primaria Anáhuac Colima' }), { school_option: 'PRIMARIA_ANAHUAC', old_school: '' }, 'anterior con "anáhuac" sigue siendo interno');
    assert.deepEqual(getSchoolFormValues({ app_origin: 'SECUNDARIA', origin: 'colegio arbore', origin_type: 'EXTERNO' }), { school_option: 'COLEGIO_ARBORE', old_school: '' });
    assert.deepEqual(getSchoolFormValues({ app_origin: 'SECUNDARIA', origin: 'Escuela Benito Juárez' }), { school_option: 'OTRO', old_school: 'Escuela Benito Juárez' });
    assert.deepEqual(getSchoolFormValues({ app_origin: 'PREPARATORIA', origin: 'Secu 3' }), { school_option: '', old_school: 'Secu 3' });
});

test('payload al servidor: secundaria manda la opción; preparatoria solo el texto', () => {
    assert.deepEqual(buildSchoolPayload({ school_option: 'COLEGIO_ARBORE', old_school: 'lo que sea' }, true), { school_option: 'COLEGIO_ARBORE', old_school: 'COLEGIO ARBORE' });
    assert.deepEqual(buildSchoolPayload({ school_option: 'OTRO', old_school: '  Mi escuela ' }, true), { school_option: 'OTRO', old_school: 'Mi escuela' });
    assert.deepEqual(buildSchoolPayload({ school_option: '', old_school: ' Secu 3 ' }, false), { old_school: 'Secu 3' });
    assert.equal(SCHOOL_OPTIONS.filter((o) => o.type === ANA).length, 1);
});

test('validación del formulario: lista obligatoria, nombre solo con OTRO; preparatoria pide el texto', () => {
    const run = (data, isSecundaria) => { const issues = []; validateSchoolFields(data, { addIssue: (i) => issues.push(i.path[0]) }, isSecundaria); return issues; };
    assert.deepEqual(run({ school_option: '', old_school: '' }, true), ['school_option']);
    assert.deepEqual(run({ school_option: 'COLEGIO_ARBORE', old_school: '' }, true), []);
    assert.deepEqual(run({ school_option: 'OTRO', old_school: '  ' }, true), ['old_school']);
    assert.deepEqual(run({ school_option: 'OTRO', old_school: 'X' }, true), []);
    assert.deepEqual(run({ school_option: '', old_school: '' }, false), ['old_school']);
    assert.deepEqual(run({ school_option: '', old_school: 'Secu' }, false), []);
});
