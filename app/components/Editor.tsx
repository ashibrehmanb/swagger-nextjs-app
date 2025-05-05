'use client';

import { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

type Props = {
  value: string;
  onChange: (val: string | undefined) => void;
};

const YamlEditor = ({ value, onChange }: Props) => {
  const editorRef = useRef<unknown>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;

    // Listen for paste events
    editor.onDidPaste((event) => {
      const pastedText = editor.getModel()?.getValueInRange(event.range);
      const cleanedText = pastedText
      ?.split('\n * ')
      .join('\n')
      .split('/**')
      .join('')
      .split('*/')
      .join('')
      .split('@swagger')
      .join('')
      .trim() ?? '';

      editor.setValue(cleanedText);
      onChange(cleanedText);
    });
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
