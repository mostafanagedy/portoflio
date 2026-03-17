import { GoogleGenAI } from '@google/genai';

type ChatHistory = { role: string; parts: { text: string }[] }[];

const apiKey =
  import.meta.env.VITE_GEMINI_API_KEY ||
  import.meta.env.GEMINI_API_KEY ||
  '';

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const FALLBACK_CONTEXT = `
Mostafa Nagedy (NAG-DEY) is a Senior Full-Stack Engineer with 5+ years experience.
Current role: Senior Full-Stack Engineer at TechNova Systems (2022-Present).
Previous roles: Software Architect at DataStream AI (2020-2022), Frontend Developer at Innovate Labs (2018-2020).
Skills:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Python, Go, PostgreSQL, Redis, GraphQL
- DevOps: Docker, Kubernetes, AWS, Terraform, GitHub Actions
Featured projects: Quantum Analytics Platform, Neural Mesh Network, EcoSphere OS.
`;

const getFallbackReply = (question: string): string => {
  const lower = question.toLowerCase();
  if (lower.includes('contact') || lower.includes('email')) {
    return 'You can contact Mostafa from the Contact page. I can also help summarize his skills before you reach out.';
  }
  if (lower.includes('skill')) {
    return 'Mostafa focuses on React/TypeScript on frontend, Node.js/Python/Go on backend, and AWS + Docker/Kubernetes for delivery.';
  }
  if (lower.includes('project')) {
    return 'Featured projects include Quantum Analytics Platform, Neural Mesh Network, and EcoSphere OS.';
  }
  if (lower.includes('experience') || lower.includes('work')) {
    return 'He has 5+ years of experience, currently at TechNova Systems, and previously at DataStream AI and Innovate Labs.';
  }
  return 'I can help with Mostafa\'s experience, skills, projects, and certifications. Ask me something specific like "What backend technologies does he use?"';
};

export const chatWithGemini = async (
  message: string,
  history: ChatHistory,
): Promise<string> => {
  if (!ai) {
    return getFallbackReply(message);
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are an assistant for Mostafa Nagedy. Keep answers concise and factual.
Use only this context:
${FALLBACK_CONTEXT}
If information is missing, ask user to check the contact page.`,
      },
      history,
    });

    const response = await chat.sendMessage({ message });
    return response.text || getFallbackReply(message);
  } catch {
    return getFallbackReply(message);
  }
};
