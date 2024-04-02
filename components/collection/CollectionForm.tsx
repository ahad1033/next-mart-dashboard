"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import Delete from "../custom ui/Delete";
import { ImageUpload } from "../custom ui/ImageUpload";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define form validation schema using Zod
const formSchema = z.object({
  title: z.string().min(3).max(20),
  description: z.string().min(20).max(300),
  image: z.string(),
});

interface CollectionFormProps {
  initialData?: CollectionType | null;
}

export const CollectionForm: React.FC<CollectionFormProps> = ({
  initialData,
}) => {
  const router = useRouter();
  const params = useParams();
  const id = params.collectionId

  const [loading, setLoading] = useState(false);

  // Initialize form with useForm hook and apply validation schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });

  // handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/collections/${id}`
        : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });

      console.log("rssss", res);
      if (res.ok) {
        toast.success(`Collection ${initialData ? "updated" : "created"}`);
        window.location.href = "/collections";
        router.push("/collections");
      }
    } catch (err) {
      console.log("[collection-post]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading1-bold">Edit Collection</p>
          <Delete id={initialData._id} />
        </div>
      ) : (
        <p className="text-heading1-bold">Create Collection</p>
      )}

      <Separator className="bg-grey-1 my=t-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="enter description"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/collections")}
              className="bg-blue-1 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
