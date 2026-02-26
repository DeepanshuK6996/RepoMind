import {GithubRepoLoader} from '@langchain/community/document_loaders/web/github'
import { Document } from '@langchain/core/documents';
import { summariseCode } from './gemini';
import { generateEmbedding } from './gemini';
import { db } from '@/server/db';

export const loadGithubRepo = async (githubUrl: string, githubToken?: string) => {
    const token = githubToken || process.env.GITHUB_TOKEN || "";
    const loader = new GithubRepoLoader(githubUrl, {
      // accessToken: githubToken || "",
      accessToken: token,
      branch: "main",
      //ignoreFiles: ['package-lock.json', 'yarn-lock', 'pnpm-lock-yaml', 'bun-lockb'],
      ignoreFiles: [
        // Lock files
        "package-lock.json",
        "yarn.lock",
        "pnpm-lock.yaml",
        "bun.lockb",

        // Dependency folders (langchain handles this but just in case)
        "node_modules", "components.json", "package.json", "jsconfig.json", "app/globals.css",

        // Build outputs
        ".next",
        "dist",
        "build",
        "out",

        // Config files (low value to summarise)
        ".eslintrc",
        ".eslintrc.json",
        ".eslintrc.js",
        ".prettierrc",
        ".prettierignore",
        ".gitignore",
        ".gitattributes",
        "next.config.js",
        "next.config.ts",
        "next.config.mjs",
        "tsconfig.json",
        "postcss.config.js",
        "postcss.config.mjs",
        "tailwind.config.js",
        "tailwind.config.ts",

        // Env files
        ".env",
        ".env.local",
        ".env.example",

        // Misc
        "LICENSE",
        "README.md",
        ".DS_Store",
      ],
      recursive: true,
      unknown: "warn",
      maxConcurrency: 5,
    });

    const docs = await loader.load();
    return docs
}
//console.log(await loadGithubRepo("https://github.com/DeepanshuK6996/MockMate"));

export const indexGithubRepo = async(projectId: string, githubUrl: string, githubToken?: string) => {
    const docs = await loadGithubRepo(githubUrl, githubToken);

    const allEmbeddings = await generateEmbeddings(docs);

    await Promise.allSettled(allEmbeddings.map(async (embedding, index) => {
        console.log(`Processing embedding ${index} for file ${embedding.fileName}`);
        
        //skip failed ones
        if (!embedding || !embedding.embedding) return; 

        const sourceCodeEmbedding = await db.sourceCodeEmbeddings.create({
            data: {
                summary: embedding.summary,
                sourceCode: embedding.sourceCode,
                fileName: embedding.fileName,
                projectId,
            }
        })

        await db.$executeRaw`
            UPDATE "SourceCodeEmbeddings" 
            SET "summaryEmbedding" = ${embedding.embedding}::vector 
            WHERE id = ${sourceCodeEmbedding.id}
        `;
    }));
}

// const generateEmbeddings = async (docs: Document[], ) => {
//     return await Promise.all(docs.map(async (doc) => {
//         const summary = await summariseCode(doc);

//         const embedding = await generateEmbedding(summary);

//         return {
//             embedding,
//             sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
//             summary,
//             fileName: doc.metadata.source,
//         }
//     }))
// }


// Helper: wait ms milliseconds
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateEmbeddings = async (docs: Document[]) => {
    const results = [];
    
    for (let i = 0; i < docs.length; i++) {
        const doc = docs[i]!;
        try {
            const summary = await summariseCode(doc);
            
            // If summary is empty (failed), skip embedding
            if (!summary) {
                results.push({
                    embedding: null,
                    sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
                    summary: '',
                    fileName: doc.metadata.source,
                });
                continue;
            }

            const embedding = await generateEmbedding(summary);
            results.push({
                embedding,
                sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
                summary,
                fileName: doc.metadata.source,
            });

            // Wait 15 seconds between requests to stay under 5 req/min
            if (i < docs.length - 1) {
                console.log(`Processed ${i + 1}/${docs.length} files. Waiting to avoid rate limit...`);
                await sleep(3500);
            }
        } catch (error) {
            console.error(`Failed to process ${doc.metadata.source}:`, error);
            results.push({
                embedding: null,
                sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
                summary: '',
                fileName: doc.metadata.source,
            });
        }
    }
    
    return results;
};