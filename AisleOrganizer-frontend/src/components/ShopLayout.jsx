import React, { useState, useEffect } from 'react';
import Draggable from "react-draggable";
import WronglyPlacedTables from './WronglyPlacedTables';
import bgImage from '../assets/Desktop - 1.png';



const ShopLayout = () => {
    return (
        <>
            <HeaderSection />
            <div className='main-container'>
                <div className='left-section'>
                    <WronglyPlacedTables />
                </div>

                <div className='right-section' style={{ backgroundImage: `url(${bgImage})` }}>
                    <TransparentBlock />
                    <TransparentBlock />
                    <TransparentBlock />
                </div>
            </div>
            <div className='footer'>
                This is the footer
            </div>
        </>
    );
};

const HeaderSection = () => {
    const [modalData, setModalData] = useState(null);

    const handleCardClick = (type) => {
        let content = {};
        if (type === "Attendance") {
            content = { title: "Attendance", details: "Attendance is 95%" };
        } else if (type === "Footfall") {
            content = { title: "Footfall", details: "Today’s footfall is 320" };
        } else if (type === "Store") {
            content = { title: "Store Details", details: "Store Code: ST123\nStore Name: FashionHub" };
        }
        setModalData(content);
    };

    return (
        <div className='header-section' style={headerSectionStyle}>
            <h1 style={applicationName}>Application-Name</h1>
            <div style={headerDetailsStyle}>
                <DetailCard title="Attendance" value="95%" onClick={() => handleCardClick("Attendance")} />
                <DetailCard title="Footfall" value="320" onClick={() => handleCardClick("Footfall")} />
                <DetailCard title="Store" value="ST123" onClick={() => handleCardClick("Store")} />
            </div>
            {modalData && (
                <DetailModal
                    title={modalData.title}
                    details={modalData.details}
                    onClose={() => setModalData(null)}
                />
            )}
        </div>
    );
};
const DetailCard = ({ title, value, onClick }) => (
    <div
        onClick={onClick}
        style={{
            marginLeft: '10px',
            padding: '10px 15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            cursor: 'pointer',
            minWidth: '80px',
            boxShadow: '0 0 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
        }}
    >
        <strong>{title}</strong><br />
        <h2>{value}</h2>
    </div>
);
const DetailModal = ({ title, details, onClose }) => (
    <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        border: '1px solid black',
        borderRadius: '8px',
        zIndex: 9999,
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        minWidth: '300px'
    }}>
        <button onClick={onClose} style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'transparent',
            border: 'none',
            fontSize: '30px',
            cursor: 'pointer',
            color: 'red',
        }}>×</button>
        <h2>{title}</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{details}</pre>
    </div>
);

const getBackgroundColor = (count) => {
    if (count <= 7) return 'rgba(0, 255, 0, 0.2)';
    if (count <= 12) return 'rgba(255, 165, 0, 0.2)';
    return 'rgba(255, 0, 0, 0.2)';
};

const generateDots = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 90,
        left: Math.random() * 90
    }));
};  

const TransparentBlock = () => {
    const dotCount = Math.floor(Math.random() * 11) + 5; // 5–15
    const dots = generateDots(dotCount);
    const bgColor = getBackgroundColor(dotCount);

    return (
        <div className="transparent-block" style={{ backgroundColor: bgColor }}>
            {dots.map(dot => (
                <div
                    key={dot.id}
                    className="red-dot"
                    style={{ top: `${dot.top}%`, left: `${dot.left}%` }}
                />
            ))}
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

const applicationName = {
    //use this to style the application name
    fontSize: '24px',
    fontWeight: 'bold',
    marginLeft: '20px',
}
const headerSectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    height: '10vh',
    // borderBottom: '1px solid black',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    padding: '10px',
    alignItems: 'center',
}
const headerDetailsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginRight: '20px',
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
