import Nav from "./component/Nav";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Footer from "./component/Footer";
import Signup from "./component/Signup";
import PrivateRoute from "./component/PrivateRoute";
import Login from "./component/Login";
import './App.css';
import AddProduct from "./component/AddProduct";
import ProductList from "./component/ProductList";
import UpdateProduct from "./component/UpdateProduct";
import Profile from "./component/Profile";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Nav/>
            <Routes>
              <Route element={<PrivateRoute />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<UpdateProduct />} />
              <Route path="/logout" element={<h1>Logout</h1>} />
              <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
      </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
