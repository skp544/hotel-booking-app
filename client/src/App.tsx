import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>} />
      <Route path="search" element={<>SearchPage</>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
