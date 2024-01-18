"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function QuestionnaireForm() {
  const [assistantResponse, setAssistantResponse] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [userInput, setUserInput] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setAssistantResponse("");
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    switch (true) {
      case !values.content:
        return toast.error("Please enter some question.");
    }

    const { content } = values;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  selectedLanguage === "pl"
                    ? "Jesteś pomocnym asystentem."
                    : "You are a helpful assistant.",
              },
              {
                role: "user",
                content: content,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const assistantResponse = data.choices[0].message.content;

      setAssistantResponse(assistantResponse);
    } catch (error) {
      console.error("Error while fetching data from ChatGPT API:", error);
      toast.error("Error occurred while fetching data. Please try again.");
    }
  }

  function handleCopyToClipboard() {
    navigator.clipboard
      .writeText(assistantResponse)
      .then(() => toast.success("Response copied to clipboard"))
      .catch(() => toast.error("Error copying response to clipboard"));
  }

  function handleClearInput() {
    setUserInput("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <fieldset className="space-y-2">
          <label
            htmlFor="language"
            className="text-sm font-medium leading-none">
            Language
          </label>
          <select
            defaultValue="en"
            className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md ring-1 ring-zinc-950/10 bg-transparent px-3 py-2 text-sm shadow placeholder:text-zinc-500"
            name="language"
            onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="pl">Polish</option>
          </select>
        </fieldset>
        <fieldset>
          <label
            htmlFor="content"
            className="text-sm font-medium leading-none mb-1">
            Content
          </label>
          <p className="text-sm text-zinc-500 mb-2">
            Enter question. Must be at least 10 characters
          </p>
          <textarea
            className="flex min-h-[60px] w-full rounded-md ring-1 ring-zinc-950/10 bg-transparent px-3 py-2 text-sm shadow placeholder:text-zinc-500"
            name="content"
            minLength={10}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </fieldset>

        <div className="flex justify-between items-center">
          <button
            className="h-9 px-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-red-500 text-white shadow hover:bg-red-600"
            type="button"
            onClick={handleClearInput}>
            Clear
          </button>
          <button
            className="h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90"
            type="submit">
            Ask Assistant
          </button>
        </div>
      </form>
      {assistantResponse && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold leading-none tracking-tight">
              Assistant Answer
            </h3>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 h-8 rounded-md px-3 text-xs"
              onClick={handleCopyToClipboard}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4">
                <path
                  d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"></path>
              </svg>
              Copy
            </button>
          </div>

          {(assistantResponse.includes("```") && (
            <pre className="whitespace-pre-wrap">
              <code>{assistantResponse}</code>
            </pre>
          )) || <div>{assistantResponse}</div>}
        </div>
      )}
    </>
  );
}
