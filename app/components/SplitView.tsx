'use client';

import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import SwaggerPreview from './SwaggerPreview';

export default function SplitView() {
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  const prefix =
    'openapi: 3.0.0\ninfo:\n  title: Live API\n  version: 1.0.0\npaths:\n  ';
  const [yaml, setYaml] = useState<string>('');
  const [commentedYaml, setCommentedYaml] = useState<string>('');
  const [content, setContent] = useState<string>('');
  function handleChange(newYaml?: string) {
    setIsDirty(true);
    if (!newYaml) return;
    const correctedYaml = newYaml.split('\n').join('\n  ');
    let swaggerComment = '/**\n * @swagger\n';
    const lines = newYaml.split('\n').map((line) => ` * ${line}`);
    swaggerComment += lines.join('\n') + '\n';
    swaggerComment += ' */\n';
    setCommentedYaml(swaggerComment);
    setYaml(newYaml);
    setContent(prefix + correctedYaml);
  }

  return (
    <div className='flex h-screen border-[1px] overflow-hidden'>
      <div className='w-1/2 flex flex-col'>
        <div className='h-3/4'>
          <Editor value={yaml} onChange={handleChange} />
        </div>
        <div className='relative flex-1 overflow-hidden'>
          <div className='absolute top-5 right-10 z-10'>
            <button
              className='bg-gray-200 p-1 rounded hover:bg-gray-300'
              onClick={() => navigator.clipboard.writeText(commentedYaml)}
              title='Copy to clipboard'
            >
              📋
            </button>
          </div>
          <div className='overflow-y-auto h-full whitespace-pre-wrap text-sm font-mono text-gray-800 p-2'>
            {commentedYaml}
          </div>
        </div>
      </div>
      <div className='w-1/2 overflow-y-scroll'>
        <SwaggerPreview yaml={content} />
      </div>
    </div>
  );
}
