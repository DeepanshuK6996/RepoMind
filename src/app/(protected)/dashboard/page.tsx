"use client"
import useProject from '@/hooks/use-project';
import { useUser } from '@clerk/nextjs';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const DashboardPage = () => {

    const {user} = useUser();
    const {project} = useProject();

  return (
    <div>
      
      {/* Top Link and Addition */}
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* GITHUB LINK */}
        <div className="w-fit rounded-md px-4 py-3 ">
          <div className="flex items-center justify-between bg-primary px-4 py-3 rounded-md">
            <Github className="size-5 text-white" />
            <div className="ml-2">
              <p className="text-sm font-medium text-white">
                This project is connected to:
                <Link
                  href={project?.githubUrl ?? ""} target="_blank" rel="noopener noreferrer"
                  className="ml-1 inline-flex items-center text-white/80 underline hover:text-white"
                >
                  {project?.name ?? "No Project Connected"}
                  <ExternalLink className="ml-1 size-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className='border border-black-500 px-4 py-3 rounded-md'>
            Team Members
            Invite
        </div>
      </div>

      {/* Question and meeting Cards */}
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          Ask Question
          Meeting Card
        </div>
      </div>

      {/* Commit Logs */}
      <div className='mt-8'>
        Commit Logs
      </div>

    </div>
  );
}

export default DashboardPage;
