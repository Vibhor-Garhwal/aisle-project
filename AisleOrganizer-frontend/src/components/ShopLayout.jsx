import React, { useState, useEffect } from 'react';
import Draggable from "react-draggable";
import WronglyPlacedTables from './WronglyPlacedTables';

const ShopLayout = () => {
    return (
        <div className='main-container'>
            <div className='left-section'>
                <WronglyPlacedTables />
            </div>

            <div className='right-section'>
                <div className='shop-container'>
                    <RadarModal radarId="1" radarZone="Shop" />
                    <RadarModal radarId="2" radarZone="Entry" />
                    <RadarModal radarId="3" radarZone="Trial" />
                    <ShopSection sectionName="POS" gridPosition={{ column: '5 / span 4', row: '-1 / span 1' }} />
                    <ShopSection sectionName="Trial Room" gridPosition={{ column: '1 / span 2', row: '-1 / span 1' }} />
                    <ShopSection sectionName="Entry" gridPosition={{ column: '12 / span 1', row: '-1 / span 2' }} />
                    <ShopSection sectionName="Aisle 1" gridPosition={{ column: '5 / span 8', row: '1 / span 1' }} />
                    <ShopSection sectionName="Aisle 2" gridPosition={{ column: '5 / span 8', row: '5 / span 1' }} />
                    <ShopSection sectionName="Aisle 3" gridPosition={{ column: '1 / span 1', row: '1 / span 7' }} />
                </div>
            </div>
        </div>
    );
};

const WronglyPlacedTable = () => {
    const [wronglyPlacedItems, setWronglyPlacedItems] = useState([]);

    useEffect(() => {
        const fetchZoneData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/mapping`);
                const jsonData = await response.json();
                const allWrongItems = [];

                // Loop through zones
                Object.keys(jsonData).forEach(zone => {
                    jsonData[zone].forEach(item => {
                        if (!item.CorrectlyPlaced) {
                            allWrongItems.push({
                                sku: item.SKU,
                                currentZone: zone,
                                correctZone: item.correctZone
                            });
                        }
                    });
                });

                setWronglyPlacedItems(allWrongItems);
            } catch (error) {
                console.error('Error fetching mapping data:', error);
            }
        };

        fetchZoneData();
    }, []);

    return (
        <div style={{ padding: '20px', overflowX: 'auto' }}>
            <h1>Wrongly Placed Items</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={tableHeaderStyle}>SKU</th>
                        <th style={tableHeaderStyle}>Current Zone</th>
                        <th style={tableHeaderStyle}>Correct Zone</th>
                    </tr>
                </thead>
                <tbody>
                    {wronglyPlacedItems.map((item, index) => (
                        <tr key={index}>
                            <td style={wrongItemStyle}>{item.sku}</td>
                            <td style={wrongItemStyle}>{item.currentZone}</td>
                            <td style={wrongItemStyle}>{item.correctZone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const tableHeaderStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    fontWeight: 'bold',
    textAlign: 'left'
};

const wrongItemStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    color: 'red'
};

const RadarModal = ({ radarId, radarZone = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null);
    let countOfItems = 0;

    useEffect(() => {
        if (!isOpen) return; // Only fetch if modal is open

        // Old function: fetching from `/`
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000`);
                const jsonData = await response.json();
                const radarData = jsonData[`R${radarId}`] || [];
                setData(radarData);
            } catch (error) {
                console.error('Error fetching old radar data:', error);
            }
        };

        // New function: fetching from `/mapping`
        const fetchZoneData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/mapping`);
                const jsonData = await response.json();
                // Select data based on radarId
                // For example: radarId 1 => 'A', 2 => 'B', 3 => 'C'
                let zoneLetter = '';
                if (radarId === "1") zoneLetter = 'A';
                else if (radarId === "2") zoneLetter = 'B';
                else if (radarId === "3") zoneLetter = 'C';

                const radarData = jsonData[zoneLetter] || [];
                // Only keep Incorrectly Placed items
                const filteredData = radarData.filter(item => item.CorrectlyPlaced === false);

                setData(filteredData);
            } catch (error) {
                console.error('Error fetching new mapping data:', error);
            }
        };

        // Call only the new fetch for now
        fetchZoneData();

        // If you want polling like before (optional):
        // const interval = setInterval(fetchZoneData, 5000);
        // return () => clearInterval(interval);

    }, [isOpen, radarId]);

    return (
        <div className='radar-container' id={`R${radarId}`}>
            <RadarCircle radarId={radarId} radarZone={radarZone} count={data?.length || 0} toggleModal={() => setIsOpen((prev) => !prev)} />
            {isOpen && <RadarData data={data} closeModal={() => setIsOpen(false)} />}
            {/* {!isOpen && <RadarOverlay count={ 5 } />} */}
        </div>
    );
};

const RadarCircle = ({ id, radarId, toggleModal, radarZone = "", count = 0 }) => {
    return (
        <button id={id} className='radarCircle' onClick={toggleModal} type='button'>
            {radarZone === "" ? `R${radarId}` : radarZone}
            {count > 0 && (
                <span className='radar-badge'>{count}</span>
            )}
        </button>
    );
};

const RadarData = ({ data, closeModal }) => {
    return (
        <div
            className='productsContainer'
            style={{
                width: '400px',
                height: '500px',
                borderRadius: '2px',
                padding: '10px',
                border: '1px solid black',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
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
            }}
        >
            {sectionName}
        </div>
    );
};

const RadarOverlay = ({ count }) => {
    return <div className='radar-overlay'></div>
}

export default ShopLayout;
