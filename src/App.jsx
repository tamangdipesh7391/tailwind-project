import { Menu } from "./components/menu";
import TemperaturePractice from "./components/TemperaturePractice";
import { MiniTrello } from "./components/trello/trello";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<TemperaturePractice />} />
          <Route path="/trello" element={<MiniTrello />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
