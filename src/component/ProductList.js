import React from "react";
import { Link } from "react-router-dom";
import API_URL from "../apiconfig";

const ProductList = () => {
  const [products, setProducts] = React.useState([]);
  const GetProducts = async () => {
    let token = localStorage.getItem("token");
    token = token.replace(/^"|"$/g, "");
    let result = await fetch (`${API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };
  React.useEffect(() => {
    GetProducts();
  }, []);
  const handleDelete = async (id) => {
    let token = localStorage.getItem("token");
    token = token.replace(/^"|"$/g, "");
    let result = await fetch(`${API_URL}/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("Product deleted successfully");
      GetProducts(); // Refresh the product list
    } else {
      alert("Failed to delete product");
    }
  };
  const searchhandle = async (event) => {
    let token = localStorage.getItem("token");
    token = token.replace(/^"|"$/g, "");
    console.log(event.target.value);
    let key = event.target.value;
    if (key) {
      let result = await fetch(`${API_URL}/search/${key}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      result = await result.json();
      setProducts(result);
    } else {
      GetProducts();
    }
  };
  return (
    <div className="product-list">
      <h2 className="signup-header">Product List</h2>
      <input
        className="search-box "
        type="text"
        placeholder="Search Products"
        onChange={searchhandle}
      />
      <ul>
        <li>SR No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Actions</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <Link to={`/edit-product/${item._id}`}>
                <button className="edit-button">Edit</button>
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Products Found</h1>
      )}
    </div>
  );
};

export default ProductList;
