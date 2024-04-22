import { CldUploadWidget } from "next-cloudinary";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import { Button } from "../ui/button";
import React from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center mb-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <FaTrash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="rlz5sssn" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button type="button" className="bg-grey-1 text-white" onClick={() => open()}>
              <FaPlus className="h-4 w-4 mr-2" /> Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
