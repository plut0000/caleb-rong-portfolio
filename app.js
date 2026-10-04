const projects = {
  signspeak: {
    title: 'SignSpeak', category: 'Accessibility · Computer vision',
    intro: 'SignSpeak uses a webcam to explore ASL-to-English translation, then displays and speaks the result.',
    steps: [
      'Record a sign with your webcam. MediaPipe extracts pose and hand landmarks in the browser.',
      'Short isolated signs run through a 200-class BiLSTM model using ONNX. Gemini cleans the prediction; longer clips can use a video fallback.',
      'Read the English translation, inspect the confidence and model path, or replay it with browser speech synthesis.'
    ],
    note: 'This is an ASL feasibility proof of concept, with a focus on isolated signs. It is not a certified interpreter.',
    stack: ['Next.js', 'TypeScript', 'MediaPipe', 'ONNX Runtime', 'Gemini', 'Web Speech API'],
    repo: 'https://github.com/plut0000/signspeak-asl-poc', demo: 'https://signspeak-asl-poc.vercel.app/demo', demoText: 'Try the camera demo'
  },
  locus: {
    title: 'Locus', category: 'Exploration · Visual AI',
    intro: 'Locus works out where a photo was taken: metadata first, visual clues second, and a map that shows how uncertain the answer is.',
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
    title: 'Cognify', category: 'Learning · AI workspace',
    intro: 'A study workspace that starts with your own material and turns a notebook into things you can read, practice, and ask questions about.',
    steps: [
      'Upload PDF, TXT, or Markdown notes and organize them in a notebook.',
      'Generate summaries, multiple flashcard decks, practice quizzes with selectable difficulty, or slideshows with speaker notes.',
      'Ask the Gemini-powered study coach questions grounded in the notebook, then move between reviewing and practicing.'
    ],
    note: 'Cognify is open source. The application supports Google sign-in through Auth.js, and its study features use Gemini.',
    stack: ['Next.js', 'TypeScript', 'Gemini', 'PDF.js', 'Auth.js'],
    repo: 'https://github.com/plut0000/Cognify', demo: 'https://cognify-alpha.vercel.app', demoText: 'Open the app'
  }
};

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

function externalLink(className, text, href) {
  const link = createElement('a', className, text);
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.append(createElement('span', 'sr-only', ' (opens in a new tab)'));
  return link;
}

document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  opener = button;
  const eyebrow = createElement('p', 'dialog-eyebrow', project.category);
  const heading = createElement('h2', '', project.title);
  heading.id = 'dialog-title';
  const intro = createElement('p', 'dialog-intro', project.intro);
  const steps = createElement('ol', 'dialog-steps');
  project.steps.forEach(step => steps.append(createElement('li', '', step)));
  const note = createElement('p', 'dialog-note', project.note);
  const stack = createElement('ul', 'tags');
  project.stack.forEach(tech => stack.append(createElement('li', '', tech)));
  const actions = createElement('div', 'dialog-actions');
  if (project.demo) actions.append(externalLink('button button-primary', project.demoText, project.demo));
  actions.append(externalLink(project.demo ? 'button button-secondary' : 'button button-primary', 'View source on GitHub', project.repo));
  dialogContent.replaceChildren(
    eyebrow, heading, intro,
    createElement('h3', '', 'How it works'), steps, note,
    createElement('h3', '', 'Built with'), stack,
    actions
  );
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
