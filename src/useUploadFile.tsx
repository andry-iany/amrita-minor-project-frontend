import { useState } from "react";
import type { TPrediction } from "./type";

const useUploadFile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<TPrediction[]>  => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
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

  return { uploadFile, loading, error };
};

export default useUploadFile;
