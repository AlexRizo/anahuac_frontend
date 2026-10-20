import test from 'node:test';
import assert from 'node:assert/strict';
import { groupQuestionsByArticle } from '../src/helpers/lectura.js';

const articles = [
    { id: 'c', number: 3 },
    { id: 'a', number: 1 },
    { id: 'b', number: 2 },
];
const questions = [
    { n: 1, relation: 'b' }, { n: 2, relation: 'a' }, { n: 3, relation: 'c' },
    { n: 4, relation: 'a' }, { n: 5, relation: 'b' }, { n: 6, relation: 'a' },
];
const noShuffle = (list) => list;

test('agrupa por artículo y los ordena por número de artículo, sin importar el orden en que llegan', () => {
    const groups = groupQuestionsByArticle(questions, articles, noShuffle);
    assert.deepEqual(groups.map((g) => g.map((q) => q.n)), [[2, 4, 6], [1, 5], [3]]);
});

test('no pierde ni duplica preguntas al mezclar', () => {
    const groups = groupQuestionsByArticle(questions, articles);
    assert.equal(groups.flat().length, questions.length);
    assert.deepEqual(groups.map((g) => g.length), [3, 2, 1]);
});

test('sin artículos devuelve una lista vacía (no revienta)', () => {
    assert.deepEqual(groupQuestionsByArticle(questions, []), []);
});

test('las preguntas sin artículo conocido se omiten', () => {
    const groups = groupQuestionsByArticle([{ n: 1, relation: 'zzz' }], articles, noShuffle);
    assert.equal(groups.flat().length, 0);
});
