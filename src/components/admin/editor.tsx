"use client";

import { useEditor, EditorContent, InputRule } from '@tiptap/react'; // Import InputRule
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import Link from '@tiptap/extension-link';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Bold, Italic, List, ListOrdered, Code, Heading2, 
  Quote, SquareCode, Eye, Edit3
} from 'lucide-react';

export function Editor({ content, onChange }: { content: string, onChange: (v: string) => void }) {
    const [mounted, setMounted] = useState(false);
    const [isPreview, setIsPreview] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({ 
                heading: { levels: [2, 3] },
                codeBlock: false 
            }),
            Markdown.configure({ 
                html: false, 
                tightLists: true 
            }),

            // I tried making this work with the link extension, but it didn't work.
            
            Link.extend({
                addInputRules() {
                    return [
                        new InputRule({
                            // Match the Markdown link pattern: [Text](Url)
                            find: /\[([^\]]+)\]\(([^)]+)\)$/, 
                            handler: ({ state, range, match }) => {
                                const { tr } = state;
                                const start = range.from;
                                const end = range.to;
                                const textContent = match[1]; // The visible text
                                const href = match[2];        // The URL

                                // 1. Delete the Markdown characters and insert just the text
                                tr.replaceWith(start, end, state.schema.text(textContent));

                                // 2. Apply the link mark to that new text
                                const mark = this.type.create({ href });
                                tr.addMark(start, start + textContent.length, mark);
                            }
                        }),
                    ]
                }
            }).configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
                defaultProtocol: 'https',
                HTMLAttributes: { 
                    class: 'text-primary underline cursor-pointer hover:text-primary/80 transition-colors' 
                },
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm dark:prose-invert max-w-none min-h-[250px] focus:outline-none p-4 bg-white dark:bg-slate-950 text-foreground transition-all',
            },
        },
        onUpdate: ({ editor }) => {
            const markdown = (editor.storage as any).markdown?.getMarkdown();
            if (markdown !== undefined) onChange(markdown);
        },
    });

    if (!mounted || !editor) return <div className="min-h-[300px] w-full bg-muted animate-pulse rounded-md border" />;

    return (
        <div className="flex flex-col w-full border rounded-md border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm bg-card">
            <div className="flex flex-wrap items-center justify-between p-1.5 border-b bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <div className="flex gap-0.5">
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} icon={<Bold size={16} />} title="Bold" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} icon={<Italic size={16} />} title="Italic" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} icon={<Heading2 size={16} />} title="H2" />
                    
                    <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-700 mx-1 self-center" />
                    
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} icon={<List size={16} />} title="List" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} icon={<ListOrdered size={16} />} title="Ordered" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} icon={<SquareCode size={16} />} title="Code" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} icon={<Quote size={16} />} title="Quote" />
                </div>

                <button
                    type="button"
                    onClick={() => setIsPreview(!isPreview)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        isPreview 
                        ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                    }`}
                >
                    {isPreview ? <Edit3 size={14} /> : <Eye size={14} />}
                    {isPreview ? 'Back to Edit' : 'Live Preview'}
                </button>
            </div>
            
            <div className="relative">
                {isPreview ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none p-4 min-h-[250px] bg-slate-50/50 dark:bg-slate-900/30 overflow-auto">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {(editor.storage as any).markdown?.getMarkdown()}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <EditorContent editor={editor} />
                )}
            </div>
        </div>
    );
}

function ToolbarButton({ onClick, active, icon, title }: { onClick: () => void, active: boolean, icon: React.ReactNode, title: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`p-2 rounded-md transition-all ${
                active 
                ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
            {icon}
        </button>
    );
}