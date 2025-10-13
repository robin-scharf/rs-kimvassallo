interface RichTextProps {
  content: string;
}

export default function RichText({ content }: RichTextProps) {
  return (
    <div
      className="text-muted-foreground leading-relaxed space-y-4"
      dangerouslySetInnerHTML={{ __html: content.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') }}
    />
  );
}
