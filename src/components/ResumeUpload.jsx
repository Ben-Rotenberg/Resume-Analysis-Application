import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paper, Text, Center } from '@mantine/core';
import { processResumes } from '../utils/pdfProcessor';

export default function ResumeUpload({ apiKey, jobRequirements, setResults, setLoading }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    if (!apiKey || !jobRequirements.length) return;
    
    setLoading(true);
    try {
      const results = await processResumes(acceptedFiles, jobRequirements, apiKey);
      setResults(results);
    } catch (error) {
      console.error('Error processing resumes:', error);
    }
    setLoading(false);
  }, [apiKey, jobRequirements]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true
  });

  return (
    <Paper withBorder>
      <div 
        {...getRootProps()} 
        className="dropzone"
        style={{ 
          backgroundColor: isDragActive ? '#f1f3f5' : 'white'
        }}
      >
        <input {...getInputProps()} />
        <Center>
          <Text size="lg" c="dimmed">
            {isDragActive
              ? 'Drop the resumes here...'
              : 'Drag & drop resumes here, or click to select files'}
          </Text>
        </Center>
      </div>
    </Paper>
  );
}
