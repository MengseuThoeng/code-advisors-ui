"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Undo, 
  Redo,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TipTapEditor = ({ value, onChange, placeholder = "Start writing..." }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  const setHeading = useCallback((level: 1 | 2 | 3) => {
    if (editor) {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  }, [editor]);

  const setParagraph = useCallback(() => {
    if (editor) {
      editor.chain().focus().setParagraph().run();
    }
  }, [editor]);

  if (!editor) {
    return (
      <div className="border border-gray-200 rounded-lg h-[500px] bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-3 bg-gray-50 flex flex-wrap gap-1">
        {/* Text Styles */}
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={setParagraph}
            className={`h-8 px-2 ${editor.isActive('paragraph') ? 'bg-[#CD3937] text-white' : ''}`}
          >
            <Type className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setHeading(1)}
            className={`h-8 px-2 text-xs ${editor.isActive('heading', { level: 1 }) ? 'bg-[#CD3937] text-white' : ''}`}
          >
            H1
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setHeading(2)}
            className={`h-8 px-2 text-xs ${editor.isActive('heading', { level: 2 }) ? 'bg-[#CD3937] text-white' : ''}`}
          >
            H2
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setHeading(3)}
            className={`h-8 px-2 text-xs ${editor.isActive('heading', { level: 3 }) ? 'bg-[#CD3937] text-white' : ''}`}
          >
            H3
          </Button>
        </div>

        {/* Formatting */}
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`h-8 px-2 ${editor.isActive('bold') ? 'bg-[#CD3937] text-white' : ''}`}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`h-8 px-2 ${editor.isActive('italic') ? 'bg-[#CD3937] text-white' : ''}`}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`h-8 px-2 ${editor.isActive('strike') ? 'bg-[#CD3937] text-white' : ''}`}
          >
            <Underline className="w-4 h-4" />
          </Button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`h-8 px-2 ${editor.isActive('bulletList') ? 'bg-[#CD3937] text-white' : ''}`}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`h-8 px-2 ${editor.isActive('orderedList') ? 'bg-[#CD3937] text-white' : ''}`}
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>

        {/* Other */}
        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`h-8 px-2 ${editor.isActive('blockquote') ? 'bg-[#CD3937] text-white' : ''}`}
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`h-8 px-2 ${editor.isActive('codeBlock') ? 'bg-[#CD3937] text-white' : ''}`}
          >
            <Code className="w-4 h-4" />
          </Button>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="h-8 px-2"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="h-8 px-2"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[400px] bg-white">
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .ProseMirror {
          outline: none;
          padding: 1rem;
          min-height: 400px;
        }
        
        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.2;
        }
        
        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.3;
        }
        
        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
        }
        
        .ProseMirror p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        
        .ProseMirror ul, .ProseMirror ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        
        .ProseMirror li {
          margin: 0.25rem 0;
        }
        
        .ProseMirror blockquote {
          border-left: 4px solid #CD3937;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          background: #f9fafb;
          padding: 1rem;
          border-radius: 0.375rem;
        }
        
        .ProseMirror pre {
          background: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.375rem;
          margin: 1rem 0;
          overflow-x: auto;
        }
        
        .ProseMirror code {
          background: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
        }
        
        .ProseMirror pre code {
          background: transparent;
          padding: 0;
        }
        
        .ProseMirror strong {
          font-weight: bold;
        }
        
        .ProseMirror em {
          font-style: italic;
        }
        
        .ProseMirror s {
          text-decoration: line-through;
        }
      `}</style>
    </div>
  );
};
