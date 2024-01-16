import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SummarizerForm from "./summarizer-form";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle>Article Summarizer</CardTitle>
          <CardDescription>
            Summarize any article or text with this simple tool!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SummarizerForm />
        </CardContent>
      </Card>
    </div>
  );
}
