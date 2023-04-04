import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import TopFlies from "./TopFlies";
import FlyPage from "./FlyPage";
import UserPage from "./UserPage";
import { UserProvider } from "./UserContext";

const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/topflies" element={<TopFlies />} />
            <Route path="/fly/:id" element={<FlyPage />} />
            <Route path="/flybox" element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};

export default App;
