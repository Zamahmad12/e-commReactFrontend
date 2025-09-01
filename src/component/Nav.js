import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/signup");
  };
  return (
    <div>
      <img className="logo"
      src="https://marketplace.canva.com/EAGSPQpl9bo/2/0/1600w/canva-pink-and-blue-abstract-online-shop-free-logo-Yss4qhbwl48.jpg" alt="Logo" />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Product-List</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup ">
              Logout({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul" style={{ textAlign: "right" }}>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
