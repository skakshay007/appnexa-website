import React from 'react';

interface ReleaseNotesRendererProps {
  markdown: string;
  compact?: boolean;
}

/**
 * Safely renders GitHub Release Markdown into React elements without dangerouslySetInnerHTML.
 */
function renderInlineSegments(text: string): React.ReactNode[] {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return tokens.map((token, idx) => {
    if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-[#0B0F14] border border-white/10 font-mono text-xs text-[#35D9F5]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-[#F5F7FA]">
          {token.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{token}</React.Fragment>;
  });
}

export const ReleaseNotesRenderer: React.FC<ReleaseNotesRendererProps> = ({
  markdown,
  compact = false
}) => {
  if (!markdown || !markdown.trim()) {
    return (
      <p className="text-sm text-[#A5B0C0] italic">
        No detailed release notes provided for this version.
      </p>
    );
  }

  const normalized = markdown.replace(/\r\n/g, '\n').trim();
  const lines = normalized.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = (keyPrefix: string) => {
    if (!listItems) return;
    if (listItems.type === 'ul') {
      elements.push(
        <ul
          key={`${keyPrefix}-ul`}
          className="space-y-1.5 my-2.5 pl-4 text-sm text-[#A5B0C0] list-disc marker:text-[#35D9F5]"
        >
          {listItems.items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineSegments(item)}
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol
          key={`${keyPrefix}-ol`}
          className="space-y-1.5 my-2.5 pl-4 text-sm text-[#A5B0C0] list-decimal marker:text-[#8B7CFF] marker:font-mono"
        >
          {listItems.items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineSegments(item)}
            </li>
          ))}
        </ol>
      );
    }
    listItems = null;
  };

  const maxLines = compact ? 14 : lines.length;
  const slicedLines = lines.slice(0, maxLines);

  slicedLines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      flushList(`line-${index}`);
      return;
    }

    if (line.startsWith('### ')) {
      flushList(`line-${index}`);
      elements.push(
        <h4
          key={`h4-${index}`}
          className="text-xs font-mono uppercase tracking-wider text-[#35D9F5] mt-4 mb-1.5 font-semibold"
        >
          {line.slice(4)}
        </h4>
      );
      return;
    }

    if (line.startsWith('## ') || line.startsWith('# ')) {
      flushList(`line-${index}`);
      const cleanHeading = line.replace(/^#{1,2}\s+/, '');
      if (!compact) {
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-base font-heading font-semibold text-[#F5F7FA] mt-3 mb-2"
          >
            {cleanHeading}
          </h3>
        );
      }
      return;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (listItems && listItems.type !== 'ul') {
        flushList(`line-${index}`);
      }
      if (!listItems) {
        listItems = { type: 'ul', items: [] };
      }
      listItems.items.push(line.slice(2));
      return;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      if (listItems && listItems.type !== 'ol') {
        flushList(`line-${index}`);
      }
      if (!listItems) {
        listItems = { type: 'ol', items: [] };
      }
      listItems.items.push(orderedMatch[1]);
      return;
    }

    flushList(`line-${index}`);
    elements.push(
      <p key={`p-${index}`} className="text-sm text-[#A5B0C0] leading-relaxed my-2">
        {renderInlineSegments(line)}
      </p>
    );
  });

  flushList('final');

  return <div className="space-y-1">{elements}</div>;
};
