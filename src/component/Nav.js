import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
    const storedUser = localStorage.getItem("user");
  let auth = null;
  try {
    auth = storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Invalid user data in localStorage:", e);
    auth = null;
  }
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
              Logout({auth.name})
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
