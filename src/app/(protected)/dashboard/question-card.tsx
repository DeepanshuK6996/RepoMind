"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useProject from '@/hooks/use-project';
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { askQuestion } from './actions';
import { readStreamableValue } from 'ai/rsc';
import MDEditor from '@uiw/react-md-editor';
import CodeReferences from './code-references';
import { api } from '@/trpc/react';
import { toast } from 'sonner';
import useRefetch from '@/hooks/use-refetch';

const QuestionCard = () => {
    const { project } = useProject();
    const [question, setQuestion] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filesReferences, setFilesReferences] = useState<{ fileName: string, sourceCode: string, summary: string }[]>([]);
    const [answer, setAnswer] = useState('');

    const saveAnswer = api.project.saveAnswer.useMutation();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setAnswer('');
        setFilesReferences([]);

        if (!project?.id) return;
        setLoading(true);

        const { output, filesReferences: refs } = await askQuestion(question, project.id);

        setOpen(true);
        setFilesReferences(refs);

        for await (const x of readStreamableValue(output)) {
            if (x) {
              setAnswer((prev) => prev + x);
            }
        }

        setLoading(false);
    }

    const refetch = useRefetch();

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="flex flex-col w-full sm:max-w-5xl p-0 gap-0 overflow-hidden"
                    style={{ height: '88vh', maxHeight: '88vh' }}
                >
                    {/* HEADER — explicit 40% height */}
                    <div className="px-6 pt-5 pb-3 shrink-0 border-b flex">
                        <Image src="/favicon.ico" alt="RepoMind Logo" width={36} height={36} />
                        <h1 className="ml-2 font-bold text-3xl">RepoMind</h1>
                        <Button variant="outline" className="ml-10" disabled={saveAnswer.isPending}
                          onClick={() => saveAnswer.mutate({ 
                            projectId: project!.id, 
                            question, 
                            answer, 
                            filesReferences 
                          },{
                            onSuccess: () => {
                              toast.success("Answer saved successfully!");
                              refetch();
                            },
                            onError: () => {                              
                              toast.error("Failed to save the answer.");
                            }
                          })}
                        > 
                          Save Answer⬇️
                        </Button>
                    </div>

                    {/* ANSWER SECTION — explicit 40% height */}
                    <div
                        className="overflow-y-auto px-6 py-5 border-b bg-muted/20"
                        //style={{ height: '40%', minHeight: 0 }}
                    >
                        <MDEditor.Markdown
                            source={answer || ' '}
                            className="prose prose-base dark:prose-invert max-w-none rounded-md p-4"
                        />
                    </div>

                    <div className="mb-4"></div>

                    {/* CODE REFERENCES SECTION — explicit remaining ~40% height */}
                    {/* <div
                        className="overflow-hidden"
                        style={{ height: '40%', minHeight: 0 }}
                    >
                        <CodeReferences filesReferences={filesReferences} />
                    </div> */}

                    {/* FOOTER */}
                    <div className="px-6 py-4 shrink-0 border-t mt-auto">
                        <Button variant="default" onClick={() => setOpen(false)} className="w-full">
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="mt-5 ml-4 w-full max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-1 text-lg font-semibold text-gray-900">Ask a question</h2>
                <p className="mb-4 text-sm text-gray-500">RepoMind has knowledge of the codebase</p>

                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Which file should I edit to change the dashboard?"
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <Button
                        disabled={loading}
                        type="submit"
                        className="mt-4 w-full rounded-md px-3 py-2 text-sm font-medium text-white"
                    >
                        {loading ? 'Thinking...' : 'Ask Me!'}
                    </Button>
                </form>
            </div>
        </>
    );
}

export default QuestionCard