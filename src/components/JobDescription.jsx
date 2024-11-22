import { useState } from 'react';
import { Textarea, Button, Paper, Stack } from '@mantine/core';
import { analyzeJobDescription } from '../utils/openai';

export default function JobDescription({ apiKey, setJobRequirements }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!description || !apiKey) return;
    
    setLoading(true);
    try {
      const requirements = await analyzeJobDescription(description, apiKey);
      setJobRequirements(requirements);
    } catch (error) {
      console.error('Error analyzing job description:', error);
    }
    setLoading(false);
  };

  return (
    <Paper shadow="xs" p="md" withBorder>
      <Stack spacing="md">
        <Textarea
          label="Job Description"
          placeholder="Paste job description here"
          minRows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button 
          onClick={handleAnalyze}
          loading={loading}
          disabled={!description || !apiKey}
        >
          Analyze Requirements
        </Button>
      </Stack>
    </Paper>
  );
}
