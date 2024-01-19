"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function Form() {
  const [language, setLanguage] = useState("en");
  const [instructions, setInstructions] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult("");

    if (!content) {
      return toast.error(
        "In order to get a response, you need to ask something."
      );
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  language === "pl"
                    ? "Jesteś pomocnym asystentem."
                    : "You are a helpful assistant.",
              },
              {
                role: "user",
                content: `${instructions} ${content}`,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const result = data.choices[0].message.content;
      setLoading(false);
      setResult(result);
    } catch (error) {
      setLoading(false);
      console.error("Error while fetching data from ChatGPT API:", error);
      toast.error("Error occurred while fetching data. Please try again.");
    }
  }

  function handleCopyToClipboard() {
    navigator.clipboard
      .writeText(result)
      .then(() => toast.success("Result copied to clipboard"))
      .catch(() => toast.error("Error copying result to clipboard"));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <fieldset className="space-y-2">
        <label htmlFor="language" className="text-sm font-medium leading-none">
          Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md ring-1 ring-zinc-950/10 bg-transparent px-3 py-2 text-sm shadow placeholder:text-zinc-500"
          name="language">
          <option value="en">English</option>
          <option value="pl">Polish</option>
        </select>
      </fieldset>
      <fieldset>
        <div className="mb-2 flex items-center justify-between">
          <div className="grid">
            <label
              htmlFor="prompt"
              className="text-sm font-medium leading-none mb-1">
              Instructions{" "}
              <span className="text-zinc-500 text-xs">(optional)</span>
            </label>
            <p className="text-sm text-zinc-500 mb-2">
              Enter instructions for the assistant.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 h-8 rounded-md px-3 text-xs"
            onClick={() => setInstructions("")}>
            Clear
          </button>
        </div>

        <textarea
          className="flex min-h-[40px] w-full rounded-md ring-1 ring-zinc-950/10 bg-transparent px-3 py-2 sm:text-sm shadow placeholder:text-zinc-500"
          name="prompt"
          minLength={10}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <div className="mb-2 flex items-center justify-between">
          <div className="grid">
            <label
              htmlFor="content"
              className="text-sm font-medium leading-none mb-1">
              Content
            </label>
            <p className="text-sm text-zinc-500 mb-2">Enter your question.</p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 h-8 rounded-md px-3 text-xs"
            onClick={() => setContent("")}>
            Clear
          </button>
        </div>
        <textarea
          className="flex min-h-[60px] w-full rounded-md ring-1 ring-zinc-950/10 bg-transparent px-3 py-2 sm:text-sm shadow placeholder:text-zinc-500"
          name="content"
          minLength={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </fieldset>

      <div className="flex justify-end">
        <button
          className="relative group h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 disabled:opacity-50 data-[loading=true]:text-transparent"
          type="submit"
          disabled={loading}
          data-loading={loading}>
          Ask
          <span className="group-data-[loading=true]:grid hidden inset-0 place-content-center absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-spin stroke-zinc-50 w-4 h-4">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </span>
        </button>
      </div>
      {result && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold leading-none tracking-tight">
              Result
            </h3>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 h-8 rounded-md px-3 text-xs"
              onClick={handleCopyToClipboard}
              type="button">
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
                  fillRule="evenodd"
                  clipRule="evenodd"></path>
              </svg>
              Copy
            </button>
          </div>

          {result.includes("```") ? (
            <div>
              {result.split("```").map((item, index) => {
                if (index % 2 === 1 || result.startsWith("```")) {
                  return (
                    <pre className="whitespace-pre-wrap my-2 p-2 bg-zinc-100 ring-1 ring-zinc-950/10 rounded-md text-sm shadow">
                      <code>{item}</code>
                    </pre>
                  );
                }
                return item;
              })}
            </div>
          ) : (
            <div>{result}</div>
          )}
        </div>
      )}
    </form>
  );
}
