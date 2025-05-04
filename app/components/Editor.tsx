'use client';

import { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

type Props = {
  value: string;
  onChange: (val: string | undefined) => void;
};

const YamlEditor = ({ value, onChange }: Props) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="yaml"
      defaultValue={value}
      onMount={handleEditorDidMount}
      onChange={onChange}
      theme="vs-dark"
      options={{
        fontSize: 14,
        wordWrap: 'on',
        formatOnPaste: true,
        formatOnType: true,
        minimap: { enabled: false },
        automaticLayout: true,
        tabSize: 2,
      }}
    />
  );
};

export default YamlEditor;
