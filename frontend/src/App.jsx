import { RouterProvider } from "react-router";
import { Router } from "./app.route.jsx";
import { InterviewContextProvider } from "./features/interview/interview.context.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <InterviewContextProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <RouterProvider router={Router} />
    </InterviewContextProvider>
  );
}

export default App;
