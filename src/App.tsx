import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./App.css";
import { ArrowUpIcon } from "@/components/icons/il-arrow-up";
import { ArrowDownIcon } from "@/components/icons/il-arrow-down";
import useGetPredictions from "./useGetPredictions";
import type { TPrediction } from "./useGetPredictions";

const sampleReviews = [
  "The movie was fantastic!",
  "I did not enjoy the film.",
  "An absolute masterpiece.",
  "It was a waste of time.",
  "The acting was superb.",
  "The plot was predictable.",
  "A visual spectacle.",
  "The dialogue was poorly written.",
  "An emotional rollercoaster.",
  "I wouldn't recommend it.",
];

function App() {
  const { getPredictions, loading, error } = useGetPredictions();
  const [predictions, setPredictions] = useState<TPrediction[]>([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const result = await getPredictions(sampleReviews);
        setPredictions(result);
      } catch (err) {
        console.error("Error fetching predictions:", err);
      }
    };

    fetchPredictions();
  }, []);

  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mt-6 mb-9">
        Sentiment analysis
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg font-bold">Text</TableHead>
            <TableHead className="text-lg font-bold w-[10px]">
              Prediction
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && <p className="py-3">Loading predictions...</p>}
          {error && <p className="text-red-500 py-3">Error: {error}</p>}
          {!loading &&
            !error &&
            predictions.map((response) => (
              <TableRow key={response.id}>
                <TableCell className="text-left whitespace-normal pe-3">
                  {response.text}
                </TableCell>
                <TableCell>
                  {renderPredictionIcon(response.prediction)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </main>
  );
}

const renderPredictionIcon = (prediction: number) => {
  const formattedPrediction = Math.trunc(prediction * 100) / 100;
  return (
    <div>
      {formattedPrediction >= 0.5 ? (
        <ArrowUpIcon className="mx-auto" />
      ) : (
        <ArrowDownIcon className="mx-auto" />
      )}
      <span className="ms-1 text-[12px]">[{formattedPrediction}]</span>
    </div>
  );
};

export default App;
