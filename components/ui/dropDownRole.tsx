"use client";

import { ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface RoleDropDownProps {
  value: string;
  onChange: (value: string) => void
}

const roles = ["STUDENTE", "INSEGNANTE"]

export default function RoleDropDown({ value, onChange }: RoleDropDownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative border border-neutral-400 dark:border-neutral-600 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 cursor-pointer focus-within:ring-amber-400"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div
          className="flex items-center gap-3 text-neutral-800 dark:text-neutral-100"
        >
          <ShieldCheck size={20} className="text-neutral-500 dark:text-neutral-400" />
          <span
            className={`bg-transparent ${value
              ? "text-neutral-800 dark:text-neutral-100"
              : "text-neutral-500 dark:text-neutral-500"
              }`}
          >
            {value || "Seleziona il tuo Ruolo"}
          </span>
        </div>
        {!open ? (
          <ChevronDown
            size={18}
            className="text-neutral-500 dark:text-neutral-400 transition-transform "
          />
        ) : (
          <ChevronUp
            size={18}
            className="text-neutral-500 dark:text-neutral-400 transition-transform "
          />
        )}
      </div>

      {open && (

        <ul className="absolute z-10 mt-1 left-0 bg-white dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-600 rounded-lg shadow-lg max-h-40 overflow-auto min-w-[150px] max-w-[220px]">
          {roles.map((role) => (
            <li
              key={role}
              onClick={() => {
                onChange(role);
                setOpen(false);
              }}
              className="px-3 py-2 rounded-lg hover:bg-amber-400 text-neutral-800 dark:text-neutral-100 transition cursor-pointer truncate"
            >
              {role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
