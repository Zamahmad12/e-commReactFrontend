import React, { use } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [productName, setProductName] = React.useState("");
    const [productPrice, setProductPrice] = React.useState("");
    const [productCategory, setProductCategory] = React.useState("");
    const [productCompany, setProductCompany] = React.useState("");
    const [error,seterror] = React.useState(false);
    const Navigate = useNavigate();
const AddProduct = async () => {
    let token = localStorage.getItem("token");
  token = token.replace(/^"|"$/g, "");
    if (!productName || !productPrice || !productCategory || !productCompany) {
        seterror(true);
        return false;
    }
    console.log(productName, productPrice, productCategory, productCompany);
    const userId= JSON.parse(localStorage.getItem("user"))._id;
    console.log("User ID:", userId);
    let result = await fetch("http://localhost:5000/add-product", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name: productName,
            price: productPrice,
            category: productCategory,
            company: productCompany,
            userId: userId
        }),
    });
    result = result.json();
    if (result) {
        alert("Product added successfully");
        setProductName("");
        setProductPrice("");
        setProductCategory("");
        setProductCompany("");
        seterror(false);
        Navigate("/");
    }else{
        alert("Failed to add product");
    }
    
}
    return (
        <div className="signup-container" style={{height:"360px",}}>
            <h1 className="signup-header" style={{marginBottom:"16px",marginTop:"16px"}}>Add Product</h1>
            <input className="input-box" type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            {error && !productName && <span className="invalid-input">Enter valid Product Name</span>}
            <input className="input-box" type="text" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            {error && !productPrice && <span className="invalid-input">Enter valid Product Price</span>}
            <input className="input-box" type="text" placeholder="Product Category" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
            {error && !productCategory && <span className="invalid-input">Enter valid Product Category</span>}
            <input className="input-box" type="text" placeholder="Product Company" value={productCompany} onChange={(e) => setProductCompany(e.target.value)} />
            {error && !productCompany && <span className="invalid-input">Enter valid Product Company</span>}
            <button className="signup-button" onClick={AddProduct}>Add Product</button>
        </div>
    );
};

export default AddProduct;
