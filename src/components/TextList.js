import React from 'react';
import { useTranslation } from 'react-i18next';

const TextList = ({ infoList, customStyle, extraFields = {} }) => {

  const { t } = useTranslation();

  const styles = customStyle ? { ...defaultStyles, ...customStyle } : defaultStyles;

  return (
    <>
      {Object.keys(infoList).map((key) => (
        <div key={key} style={{
          ...styles.counterItem,
          ...(Object.keys(extraFields).includes(key) && styles[extraFields[key]])
        }} >
          <span style={styles.counterValue}>{t(key)}: </span>
          <span style={styles.counterValue}>{String(infoList[key])}</span>
        </div>
      ))}
    </>

  );

};

const defaultStyles = {
  counterItem: {
    display: 'flex',
    marginBottom: '10px',
    justifyContent: 'space-between',
    margin: '5px 10px',
  },
  counterValue: {
    padding: '2px 5px',
    margin: '0 5px',
    minWidth: '60px',
    textAlign: 'left'
  },
  red: {
    fontWeight: 'bold',
    color: '#ff4d4f'
  }
};

export default TextList;
