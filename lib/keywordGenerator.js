import { nouns, verbs, adjectives, adverbs, connectors } from '../data/englishWords.js';

const keywordThemes = {
  technology: {
    related: ['software', 'digital', 'innovation', 'systems', 'data', 'network', 'device', 'platform', 'code', 'application', 'algorithm', 'interface', 'computing', 'automation', 'intelligence'],
    adjectives: ['digital', 'intelligent', 'automated', 'scalable', 'integrated', 'advanced', 'cutting-edge', 'innovative', 'powerful', 'robust'],
    verbs: ['optimize', 'integrate', 'automate', 'deploy', 'develop', 'engineer', 'program', 'compute', 'process', 'enable'],
  },
  food: {
    related: ['cuisine', 'flavor', 'ingredient', 'recipe', 'taste', 'dish', 'cooking', 'nutrition', 'meal', 'restaurant', 'ingredient', 'spice', 'harvest', 'culinary', 'palate'],
    adjectives: ['delicious', 'savory', 'fresh', 'aromatic', 'nutritious', 'flavorful', 'succulent', 'crispy', 'rich', 'vibrant'],
    verbs: ['cook', 'prepare', 'season', 'blend', 'taste', 'simmer', 'garnish', 'serve', 'marinate', 'savor'],
  },
  travel: {
    related: ['journey', 'destination', 'explore', 'adventure', 'culture', 'landscape', 'voyage', 'tourism', 'passport', 'discover', 'itinerary', 'expedition', 'wanderlust', 'horizon', 'nomad'],
    adjectives: ['exotic', 'scenic', 'breathtaking', 'adventurous', 'remote', 'vibrant', 'immersive', 'tranquil', 'majestic', 'authentic'],
    verbs: ['explore', 'discover', 'wander', 'journey', 'venture', 'navigate', 'traverse', 'embark', 'roam', 'experience'],
  },
  sports: {
    related: ['athlete', 'competition', 'team', 'performance', 'training', 'victory', 'championship', 'fitness', 'endurance', 'coach', 'stadium', 'league', 'tournament', 'trophy', 'record'],
    adjectives: ['athletic', 'competitive', 'rigorous', 'elite', 'dynamic', 'powerful', 'agile', 'disciplined', 'resilient', 'focused'],
    verbs: ['compete', 'train', 'achieve', 'perform', 'excel', 'win', 'overcome', 'push', 'strive', 'champion'],
  },
  health: {
    related: ['wellness', 'nutrition', 'exercise', 'mental', 'medical', 'therapy', 'lifestyle', 'recovery', 'strength', 'balance', 'immunity', 'vitality', 'mindfulness', 'prevention', 'healing'],
    adjectives: ['healthy', 'vital', 'balanced', 'holistic', 'preventive', 'restorative', 'nourishing', 'therapeutic', 'beneficial', 'mindful'],
    verbs: ['heal', 'restore', 'strengthen', 'nourish', 'balance', 'improve', 'maintain', 'prevent', 'recover', 'energize'],
  },
  business: {
    related: ['revenue', 'strategy', 'market', 'client', 'growth', 'profit', 'investment', 'enterprise', 'management', 'leadership', 'capital', 'portfolio', 'stakeholder', 'pipeline', 'valuation'],
    adjectives: ['strategic', 'profitable', 'scalable', 'competitive', 'innovative', 'sustainable', 'efficient', 'productive', 'dynamic', 'agile'],
    verbs: ['scale', 'generate', 'optimize', 'leverage', 'drive', 'deliver', 'accelerate', 'transform', 'innovate', 'execute'],
  },
  science: {
    related: ['research', 'experiment', 'discovery', 'hypothesis', 'analysis', 'laboratory', 'evidence', 'theory', 'observation', 'methodology', 'data', 'study', 'breakthrough', 'phenomenon', 'validation'],
    adjectives: ['empirical', 'rigorous', 'systematic', 'quantitative', 'analytical', 'precise', 'objective', 'innovative', 'groundbreaking', 'peer-reviewed'],
    verbs: ['research', 'analyze', 'discover', 'test', 'validate', 'observe', 'measure', 'examine', 'investigate', 'hypothesize'],
  },
  education: {
    related: ['learning', 'knowledge', 'curriculum', 'student', 'teacher', 'classroom', 'skill', 'understanding', 'growth', 'development', 'literacy', 'assessment', 'pedagogy', 'mentorship', 'insight'],
    adjectives: ['educational', 'informative', 'engaging', 'progressive', 'comprehensive', 'structured', 'collaborative', 'inclusive', 'formative', 'enriching'],
    verbs: ['learn', 'teach', 'educate', 'mentor', 'guide', 'develop', 'nurture', 'inspire', 'assess', 'cultivate'],
  },
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getTheme(keyword) {
  const lower = keyword.toLowerCase().trim();
  for (const [key, theme] of Object.entries(keywordThemes)) {
    if (lower.includes(key) || key.includes(lower)) {
      return theme;
    }
  }
  return null;
}

function generateKeywordSentence(keyword, theme, forceKeyword = false) {
  const useKeyword = forceKeyword || Math.random() < 0.3;
  const themeAdj = theme ? randomItem(theme.adjectives) : randomItem(adjectives);
  const themeVerb = theme ? randomItem(theme.verbs) : randomItem(verbs);
  const themeNoun = theme ? randomItem(theme.related) : randomItem(nouns);

  if (useKeyword) {
    const patterns = [
      () => `The ${themeAdj} approach to ${keyword} enables organizations to ${themeVerb} ${randomItem(nouns)} more effectively.`,
      () => `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} plays a critical role in how modern ${randomItem(nouns)}s ${themeVerb} their ${themeNoun}.`,
      () => `A deep understanding of ${keyword} allows practitioners to ${themeVerb} ${themeAdj} ${themeNoun} with greater precision.`,
      () => `The field of ${keyword} continues to ${themeVerb} as new ${themeNoun}s and ${randomItem(nouns)}s emerge.`,
      () => `Leaders in ${keyword} recognize that ${themeAdj} ${themeNoun} is essential for long-term ${randomItem(nouns)}.`,
    ];
    return randomItem(patterns)();
  } else {
    const connector = randomItem(connectors);
    const subj = `The ${themeAdj} ${themeNoun}`;
    const verb = themeVerb;
    const obj = `${randomItem(adjectives)} ${randomItem(nouns)}`;
    return `${connector.charAt(0).toUpperCase() + connector.slice(1)}, ${subj.toLowerCase()} ${verb}s ${obj} in meaningful ways.`;
  }
}

function generateKeywordParagraph(keyword, theme, forceFirstKeyword = false) {
  const sentenceCount = randomInt(4, 8);
  const sentences = [];
  for (let i = 0; i < sentenceCount; i++) {
    const forceKw = (i === 0 && forceFirstKeyword) || (i > 0 && i % randomInt(3, 5) === 0);
    sentences.push(generateKeywordSentence(keyword, theme, forceKw));
  }
  return sentences.join(' ');
}

export function generateKeywordWords(count, keyword) {
  const theme = getTheme(keyword);
  const allWords = theme
    ? [...theme.related, ...theme.adjectives, ...theme.verbs, keyword]
    : [...nouns, ...verbs, ...adjectives, keyword];
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(i % randomInt(4, 7) === 0 ? keyword : randomItem(allWords));
  }
  const result = words.join(' ');
  return result.charAt(0).toUpperCase() + result.slice(1) + '.';
}

export function generateKeywordSentences(count, keyword) {
  const theme = getTheme(keyword);
  const sentences = [];
  for (let i = 0; i < count; i++) {
    const forceKw = i % randomInt(3, 5) === 0;
    sentences.push(generateKeywordSentence(keyword, theme, forceKw));
  }
  return sentences.join(' ');
}

export function generateKeywordParagraphs(count, keyword) {
  const theme = getTheme(keyword);
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateKeywordParagraph(keyword, theme, i === 0));
  }
  return paragraphs.join('\n\n');
}

export function generateKeywordBytes(targetBytes, keyword) {
  const theme = getTheme(keyword);
  let text = '';
  let first = true;
  while (new TextEncoder().encode(text).length < targetBytes) {
    if (text.length > 0) text += '\n\n';
    text += generateKeywordParagraph(keyword, theme, first);
    first = false;
  }
  const encoder = new TextEncoder();
  while (encoder.encode(text).length > targetBytes && text.length > 0) {
    text = text.slice(0, -1);
  }
  return text;
}
