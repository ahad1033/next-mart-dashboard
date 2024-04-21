"use client";
import React, { useState } from "react";

import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

import { RxCross2 } from "react-icons/rx";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputvalue] = useState("");

  const addTag = (item: string) => {
    onChange(item);
    setInputvalue("");
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputvalue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(inputValue);
          }
        }}
      />

      <div className="flex gap-1 flex-srap mt-4">
        {value.map((tag, index) => (
          <Badge key={index} className="bg-grey-1 roundec-xl outline-none">
            {tag}
            <button
              className="ml-1 rounded-full outline-none hover:bg-red-1"
              onClick={() => onRemove(tag)}
            >
              <RxCross2 className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
