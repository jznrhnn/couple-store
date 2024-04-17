import React from 'react';

const RegularButton = ({ onClick, text = '点击', customStyle }) => {
  const styles = customStyle ? { ...defaultStyles, ...customStyle } : defaultStyles;

  return (
    <button onClick={onClick} style={styles.button}>
      {text}
    </button>
  );
};

const defaultStyles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#06B6FD',
    color: '#fff',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1em',
  },
}

export default RegularButton;
