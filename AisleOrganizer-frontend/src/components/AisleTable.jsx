import React from 'react'
import { sampleAisles as aisles } from './sampleData'
export const AisleTable = () => {
    return (
        <>
            <h2 className="table-title">Aisle Overview</h2>
            <table className="aisle-table">
                <thead>
                    <tr>
                        <th>Aisle ID</th>
                        <th>Capacity</th>
                        <th>Correct Products</th>
                        <th>Wrong Products</th>
                    </tr>
                </thead>
                <tbody>
                    {aisles.map((aisle) => (
                        <tr key={aisle.AisleId}>
                            <td>{aisle.AisleId}</td>
                            <td>{aisle.Capacity}</td>
                            <td>{aisle.CorrectProducts}</td>
                            <td className={aisle.WrongProducts > 0 ? "wrong-products" : ""}>
                                {aisle.WrongProducts}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
