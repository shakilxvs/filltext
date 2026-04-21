import {
  generateLoremWords, generateLoremSentences, generateLoremParagraphs, generateLoremBytes,
  generateRandomLatinWords, generateRandomLatinSentences, generateRandomLatinParagraphs, generateRandomLatinBytes,
} from './loremGenerator.js';
import {
  generateEnglishWords, generateEnglishSentences, generateEnglishParagraphs, generateEnglishBytes,
} from './englishGenerator.js';
import {
  generateKeywordWords, generateKeywordSentences, generateKeywordParagraphs, generateKeywordBytes,
} from './keywordGenerator.js';

export function countWords(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function countChars(text) {
  if (!text) return 0;
  return text.length;
}

export function countCharsNoSpaces(text) {
  if (!text) return 0;
  return text.replace(/\s/g, '').length;
}

export function countSentences(text) {
  if (!text || !text.trim()) return 0;
  const matches = text.match(/[^.!?]*[.!?]+/g);
  return matches ? matches.length : 0;
}

export function countParagraphs(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\n\n+/).filter(p => p.trim().length > 0).length;
}

export function estimateReadTime(text) {
  const words = countWords(text);
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export function wrapInPTags(text) {
  const paragraphs = text.trim().split(/\n\n+/);
  return paragraphs.map(p => `<p>${p.trim()}</p>`).join('\n\n');
}

export function applyFormatOptions(text, options) {
  let result = text;

  if (options.uppercase) {
    result = result.toUpperCase();
  } else if (options.lowercase) {
    result = result.toLowerCase();
  }

  if (options.htmlTags) {
    // If html tags, wrap each paragraph before adding line breaks
    const paragraphs = result.trim().split(/\n\n+/);
    if (options.uppercase) {
      result = paragraphs.map(p => `<P>${p.trim()}</P>`).join('\n\n');
    } else if (options.lowercase) {
      result = paragraphs.map(p => `<p>${p.trim()}</p>`).join('\n\n');
    } else {
      result = paragraphs.map(p => `<p>${p.trim()}</p>`).join('\n\n');
    }
  }

  if (!options.lineBreaks) {
    result = result.replace(/\n\n+/g, ' ');
  }

  return result;
}

export function generateText(mode, count, type, keyword, formatOptions) {
  const startWithLorem = formatOptions.startWithLorem && (type === 'lorem');
  let rawText = '';

  if (type === 'lorem') {
    if (mode === 'words') rawText = generateLoremWords(count, startWithLorem);
    else if (mode === 'sentences') rawText = generateLoremSentences(count, startWithLorem);
    else if (mode === 'paragraphs') rawText = generateLoremParagraphs(count, startWithLorem);
    else if (mode === 'bytes') rawText = generateLoremBytes(count, startWithLorem);
  } else if (type === 'random-latin') {
    if (mode === 'words') rawText = generateRandomLatinWords(count);
    else if (mode === 'sentences') rawText = generateRandomLatinSentences(count);
    else if (mode === 'paragraphs') rawText = generateRandomLatinParagraphs(count);
    else if (mode === 'bytes') rawText = generateRandomLatinBytes(count);
  } else if (type === 'english') {
    if (mode === 'words') rawText = generateEnglishWords(count);
    else if (mode === 'sentences') rawText = generateEnglishSentences(count);
    else if (mode === 'paragraphs') rawText = generateEnglishParagraphs(count);
    else if (mode === 'bytes') rawText = generateEnglishBytes(count);
  } else if (type === 'keyword') {
    const kw = keyword.trim() || 'content';
    if (mode === 'words') rawText = generateKeywordWords(count, kw);
    else if (mode === 'sentences') rawText = generateKeywordSentences(count, kw);
    else if (mode === 'paragraphs') rawText = generateKeywordParagraphs(count, kw);
    else if (mode === 'bytes') rawText = generateKeywordBytes(count, kw);
  }

  return applyFormatOptions(rawText, formatOptions);
}
