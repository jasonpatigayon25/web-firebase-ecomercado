import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaShoppingBag } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "../css/Admin.css";


function OrdersHistory() {

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
      <div className="stats-label">Orders History</div>     
      </div>
    </div>
  );
}


export default OrdersHistory;
