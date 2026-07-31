const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');
const reportDirectory = path.join(projectRoot, 'quality-report');
const eslintReportPath = path.join(reportDirectory, 'eslint-report.html');
const prettierReportPath = path.join(reportDirectory, 'prettier-report.txt');
const indexPath = path.join(reportDirectory, 'index.html');
const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';

function run(args) {
  return spawnSync(command, args, {
    cwd: projectRoot,
    encoding: 'utf8',
    shell: false,
  });
}

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function statusLabel(status) {
  return status === 0 ? 'Réussi' : 'Échec';
}

fs.rmSync(reportDirectory, { recursive: true, force: true });
fs.mkdirSync(reportDirectory, { recursive: true });

const eslintResult = run([
  'eslint',
  '.',
  '--format',
  'html',
  '--output-file',
  eslintReportPath,
]);

if (!fs.existsSync(eslintReportPath)) {
  fs.writeFileSync(
    eslintReportPath,
    `<!doctype html><html lang="fr"><meta charset="utf-8"><title>ESLint</title><body><h1>Rapport ESLint indisponible</h1><pre>${escapeHtml(
      eslintResult.stderr || eslintResult.stdout || 'Aucune sortie disponible.',
    )}</pre></body></html>`,
    'utf8',
  );
}

const prettierResult = run(['prettier', '.', '--check']);
const prettierOutput = [prettierResult.stdout, prettierResult.stderr]
  .filter(Boolean)
  .join('\n')
  .trim();

fs.writeFileSync(
  prettierReportPath,
  prettierOutput || 'Tous les fichiers respectent le formatage Prettier.',
  'utf8',
);

const generatedAt = new Date().toISOString();
const eslintStatus = eslintResult.status ?? 1;
const prettierStatus = prettierResult.status ?? 1;

const html = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Qualité du code — SauceDemo QA Automation</title>
  <style>
    :root { color-scheme: light dark; }
    body { max-width: 1050px; margin: 0 auto; padding: 40px 24px; font-family: system-ui, sans-serif; line-height: 1.5; }
    header { margin-bottom: 28px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }
    .card { border: 1px solid #d0d7de; border-radius: 12px; padding: 22px; }
    .success { color: #1a7f37; }
    .failure { color: #cf222e; }
    .status { font-size: 1.25rem; font-weight: 700; }
    a { color: #0969da; }
    pre { overflow-x: auto; white-space: pre-wrap; padding: 16px; border-radius: 8px; background: rgba(127, 127, 127, 0.12); }
    footer { margin-top: 32px; font-size: 0.9rem; opacity: 0.75; }
  </style>
</head>
<body>
  <header>
    <h1>Rapport qualité du code</h1>
    <p>Contrôles ESLint et Prettier exécutés par GitHub Actions.</p>
  </header>

  <main>
    <section class="grid">
      <article class="card">
        <h2>ESLint</h2>
        <p class="status ${eslintStatus === 0 ? 'success' : 'failure'}">${statusLabel(eslintStatus)}</p>
        <p>Code de sortie : ${eslintStatus}</p>
        <a href="./eslint-report.html">Consulter le rapport ESLint détaillé</a>
      </article>

      <article class="card">
        <h2>Prettier</h2>
        <p class="status ${prettierStatus === 0 ? 'success' : 'failure'}">${statusLabel(prettierStatus)}</p>
        <p>Code de sortie : ${prettierStatus}</p>
        <a href="./prettier-report.txt">Télécharger la sortie Prettier</a>
      </article>
    </section>

    <section>
      <h2>Résultat Prettier</h2>
      <pre>${escapeHtml(prettierOutput || 'Tous les fichiers sont correctement formatés.')}</pre>
    </section>
  </main>

  <footer>Généré le ${generatedAt}</footer>
</body>
</html>`;

fs.writeFileSync(indexPath, html, 'utf8');

console.log(`Rapport qualité généré : ${indexPath}`);
console.log(`ESLint exit code: ${eslintStatus}`);
console.log(`Prettier exit code: ${prettierStatus}`);
