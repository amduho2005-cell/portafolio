import { test } from 'node:test';
import assert from 'node:assert/strict';
import { avanzarKonami } from './microinteracciones.ts';

const U = 'ArrowUp', D = 'ArrowDown', L = 'ArrowLeft', R = 'ArrowRight';
const codigo = [U, U, D, D, L, R, L, R, 'b', 'a'];
const correr = (teclas: string[]) => teclas.reduce(avanzarKonami, 0);

test('código Konami', () => {
  assert.equal(correr(codigo), 10, 'código exacto');
  assert.equal(correr([U, U, U, ...codigo.slice(2)]), 10, '↑ extra al inicio');
  assert.equal(correr(['x', ...codigo]), 10, 'tecla suelta antes');
  assert.equal(correr([...codigo.slice(0, 9), 'x']), 0, 'falla al final');
  assert.equal(correr([U, U, D, U]), 1, 'un ↑ inesperado reinicia en 1');
});
