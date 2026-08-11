const priorities = [
  { id: 'P0', label: 'Critique', included: 23, automated: 16, rate: 69.6, color: 'var(--lime)' },
  { id: 'P1', label: 'Important', included: 19, automated: 6, rate: 31.6, color: 'var(--orange)' },
  { id: 'P2', label: 'Complémentaire', included: 2, automated: 0, rate: 0, color: 'var(--red)' },
];

const stories = [
  { id: 'US-001', name: 'Se connecter', included: 5, covered: ['TC-001 à TC-005'], missing: [], rate: 100 },
  { id: 'US-002', name: 'Consulter le catalogue', included: 2, covered: [], missing: ['TC-006', 'TC-007'], rate: 0 },
  { id: 'US-003', name: 'Trier le catalogue', included: 5, covered: ['TC-008 à TC-011'], missing: ['TC-012'], rate: 80 },
  { id: 'US-004', name: 'Consulter un produit', included: 3, covered: ['TC-015'], missing: ['TC-013', 'TC-014'], rate: 33.3 },
  { id: 'US-005', name: 'Ajouter au panier', included: 4, covered: ['TC-016'], missing: ['TC-017 à TC-019'], rate: 25 },
  { id: 'US-006', name: 'Retirer du panier', included: 2, covered: ['TC-020', 'TC-021'], missing: [], rate: 100 },
  { id: 'US-007', name: 'Consulter le panier', included: 3, covered: ['TC-023'], missing: ['TC-022', 'TC-024'], rate: 33.3 },
  { id: 'US-008', name: 'Fournir les informations client', included: 4, covered: ['TC-025 à TC-028'], missing: [], rate: 100 },
  { id: 'US-009', name: 'Contrôler le récapitulatif', included: 4, covered: ['TC-034'], missing: ['TC-032', 'TC-033', 'TC-035'], rate: 25 },
  { id: 'US-010', name: 'Finaliser la commande', included: 3, covered: ['TC-036', 'TC-037'], missing: ['TC-038'], rate: 66.7 },
  { id: 'US-011', name: 'Annuler ou revenir', included: 2, covered: [], missing: ['TC-039', 'TC-040'], rate: 0 },
  { id: 'US-012', name: 'Gérer la session', included: 4, covered: ['TC-041'], missing: ['TC-042', 'TC-043', 'TC-047'], rate: 25 },
  { id: 'US-013', name: 'Réinitialiser l’application', included: 1, covered: [], missing: ['TC-044'], rate: 0 },
  { id: 'US-014', name: 'Utiliser le menu', included: 2, covered: [], missing: ['TC-045', 'TC-046'], rate: 0 },
];

const priorityCards = document.querySelector('#priorityCards');
const storyList = document.querySelector('#storyList');
const emptyState = document.querySelector('#emptyState');
const search = document.querySelector('#search');
let activeFilter = 'all';

const formatRate = (rate) => rate.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const toneForRate = (rate) => (rate === 100 ? 'var(--lime)' : rate === 0 ? 'var(--red)' : 'var(--orange)');

priorityCards.innerHTML = priorities.map((item) => `
  <article class="priority-card" style="--tone:${item.color}">
    <header><span class="badge">${item.id}</span><span>${item.label}</span></header>
    <strong>${formatRate(item.rate)} %</strong>
    <p>${item.automated} automatisés · ${item.included - item.automated} non automatisés · ${item.included} inclus</p>
    <div class="meter" aria-hidden="true"><span style="--value:${item.rate}%"></span></div>
  </article>
`).join('');

function matchesFilter(story) {
  if (activeFilter === 'complete') return story.rate === 100;
  if (activeFilter === 'none') return story.rate === 0;
  if (activeFilter === 'partial') return story.rate > 0 && story.rate < 100;
  return true;
}

function renderStories() {
  const query = search.value.trim().toLowerCase();
  const filtered = stories.filter((story) => {
    const searchable = [story.id, story.name, ...story.covered, ...story.missing].join(' ').toLowerCase();
    return matchesFilter(story) && searchable.includes(query);
  });

  storyList.innerHTML = filtered.map((story) => {
    const coveredCount = Math.round((story.rate / 100) * story.included);
    const evidence = story.covered.length ? `Couverts : ${story.covered.join(', ')}` : 'Aucun TC couvert';
    const gaps = story.missing.length ? ` · Manquants : ${story.missing.join(', ')}` : '';
    const tone = toneForRate(story.rate);
    return `
      <article class="story" data-rate="${story.rate}">
        <span class="story-id">${story.id}</span>
        <div class="story-name"><strong>${story.name}</strong><small>${coveredCount}/${story.included} cas automatisés</small></div>
        <div class="story-tcs">${evidence}${gaps}</div>
        <div class="story-rate" style="--tone:${tone}">${formatRate(story.rate)} %<span><i style="--value:${story.rate}%"></i></span></div>
      </article>`;
  }).join('');
  emptyState.hidden = filtered.length > 0;
}

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderStories();
  });
});

search.addEventListener('input', renderStories);
document.querySelector('#printReport').addEventListener('click', () => window.print());

const themeToggle = document.querySelector('#themeToggle');
const savedTheme = localStorage.getItem('qa-coverage-theme');
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('qa-coverage-theme', next);
});

renderStories();
