import { useState } from 'react';
import { Container, Title, Stack } from '@mantine/core';
import ApiKeyInput from './components/ApiKeyInput';
import JobDescription from './components/JobDescription';
import ResumeUpload from './components/ResumeUpload';
import ResultsTable from './components/ResultsTable';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [jobRequirements, setJobRequirements] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Container size="lg" py="xl">
      <Stack spacing="xl">
        <Title order={1}>Resume Analyzer</Title>
        <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
        <JobDescription 
          apiKey={apiKey}
          setJobRequirements={setJobRequirements}
        />
        <ResumeUpload 
          apiKey={apiKey}
          jobRequirements={jobRequirements}
          setResults={setResults}
          setLoading={setLoading}
        />
        <ResultsTable 
          results={results} 
          jobRequirements={jobRequirements}
          loading={loading}
        />
      </Stack>
    </Container>
  );
}
