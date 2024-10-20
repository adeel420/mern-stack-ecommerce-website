import React, { useState } from 'react'
import Layout from '../../component/Layout'
import UserInfo from './UserInfo';
import Orders from './Orders';

function UserDashboard() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabClick = (tabName) => {
    setActiveTab(tabName);

    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.display = 'none';
    }
    const tab = document.getElementById(tabName);
    if (tab) {
      tab.style.display = 'block';
    }
  };
  return (
    <Layout>
      <div className='userDashboard-cont'>
        <div className='btn-container'>
          <h3>Dashboard</h3>
          <button className={activeTab === 'tab1' ? 'active-tab' : ''} onClick={() => tabClick('tab1')}>Orders</button>
          <button className={activeTab === 'tab2' ? 'active-tab' : ''} onClick={() => tabClick('tab2')}>Profile</button>
        </div>
        <div className='content-container'>
          <div className='tab' id='tab1' style={{ display: activeTab === 'tab1' ? 'block' : 'none' }}><Orders /></div>
          <div className='tab' id='tab2' style={{ display: activeTab === 'tab2' ? 'block' : 'none' }}><UserInfo /></div>
        </div>
      </div>
    </Layout>
  )
}

export default UserDashboard
