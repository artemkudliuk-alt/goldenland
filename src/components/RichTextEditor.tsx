"use client";

import React, { useRef, useEffect, useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceImgInputRef = useRef<HTMLInputElement>(null);
  const [selectedImg, setSelectedImg] = useState<HTMLImageElement | null>(null);

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
          if (editorRef.current.innerHTML === prevHTML) {
            const img = document.createElement("img");
            img.src = data.url;
            img.className = "max-w-full h-auto my-3 rounded-sm border border-white/10 shadow-md";
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

  const handleReplaceImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedImg) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        selectedImg.src = data.url;
        handleInput();
        setSelectedImg(null);
        e.target.value = "";
      } else {
        alert("Replace failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Replace error: " + err.message);
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

  // Handle image clicks in editor for interactive replace/remove controls
  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      const img = target as HTMLImageElement;
      setSelectedImg(img);
    } else {
      setSelectedImg(null);
    }
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all content in this editor?")) {
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
        handleInput();
      }
    }
  };

  return (
    <div className="border border-white/20 bg-black rounded-sm flex flex-col overflow-hidden focus-within:border-[#D4AF37] transition-all shadow-xl">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
      <input
        type="file"
        ref={replaceImgInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleReplaceImageUpload}
      />

      {/* Primary Toolbar - Text & History Actions */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-white/10 p-2.5 bg-[#121212] select-none text-[12px]">
        <button
          type="button"
          onClick={() => executeCommand("undo")}
          className="px-2.5 py-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors text-[11px] font-medium uppercase tracking-wider"
          title="Undo (Ctrl+Z)"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => executeCommand("redo")}
          className="px-2.5 py-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors text-[11px] font-medium uppercase tracking-wider"
          title="Redo (Ctrl+Y)"
        >
          Redo
        </button>

        <div className="h-4 w-px bg-white/15 my-auto mx-1" />

        <button
          type="button"
          onClick={() => executeCommand("bold")}
          className="px-2.5 py-1 font-bold text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => executeCommand("italic")}
          className="px-2.5 py-1 italic text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => executeCommand("underline")}
          className="px-2.5 py-1 underline text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Underline"
        >
          U
        </button>

        <div className="h-4 w-px bg-white/15 my-auto mx-1" />

        <button
          type="button"
          onClick={() => executeCommand("formatBlock", "<h2>")}
          className="px-2.5 py-1 font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => executeCommand("formatBlock", "<h3>")}
          className="px-2.5 py-1 font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => executeCommand("formatBlock", "<p>")}
          className="px-2.5 py-1 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Paragraph"
        >
          P
        </button>

        <div className="h-4 w-px bg-white/15 my-auto mx-1" />

        <button
          type="button"
          onClick={() => executeCommand("insertUnorderedList")}
          className="px-2.5 py-1 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => executeCommand("insertOrderedList")}
          className="px-2.5 py-1 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Numbered List"
        >
          1. List
        </button>

        <div className="h-4 w-px bg-white/15 my-auto mx-1" />

        <button
          type="button"
          onClick={handleLink}
          className="px-2.5 py-1 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors text-[11px] font-medium uppercase tracking-wider"
          title="Insert Link"
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1 text-[#D4AF37] hover:text-black hover:bg-[#D4AF37] border border-[#D4AF37]/50 rounded transition-colors text-[11px] font-semibold uppercase tracking-wider ml-1"
          title="Upload & Insert Image"
        >
          + Upload Image
        </button>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => executeCommand("removeFormat")}
            className="px-2.5 py-1 text-[11px] text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors uppercase tracking-wider"
            title="Clear Text Formatting"
          >
            Clean Format
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="px-2.5 py-1 text-[11px] text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition-colors font-medium border border-rose-500/30 uppercase tracking-wider"
            title="Clear entire editor content"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Visual Block Builder Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 p-2.5 bg-[#0a0a0a] select-none text-[11px]">
        <span className="text-[#D4AF37] font-semibold uppercase tracking-[0.15em] text-[10px] mr-2">
          Page Layout Presets:
        </span>

        <button
          type="button"
          onClick={() => insertLayoutBlock(`
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; align-items: center; margin: 1.5rem 0; background: rgba(255,255,255,0.02); padding: 1.25rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08);">
  <div>
    <h3 style="color: #D4AF37; font-size: 1.25rem; font-weight: 500; margin-bottom: 0.5rem;">Section Title</h3>
    <p style="line-height: 1.7; color: #e0e0e0;">Write your paragraph text here. Describe the property details, location advantages, or service features in full detail.</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/generated/kyiv_luxury_business_center.png" alt="Property image" style="width: 100%; max-height: 280px; object-fit: cover; border-radius: 4px; border: 1px solid rgba(255,255,255,0.15);" />
  </div>
</div>
<p><br></p>`)}
          className="px-3 py-1.5 bg-black/80 hover:bg-[#D4AF37] hover:text-black text-white/90 rounded border border-white/20 hover:border-[#D4AF37] transition-all cursor-pointer text-[11px] font-medium tracking-wide uppercase"
          title="Insert 2 Columns: Text on Left, Image on Right"
        >
          Text + Image Right
        </button>

        <button
          type="button"
          onClick={() => insertLayoutBlock(`
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; align-items: center; margin: 1.5rem 0; background: rgba(255,255,255,0.02); padding: 1.25rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08);">
  <div style="text-align: center;">
    <img src="/images/generated/kyiv_panoramic_banner.png" alt="Property image" style="width: 100%; max-height: 280px; object-fit: cover; border-radius: 4px; border: 1px solid rgba(255,255,255,0.15);" />
  </div>
  <div>
    <h3 style="color: #D4AF37; font-size: 1.25rem; font-weight: 500; margin-bottom: 0.5rem;">Section Title</h3>
    <p style="line-height: 1.7; color: #e0e0e0;">Write your paragraph text here. Describe the property details, location advantages, or service features in full detail.</p>
  </div>
</div>
<p><br></p>`)}
          className="px-3 py-1.5 bg-black/80 hover:bg-[#D4AF37] hover:text-black text-white/90 rounded border border-white/20 hover:border-[#D4AF37] transition-all cursor-pointer text-[11px] font-medium tracking-wide uppercase"
          title="Insert 2 Columns: Image on Left, Text on Right"
        >
          Image Left + Text
        </button>

        <button
          type="button"
          onClick={() => insertLayoutBlock(`
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  <img src="/images/generated/kyiv_luxury_business_center.png" alt="Photo 1" style="width: 100%; height: 220px; object-fit: cover; border-radius: 4px; border: 1px solid rgba(255,255,255,0.15);" />
  <img src="/images/generated/kyiv_panoramic_banner.png" alt="Photo 2" style="width: 100%; height: 220px; object-fit: cover; border-radius: 4px; border: 1px solid rgba(255,255,255,0.15);" />
</div>
<p><br></p>`)}
          className="px-3 py-1.5 bg-black/80 hover:bg-[#D4AF37] hover:text-black text-white/90 rounded border border-white/20 hover:border-[#D4AF37] transition-all cursor-pointer text-[11px] font-medium tracking-wide uppercase"
          title="Insert 2 Photos Side-by-Side"
        >
          2-Photo Gallery
        </button>

        <button
          type="button"
          onClick={() => insertLayoutBlock(`
<blockquote style="border-left: 4px solid #D4AF37; background: rgba(212, 175, 55, 0.1); padding: 1.25rem 1.5rem; margin: 1.5rem 0; font-style: italic; color: #f5f5f5; border-radius: 0 6px 6px 0;">
  "Golden Land Property Investment — Exclusive investment allocations and direct developer terms for qualified buyers."
</blockquote>
<p><br></p>`)}
          className="px-3 py-1.5 bg-black/80 hover:bg-[#D4AF37] hover:text-black text-white/90 rounded border border-white/20 hover:border-[#D4AF37] transition-all cursor-pointer text-[11px] font-medium tracking-wide uppercase"
          title="Insert Gold Highlight Box"
        >
          Gold Quote Card
        </button>
      </div>

      {/* Selected Image Context Action Bar (appears when user clicks an image inside editor) */}
      {selectedImg && (
        <div className="flex flex-wrap items-center gap-3 bg-[#D4AF37]/15 border-b border-[#D4AF37]/40 px-3.5 py-2 text-[12px] text-white">
          <span className="text-[#D4AF37] font-semibold uppercase tracking-wider text-[10px]">
            Selected Image Actions:
          </span>
          <button
            type="button"
            onClick={() => replaceImgInputRef.current?.click()}
            className="bg-[#D4AF37] text-black hover:bg-white font-semibold px-3 py-1 rounded text-[11px] uppercase tracking-wider transition-colors"
          >
            Replace Image File
          </button>
          <button
            type="button"
            onClick={() => {
              const newUrl = prompt("Enter new image URL:", selectedImg.src);
              if (newUrl) {
                selectedImg.src = newUrl;
                handleInput();
              }
            }}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-[11px] uppercase tracking-wider transition-colors border border-white/10"
          >
            Change Image Link
          </button>
          <button
            type="button"
            onClick={() => {
              selectedImg.remove();
              setSelectedImg(null);
              handleInput();
            }}
            className="bg-rose-600/80 hover:bg-rose-500 text-white px-3 py-1 rounded text-[11px] uppercase tracking-wider transition-colors ml-auto font-medium"
          >
            Delete Image
          </button>
          <button
            type="button"
            onClick={() => setSelectedImg(null)}
            className="text-white/40 hover:text-white text-[14px] px-1 font-mono"
            title="Close image toolbar"
          >
            ✕
          </button>
        </div>
      )}

      {/* Editor Content Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onClick={handleEditorClick}
        className="min-h-[320px] max-h-[580px] overflow-y-auto p-5 text-[14px] leading-relaxed text-white font-light outline-none bg-black/60 style-editor-content"
      />
    </div>
  );
}
