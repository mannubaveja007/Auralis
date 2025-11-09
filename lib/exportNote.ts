import jsPDF from 'jspdf';
import { Note } from '@/types';

export function exportNoteAsMarkdown(note: Note) {
  let md = `# ${note.title}\n`;
  md += `Created: ${note.$createdAt || ''}\n`;
  md += `\n${note.content}\n`;
  if (note.summary) md += `\n## AI Summary\n${note.summary}\n`;
  if (note.tags && note.tags.length > 0) md += `\n**Tags:** ${note.tags.join(', ')}\n`;
  return md;
}

export function exportNoteAsPDF(note: Note) {
  const doc = new jsPDF();
  let y = 10;
  doc.setFontSize(16);
  doc.text(note.title, 10, y);
  y += 10;
  doc.setFontSize(10);
  doc.text(`Created: ${note.$createdAt || ''}`, 10, y);
  y += 10;
  doc.setFontSize(12);
  doc.text(note.content, 10, y);
  y += 10;
  if (note.summary) {
    doc.setFontSize(12);
    doc.text('AI Summary:', 10, y);
    y += 7;
    doc.setFontSize(10);
    doc.text(note.summary, 10, y);
    y += 10;
  }
  if (note.tags && note.tags.length > 0) {
    doc.setFontSize(10);
    doc.text(`Tags: ${note.tags.join(', ')}`, 10, y);
    y += 10;
  }
  doc.save(`${note.title || 'note'}.pdf`);
}
