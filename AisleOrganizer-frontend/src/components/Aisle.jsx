import React, { useState } from "react";
import { sampleProducts } from "./sampleData";

export default function Aisle() {
    const [products] = useState(sampleProducts);
    const [selected, setSelected] = useState(null);


    function handleSelection(productId) {
        setSelected(selected == productId ? null : productId);
    }

    return (
        <>
            <h1>
                All Products
            </h1>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Aisle Number</th>
                        <th>Correct Aisle</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr className="product-row">
                            <td>{product.productId}</td>
                            <td>{product.productDetails.productName}</td>
                            <td>{product.aisleNo}</td>
                            <td>{product.correctAisle ? <div style={{ color: "green" }}>True</div> : <div style={{ color: "red", fontWeight: 'bold' }}>False</div>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

function Product({ productId, aisleNo, correctAisle, productDetails }) {
    return (
        <tr className="product-row">
            <td>{productId}</td>
            <td>{productDetails.productName}</td>
            <td>{aisleNo}</td>
            <td>{correctAisle ? "True" : "False"}</td>

        </tr>
    );
}


// function AisleBox() {
//     const [products, setProducts] = useState([]);

//     setProducts(sampleProducts);
//     //products = [...product]
//     //product = { productId:"A1242", aisleNo:"A221B", correctAisle:"true", productDetails:{}}

//     return (
//         <>
//             <table>
//                 <tr>
//                     <th>Product Id</th>
//                     <th>Product Name</th>
//                     <th>Aisle Number</th>
//                     <th>Correct Aisle</th>
//                     <th>Product details</th>
//                 </tr>
//                 {
//                     products.map(product => <Product productId={productId} aisleNo={aisleNo} correctAisle={correctAisle} productDetails={productDetails} />)
//                 }
//             </table>
//         </>
//     )

// }



// function ProductDetails(productDetails) {
//     const [isOpen, setisOpen] = useState(false);

//     return isOpen ?
//         <div className="box">

//         </div>
//      : { productDetails[productName]};
// }