import { loremWords, LOREM_OPENING } from '../data/loremWords.js';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSentence(wordCount) {
  const count = wordCount || randomInt(8, 18);
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(randomItem(loremWords));
  }
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

function generateParagraph(startWithOpening = false) {
  const sentenceCount = randomInt(4, 8);
  const sentences = [];
  for (let i = 0; i < sentenceCount; i++) {
    if (i === 0 && startWithOpening) {
      sentences.push(LOREM_OPENING);
    } else {
      sentences.push(generateSentence());
    }
  }
  return sentences.join(' ');
}

export function generateLoremWords(count, startWithLorem = false) {
  const words = [];
  if (startWithLorem) {
    const openingWords = LOREM_OPENING.replace(/[.,]/g, '').split(' ');
    words.push(...openingWords);
  }
  while (words.length < count) {
    words.push(randomItem(loremWords));
  }
  const result = words.slice(0, count).join(' ');
  return result.charAt(0).toUpperCase() + result.slice(1) + '.';
}

export function generateLoremSentences(count, startWithLorem = false) {
  const sentences = [];
  for (let i = 0; i < count; i++) {
    if (i === 0 && startWithLorem) {
      sentences.push(LOREM_OPENING);
    } else {
      sentences.push(generateSentence());
    }
  }
  return sentences.join(' ');
}

export function generateLoremParagraphs(count, startWithLorem = false) {
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateParagraph(i === 0 && startWithLorem));
  }
  return paragraphs.join('\n\n');
}

export function generateLoremBytes(targetBytes, startWithLorem = false) {
  let text = '';
  let firstParagraph = true;
  while (new TextEncoder().encode(text).length < targetBytes) {
    if (text.length > 0) text += '\n\n';
    text += generateParagraph(firstParagraph && startWithLorem);
    firstParagraph = false;
  }
  // Trim to approximate byte count
  const encoder = new TextEncoder();
  while (encoder.encode(text).length > targetBytes && text.length > 0) {
    text = text.slice(0, -1);
  }
  return text;
}

// Random Latin - same word bank but never starts with classic opening
export function generateRandomLatinWords(count) {
  return generateLoremWords(count, false);
}

export function generateRandomLatinSentences(count) {
  return generateLoremSentences(count, false);
}

export function generateRandomLatinParagraphs(count) {
  return generateLoremParagraphs(count, false);
}

export function generateRandomLatinBytes(targetBytes) {
  return generateLoremBytes(targetBytes, false);
}
