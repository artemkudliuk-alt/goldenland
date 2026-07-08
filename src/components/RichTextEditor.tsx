"use client";

import React, { useRef, useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync value from props to editor HTML once on mount or when value changes externally
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, arg: string = "") => {
    document.execCommand(command, false, arg);
    handleInput();
  };

  const handleLink = () => {
    const url = prompt("Enter link URL (e.g. https://google.com):");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        // Focus back to editor
        editorRef.current?.focus();
        // Insert image at cursor
        executeCommand("insertImage", data.url);
        // Reset file input
        e.target.value = "";
      } else {
        alert("Image upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Image upload error: " + err.message);
    }
  };

  return (
    <div className="border border-white/15 bg-black rounded-xs flex flex-col overflow-hidden focus-within:border-[#D4AF37] transition-colors">
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-white/10 p-2 bg-[#151515] select-none">
        <button
          type="button"
          onClick={() => executeCommand("bold")}
          className="px-2.5 py-1 text-[12px] font-bold text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => executeCommand("italic")}
          className="px-2.5 py-1 text-[12px] italic text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => executeCommand("underline")}
          className="px-2.5 py-1 text-[12px] underline text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
          title="Underline"
        >
          U
        </button>
        <div className="h-4 w-px bg-white/10 my-auto mx-1" />
        <button
          type="button"
          onClick={() => executeCommand("formatBlock", "<h2>")}
          className="px-2.5 py-1 text-[11px] font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => executeCommand("formatBlock", "<h3>")}
          className="px-2.5 py-1 text-[11px] font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => executeCommand("formatBlock", "<p>")}
          className="px-2.5 py-1 text-[11px] text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
          title="Paragraph"
        >
          P
        </button>
        <div className="h-4 w-px bg-white/10 my-auto mx-1" />
        <button
          type="button"
          onClick={() => executeCommand("insertUnorderedList")}
          className="px-2.5 py-1 text-[12px] text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => executeCommand("insertOrderedList")}
          className="px-2.5 py-1 text-[12px] text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
          title="Numbered List"
        >
          1. List
        </button>
        <div className="h-4 w-px bg-white/10 my-auto mx-1" />
        <button
          type="button"
          onClick={handleLink}
          className="px-2.5 py-1 text-[11px] text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
          title="Insert Link"
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-2.5 py-1 text-[11px] text-[#D4AF37] hover:text-[#e5bf4c] hover:bg-white/10 rounded-sm transition-colors"
          title="Upload & Insert Image"
        >
          + Image
        </button>
        <button
          type="button"
          onClick={() => executeCommand("removeFormat")}
          className="px-2.5 py-1 text-[11px] text-white/50 hover:text-white hover:bg-white/10 rounded-sm transition-colors ml-auto"
          title="Clear Formatting"
        >
          Clear
        </button>
      </div>

      {/* Editor Content Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[280px] max-h-[550px] overflow-y-auto p-4 text-[14px] leading-relaxed text-white font-light outline-none bg-black/40 style-editor-content"
      />
    </div>
  );
}
