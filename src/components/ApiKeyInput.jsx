import { TextInput, Paper } from '@mantine/core';

export default function ApiKeyInput({ apiKey, setApiKey }) {
  return (
    <Paper shadow="xs" p="md" withBorder>
      <TextInput
        label="OpenAI API Key"
        placeholder="Enter your API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        type="password"
      />
    </Paper>
  );
}
