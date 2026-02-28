"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useProject from '@/hooks/use-project';
import Image from 'next/image';
import React, { useState } from 'react'
import { askQuestion } from './actions';
import { readStreamableValue } from 'ai/rsc';

const QuestionCard = () => {
    const {project} = useProject();
    const [question, setQuestion] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);  
    const [filesReferences, setFilesReferences] = useState<{fileName: string, sourceCode: string, summary: string}[]>([]);
    const [answer, setAnswer] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //window.alert(`Question: ${question}\nProject ID: ${project?.id}`);
        if(!project?.id) return;
        setLoading(true);
        setOpen(true);
        
        const {output, filesReferences: refs} = await askQuestion(question, project.id);
        setFilesReferences(refs);

        for await(const x of readStreamableValue(output)) {
          if(x) {
            setAnswer((prev) => prev + x);
            }
        }

        setLoading(false);
    }    

    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Image src="/favicon.ico" alt="RepoMind Logo" width={40} height={40} className="inline-block mr-2"/>
                    </DialogTitle>
                </DialogHeader>

                {answer}
                <h1>File References </h1>
                {filesReferences.map(file => {
                  return <span key={file.fileName}>{file.fileName}</span>
                })}

            </DialogContent>
        </Dialog>
        <div className="mt-5 ml-4 w-full max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold text-gray-900">
            Ask a question
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            RepoMind has knowledge of the codebase
          </p>

          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Which file should I edit to change the dashboard?"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <Button
              className={`mt-4 w-full rounded-md px-3 py-2 text-sm font-medium text-white`}
            >
              Ask Me!
            </Button>
          </form>
        </div>
      </>
    );
}

export default QuestionCard
