import axios from 'axios';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Define board member personas
const BOARD_PERSONAS = {
  CEO: {
    role: 'Chief Executive Officer',
    prompt: `You are the CEO of a company. Your primary focus is on long-term growth, company vision, and strategic innovation. 
You think about market opportunities and competitive advantage. Be confident but realistic. 
You also care about team morale and company culture. Keep your response to 2-3 sentences.`
  },
  CFO: {
    role: 'Chief Financial Officer',
    prompt: `You are the CFO of the company. Your focus is on financial implications, costs, ROI, and risks.
You analyze budget impact, cash flow, and profitability. Be thorough but pragmatic.
Look for financial risks and opportunities. Keep your response to 2-3 sentences.`
  },
  CTO: {
    role: 'Chief Technology Officer',
    prompt: `You are the CTO of the company. Your focus is on technical feasibility, implementation complexity, and scalability.
You understand technology trends and can identify technical risks. Be honest about what's possible and what isn't.
Consider team capabilities and technology debt. Keep your response to 2-3 sentences.`
  },
  CMO: {
    role: 'Chief Marketing Officer',
    prompt: `You are the CMO of the company. Your focus is on market demand, customer needs, and competitive positioning.
You understand customer pain points and market trends. Be data-driven in your analysis.
Consider brand impact and customer satisfaction. Keep your response to 2-3 sentences.`
  },
  INVESTOR: {
    role: 'Investor/Advisor',
    prompt: `You are an investor and advisor. Your focus is on ROI, growth potential, and risk mitigation.
You've seen many startups succeed and fail. You're looking for strategies that balance growth with stability.
Be skeptical but constructive. Keep your response to 2-3 sentences.`
  }
};

export async function generateBoardOpinion(idea, memberKey) {
  const persona = BOARD_PERSONAS[memberKey];
  
  if (!persona) {
    throw new Error(`Unknown board member: ${memberKey}`);
  }

  const prompt = `${persona.prompt}

Business Proposal: ${idea}

Please provide your opinion on this proposal:`;

  try {
    return await generateText(prompt, 300);
  } catch (error) {
    console.error(`Error generating opinion for ${memberKey}:`, error.response?.data || error.message);
    throw error;
  }
}

export async function generateFinalDecision(idea, opinions) {
  const prompt = `You are summarizing a board meeting discussing a business proposal.

Business Proposal: ${idea}

Here are the board members' opinions:

CEO Opinion: ${opinions.CEO}

CFO Opinion: ${opinions.CFO}

CTO Opinion: ${opinions.CTO}

CMO Opinion: ${opinions.CMO}

Investor Opinion: ${opinions.INVESTOR}

Based on these discussions, please provide:
1. Executive Summary (2-3 sentences)
2. Final Recommendation (Yes/No/Maybe with reasoning)
3. Key Risks to Consider
4. Next Steps

Format your response clearly with these sections.`;

  try {
    return await generateText(prompt, 500);
  } catch (error) {
    console.error('Error generating final decision:', error.response?.data || error.message);
    throw error;
  }
}

async function generateText(prompt, maxOutputTokens) {
  if (getAiProvider() === 'groq') {
    return generateGroqText(prompt, maxOutputTokens);
  }

  return generateGeminiText(prompt, maxOutputTokens);
}

async function generateGroqText(prompt, maxOutputTokens) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is missing in backend/.env');
  }

  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: getGroqModel(),
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: maxOutputTokens,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data?.choices?.[0]?.message?.content?.trim();

    if (!text) {
      throw new Error('Groq returned an empty response');
    }

    return text;
  } catch (error) {
    const apiMessage = error.response?.data?.error?.message;
    throw new Error(apiMessage || error.message || 'Groq request failed');
  }
}

async function generateGeminiText(prompt, maxOutputTokens) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing in backend/.env');
  }

  try {
    const response = await axios.post(
      `${getGeminiUrl()}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: maxOutputTokens,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();

    if (!text) {
      throw new Error('Gemini returned an empty response');
    }

    return text;
  } catch (error) {
    const apiMessage = error.response?.data?.error?.message;
    throw new Error(apiMessage || error.message || 'Gemini request failed');
  }
}

function getAiProvider() {
  return (process.env.AI_PROVIDER || (process.env.GROQ_API_KEY ? 'groq' : 'gemini')).toLowerCase();
}

function getGroqModel() {
  return process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
}

function getGeminiUrl() {
  const geminiModel = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  return `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`;
}
