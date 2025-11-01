//import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!
});

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const aiSummariseCommit = async (diff: string) => {
    //diff => githuburl/commit/<CommitHash>.diff

    // const prompt = [`You are an expert programmer, and you are trying to summarize a git diff.
    // Reminders about the git diff format:
    // For every file, there are a few metadata lines, like (for example):
    // \`\`\`
    // diff --git a/lib/index.js b/lib/index.js
    // index aadf691..bfe603 100644
    // --- a/lib/index.js
    // +++ b/lib/index.js
    // \`\`\`
    // This means that 'lib/index.js' was modified in this commit. Note that this is only an example.
    // Then there is a specifier of the lines that were modified.
    // A line starting with '+' means it was added.
    // A line that starting with '-' means that line was deleted.
    // A line that starts with neither '+' nor '-' is code given for context and better understanding.
    // It is not part of the diff.
    // [...]
    // EXAMPLE SUMMARY COMMENTS:
    // * Raised the amount of returned recordings from \`10\` to \`100\` [packages/server/recordings_api.ts], [packages/server/constants.ts]
    // * Fixed a typo in the github action name [.github/workflows/gpt-commit-summarizer.yml]
    // * Moved the \`octokit\` initialization to a separate file [src/octokit.ts], [src/index.ts]
    // * Added an OpenAI API for completions [packages/utils/apis/openai.ts]
    // * Lowered numeric tolerance for test files
    // Most commits will have less comments than this examples list.
    // The last comment does not include the file names,
    // because there were more than two relevant files in the hypothetical commit.
    // Do not include parts of the example in your summary.
    // It is given only as an example of appropriate comments.`,
    // `Please summarise the following diff file: \n\n${diff}`,];
    
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

    const model = "gemini-2.5-flash";
    const contents = [
        {
            role: "user",
            parts: [{ text: prompt }],
        },
    ];

    const response = await genAI.models.generateContent({ model, contents });
    const candidate = response.candidates?.[0];
    const textContent = candidate?.content?.parts?.[0].text ?? "";

    // clean up formatting if Gemini wraps in ```json ... ```
    const feedbackJson = textContent.replace('```json', '').replace('```', '');
  
    return feedbackJson;
}

// console.log(await summariseCommits("https://github.com/DeepanshuK6996/MockMate/commit/0d6ebd77916eefcf91d2021214da6a73703d98f7.diff"));