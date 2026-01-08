import { useState } from "react";

export type TPrediction = {
  id: number;
  text: string;
  prediction: number;
};

const useGetPredictions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPredictions = async (texts: string[]): Promise<TPrediction[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texts }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = (await response.json()) as {
        input_received: string[];
        predictions: number[];
      };
      const mappedResponses = result.input_received.map((text, index) => ({
        id: Date.now() + index, // Generate unique ID
        text,
        prediction: result.predictions[index],
      }));
      return mappedResponses;
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getPredictions, loading, error };
};

export default useGetPredictions;
