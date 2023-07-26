import React from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";

function ProductViewer() {
  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <h1>Admin Product Viewer</h1> 
        <div className="divider"></div>
        
      </div>
    </div>
  );
}

export default ProductViewer;
