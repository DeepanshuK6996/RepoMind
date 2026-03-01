"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
    filesReferences: {
        fileName: string;
        sourceCode: string;
        summary: string;
    }[]
}

const CodeReferences = ({ filesReferences }: Props) => {
    const [tab, setTab] = useState('');

    useEffect(() => {
        if (filesReferences.length > 0) {
            // Always reset to first tab when new refs arrive
            setTab(filesReferences[0]?.fileName || '');
        }
    }, [filesReferences]);

    // ✅ Don't return null — always render the container so the parent section
    // keeps its height. Show a placeholder while refs are loading instead.
    if (filesReferences.length === 0) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-muted/10">
                <p className="text-sm text-muted-foreground">File references will appear here...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">
            <Tabs value={tab} onValueChange={setTab} className="flex flex-col h-full">

                {/* Tab bar */}
                <TabsList className="shrink-0 flex gap-2 bg-gray-200 rounded-md px-3 py-2 overflow-x-auto justify-start h-auto">
                    {filesReferences.map(file => (
                        <TabsTrigger
                            key={file.fileName}
                            value={file.fileName}
                            className="rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap data-[state=active]:bg-gray-900 data-[state=active]:text-white"
                        >
                            {file.fileName}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Code panels — fill remaining height */}
                <div className="flex-1 min-h-0 overflow-y-auto p-3 rounded-md -ml-2 ">
                    {filesReferences.map(file => (
                        <TabsContent
                            key={file.fileName}
                            value={file.fileName}
                            className="m-0 h-full data-[state=inactive]:hidden"
                        >
                            <SyntaxHighlighter
                                language="typescript"
                                style={oneDark}
                                customStyle={{ margin: 0, borderRadius: 0, minHeight: '100%' }}
                            >
                                {file.sourceCode}
                            </SyntaxHighlighter>
                        </TabsContent>
                    ))}
                </div>

            </Tabs>
        </div>
    );
}

export default CodeReferences