import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

export class NotesService {
  static async generateNotes(videoId: string, captions: string) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [
            {
              text: `Generate concise, organized notes for this video based on the captions. Focus on key points and organize them logically. Video ID: ${videoId}`,
            },
          ],
        },
        {
          role: 'user',
          parts: [{ text: captions }],
        },
      ],
    });

    const result = await chatSession.sendMessage('Generate notes for this video');
    return result.response.text();
  }
  static async generateDetailedNotes(videoId: string, captions: string) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [
            {
              text: `Generate detailed notes for this video based on the captions. Focus on key points and organize them logically.If you think some parts is not explained clearly then explain it in detail . Video ID: ${videoId}`,
            },
          ],
        },
        {
          role: 'user',
          parts: [{ text: captions }],
        },
      ],
    });

    const result = await chatSession.sendMessage('Generate notes for this video');
    return result.response.text();
  }
  static async getCaptions(videoId: string) {
    const response = await fetch(`/api/getCaptions?videoId=${videoId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch captions');
    }
    return response.json();
  }
}
