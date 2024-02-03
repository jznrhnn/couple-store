import React from 'react';
import Wallet from './Wallet';

const UserProfile = () => {
  // 模拟用户信息
  const user = {
    name: '花生米',
    age: 25,
    address: '翻斗胡同 8 号楼 888 室',
    phoneNumber: '555-1234',
    profilePicture: 'dudu.jpg',
    // 添加更多用户信息
  };

  return (
    <>
    <div style={styles.container}>
      <img src={user.profilePicture} alt={user.name} style={styles.profilePicture} />
      <div style={styles.userInfo}>
        <h2>{user.name}</h2>
        <p>Age: {user.age}</p>
        <p>Address: {user.address}</p>
        <p>Phone Number: {user.phoneNumber}</p>
        {/* 在这里可以添加其他用户信息 */}
      </div>
    </div>
    <Wallet />
    </>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    padding: '20px',
  },
  profilePicture: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginRight: '20px',
  },
  userInfo: {
    flex: 1,
  },
};

export default UserProfile;
