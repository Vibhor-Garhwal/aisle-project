import React, { useState, useEffect } from 'react';
import Draggable from "react-draggable";


const ShopLayout = () => {
    // const radarIds = ['1', '2', '3'];

    return (
        <div className='shop-container'>
            {/* {radarIds.map(radarId => <RadarModal radarId={radarId} key={radarId}></RadarModal>)} */}
            <RadarModal radarId="1" />
            <RadarModal radarId="2" />
            <RadarModal radarId="3" />
            <ShopSection sectionName="POS" gridPosition={{ column: '5 / span 4', row: '-1 / span 1' }} />
            <ShopSection sectionName="Trial Room" gridPosition={{ column: '1 / span 2', row: '-1 / span 1' }} />
            <ShopSection sectionName="Entry" gridPosition={{ column: '12 / span 1', row: '-1 / span 2' }} />
            <ShopSection sectionName="Aisle 1" gridPosition={{ column: '5 / span 8', row: '1 / span 1' }} />
            <ShopSection sectionName="Aisle 2" gridPosition={{ column: '5 / span 8', row: '5 / span 1' }} />
        </div>
    );
};

const RadarModal = ({ radarId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!isOpen) return; // Only fetch if modal is open

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/?n=10`);
                const jsonData = await response.json();
                const radarData = jsonData[`R${radarId}`] || {};
                console.log('Fetched Data:', radarData);
                setData(radarData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Fetch immediately when modal opens

        // Set up polling every 5 seconds
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval); // Cleanup on close
    }, [isOpen, radarId]);

    return (
        <div className='radar-container' id={`R${radarId}`}>
            <RadarCircle radarId={radarId} toggleModal={() => setIsOpen((prev) => !prev)} />
            {isOpen && <RadarData data={data} closeModal={() => setIsOpen(false)} />}
        </div>
    );
};

const RadarCircle = ({ id, radarId, toggleModal }) => {
    return (
        <button id={id} className='radarCircle' onClick={toggleModal} type='button'>
            R{radarId}
        </button>
    );
};

const RadarData = ({ data, closeModal }) => {
    return (
        <div
            className='productsContainer'
            style={{
                width: '300px',
                height: '500px',
                border: '1px solid black',
                position: 'fixed', // Use fixed positioning to center relative to the viewport
                top: '50%', // Center vertically
                left: '50%', // Center horizontally
                transform: 'translate(-50%, -50%)', // Adjust for the modal's own dimensions
                backgroundColor: 'white',
                zIndex: 1000,
            }}
        >
            <button
                onClick={closeModal}
                style={{ position: 'absolute', top: 10, right: 10 }}
            >
                X
            </button>
            <h1>Radar Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

const ShopSection = ({ sectionName, gridPosition }) => {
    return (
        <div className='shop-section'
            style={{
                gridColumn: gridPosition.column,
                gridRow: gridPosition.row,
                border: '1px solid black',
            }}>
            {sectionName}
        </div>
    );
}

export default ShopLayout;
