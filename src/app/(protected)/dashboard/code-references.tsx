import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import React, { useState } from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
    filesReferences: {
        fileName: string;
        sourceCode: string;
        summary: string;
    }[]
}

const CodeReferences = ({filesReferences}: Props) => {

    const [tab, setTab] = useState(filesReferences[0]?.fileName || ''); 

    if(filesReferences.length === 0) {
        return null;
    }

  return (
    // <div className='max-w-[70vw]'>
    <div className='w-full h-full flex flex-col min-h-0'>   
        <Tabs value={tab} onValueChange={setTab} className="w-full">
            <div className='overflow-scroll flex gap-2 bg-gray-300 rounded-2xl p-1'>
                {filesReferences.map(file => (
                    <Button key={file.fileName} variant={tab === file.fileName ? "default" : "outline"} className="rounded-lg px-3 py-1 text-sm font-medium transition-colors whitespace-nowrap" value={file.fileName}>
                        {file.fileName}
                    </Button>
                ))}
            </div>
            {filesReferences.map(file => (
                <TabsContent key={file.fileName} 
                    value={file.fileName} 
                    // className="max-h-[40vh]overflow-scroll max-w-7xl rounded-md"
                    //className="max-h-[35vh] overflow-y-auto rounded-md"
                    className="min-h-0 flex-1 overflow-y-auto rounded-md"
                >
                    <SyntaxHighlighter language="typescript" style={oneDark}>
                        {file.sourceCode}
                    </SyntaxHighlighter>
                </TabsContent>
            ))
            }
        </Tabs>
    </div>
  )
}

export default CodeReferences
