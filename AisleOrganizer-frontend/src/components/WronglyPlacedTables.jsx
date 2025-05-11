import React, { useState, useEffect } from 'react';

const WronglyPlacedTables = () => {
    const [zoneWiseWrongItems, setZoneWiseWrongItems] = useState({});

    const zoneNameMapping = {
        B: 'Entry',
        C: 'Trial',
        A: 'Shop'
    };

    useEffect(() => {
        const fetchZoneData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/mapping`);
                const jsonData = await response.json();
                const zoneData = {};

                Object.keys(jsonData).forEach(zone => {
                    const wrongItems = jsonData[zone].filter(item => !item.CorrectlyPlaced);
                    if (wrongItems.length > 0) {
                        zoneData[zone] = wrongItems;
                    }
                });

                setZoneWiseWrongItems(zoneData);
            } catch (error) {
                console.error('Error fetching mapping data:', error);
            }
        };

        fetchZoneData();
    }, []);

    return (
        <section style={tablesSectionStyle}>
            <h1 style={mainHeadingStyle}>Wrongly Placed Items </h1>
            <h2 style={subHeadingStyle}> Zone Wise</h2>
            <div style={cardGridStyle}>
                {Object.keys(zoneWiseWrongItems).length === 0 ? (
                    <p>No wrongly placed items found!</p>
                ) : (
                    Object.keys(zoneWiseWrongItems).map((zone, index) => (
                        <div key={index} style={cardStyle}>
                            <h2 style={zoneHeaderStyle}>{zoneNameMapping[zone] || zone}</h2>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th style={tableHeaderStyle}>SKU</th>
                                        <th style={tableHeaderStyle}>Name</th>
                                        <th style={tableHeaderStyle}>Correct Zone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {zoneWiseWrongItems[zone].map((item, idx) => (
                                        <tr key={idx}>
                                            <td style={wrongItemStyle}>{item.SKU}</td>
                                            <td style={wrongItemStyle}></td>
                                            <td style={wrongItemStyle}>{zoneNameMapping[item.correctZone]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

// === CSS in JS ===

const subHeadingStyle = {
    marginBottom: '10px',
    fontSize: '1.5rem',
    textAlign: 'center'
}

const tablesSectionStyle = {
    padding: '20px',
    backgroundColor: '#f7f7f7',
};

const mainHeadingStyle = {
    marginBottom: '20px',
    fontSize: '2rem',
    textAlign: 'center',
};

const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
};

const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
};

const zoneHeaderStyle = {
    marginBottom: '10px',
    fontSize: '1.5rem',
    textAlign: 'center',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
};

const tableHeaderStyle = {
    padding: '8px',
    borderBottom: '2px solid #eee',
    fontWeight: 'bold',
    textAlign: 'center',
};

const wrongItemStyle = {
    padding: '8px',
    borderBottom: '1px solid #eee',
    color: 'red',

};

export default WronglyPlacedTables;
