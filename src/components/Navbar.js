import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    console.log(tab);
    setActiveTab(tab);
    navigate(tab);
    // 在这里可以添加处理点击标签时的其他逻辑
  };

  const menu = ['home', 'order', 'my'];

  return (
    <div style={styles.container}>
      {menu.map((tab) => (
        <div
          key={tab}
          style={activeTab === tab ? styles.activeTab : styles.tab}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333',
    color: '#fff',
    height: '60px',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  tab: {
    cursor: 'pointer',
  },
  activeTab: {
    cursor: 'pointer',
    borderBottom: '2px solid #fff',
  },
};

export default Navbar;
