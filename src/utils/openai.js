import OpenAI from 'openai';

export async function analyzeJobDescription(description, apiKey) {
  const openai = new OpenAI({ apiKey });
  
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: `Extract key job requirements from the following job description. 
                Output as JSON array of requirements.`
    }, {
      role: "user",
      content: description
    }]
  });

  return JSON.parse(response.choices[0].message.content).job_requirements_list;
}

export async function analyzeResume(resumeText, requirements, apiKey) {
  const openai = new OpenAI({ apiKey });
  
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: `Analyze the resume against these requirements: ${requirements.join(', ')}`
    }, {
      role: "user",
      content: resumeText
    }]
  });

  return JSON.parse(response.choices[0].message.content);
}
