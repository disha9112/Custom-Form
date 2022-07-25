import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./pages/Form/Form.page";
import Users from "./pages/Users/Users.page";
import Edit from "./pages/Edit/Edit.page";
import Create from "./pages/Create/Create.page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/create" element={<Create />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
