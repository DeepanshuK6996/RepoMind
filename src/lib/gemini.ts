//import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenAI } from '@google/genai';
import { Document } from '@langchain/core/documents';
import Groq from "groq-sdk";

const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
    // httpOptions: { apiVersion: 'v1' }
});

// Separate instance for embedding
// const genAIEmbed = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY!,
//     httpOptions: { apiVersion: 'v1' }
// });

const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY!
}); 


export const aiSummariseCommit = async (diff: string) => {
    const prompt = `
            You are an expert software engineer. Summarize the following Git diff into clear, concise bullet points.

            **Rules:**
            - Focus only on what changed, not the unchanged context lines.
            - Use past tense (e.g., "Added", "Fixed", "Refactored").
            - Mention file names in [square brackets].
            - Limit the summary to 3–6 bullet points max.
            - Do NOT repeat code, file paths, or diff headers.
            - Do NOT include example placeholders or template text.

            **Example format:**
            - Fixed null pointer in [src/utils/helpers.ts]
            - Added API route for user settings [server/routes/user.ts]
            - Refactored state management [src/context/AppContext.ts]

            Now summarize this diff:

            ${diff}
        `;

    // const model = "gemini-3-flash-preview";
    const model = "gemini-2.5-flash"; 
    const contents = [
        {
            role: "user",
            parts: [{ text: prompt }],
        },
    ];

    const response = await genAI.models.generateContent({ model, contents });
    const candidate = response.candidates?.[0];
    // const textContent = candidate?.content?.parts?.[0].text ?? "";
    const rawText = candidate?.content?.parts?.[0]?.text;
    const textContent = rawText ?? "";
    // clean up formatting if Gemini wraps in ```json ... ```
    const feedbackJson = textContent.replace('```json', '').replace('```', '');
  
    return feedbackJson;
}

// console.log(await summariseCommits("https://github.com/DeepanshuK6996/MockMate/commit/0d6ebd77916eefcf91d2021214da6a73703d98f7.diff"));


//code files summarization using GEMINI

// export async function summariseCode(doc: Document){
//     try {
//       const filename = doc.metadata.source;
//       console.log("getting summary for: ", filename);
//       const code = doc.pageContent.slice(0, 10000); //limit to 10000 characters

//       const prompt = `You are an intelligent senior software engineer helping a new junior developer understand this project.
//                     Explain the purpose and functionality of the file named "${filename}" based on the code below.

//                     ---
//                     ${code}
//                     ---

//                     Provide a concise summary (no more than 100 words) describing:
//                     - What this file does and its main responsibilities.
//                     - How it fits into a larger application (if inferable).
//                     Avoid restating the code line-by-line — focus on its intent and purpose.
//                     `;

//       const model = "gemini-2.5-flash";
//       const contents = [
//         {
//           role: "user",
//           parts: [{ text: prompt }],
//         },
//       ];

//       const response = await genAI.models.generateContent({ model, contents });
//       const candidate = response.candidates?.[0];
//       // const textContent = candidate?.content?.parts?.[0].text ?? "";
//       const rawText = candidate?.content?.parts?.[0]?.text;
//       const textContent = rawText ?? "";
//       // clean up formatting if Gemini wraps in ```json ... ```
//       const feedbackJson = textContent
//         .replace("```json", "")
//         .replace("```", "");

//       return feedbackJson;
//     } catch(error) {
//         console.error("Error summarising code for file: ", doc.metadata.source, error);
//         return '';
//     }
// }

//code files summarization using GROQ
export async function summariseCode(doc: Document) {
  try {
    const filename = doc.metadata.source;
    console.log("getting summary for: ", filename);
    const code = doc.pageContent.slice(0, 10000);

    const prompt = `You are an intelligent senior software engineer helping a new junior developer understand this project.
                  Explain the purpose and functionality of the file named "${filename}" based on the code below.

                  ---
                  ${code}
                  ---

                  Provide a concise summary (no more than 100 words) describing:
                  - What this file does and its main responsibilities.
                  - How it fits into a larger application (if inferable).
                  Avoid restating the code line-by-line — focus on its intent and purpose.
                  `;

    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
    });

    return response.choices[0]?.message?.content ?? "";
  } catch (error) {
    console.error("Error summarising code for file: ", doc.metadata.source, error);
    return "";
  }
}

// const models = await genAI.models.list();
// for await (const model of models) {
//     console.log(model.name, model.supportedActions);
// }

export async function generateEmbedding(summary: string){
    // const model = await  genAI.models.embedContent({
    //     model: "text-embedding-004"
    // });

    // // const result = await model.embedContent(summary);
    const response = await genAI.models.embedContent({
        model: 'gemini-embedding-001',
        contents: summary,
    });
    const embedding = response.embeddings;
    //console.log("response : ", response);
    //console.log("embedding are : ", embedding);
    //console.log("embedding values are : ", embedding?.values);
    
    //return embedding?.values;
    return embedding?.[0]?.values;
}

// console.log(await generateEmbedding("hello world"));
// const embedding = await generateEmbedding("hello world");
// console.log("Dimensions:", embedding?.length);