interface MeetingSummary {
  highlights: string[];
  actionItems: Array<{
    task: string;
    assignee?: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  decisions: string[];
  speakers: string[];
  topics: string[];
}

const AI_PROMPT = `
Please analyze the following meeting transcript and provide a structured summary in JSON format. Extract:

1. highlights: Key points, achievements, metrics, or important information discussed (3-5 items)
2. actionItems: Tasks that need to be completed, with assignee if mentioned and priority level
3. decisions: Important decisions or agreements made during the meeting
4. speakers: List of people who spoke (extract names from the transcript)
5. topics: Main topics or themes discussed

For action items, determine priority as:
- high: urgent tasks, deadlines mentioned, critical issues
- medium: important but not urgent tasks
- low: general tasks, nice-to-have items

Return only valid JSON without any markdown formatting or explanations.

Meeting transcript:
`;

// Replace this with your actual OpenAI API key
const OPENAI_API_KEY = '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';

export const summarizeWithAI = async (transcript: string): Promise<MeetingSummary> => {
  console.log("Starting AI summarization with OpenAI API");
  
  if (!transcript.trim()) {
    throw new Error('Meeting transcript is required');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert meeting assistant. Analyze meeting transcripts and extract structured information in JSON format.'
        },
        {
          role: 'user',
          content: AI_PROMPT + transcript
        }
      ],
      temperature: 0.3,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('OpenAI API Error:', errorData);
    
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check the configured OpenAI API key.');
    } else if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a few moments.');
    } else if (response.status === 403) {
      throw new Error('API access forbidden. Please check your OpenAI account status.');
    } else {
      throw new Error(`AI service error: ${response.status}. Please try again.`);
    }
  }

  const data = await response.json();
  console.log("OpenAI API Response received");
  console.log("Full API Response:", JSON.stringify(data, null, 2));

  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Invalid response from AI service');
  }

  const content = data.choices[0].message.content;
  console.log("Raw AI Content:", content);
  
  try {
    const summary = JSON.parse(content) as MeetingSummary;
    
    // Validate the structure
    if (!summary.highlights || !summary.actionItems || !summary.decisions || !summary.speakers || !summary.topics) {
      throw new Error('Invalid summary structure from AI');
    }

    console.log("Parsed Summary:", JSON.stringify(summary, null, 2));
    console.log("AI summarization completed successfully");
    return summary;
  } catch (parseError) {
    console.error('Failed to parse AI response:', parseError);
    console.error('Content that failed to parse:', content);
    throw new Error('Failed to parse AI response. Please try again.');
  }
};
