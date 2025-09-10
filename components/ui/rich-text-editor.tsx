"use client";

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-50 border border-gray-200 rounded-md flex items-center justify-center">
      <div className="text-gray-500">Loading editor...</div>
    </div>
  ),
});

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your content...",
  className = "",
}) => {
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'blockquote', 'code-block',
    'list', 'bullet',
    'indent',
    'direction', 'align',
    'link', 'image', 'video'
  ];

  return (
    <div className={`rich-text-editor ${className}`}>
      <style jsx global>{`
        .ql-toolbar {
          border-top: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-bottom: none;
          border-radius: 0.5rem 0.5rem 0 0;
          background: #f9fafb;
        }
        
        .ql-container {
          border-bottom: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-top: none;
          border-radius: 0 0 0.5rem 0.5rem;
          background: white;
          font-family: inherit;
          font-size: 16px;
        }
        
        .ql-editor {
          min-height: 400px;
          padding: 1.5rem;
          line-height: 1.6;
        }
        
        .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
          left: 1.5rem;
          right: 1.5rem;
        }
        
        .ql-toolbar .ql-stroke {
          fill: none;
          stroke: #374151;
        }
        
        .ql-toolbar .ql-fill {
          fill: #374151;
          stroke: none;
        }
        
        .ql-toolbar .ql-picker {
          color: #374151;
        }
        
        .ql-toolbar button:hover,
        .ql-toolbar button:focus,
        .ql-toolbar button.ql-active {
          color: #CD3937;
        }
        
        .ql-toolbar button:hover .ql-stroke,
        .ql-toolbar button:focus .ql-stroke,
        .ql-toolbar button.ql-active .ql-stroke {
          stroke: #CD3937;
        }
        
        .ql-toolbar button:hover .ql-fill,
        .ql-toolbar button:focus .ql-fill,
        .ql-toolbar button.ql-active .ql-fill {
          fill: #CD3937;
        }
        
        .ql-picker-options {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .ql-picker-item:hover {
          background: #f3f4f6;
        }
        
        .ql-editor h1 {
          font-size: 2em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        
        .ql-editor h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        
        .ql-editor h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        
        .ql-editor blockquote {
          border-left: 4px solid #CD3937;
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          background: #f9fafb;
          padding: 1rem;
          border-radius: 0.375rem;
        }
        
        .ql-editor pre.ql-syntax {
          background: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.375rem;
          overflow-x: auto;
        }
        
        .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
        }
        
        .ql-editor a {
          color: #CD3937;
          text-decoration: underline;
        }
        
        .ql-editor a:hover {
          color: #000040;
        }
      `}</style>
      
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
