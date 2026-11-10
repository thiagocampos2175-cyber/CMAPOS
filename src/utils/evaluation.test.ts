import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateWeightedScore,
  calculateAuraDelta,
  getAuraStatus,
  verifyTeacherPin,
  evaluateQuizResult,
  TEACHER_PIN,
} from './evaluation';

test('calculateWeightedScore calculates correct 1-4 scale', () => {
  // All 4s = 4.0
  const maxScore = calculateWeightedScore({
    mecanismo: 4,
    seguridad: 4,
    evidencia: 4,
    equipo: 4,
    exposicion: 4,
  });
  assert.equal(maxScore, 4.0);

  // All 1s = 1.0
  const minScore = calculateWeightedScore({
    mecanismo: 1,
    seguridad: 1,
    evidencia: 1,
    equipo: 1,
    exposicion: 1,
  });
  assert.equal(minScore, 1.0);

  // Mixed: mechanism=4 (0.30*4=1.2), safety=3 (0.25*3=0.75), evidence=3 (0.20*3=0.6), team=4 (0.10*4=0.4), presentation=4 (0.15*4=0.6)
  // Total = 1.2 + 0.75 + 0.6 + 0.4 + 0.6 = 3.55
  const mixed = calculateWeightedScore({
    mecanismo: 4,
    seguridad: 3,
    evidencia: 3,
    equipo: 4,
    exposicion: 4,
  });
  assert.equal(mixed, 3.55);
});

test('calculateAuraDelta maps scores to aura changes', () => {
  assert.equal(calculateAuraDelta(3.8), 40);
  assert.equal(calculateAuraDelta(3.2), 20);
  assert.equal(calculateAuraDelta(2.5), -10);
  assert.equal(calculateAuraDelta(1.5), -30);
});

test('getAuraStatus assigns proper badges', () => {
  assert.match(getAuraStatus(70).badge, /SIGMA/);
  assert.match(getAuraStatus(30).badge, /MAIN CHARACTER/);
  assert.match(getAuraStatus(10).badge, /NPC/);
  assert.match(getAuraStatus(-10).badge, /COCINADO/);
});

test('verifyTeacherPin validates 1234', () => {
  assert.equal(verifyTeacherPin('1234'), true);
  assert.equal(verifyTeacherPin(' 1234 '), true);
  assert.equal(verifyTeacherPin('0000'), false);
  assert.equal(verifyTeacherPin(''), false);
  assert.equal(TEACHER_PIN, '1234');
});

test('evaluateQuizResult provides score feedback', () => {
  const perfect = evaluateQuizResult(10);
  assert.equal(perfect.percentage, 100);
  assert.match(perfect.verdict, /Sigma/i);

  const passed = evaluateQuizResult(8);
  assert.equal(passed.percentage, 80);
  assert.match(passed.verdict, /Rizz/i);

  const fail = evaluateQuizResult(3);
  assert.equal(fail.percentage, 30);
  assert.match(fail.verdict, /Cocinado/i);
});
