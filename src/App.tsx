import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import Home from "./screens/home";
import FeedBack from "./screens/feedBack";
import { store } from "./redux/store";
import { useEffect } from "react";

function App() {
  // const { loggedIn } = store.getState().login;
  // console.log("ap", loggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<FeedBack />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
