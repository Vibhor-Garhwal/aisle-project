import React from 'react'
import { sampleWrongProducts } from './sampleData'

const Rearrange = () => {
    return (
        <>
            <>
                <h1>
                    All Wrong Placed Products
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
                        {sampleWrongProducts.map((sampleWrongProducts) => (
                            <tr className="product-row" key={sampleWrongProducts.productId}>
                                <td>{sampleWrongProducts.productId}</td>
                                <td>{sampleWrongProducts.productDetails.productName}</td>
                                <td>{sampleWrongProducts.aisleNo}</td>
                                <td>{sampleWrongProducts.correctAisle ? <div style={{ color: "green" }}>True</div> : <div style={{ color: "red", fontWeight: 'bold' }}>False</div>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        </>
    )
}

export default Rearrange