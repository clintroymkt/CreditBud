import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  app.post('/api/parse-statement', async (req, res) => {
    try {
      const { base64Data, mimeType } = req.body;
      
      if (!base64Data || !mimeType) {
         res.status(400).json({ error: 'Missing file data' });
         return;
      }

      console.log(`Parsing statement of type ${mimeType}...`);
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: [
          {
            text: 'Analyze the provided statement (bank statement, mobile money export, or receipt). Extract up to 5 clear transactions including date, amount, description, source and category. Infer if it is credit or debit. Standardize output into the requested JSON schema.'
          },
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              transactions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    date: { type: Type.STRING, description: "YYYY-MM-DD format" },
                    amount: { type: Type.NUMBER },
                    type: { type: Type.STRING, description: "'credit' or 'debit'" },
                    category: { type: Type.STRING },
                    source: { type: Type.STRING, description: "'bank', 'mobile_money', or 'manual'" },
                    description: { type: Type.STRING }
                  },
                  required: ["date", "amount", "type", "category", "source", "description"]
                }
              },
              scoreAdjustment: {
                type: Type.NUMBER,
                description: "Estimated score impact from these transactions (-30 to +30) based on financial trajectory"
              }
            },
            required: ["transactions", "scoreAdjustment"]
          }
        }
      });
      console.log('Gemini finished parsing.');
      const text = response.text;
      
      res.json(JSON.parse(text!));
      
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message || 'Error parsing statement' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
