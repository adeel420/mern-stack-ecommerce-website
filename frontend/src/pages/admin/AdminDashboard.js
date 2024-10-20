import React, { useState } from 'react'
import Layout from '../../component/Layout'
import AdminInfo from './AdminInfo';
import CreateCategory from './CreateCategory';
import CreateProduct from './CreateProduct';
import AllProducts from './AllProducts';
import AdminOrders from './AdminOrders';

function AdminDashboard(tabName) {
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
            <div className='adminDashboard-cont'>
                <div className='btn-container'>
                    <h3>Control Panel</h3>
                    <div className='button'>
                        <button className={activeTab === 'tab1' ? 'active-tab' : ''} onClick={() => tabClick('tab1')}>Admin Details</button>
                        <button className={activeTab === 'tab2' ? 'active-tab' : ''} onClick={() => tabClick('tab2')}>Create Category</button>
                        <button className={activeTab === 'tab3' ? 'active-tab' : ''} onClick={() => tabClick('tab3')}>Create Product</button>
                        <button className={activeTab === 'tab4' ? 'active-tab' : ''} onClick={() => tabClick('tab4')}>All Products</button>
                        <button className={activeTab === 'tab5' ? 'active-tab' : ''} onClick={() => tabClick('tab5')}>Orders</button>
                    </div>
                </div>
                <div className='content-container'>
                    <div className='tab' id='tab1' style={{ display: activeTab === 'tab1' ? 'block' : 'none' }}><AdminInfo /></div>
                    <div className='tab' id='tab2' style={{ display: activeTab === 'tab2' ? 'block' : 'none' }}><CreateCategory /></div>
                    <div className='tab' id='tab3' style={{ display: activeTab === 'tab3' ? 'block' : 'none' }}><CreateProduct /></div>
                    <div className='tab' id='tab4' style={{ display: activeTab === 'tab4' ? 'block' : 'none' }}><AllProducts /></div>
                    <div className='tab' id='tab5' style={{ display: activeTab === 'tab5' ? 'block' : 'none' }}><AdminOrders /></div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
