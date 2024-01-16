"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import Response from "./response";

const formSchema = z.object({
  language: z.enum(["en", "pl"], {
    required_error: "Please select a language.",
  }),
  content: z
    .string({
      required_error: "Please enter some text.",
    })
    .min(10, {
      message: "Content must be at least 10 characters long.",
    }),
});

export default function SummarizerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "en",
      content: "",
    },
  });
  const [summary, setSummary] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(
      "https://article-extractor-and-summarizer.p.rapidapi.com/summarize-text",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "b1dd2fd265msh3b6a081f809018ep1ab2bfjsnb30e2a6b7204",
          "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
        },
        body: JSON.stringify({
          lang: values.language,
          text: values.content,
        }),
      }
    );
    const data: {
      summary: string;
    } = await response.json();
    console.log(data);
    const placeholder = `adipisicing ut est fugiat cillum ad enim laboris fugiat exercitation consectetur ad anim anim dolor quis ut id id nisi enim ex dolor aliquip irure ex aliqua qui incididunt quis ad deserunt consequat aliquip velit id consequat amet dolor do eiusmod eu laboris sunt esse ea consequat in cupidatat commodo officia culpa ullamco enim labore cupidatat culpa duis sit magna ad deserunt elit enim in incididunt nulla labore velit aute adipisicing et dolor enim labore consectetur sint incididunt non laboris pariatur Lorem duis ex Lorem do elit ex consequat ex incididunt tempor et voluptate nisi commodo cillum incididunt est cillum ullamco aliquip ipsum laboris adipisicing velit in quis cupidatat sint adipisicing incididunt eu consequat duis enim amet commodo enim sint excepteur ex sit esse magna labore eu sit cillum magna aliquip tempor culpa incididunt fugiat dolor in nulla quis voluptate nostrud ullamco dolor pariatur commodo culpa enim laboris officia aliquip`;
    setSummary(placeholder);
    toast.success("Summary copied to clipboard");
    navigator.clipboard.writeText(placeholder);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pl">Polish</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormDescription>
                  Enter some text to summarize. Must be at least 10 characters
                </FormDescription>
                <Textarea {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Summarize</Button>
          </div>
        </form>
      </Form>
      {summary && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold leading-none tracking-tight">
              Summary
            </h3>
            <Button size="sm" variant="ghost">
              <ClipboardIcon className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
          <Response content={summary} speed={10} />
        </div>
      )}
    </>
  );
}
