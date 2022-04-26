import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Detail from "./pages/Detail";
import NewQuestion from "./pages/New";
import Questions from "./pages/Questions";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Questions</Link>
        <Link to="/new">New Questions</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="/new" element={<NewQuestion />} />
        <Route path="q/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
