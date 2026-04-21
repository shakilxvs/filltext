import { nouns, verbs, adjectives, adverbs, connectors } from '../data/englishWords.js';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const articles = ['The', 'A', 'An', 'Each', 'Every', 'This', 'That'];
const prepositions = ['in', 'of', 'for', 'with', 'through', 'across', 'beyond', 'within', 'among', 'between'];

function generateEnglishSentence() {
  const patterns = [
    // Subject + Verb + Object
    () => {
      const subj = `${randomItem(articles)} ${randomItem(adjectives)} ${randomItem(nouns)}`;
      const verb = randomItem(verbs);
      const obj = `${randomItem(articles).toLowerCase()} ${randomItem(adjectives)} ${randomItem(nouns)}`;
      return `${subj} ${verb}s ${obj}.`;
    },
    // Connector + Subject + Verb + Object
    () => {
      const conn = randomItem(connectors);
      const subj = `${randomItem(articles).toLowerCase()} ${randomItem(nouns)}`;
      const verb = randomItem(verbs);
      const obj = `${randomItem(articles).toLowerCase()} ${randomItem(adjectives)} ${randomItem(nouns)}`;
      return `${conn.charAt(0).toUpperCase() + conn.slice(1)}, ${subj} ${verb}s ${obj} ${randomItem(prepositions)} the ${randomItem(nouns)}.`;
    },
    // Subject + Adverb + Verb + Object
    () => {
      const subj = `${randomItem(articles)} ${randomItem(nouns)}`;
      const adv = randomItem(adverbs);
      const verb = randomItem(verbs);
      const obj = `${randomItem(articles).toLowerCase()} ${randomItem(adjectives)} ${randomItem(nouns)}`;
      return `${subj} ${adv} ${verb}s ${obj}.`;
    },
    // When/As + clause + main clause
    () => {
      const temporal = randomItem(['When', 'As', 'Once', 'After', 'While']);
      const subj1 = `${randomItem(articles).toLowerCase()} ${randomItem(nouns)}`;
      const verb1 = randomItem(verbs);
      const subj2 = `${randomItem(articles).toLowerCase()} ${randomItem(adjectives)} ${randomItem(nouns)}`;
      const verb2 = randomItem(verbs);
      return `${temporal} ${subj1} ${verb1}s, the ${randomItem(nouns)} ${verb2}s ${subj2}.`;
    },
    // Adj Noun + Verb + Adj Noun + Prep + Noun
    () => {
      const subj = `${randomItem(articles)} ${randomItem(adjectives)} ${randomItem(nouns)}`;
      const verb = randomItem(verbs);
      const obj = `${randomItem(adjectives)} ${randomItem(nouns)}`;
      const prep = randomItem(prepositions);
      const final = `the ${randomItem(nouns)}`;
      return `${subj} ${verb}s ${obj} ${prep} ${final}.`;
    },
  ];
  return randomItem(patterns)();
}

function generateEnglishParagraph() {
  const sentenceCount = randomInt(4, 8);
  const sentences = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateEnglishSentence());
  }
  return sentences.join(' ');
}

export function generateEnglishWords(count) {
  const words = [];
  const allWords = [...nouns, ...verbs, ...adjectives, ...adverbs];
  for (let i = 0; i < count; i++) {
    words.push(randomItem(allWords));
  }
  const result = words.join(' ');
  return result.charAt(0).toUpperCase() + result.slice(1) + '.';
}

export function generateEnglishSentences(count) {
  const sentences = [];
  for (let i = 0; i < count; i++) {
    sentences.push(generateEnglishSentence());
  }
  return sentences.join(' ');
}

export function generateEnglishParagraphs(count) {
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateEnglishParagraph());
  }
  return paragraphs.join('\n\n');
}

export function generateEnglishBytes(targetBytes) {
  let text = '';
  while (new TextEncoder().encode(text).length < targetBytes) {
    if (text.length > 0) text += '\n\n';
    text += generateEnglishParagraph();
  }
  const encoder = new TextEncoder();
  while (encoder.encode(text).length > targetBytes && text.length > 0) {
    text = text.slice(0, -1);
  }
  return text;
}
