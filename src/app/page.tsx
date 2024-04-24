import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <a
                href="/predict-question-results"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Predict Question Results
              </a>
              <Link
                href="/create-survey"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Create Survey
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="">
        <br />
      </main>
    </>
  );
}
