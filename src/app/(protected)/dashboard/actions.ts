"use server"
import {streamText} from 'ai';
import { createStreamableValue } from 'ai/rsc';
import Groq from 'groq-sdk';
// import { GoogleGenAI } from '@google/genai';
import { generateEmbedding } from '@/lib/gemini';
import { db } from '@/server/db';

// const genAI = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY!,
// });
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
});


export async function askQuestion(question: string, projectId: string) {
  const stream = createStreamableValue();

  const queryEmbedding = await generateEmbedding(question);
  const vectorQuery = `[${queryEmbedding?.join(',')}]`;

  const result = await db.$queryRaw`
    SELECT "fileName", "sourceCode", "summary",
    1 - ("summaryEmbedding" <=> ${vectorQuery} :: vector) AS similarity 
      FROM "SourceCodeEmbeddings"
      WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery} :: vector) > 0.5
      AND "projectId" = ${projectId}
      AND "summaryEmbedding" IS NOT NULL
      ORDER BY similarity DESC
      LIMIT 3;
  ` as {fileName: string, sourceCode: string, summary: string}[];

  let context = '';

  for (const row of result) {
    //context += `souce: ${row.fileName}\n code content: ${row.summary}\n summary of file:\n${row.sourceCode}\n\n`;
    context += `File: ${row.fileName}\nSummary: ${row.summary}\nSource Code:\n${row.sourceCode}\n\n---\n\n`;
  }

  //using groq for question answering
  (async () => {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      stream: true,
      messages: [
        {
          role: "user",
          content: `
                  You are an AI code assistant who answers questions about the codebase. Your target audience is a technical intern who is looking to understand the codebase.
                  AI assistant is a brand new, powerful, human-like artificial intelligence.
                  The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
                  AI is a well-behaved and well-mannered individual.
                  AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
                  AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in the world.
                  If the question is asking about code or a specific file, AI will provide the detailed answer, giving step by step instructions.

                  START CONTEXT BLOCK
                  ${context}
                  END OF CONTEXT BLOCK

                  START QUESTION
                  ${question}
                  END OF QUESTION

                  AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
                  If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
                  AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
                  AI assistant will not invent anything that is not drawn directly from the context.
                  Answer in markdown syntax, with code snippets if needed. Be as detailed as possible when answering.
         `
        }
      ]
    });

    for await (const chunk of response) {
      const text = chunk.choices[0]?.delta?.content ?? '';
      if (text) {
        stream.update(text);
      }
    }

    stream.done();
  })();

  //using gemini for question answering
  // (async () => {
  //   const prompt = `You are an AI code assistant who answers questions about the codebase. Your target audience is a technical intern who is looking to understand the codebase.
  //     AI assistant is a brand new, powerful, human-like artificial intelligence.
  //     The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
  //     AI is a well-behaved and well-mannered individual.
  //     AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
  //     AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in the world.
  //     If the question is asking about code or a specific file, AI will provide the detailed answer, giving step by step instructions.

  //     START CONTEXT BLOCK
  //     ${context}
  //     END OF CONTEXT BLOCK

  //     START QUESTION
  //     ${question}
  //     END OF QUESTION

  //     AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
  //     If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
  //     AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
  //     AI assistant will not invent anything that is not drawn directly from the context.
  //     Answer in markdown syntax, with code snippets if needed. Be as detailed as possible when answering.
  //   `;

  //   const response = await genAI.models.generateContentStream({
  //     model: "gemini-2.0-flash",
  //     contents: [{
  //       role: "user",
  //       parts: [{ text: prompt }],
  //     }],
  //   });

  //   for await (const chunk of response) {
  //     const text = chunk.text;  // ✅ .text is a property, not chunk.text()
  //     if (text) {
  //       stream.update(text);
  //     }
  //   }

  //   stream.done();
  // })();

  return {
    output: stream.value,
    filesReferences: result,
  }
} 