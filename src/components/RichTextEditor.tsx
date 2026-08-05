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
        if (editorRef.current) {
          editorRef.current.focus();
          const prevHTML = editorRef.current.innerHTML;
          document.execCommand("insertImage", false, data.url);
          // Fallback if execCommand didn't insert
          if (editorRef.current.innerHTML === prevHTML) {
            const img = document.createElement("img");
            img.src = data.url;
            img.className = "max-w-full h-auto my-2 rounded-sm border border-white/10";
            editorRef.current.appendChild(img);
          }
          onChange(editorRef.current.innerHTML);
        }
        e.target.value = "";
      } else {
        alert("Image upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Image upload error: " + err.message);
    }
  };

  const insertLayoutBlock = (templateHtml: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      const prevHTML = editorRef.current.innerHTML;
      document.execCommand("insertHTML", false, templateHtml);
      if (editorRef.current.innerHTML === prevHTML) {
        editorRef.current.innerHTML += templateHtml;
      }
      handleInput();
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

      {/* Toolbar - Top Row: Text Formatting */}
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
          className="px-2.5 py-1 text-[11px] text-[#D4AF37] hover:text-[#e5bf4c] hover:bg-white/10 rounded-sm transition-colors font-medium"
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

      {/* Toolbar - Second Row: Layout Blocks */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-white/10 px-2 py-1.5 bg-[#0d0d0d] select-none text-[11px]">
        <span className="text-white/40 uppercase tracking-wider text-[9px] font-semibold mr-1">Page Layout Blocks:</span>
        
        <button
          type="button"
          onClick={() => insertLayoutBlock(`
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; align-items: center; margin: 1.5rem 0;">
  <div>
    <h3 style="color: #D4AF37; font-size: 1.25rem; font-weight: 400; margin-bottom: 0.5rem;">Section Title</h3>
    <p style="line-height: 1.7; color: #4a4a4a;">Write your detailed text content here. Describe the property details, location advantages, or service features in full detail.</p>
  </div>
  <div>
    <img src="/images/generated/kyiv_luxury_business_center.png" alt="Property image" style="width: 100%; height: auto; border-radius: 4px; border: 1px solid rgba(0,0,0,0.1);" />
  </div>
</div>
<p><br></p>`)}
          className="px-2 py-1 bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white/80 rounded-xs transition-colors border border-white/10"
          title="Insert 2 Columns: Text on Left, Image on Right"
        >
          ◧ Text + Img (Right)
        </button>

        <button
          type="button"
          onClick={() => insertLayoutBlock(`
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; align-items: center; margin: 1.5rem 0;">
  <div>
    <img src="/images/generated/kyiv_panoramic_banner.png" alt="Property image" style="width: 100%; height: auto; border-radius: 4px; border: 1px solid rgba(0,0,0,0.1);" />
  </div>
  <div>
    <h3 style="color: #D4AF37; font-size: 1.25rem; font-weight: 400; margin-bottom: 0.5rem;">Section Title</h3>
    <p style="line-height: 1.7; color: #4a4a4a;">Write your detailed text content here. Describe the property details, location advantages, or service features in full detail.</p>
  </div>
</div>
<p><br></p>`)}
          className="px-2 py-1 bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white/80 rounded-xs transition-colors border border-white/10"
          title="Insert 2 Columns: Image on Left, Text on Right"
        >
          ◨ Img (Left) + Text
        </button>

        <button
          type="button"
          onClick={() => insertLayoutBlock(`
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  <img src="/images/generated/kyiv_luxury_business_center.png" alt="Photo 1" style="width: 100%; height: 220px; object-fit: cover; border-radius: 4px; border: 1px solid rgba(0,0,0,0.1);" />
  <img src="/images/generated/kyiv_panoramic_banner.png" alt="Photo 2" style="width: 100%; height: 220px; object-fit: cover; border-radius: 4px; border: 1px solid rgba(0,0,0,0.1);" />
</div>
<p><br></p>`)}
          className="px-2 py-1 bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white/80 rounded-xs transition-colors border border-white/10"
          title="Insert 2 Photos Side-by-Side"
        >
          ☵ 2 Photo Grid
        </button>

        <button
          type="button"
          onClick={() => insertLayoutBlock(`
<blockquote style="border-left: 3px solid #D4AF37; background: rgba(212, 175, 55, 0.08); padding: 1rem 1.25rem; margin: 1.5rem 0; font-style: italic; color: #222222; border-radius: 0 4px 4px 0;">
  "Golden Land Property Investment — Exclusive investment allocations and direct developer terms for qualified buyers."
</blockquote>
<p><br></p>`)}
          className="px-2 py-1 bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white/80 rounded-xs transition-colors border border-white/10"
          title="Insert Gold Highlight Box"
        >
          💬 Gold Quote Card
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
