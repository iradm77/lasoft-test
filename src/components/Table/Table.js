import React from 'react';

const Table = ({
    columns,
    data,
}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {columns.map(column => <th key={column.key}><span>{column.title}</span></th>)}
                </tr>
            </thead>
            <tbody> 
                {data.map((row, key) => <tr key={key}>
                    {columns.map(column => <td key={column.key} style={row[column.key].style}>
                        {row[column.key].value}
                    </td>)}
                </tr>)}
            </tbody>
        </table>
    )
};

export default Table;