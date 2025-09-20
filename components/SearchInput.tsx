"use client";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name..."
      className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 ring-gray-300"
    />
  );
}
