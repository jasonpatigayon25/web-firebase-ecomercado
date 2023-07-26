import React from "react";
import { FaBoxOpen, FaShoppingBag } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";

const recentProducts = [
  { itemName: 'Product 1', userName: 'Username1', datePublished: '2023-06-01' },
  { itemName: 'Product 2', userName: 'Username2', datePublished: '2023-05-25' },
  { itemName: 'Product 3', userName: 'Username3', datePublished: '2023-05-18' },
  { itemName: 'Product 4', userName: 'Username4', datePublished: '2023-05-16' },
  { itemName: 'Product 5', userName: 'Username5', datePublished: '2023-05-10' },
  { itemName: 'Product 6', userName: 'Username6', datePublished: '2023-05-05' },
  { itemName: 'Product 7', userName: 'Username7', datePublished: '2023-04-29' },
  { itemName: 'Product 8', userName: 'Username8', datePublished: '2023-04-20' },
  { itemName: 'Product 9', userName: 'Username9', datePublished: '2023-04-12' },
  { itemName: 'Product 10', userName: 'Username10', datePublished: '2023-04-03' }
];

function ProductMetrics() {
  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <h2>ADMIN DASHBOARD</h2>
        <div className="divider"></div>
        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Product Published</h2>
            <p className="stats"> <FaBoxOpen style={{ color: 'black' }} /> 0</p>
          </div>
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Product Sold</h2>
            <p className="stats"> <FaShoppingBag style={{ color: 'black' }} /> 0</p>
          </div>
        </div>

        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h1>Recent Products Published</h1>
          <div className="divider"></div>
          <table className="recent-products-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Username</th>
                <th>Date Published</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.itemName}</td>
                  <td>{product.userName}</td>
                  <td>{product.datePublished}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductMetrics;
