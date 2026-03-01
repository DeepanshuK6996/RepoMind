"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import useProject from '@/hooks/use-project';
import React, { useState } from 'react'
import QuestionCard from '../dashboard/question-card';
import { api } from '@/trpc/react';
import Image from 'next/image';
import MDEditor from '@uiw/react-md-editor';
import CodeReferences from '../dashboard/code-references';

const QAPage = () => {
  const { projectId } = useProject();

  const {data: questions} = api.project.getQuestions.useQuery({projectId});

  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions?.[questionIndex];

  return (
    <div>
        <Sheet>
          <QuestionCard />
          <div className="h-4"></div>
          <h1 className='text-xl font-semibold '>Saved Questions</h1>
          <div className="h-2"></div>

          <div className="flex flex-col gap-2">
            {questions?.map((q, index) => (
              <React.Fragment key={q.id}>
                <SheetTrigger onClick={() => setQuestionIndex(index)}>
                  <div className="flex items-center gap-4 bg-white rounded-lg shadow border p-2">
                    <Image src={`${q.user.imageUrl}`} alt="user" width={40} height={40} className="object-cover rounded-full" />
                    <div className='text-left flex flex-col'>
                      <div className='flex items-center gap-2'>
                        <p className="text-gray-800 line-clamp-1 text-lg font-medium">
                          {q.question}
                        </p>
                        <span className='text-xs text-gray-400 whitespace-nowrap'>
                          {q.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <p className='text-gray-500 line-clamp-2 text-sm'>
                        {q.answer}
                      </p>
                    </div>
                  </div>
                </SheetTrigger>
              </React.Fragment>
            ))} 
          </div>

          {question && (
            <SheetContent className='sm:max-w-[80vw] overflow-scroll'>  
              <SheetHeader>
                <SheetTitle className='text-2xl underline font-bold'>
                  <span className='italic !text-3xl'>Question:- </span>
                  {question.question}
                </SheetTitle>
                <MDEditor.Markdown source={question.answer || "No answer yet."} className='overflow-scroll p-10 max-h-[60vh] rounded-2xl'/>
                <div className="h-10"></div>
                <CodeReferences filesReferences={(question.filesReferences ?? []) as any} />
              </SheetHeader>
            </SheetContent>
          )}
        </Sheet>
    </div>
  )
}

export default QAPage
