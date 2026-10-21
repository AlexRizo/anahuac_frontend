import test from 'node:test';
import assert from 'node:assert/strict';
import {
    getPrepaResult,
    getSecundariaResult,
    getTotalScore,
    isAdmitted,
} from '../src/helpers/admission.js';
import {
    getLetterVariant,
    getSecundariaPlan,
    MissingGradeError,
    parseMarkup,
} from '../src/helpers/secundariaLetters.js';

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

test('las 6 variantes existen, tienen carta y hoja con los pasos que tocan', () => {
    for (const [totalScore, total, pending] of [[610, 3, 0], [530, 5, 2]]) {
        for (const grade of [1, 2, 3]) {
            const plan = getSecundariaPlan({ totalScore, grade });
            assert.ok(plan.letter.length >= 4, `carta ${totalScore}/${grade}`);
            assert.equal(plan.steps.total, total);
            assert.equal(plan.steps.pending.length, pending);
            assert.equal(plan.steps.enrollmentDocuments.length, 7);
        }
    }
});

test('boleta y carta de buena conducta cambian con el grado', () => {
    const docs = (grade) => getSecundariaPlan({ totalScore: 610, grade }).steps.enrollmentDocuments;
    assert.ok(docs(1).includes('Boleta de calificaciones de 6º.'));
    assert.ok(docs(2).includes('Boleta de calificaciones de 1º.'));
    assert.ok(docs(3).includes('Boleta de calificaciones de 1º y 2º.'));
    assert.ok(docs(1).includes('Carta de buena conducta (no aplica para Colegio Anáhuac).'));
    assert.ok(docs(2).includes('Carta de buena conducta.'));
    assert.ok(docs(3).includes('INE de mamá o papá.'));
});

test('con menos de 500 solo hoja de resultados y no exige grado', () => {
    assert.deepEqual(getSecundariaPlan({ totalScore: 300, grade: undefined }), { variant: null, letter: null, steps: null });
});

test('desde 500 sin grado válido lanza MissingGradeError', () => {
    for (const grade of [undefined, null, 0, 4, 'x']) {
        assert.throws(() => getSecundariaPlan({ totalScore: 530, grade }), MissingGradeError);
        assert.throws(() => getSecundariaPlan({ totalScore: 700, grade }), MissingGradeError);
    }
    assert.equal(getSecundariaPlan({ totalScore: 700, grade: '2' }).grade, 2);
});

test('parseMarkup: negritas y marcadores', () => {
    const runs = parseMarkup('es **{resultado}**; te hace {candidato}.', { resultado: 'satisfactorio', candidato: 'candidata' });
    assert.deepEqual(runs, [
        { text: 'es ', bold: false },
        { text: 'satisfactorio', bold: true },
        { text: '; te hace candidata.', bold: false },
    ]);
});

test('todas las cartas rellenan sus marcadores y tienen negritas balanceadas', () => {
    const values = { fecha: '12 de noviembre de 2025', resultado: 'satisfactorio', candidato: 'candidato' };
    for (const totalScore of [610, 530]) {
        for (const grade of [1, 2, 3]) {
            for (const paragraph of getSecundariaPlan({ totalScore, grade }).letter) {
                assert.equal(paragraph.split('**').length % 2, 1, `negritas sin cerrar: ${paragraph.slice(0, 40)}`);
                const text = parseMarkup(paragraph, values).map((r) => r.text).join('');
                assert.ok(!/[{}]/.test(text), `marcador sin rellenar: ${text.slice(0, 40)}`);
                assert.ok(!text.includes('\n'), 'sin saltos manuales');
            }
        }
    }
});

test('2º y 3º no hablan de Primaria; 1º sí', () => {
    const text = (totalScore, grade) => getSecundariaPlan({ totalScore, grade }).letter.join(' ');
    for (const totalScore of [610, 530]) {
        assert.ok(text(totalScore, 1).includes('Primaria'));
        assert.ok(!text(totalScore, 2).includes('Primaria'));
        assert.ok(!text(totalScore, 3).includes('Primaria'));
    }
});
