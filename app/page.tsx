"use client";
import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LanguageOption {
  value: string;
  label: string;
}

interface ApiResponse {
  summary: string;
}

const Home: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [wordLimit, setWordLimit] = useState<number>(100);
  const [responseData, setResponseData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const languageOptions: LanguageOption[] = [
    { value: "en", label: "English" },
    { value: "pl", label: "Polish" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setResponseData(null);

    const config: AxiosRequestConfig = {
      method: "post",
      url: "https://article-extractor-and-summarizer.p.rapidapi.com/summarize-text",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
      },
      data: {
        lang: selectedLanguage,
        text: inputText,
      },
    };

    try {
      const response: AxiosResponse<ApiResponse> = await axios(config);
      const truncatedSummary = truncateSummary(
        response.data.summary,
        wordLimit
      );
      setResponseData({ summary: truncatedSummary });
      copyToClipboard(truncatedSummary);
      showSuccessToast();
      setError(null);
    } catch (error: any) {
      setResponseData(null);
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const truncateSummary = (summary: string, limit: number) => {
    const words = summary.split(" ");
    if (words.length > limit) {
      const truncatedSummary = words.slice(0, limit).join(" ");
      const lastDotIndex = truncatedSummary.lastIndexOf(".");
      return lastDotIndex !== -1
        ? truncatedSummary.slice(0, lastDotIndex + 1)
        : truncatedSummary;
    }
    return summary;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const showSuccessToast = () => {
    toast.success("Summary copied to clipboard!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleClear = () => {
    setInputText("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-600">
              Language:
            </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full">
              {languageOptions.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="wordLimit"
              className="block text-sm font-medium text-gray-600">
              Word Limit:
            </label>
            <input
              type="number"
              id="wordLimit"
              value={wordLimit}
              onChange={(e) => setWordLimit(Number(e.target.value))}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-600">
              Text to summarize:
            </label>
            <div className="flex items-center">
              <textarea
                id="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={5}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 flex-grow"
              />
              <button
                type="button"
                onClick={handleClear}
                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300">
                Clear
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-md hover:from-pink-500 hover:to-blue-500 focus:outline-none focus:ring focus:border-blue-300 w-full transition duration-300 ease-in-out transform hover:scale-105">
            {loading ? "Summarizing..." : "Summarize"}
          </button>
        </form>

        {responseData && (
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2 text-white">Summary:</h2>
            <p className="text-gray-600">{responseData.summary}</p>
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Home;
