import React from "react";

const Title = ({ title }) => {
    return <h2 style={styles.title}>{title}</h2>;
};

const styles = {
    title: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
};

export default Title;