import React, { useState, useEffect } from 'react';

const WronglyPlacedTables = () => {
    const [zoneWiseWrongItems, setZoneWiseWrongItems] = useState({});
    const [selectedZone, setSelectedZone] = useState(null);

    const handleToggle = (zone) => {
        setSelectedZone(prev => (prev === zone ? null : zone));
    };

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
            <h2 style={subHeadingStyle}>Wrongly Placed Items - Zone Wise</h2>
            <div style={cardGridStyle}>
                {Object.keys(zoneWiseWrongItems).length === 0 ? (
                    <p>No wrongly placed items found!</p>
                ) : (
                    Object.keys(zoneWiseWrongItems).map((zone, index) => (
                        <div key={index} style={cardStyle}>
                            <div onClick={() => handleToggle(zone)} style={{ cursor: 'pointer' }}>
                                <ZoneCard
                                    room={zoneNameMapping[zone] || zone}
                                    health={100 - zoneWiseWrongItems[zone].length * 10}
                                    misplaced={zoneWiseWrongItems[zone].length}
                                />
                            </div>
                            {selectedZone === zone && (
                                <>
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
                                                    <td style={wrongItemStyle}>{item.Name || '-'}</td>
                                                    <td style={wrongItemStyle}>{zoneNameMapping[item.correctZone]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

const ZoneCard = ({ room = "Trial Room", health = 80, misplaced = 3 }) => {
    const getStatusColor = (value) => {
        if (value >= 80) return "#16a34a"; // green
        if (value >= 70) return "#ca8a04"; // yellow
        return "#dc2626"; // red
    };

    const styles = {
        card: {
            backgroundColor: "#ffffff",
            color: "#111827",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            alignItems: "",
            gap: "10px",
            fontFamily: "Arial, sans-serif",
        },
        header: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // gap: "10px",
            fontSize: "22px",
            fontWeight: "700",
            textTransform: "uppercase",
        },
        statusDot: {
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: getStatusColor(health),
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        },
        health: {
            fontSize: "70px",
            fontWeight: "800",
            color: getStatusColor(health),
        },
        footer: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "16px",
            color: "#374151"
        },
        misplacedNumber: {
            fontSize: "20px",
            fontWeight: "700",
            color: "#ef4444"
        },
        misplacedIcon: {
            width: "20px",
            height: "20px",
            backgroundColor: getStatusColor(health),
            borderRadius: "4px"
        }
    };

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <span style={styles.header}>{room}</span>
                <div style={styles.statusDot} />
            </div>
            <div style={styles.health}>{health}%</div>
            <div style={styles.footer}>
                <div style={styles.misplacedIcon} />
                <span style={{
                    fontSize: '20px'
                }}>Misplaced</span>
                <span style={styles.misplacedNumber}>{misplaced}</span>
            </div>
        </div>
    );
};


// === Styles ===
const tablesSectionStyle = {
    padding: '10px',
    // minHeight: '100vh',
};

const subHeadingStyle = {
    marginBottom: '20px',
    fontSize: '1.75rem',
    textAlign: 'center',
    color: '#111827',
};

const cardGridStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
};

const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
    padding: '16px',
    transition: 'all 0.3s ease',
};

const zoneHeaderStyle = {
    marginTop: '12px',
    marginBottom: '10px',
    fontSize: '1.25rem',
    textAlign: 'center',
    color: '#374151',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
};

const tableHeaderStyle = {
    padding: '10px',
    borderBottom: '2px solid #e5e7eb',
    backgroundColor: '#f3f4f6',
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827'
};

const wrongItemStyle = {
    padding: '10px',
    borderBottom: '1px solid #e5e7eb',
    textAlign: 'center',
    color: '#b91c1c'
};

export default WronglyPlacedTables;
