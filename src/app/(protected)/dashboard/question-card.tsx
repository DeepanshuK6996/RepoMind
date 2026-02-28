"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useProject from '@/hooks/use-project';
import Image from 'next/image';
import React, { useState } from 'react'
import { askQuestion } from './actions';
import { readStreamableValue } from 'ai/rsc';
import  MDEditor from '@uiw/react-md-editor';
import CodeReferences from './code-references';

const QuestionCard = () => {
    const {project} = useProject();
    const [question, setQuestion] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);  
    const [filesReferences, setFilesReferences] = useState<{fileName: string, sourceCode: string, summary: string}[]>([]);
    const [answer, setAnswer] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setAnswer('');
        setFilesReferences([]);
        //window.alert(`Question: ${question}\nProject ID: ${project?.id}`);

        if(!project?.id) return;
        setLoading(true);
        
        const {output, filesReferences: refs} = await askQuestion(question, project.id);
        
        setOpen(true);
        
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
          {/* <DialogContent className='sm:max-w-[80vw]'> */}
          {/* <DialogContent className="sm:max-w-4xl w-full max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>
                        <Image src="/favicon.ico" alt="RepoMind Logo" width={40} height={40} className="inline-block mr-2"/>
                    </DialogTitle>
                </DialogHeader>

                <MDEditor.Markdown 
                  source={answer} 
                  // className="max-w-[100vw] !h-full max-h-[40vw] overflow-scroll p-5" 
                  className="prose max-w-none flex-2 overflow-y-auto p-4 rounded-md"
                />
                <div className="h-4"></div>
                <CodeReferences filesReferences={filesReferences} />

                <Button variant={"outline"} onClick={() => setOpen(false)} className="mt-4">
                  Close
                </Button>

            </DialogContent> */}
          <DialogContent className="flex max-h-[90vh] w-full flex-col sm:max-w-5xl">
            <DialogHeader>
              <DialogTitle>
                <Image
                  src="/favicon.ico"
                  alt="RepoMind Logo"
                  width={40}
                  height={40}
                />
              </DialogTitle>
            </DialogHeader>

            {/* ANSWER SECTION */}
            <div className="bg-muted/30 min-h-0 flex-1 overflow-y-auto rounded-lg border p-6">
              <MDEditor.Markdown
                source={answer}
                className="prose prose-lg dark:prose-invert max-w-none"
              />
            </div>

            {/* CODE SECTION */}
            <div className="mt-4 h-[30vh] min-h-0 overflow-y-auto rounded-lg border">
              <CodeReferences filesReferences={filesReferences} />
            </div>

            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="mt-4"
            >
              Close
            </Button>
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
              disabled={loading}
              type="submit"
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
