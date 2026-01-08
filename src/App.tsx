import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./App.css";


const responses = [
  {
    id: 0,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem recusandae dolores provident consectetur, eius accusantium quaerat reprehenderit voluptatum nemo amet tempore. Nobis possimus facilis quisquam omnis quo a, inventore culpa laboriosam maiores nisi dolorem totam aperiam eveniet quaerat earum ducimus. Tempore nulla laudantium sequi nam deserunt quis eveniet, quod, perspiciatis quaerat non ullam maiores atque deleniti quas dolor. Modi excepturi impedit placeat, optio natus, aliquid neque, corrupti dolores possimus sed facilis qui commodi exercitationem corporis ad itaque quo molestiae odit. Eveniet repellat optio quisquam aperiam officia enim hic iste dolores itaque eaque in totam at rem sit, minima quidem. Voluptatum.",
    prediction: 0.3,
  },
  {
    id: 1,
    text: "this is one text",
    prediction: 0.3,
  },
  {
    id: 2,
    text: "this is one text",
    prediction: 0.3,
  },
  {
    id: 3,
    text: "this is one text",
    prediction: 0.3,
  },
  {
    id: 4,
    text: "this is one text",
    prediction: 0.3,
  },
  {
    id: 5,
    text: "this is one text",
    prediction: 0.3,
  },
];

function App() {
  const renderPredictionIcon = (prediction: number) => {
    return <span>{prediction}</span>;
  };

  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mt-6 mb-9">Sentiment analysis</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg font-bold">Text</TableHead>
            <TableHead className="text-lg font-bold w-[10px]">Prediction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {responses.map((response) => (
            <TableRow key={response.id}>
              <TableCell className="text-left whitespace-normal pe-3">{response.text}</TableCell>
              <TableCell>{renderPredictionIcon(response.prediction)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

export default App;
