import { Table, Button, Paper, LoadingOverlay, Group } from '@mantine/core';
import { exportToCsv, exportToPdf } from '../utils/export';

export default function ResultsTable({ results, jobRequirements, loading }) {
  if (!results.length) return null;

  return (
    <Paper shadow="xs" p="md" withBorder style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
      <Group mb="md">
        <Button onClick={() => exportToCsv(results)}>
          Export CSV
        </Button>
        <Button onClick={() => exportToPdf(results)}>
          Export PDF
        </Button>
      </Group>
      <Table>
        <thead>
          <tr>
            <th>Candidate Name</th>
            {jobRequirements.map((req, i) => (
              <th key={i}>{req}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((result, i) => (
            <tr key={i}>
              <td>{result.candidate_name}</td>
              {result.analysis.map((analysis, j) => (
                <td key={j}>
                  {analysis.rating} - {analysis.explanation}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}
