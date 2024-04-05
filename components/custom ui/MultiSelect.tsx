'use client'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  onChange,
  onRemove,
  value,
}) => {
  const [inputvalue, setInputvalue] = useState("");
  const [open, setOpen] = useState(false);

  console.log(value);
  console.log(collections);

  return (
    <Command className="overflow-visible bg-white">
      <CommandInput
        placeholder={placeholder}
        value={inputvalue}
        onValueChange={setInputvalue}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
      />
      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
            {collections?.map((c) => (
              <CommandItem
                key={c._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(c._id);
                }}
              >
                {c.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
