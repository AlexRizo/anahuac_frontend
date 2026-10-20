import test from 'node:test';
import assert from 'node:assert/strict';
import { sumFourDigits } from '../src/helpers/fourDigits.js';

test('suma las fichas como el servidor: 44+44+4+4+4 = 100', () => {
    assert.equal(sumFourDigits(['4', '4', '+', '4', '4', '+', '4', '+', '4', '+', '4']), 100);
});

test('ignora un "+" final', () => {
    assert.equal(sumFourDigits(['4', '+', '4', '+']), 8);
});

test('acepta siete cuatros juntos', () => {
    assert.equal(sumFourDigits(Array(7).fill('4')), 4444444);
});

test('rechaza todo lo que no sean las fichas de la interfaz', () => {
    for (const bad of [['2**9999999**9999999'], ['constructor'], ['4;4'], ['4 4'], '4+4', [], ['+'], Array(14).fill('4')]) {
        assert.equal(sumFourDigits(bad), null, JSON.stringify(bad));
    }
});
