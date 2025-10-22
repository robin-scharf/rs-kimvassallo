import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RichTextProps {
  content: string;
}

export default function RichText({ content }: RichTextProps) {
  return (
    <div className="text-muted-foreground leading-relaxed space-y-4 prose prose-neutral max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-4">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 text-foreground">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 text-foreground">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold mb-2 text-foreground">{children}</h3>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
