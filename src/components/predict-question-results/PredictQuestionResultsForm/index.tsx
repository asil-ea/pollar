import dynamic from "next/dynamic";

// Render component only on the client side,
// because it depends on browser API, FileList
const PredictQuestionResultsForm = dynamic(
  () => import("./PredictQuestionResultsForm"),
  {
    ssr: false,
  }
);

export default PredictQuestionResultsForm;
