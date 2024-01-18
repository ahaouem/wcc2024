import QuestionnaireForm from "./questionnaire-form";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <div className="rounded-3xl ring-1 ring-zinc-950/5 bg-white text-zinc-950 shadow max-w-xl w-full p-6">
        <div className="flex flex-col gap-y-1.5 mb-6">
          <h1 className="font-semibold leading-none tracking-tight">
            Ask Assistant
          </h1>
          <p className="text-sm text-zinc-500">
            Ask any question and get quick answer.
          </p>
        </div>
        <div className="grid">
          <QuestionnaireForm />
        </div>
      </div>
    </div>
  );
}
