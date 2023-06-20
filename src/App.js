import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Engineer from "./pages/Engineer";
import Customer from "./pages/Customer";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
//Core UI
import '@coreui/coreui/dist/css/coreui.min.css'
import '@coreui/coreui/dist/js/coreui.min.js'
//React-circular-progressbar
import "react-circular-progressbar/dist/styles.css";
//BootStrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css"

import "./App.css";

const ROLES = {
  "CUSTOMER":"CUSTOMER",
  "ADMIN":"ADMIN",
  "ENGINEER":"ENGINEER"
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}>
          <Route path="/engineer" element={<Engineer />} />
        </Route>
        <Route element={<RequireAuth  allowedRoles={[ROLES.CUSTOMER]} />}>
          <Route path="/customer" element={<Customer />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
