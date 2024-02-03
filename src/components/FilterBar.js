import React from 'react';

/**
 * 
 * @param {filterType} Alll 
 * @param {setFilterType} setFilterType
 * @param {filters} filter type map{label,type}
 * @returns 
 */
const FilterBar = ({ filterType, setFilterType, filters }) => {

    return (
        <div style={styles.statusBar}>
            {filters.map(filter => (
                <span key={filter.type}
                    style={filterType === filter.type ? styles.activeFilter : styles.defaultFilter}
                    onClick={() => setFilterType(filter.type)}
                >
                    {filter.label}
                </span>
            ))}
        </div>
    );
}

const styles = {
    statusBar: {
        display: 'flex',
        marginBottom: '20px',
        borderBottom: '2px solid #ddd',
        paddingBottom: '10px',
    },
    activeFilter: {
        // Add styles for active filter
        borderBottom: '2px solid #333',
        marginRight: '10px',
        cursor: 'pointer',
    },
    defaultFilter: {
        // Add styles for default filter
        marginRight: '10px',
        cursor: 'pointer',
    },
};

export default FilterBar;
