import * as pdfjsLib from 'pdfjs-dist';
import { analyzeResume } from './openai';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(' ');
  }
  
  return text;
}

export async function processResumes(files, requirements, apiKey) {
  const results = [];
  
  for (const file of files) {
    const text = await extractTextFromPdf(file);
    const analysis = await analyzeResume(text, requirements, apiKey);
    results.push(analysis);
  }
  
  return results;
}
