// learn: les comptes SauceDemo sont centralisés pour éviter les valeurs dupliquées dans les tests.
// build: chaque profil représente un comportement applicatif distinct à couvrir.
// deploy: les tests CI utilisent ces données stables sans exposer de secret réel.
const password = 'secret_sauce';

const users = {
  standard: { username: 'standard_user', password },
  lockedOut: { username: 'locked_out_user', password },
  problem: { username: 'problem_user', password },
  performanceGlitch: { username: 'performance_glitch_user', password },
  error: { username: 'error_user', password },
  visual: { username: 'visual_user', password },
  invalidPassword: { username: 'standard_user', password: 'wrong_password' },
  emptyUsername: { username: '', password },
  emptyPassword: { username: 'standard_user', password: '' },
};

module.exports = { users };
