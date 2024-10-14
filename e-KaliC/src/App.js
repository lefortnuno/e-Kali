import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import SignInProtection from "./contexts/ptotections/signin.protection";
import LogOutProtection from "./contexts/ptotections/logout.protection";

import PageNotFound from "./pages/404/page404";
import LogIn from "./pages/login/login";

import About from "./pages/about/about";

import User from "./pages/users/user";
import SignIn from "./pages/signin/signin";
import UserDetails from "./pages/users/detail.user"; 

import Loka from "./pages/loka/loka";
import AddLoka from "./pages/loka/add.loka";
import LokaDetails from "./pages/loka/detail.loka";
import EditLoka from "./pages/loka/edit.loka";


function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} position={"bottom-right"} />
      <BrowserRouter>
        <Routes>
          <Route index element={<LogOutProtection Cmp={LogIn} />} />
          {/* <Route index element={<LogIn/>} /> */}

          <Route path="/*" element={<SignInProtection Cmp={PageNotFound} />} />
          <Route path="about/" element={<SignInProtection Cmp={About} />} />

          <Route path="users/" element={<SignInProtection Cmp={User} />} />
          <Route path="newUser/" element={<SignIn />} />
          <Route
            path="aboutUser/:id"
            element={<SignInProtection Cmp={UserDetails} />}
          /> 

          <Route
            path="loka/"
            element={<SignInProtection Cmp={Loka} />}
          />
          <Route
            path="newLoka/"
            element={<SignInProtection Cmp={AddLoka} />}
          />
          <Route
            path="aboutLoka/:id"
            element={<SignInProtection Cmp={LokaDetails} />}
          />
          <Route
            path="editLoka/:id"
            element={<SignInProtection Cmp={EditLoka} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
