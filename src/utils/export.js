import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export function exportToCsv(results) {
  const data = results.map(result => ({
    'Candidate Name': result.candidate_name,
    ...result.analysis.reduce((acc, curr) => ({
      ...acc,
      [curr.requirement]: `${curr.rating} - ${curr.explanation}`
    }), {})
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'resume_analysis.csv';
  link.click();
}

export function exportToPdf(results) {
  const doc = new jsPDF();
  
  const tableData = results.map(result => [
    result.candidate_name,
    ...result.analysis.map(a => `${a.rating} - ${a.explanation}`)
  ]);

  const headers = [
    'Candidate Name',
    ...results[0].analysis.map(a => a.requirement)
  ];

  doc.autoTable({
    head: [headers],
    body: tableData
  });

  doc.save('resume_analysis.pdf');
}
