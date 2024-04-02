"use client";
import { useState } from "react";
import { LuTrash } from "react-icons/lu";
import toast from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface DeleteProps {
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/collections/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.href = "/collections";
        toast.success("Collection deleted");
      } else {
        toast.error("Failed to delete collection");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again later");
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="bg-red-1 text-white">
            <LuTrash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white text-grey-1">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-1">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              collections!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-1 text-white"
              onClick={onDelete}
              disabled={loading}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Delete;
