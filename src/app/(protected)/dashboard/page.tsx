"use client"
import useProject from '@/hooks/use-project';
import { useUser } from '@clerk/nextjs';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import CommitLog from './commit-log';
import { Button } from '@/components/ui/button';

const DashboardPage = () => {

    const {user} = useUser();
    const {project} = useProject();

  return (
    <div>
      {/* Top Link and Addition */}
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* GITHUB LINK */}
        <div className="w-fit rounded-md px-4 py-3">
          <div className="bg-primary flex items-center justify-between rounded-md px-4 py-3">
            <Github className="size-5 text-white" />
            <div className="ml-2">
              <p className="text-sm font-medium text-white">
                This project is connected to:
                <Link
                  href={project?.githubUrl ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 inline-flex items-center text-white/80 underline hover:text-white"
                >
                  {project?.name ?? "No Project Connected"}
                  <ExternalLink className="ml-1 size-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <Button variant={"ghost"}
          className="cursor-pointer border-black-500 rounded-md border px-4 py-3">
            Invite Members
        </Button>
      </div>

      {/* Question and meeting Cards */}
      {/* <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          Ask Question 
          Meeting Card
        </div>
      </div> */}
      <div className="ml-4 w-full max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-sm mt-5">
        <h2 className="mb-1 text-lg font-semibold text-gray-900">
          Ask a question
        </h2>
        <p className="mb-4 text-sm text-gray-500">
          RepoMind has knowledge of the codebase
        </p>

        <input
          type="text"
          placeholder="Which file should I edit to change the home page?"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <Button
          className={`mt-4 w-full rounded-md px-3 py-2 text-sm font-medium text-white`}
        >
          Ask Me!
        </Button>
      </div>

      {/* Commit Logs */}
      <div className="mt-8">
        <CommitLog />
      </div>
    </div>
  );
}

export default DashboardPage;
