'use client';

import React, { useState } from 'react';
import Editor from './Editor';
import SwaggerPreview from './SwaggerPreview';

export default function SplitView() {
  const prefix = "openapi: 3.0.0\ninfo:\n  title: Live API\n  version: 1.0.0\npaths:\n  ";
  const [yaml, setYaml] = useState<string>("");
  const [content, setContent] = useState<string>("");
  function handleChange(newYaml?: string) {
    if (!newYaml) return;
    const correctedYaml = (newYaml.split('\n').join('\n  '));
    setYaml(newYaml);
    setContent(prefix + correctedYaml);
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col">
        <div className="h-3/4">
          <Editor value={yaml} onChange={handleChange} />
        </div>
        <div className="h-1/4">
          <Editor
            value={yaml}
            onChange={(newYaml) => {
              if (!newYaml) return;
              const swaggerComment = `/* @swagger\n${newYaml}\n*/`;
              setYaml(newYaml);
              setContent(swaggerComment);
            }}
          />
        </div>
      </div>
      <div className="w-1/2">
        <SwaggerPreview yaml={content} />
      </div>
    </div>
  );
}
