import React from 'react'
import { useNavigate } from 'react-router-dom'

const Topbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <button style={{ margin: '0 3px' }} onClick={() => {
                    navigate('/dashboard');
                }}>Dashboard</button>
                <button style={{ margin: '0 3px' }} onClick={() => {
                    navigate('/allproducts');
                }}>All Products</button>
                <button style={{ margin: '0 3px' }} onClick={() => {
                    navigate('/aisletable');
                }}>Aisles</button>
                <button style={{ margin: '0 3px' }} onClick={() => {
                    navigate('/rearrange');
                }}>Wrong Aisle Products</button>
            </div>
        </>
    )
}

export default Topbar