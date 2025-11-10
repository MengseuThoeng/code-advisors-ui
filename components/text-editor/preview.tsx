import React from "react";
import "./styleTextEditor.css";
import "highlight.js/styles/github.css";

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <div
      className="preview tiptap"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Preview;
