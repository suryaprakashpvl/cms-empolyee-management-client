import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/auth/login';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from "./routerCheck/ProtectRouter"
import ProtectedRouteLogin from "./routerCheck/ProtectRouterLogin"
import Analytics from './pages/analytics/Analytics';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
                <Route element={<ProtectedRouteLogin />}>
          <Route path="/login" element={<Login />} />
 </Route>         
 
 <Route element={<ProtectedRoute />}>


          <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/" element={<Dashboard />} />
           <Route path="/Analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </Router>
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}

export default App;
