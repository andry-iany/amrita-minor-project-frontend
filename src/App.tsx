import { useState } from "react";
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
import type { TPrediction } from "./type";
import Uploader from "./Uploader";
import { Button } from "./components/ui/button";

function App() {
  const [predictions, setPredictions] = useState<TPrediction[]>([]);

  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mt-6 mb-9">
        Sentiment analysis
      </h1>
      <Uploader setPredictions={setPredictions} />
      <Button
        className="mt-6 mb-3"
        disabled={!predictions.length}
        onClick={() => setPredictions([])}
      >
        Reset
      </Button>
      <Table className="my-5">
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg font-bold">Text</TableHead>
            <TableHead className="text-lg font-bold w-[10px]">
              Prediction
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!predictions.length && (
            <TableRow>
              <TableCell colSpan={2}>
                <p className="py-3">No data</p>
              </TableCell>
            </TableRow>
          )}
          {predictions.map((response) => (
            <TableRow key={response.id}>
              <TableCell className="text-left whitespace-normal pe-5">
                {response.text}
              </TableCell>
              <TableCell>{renderPredictionIcon(response.prediction)}</TableCell>
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
