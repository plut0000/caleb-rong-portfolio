const projects = {
  signspeak: {
    title: 'SignSpeak', category: 'ACCESSIBILITY / COMPUTER VISION',
    intro: 'An experiment in turning movement into meaning. SignSpeak uses a camera to explore ASL-to-English translation, then displays and speaks the result.',
    steps: [
      'Record a sign with your webcam. MediaPipe extracts pose and hand landmarks in the browser.',
      'Short isolated signs run through a 200-class BiLSTM model using ONNX. Gemini cleans the prediction; longer clips can use a video fallback.',
      'Read the English translation, inspect the confidence and model path, or replay it with browser speech synthesis.'
    ],
    note: 'This is an ASL feasibility proof of concept, with a focus on isolated signs. It is not a certified interpreter.',
    stack: ['Next.js', 'TypeScript', 'MediaPipe', 'ONNX Runtime', 'Gemini', 'Web Speech API'],
    repo: 'https://github.com/plut0000/signspeak-asl-poc', demo: 'https://signspeak-asl-poc.vercel.app/demo', demoText: 'Open camera demo'
  },
  locus: {
    title: 'Locus', category: 'EXPLORATION / VISUAL AI',
    intro: 'Where was this photo taken? Locus approaches the question with metadata first, visual clues second, and a map that communicates uncertainty.',
    steps: [
      'Drop in a photo. The browser checks for embedded EXIF GPS coordinates and supports HEIC conversion when possible.',
      'If GPS data is present, use it to locate the photo. Otherwise, a server-side vision model estimates a place from visible clues such as architecture, signs, and terrain.',
      'Explore the result on a Leaflet map, with a rationale and an uncertainty circle rather than a claim of an exact location.'
    ],
    note: 'The repository is named photo-geo-guess. EXIF-based location works without an AI key; visual guesses require a configured provider on the server.',
    stack: ['Vite', 'React', 'TypeScript', 'Leaflet', 'exifr', 'Express'],
    repo: 'https://github.com/plut0000/photo-geo-guess'
  },
  cognify: {
    title: 'Cognify', category: 'LEARNING / AI WORKSPACE',
    intro: 'A study workspace that starts with your own material. Cognify helps turn a notebook into things you can read, practice, and ask questions about.',
    steps: [
      'Upload PDF, TXT, or Markdown notes and organize them in a notebook.',
      'Generate summaries, multiple flashcard decks, practice quizzes with selectable difficulty, or slideshows with speaker notes.',
      'Ask the Gemini-powered study coach questions grounded in the notebook, then move between reviewing and practicing.'
    ],
    note: 'Cognify is open source. The application supports Google sign-in through Auth.js, and its study features use Gemini.',
    stack: ['Next.js', 'TypeScript', 'Gemini', 'PDF.js', 'Auth.js'],
    repo: 'https://github.com/plut0000/Cognify', demo: 'https://cognify-alpha.vercel.app', demoText: 'Open study workspace'
  }
};

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  cards.forEach(card => {
    card.hidden = selected !== 'all' && card.dataset.category !== selected;
    if (!card.hidden) count++;
  });
  document.getElementById('filter-status').textContent = selected === 'all' ? 'Showing all 3 projects.' : `Showing ${count} ${selected} project.`;
}));

const dialog = document.getElementById('project-dialog');
const dialogContent = document.getElementById('dialog-content');
const closeButton = dialog.querySelector('.dialog-close');
let opener;

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  opener = button;
  const eyebrow = createElement('p', 'dialog-eyebrow', project.category);
  const heading = createElement('h2', '', project.title + '.');
  heading.id = 'dialog-title';
  const intro = createElement('p', 'dialog-intro', project.intro);
  const workflowHeading = createElement('h3', '', 'How it works');
  const steps = createElement('ol');
  project.steps.forEach(step => steps.append(createElement('li', '', step)));
  const note = createElement('p', 'dialog-note', project.note);
  const stackHeading = createElement('h3', '', 'Built with');
  const stack = createElement('div', 'tech-tags dialog-stack');
  project.stack.forEach(tech => stack.append(createElement('span', '', tech)));
  const actions = createElement('div', 'dialog-actions');
  if (project.demo) {
    const demo = createElement('a', 'button button-dark', project.demoText + ' ↗');
    demo.href = project.demo; demo.target = '_blank'; demo.rel = 'noopener noreferrer';
    demo.append(createElement('span', 'sr-only', ' (opens in a new tab)'));
    actions.append(demo);
  }
  const repo = createElement('a', project.demo ? 'source-link' : 'button button-dark', 'View on GitHub ↗');
  repo.href = project.repo; repo.target = '_blank'; repo.rel = 'noopener noreferrer';
  repo.append(createElement('span', 'sr-only', ' (opens in a new tab)'));
  actions.append(repo);
  dialogContent.replaceChildren(eyebrow, heading, intro, workflowHeading, steps, note, stackHeading, stack, actions);
  document.body.classList.add('body-modal');
  dialog.showModal();
  dialog.scrollTop = 0;
  closeButton.focus();
}));

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('body-modal');
  opener?.focus({preventScroll:true});
});
