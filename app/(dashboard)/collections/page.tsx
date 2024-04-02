"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "./CollectionColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Collections = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("[getCollections]", error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);
  return (
    <div className="roundec-md border">
      <div className="flex items-center justify-between p-3">
        <p className="text-heading2-bold">Collection</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/collections/new")}
        >
          <FaPlus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default Collections;
