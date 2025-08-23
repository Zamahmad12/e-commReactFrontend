import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const UpdateProduct = () => {
  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productCategory, setProductCategory] = React.useState("");
  const [productCompany, setProductCompany] = React.useState("");
  const params = useParams();
  const Navigate = useNavigate();
  useEffect(() => {
    getproductDeatails();
  }, []);
  const getproductDeatails = async () => {
    let token = localStorage.getItem("token");
    token = token.replace(/^"|"$/g, "");
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    result = await result.json();
    console.log(result);
    setProductName(result.name);
    setProductPrice(result.price);
    setProductCategory(result.category);
    setProductCompany(result.company);
  };
  const editProduct = async () => {
    let token = localStorage.getItem("token");
    token = token.replace(/^"|"$/g, "");
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: productName,
        price: productPrice,
        category: productCategory,
        company: productCompany,
      }),
    });
    result = await result.json();
    console.log(result);
    Navigate("/");
  };

  return (
    <div className="signup-container" style={{ height: "360px" }}>
      <h1
        className="signup-header"
        style={{ marginBottom: "16px", marginTop: "16px" }}
      >
        Update Product
      </h1>
      <input
        className="input-box"
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        placeholder="Product Price"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        placeholder="Product Category"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        placeholder="Product Company"
        value={productCompany}
        onChange={(e) => setProductCompany(e.target.value)}
      />
      <button className="signup-button" onClick={editProduct}>
        Update Product
      </button>
    </div>
  );
};
export default UpdateProduct;
