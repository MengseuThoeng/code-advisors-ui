"use client";
import {
  useEditor,
  EditorContent,
  NodeViewContent,
  NodeViewProps,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import ToolBar from "./toolBar";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { use, useState } from "react";
import ImageResize from "tiptap-extension-resize-image";
import { all, common, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import "./styleTextEditor.css";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import java from "highlight.js/lib/languages/java";
import yaml from "highlight.js/lib/languages/yaml";
import sql from "highlight.js/lib/languages/sql"
import php from "highlight.js/lib/languages/php"
import pgsql from "highlight.js/lib/languages/pgsql"

import 'highlight.js/styles/github.css';


export default function RichTextEditor({ content, onChange }) {
  const [htmlContent, setHtmlContent] = useState(content);
  const [showPreview, setShowPreview] = useState(false);


  const lowlights = createLowlight(common);
  lowlights.register("css", css);
  lowlights.register("javascript", js);
  lowlights.register("typescript", ts);
  lowlights.register("html", html);
  lowlights.register("java", java);
  lowlights.register("yaml", yaml);
  lowlights.register("sql", sql)
  lowlights.register("pgsql", pgsql)
  lowlights.register("php", php)

  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight: lowlights,
        HTMLAttributes: {
          class: "tiptap",
        },
        languageClassPrefix: "language-",
      }),
      Highlight,
      Image,
      ImageResize,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      const html = editor.getHTML();
      onChange(editor.getHTML());
      setHtmlContent(html);
    },
  });

  // const handlePreviewClick = () => {
  //   setShowPreview(!showPreview);
  // };

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} style={{ zIndex: "0"}} />
      {/* <button
        onClick={handlePreviewClick}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        {showPreview ? "Hide Preview" : "Show Preview"}
      </button>
      {showPreview && <Preview content={htmlContent} />} */}
    </div>
  );
}
