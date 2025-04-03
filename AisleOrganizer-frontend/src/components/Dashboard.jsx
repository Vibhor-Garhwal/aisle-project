import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [aisleCount, setAisleCount] = useState(20);
    const [productCount, setProductCount] = useState(4561);
    const [wrongPlace, setWrongPlace] = useState(2566);
    const navigate = useNavigate();

    //use a use effect to fetch the details of the all the state variables

    return (
        <>
            <h1 style={{ color: "white", textAlign: "center" }}>Dashboard</h1>
            <div className="dashboard-container">
                <div className="box" onClick={() => { navigate('/aisletable') }}>
                    <h3>No. of Aisle</h3>
                    <h4>{aisleCount}</h4>
                </div>
                <div className="box" onClick={() => { navigate('/allProducts') }}>
                    <h3>No. of Products</h3>
                    <h4>{productCount}</h4>
                </div>
                <div className="box" onClick={() => { navigate('/rearrange') }}>
                    <h3>No. of Wrong Place Products</h3>
                    <h4 className="highlight">{wrongPlace}</h4>
                </div>
            </div>
        </>
    );

}
export default Dashboard