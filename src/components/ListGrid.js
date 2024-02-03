import React from 'react';

/**
 * 展示列表
 * @param {lists} {id,name,detail} 
 * @param {titleName} 需要额外展示的标题字段名称
 * @param {coverName} 需要额外展示的图片字段名称
 * @param {extraField} 需要额外展示的字段名称和样式名称
 * @param {style} 需要额外展示的样式
 * @param {excludeList} 需要排除的字段名称
 * @param {clickFunction} 点击事件
 * @returns 
 */
const ListGrid = ({ lists, titleName, coverName, extraFields={}, style, excludeList = [], clickFunction=function() {} }) => {
    const maxLength = 20;
    return (
        lists.map(list => (
            <div key={list.id} style={styles.orderContainer} onClick={() => clickFunction(list.id)}>
                <img src={list[coverName]} alt={list[titleName]} style={styles.cover} />
                <div style={styles.orderDetails}>
                    {Object.keys(list).filter((key) => key !== coverName && key !== 'id' && excludeList.indexOf(key) === -1)
                        .map((key) => (
                            <div key={key} style={{
                                ...styles.details,
                                ...(key === titleName && styles.title),
                                ...( Object.keys(extraFields).includes(key) && styles[extraFields[key]])
                            }}>
                                {list[key] > maxLength ? String(list[key]).slice(0, maxLength) + '...' : list[key]}
                            </div>
                        ))}
                </div>
            </div>
        ))
    );
};

const styles = {
    orderContainer: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '10px',
    },
    cover: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginRight: '10px',
    },
    orderDetails: {
        flex: 1,
        padding: '10px',
        cursor: 'pointer',
    },
    title: {
        fontSize: '1.2em',
        fontWeight: 'bold',
    },
    products: {
        margin: '5px 0',
    },
    details: {
        margin: '3px 0',
    },
    status: {
        color: '#555',
    },
    amount: {
        fontWeight: 'bold',
    },
    gray: {
        color: '#555',
    },
    green: {
        color: 'green',
        fontWeight: 'bold',
    },
};

export default ListGrid;
