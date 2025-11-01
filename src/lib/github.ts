import { db } from "@/server/db";
import { get } from "http";
import { Octokit } from "octokit";

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
})

//const githubUrl = "https://github.com/docker/genai-stack";

type Response = {
    commitMessage: string,
    commitHash: string,
    commitAuthorName: string,
    commitAuthorAvatar: string,
    commitDate: string
}

// export const getCommitHashesh = async (githubUrl: string): Promise<Response[]> => {
//     const [owner, repo] = githubUrl.split('/').slice(-2);

//     const response = await octokit.request('GET /repos/{owner}/{repo}/commits');
    
//     console.log(response);
//     console.log(response.data);

//     return response.data.map((commit) => ({
//         commitHash: commit.sha,
//         commitMessage: commit.commit.message,
//         commitAuthorName: commit.commit.author?.name || "Unknown",
//         commitAuthorAvatar: commit.author?.avatar_url || "",
//         commitDate: commit.commit.author?.date || ""
//     }));
// }

//OR
export const getCommits = async (githubUrl: string): Promise<Response[]> => {
    const cleanUrl = githubUrl.replace(/\/+$/, ""); // removes trailing slashes
    const [owner, repo] = cleanUrl.split('/').slice(-2);
    //console.log("Owner:", owner, "Repo:", repo);
    if(!owner || !repo) {
        throw new Error("Invalid GitHub URL");
    }

    const {data} = await octokit.rest.repos.listCommits({
        owner,
        repo,
        per_page: 10,
    });

    const sortedCommits = data.sort((a: any, b: any) => 
        new Date(b.commit.author?.date || "").getTime() - new Date(a.commit.author?.date || "").getTime()
    )

    //console.log(data);

    return sortedCommits.slice(0, 10).map((commit: any) => ({
        commitHash: commit.sha as string,
        commitMessage: commit.commit.message ?? "No commit message",
        commitAuthorName: commit.commit.author?.name || "Unknown",
        commitAuthorAvatar: commit.author?.avatar_url || "",
        commitDate: commit.commit.author?.date || ""
    }));
};

//console.log(await getCommits(githubUrl));

export const pullCommits = async (projectId: string) => {
    const{project, githubUrl} = await fetchProjectGithubUrl(projectId);
    //console.log("GitHub URL:", githubUrl);

    const commitHashes = await getCommits(githubUrl || "");
    //console.log("Fetched Commits:", commitHashes);

    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes);
    //console.log("Unprocessed Commits:", unprocessedCommits);

    return unprocessedCommits;
}

async function summariseCommit(githubUrl: string, commitHash: string){

}

async function fetchProjectGithubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: {id: projectId},
        select: {githubUrl: true}
    });

    if(!project?.githubUrl) {
        throw new Error("Project or GitHub URL not found");
    }

    return {project, githubUrl: project?.githubUrl};
}

async function filterUnprocessedCommits(projectId: string, commitsHashes: Response[]) {
    const processedCommits = await db.commit.findMany({
        where: {
            projectId: projectId,
        }
    });
    const unprocessedCommits = commitsHashes.filter((commit) => 
        !processedCommits.some((processed) => processed.commitHash === commit.commitHash)
    );
    return unprocessedCommits;
}

await pullCommits("cmhe1fjbi0000eyukwgm51ck9").then(console.log);
//cmhe1fjbi0000eyukwgm51ck9