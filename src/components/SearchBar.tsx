import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (nextValue: string) => void;
  placeholder?: string;
  enableShortcut?: boolean;
  className?: string;
}

/**
 * Reusable SearchBar component with keyboard shortcut ('/') and clear control.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search applications by name, feature, or keyword...',
  enableShortcut = false,
  className = ''
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!enableShortcut) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        document.activeElement?.tagName !== 'SELECT'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableShortcut]);

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search
        className="w-4 h-4 text-[#9AA4B5] absolute left-3.5 pointer-events-none"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full pl-10 pr-16 py-2.5 rounded-lg bg-[#101522] border border-[#252D3D] focus:border-[#38D9FF] focus:outline-none text-sm text-[#F5F7FA] placeholder-[#9AA4B5]/70 transition-colors"
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          aria-label="Clear search query"
          className="absolute right-2.5 p-1 rounded hover:bg-[#252D3D]/60 text-[#9AA4B5] hover:text-[#F5F7FA] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      ) : (
        enableShortcut && (
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[11px] font-mono text-[#9AA4B5] bg-[#080B12] border border-[#252D3D] rounded absolute right-3 pointer-events-none">
            /
          </kbd>
        )
      )}
    </div>
  );
};
