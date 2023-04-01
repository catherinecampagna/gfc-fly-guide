import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import TopFlies from "./TopFlies";
import FlyPage from "./FlyPage";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/topflies" element={<TopFlies />} />
          <Route path="/fly/:id" element={<FlyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
