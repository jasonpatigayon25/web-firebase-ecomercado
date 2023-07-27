// ProductViewer.js
import React, { useState } from "react";
import SidebarOptions from "./SidebarOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "../css/Admin.css";

function ProductViewer() {
  const [featuredPictures, setFeaturedPictures] = useState([]);
  const [topPickedPictures, setTopPickedPictures] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [topPickedCategories, setTopPickedCategories] = useState([]);

  const handleUpload = (event, section) => {
    const files = event.target.files;
    const uploadedPictures = Array.from(files).map((file) => URL.createObjectURL(file));
    if (section === "featured") {
      setFeaturedPictures((prevPictures) => [...prevPictures, ...uploadedPictures]);
      setFeaturedCategories((prevCategories) => [...prevCategories, ""]);
    } else if (section === "topPicked") {
      setTopPickedPictures((prevPictures) => [...prevPictures, ...uploadedPictures]);
      setTopPickedCategories((prevCategories) => [...prevCategories, ""]);
    }
  };

  const handleDelete = (index, section) => {
    if (section === "featured") {
      const updatedPictures = [...featuredPictures];
      updatedPictures.splice(index, 1);
      setFeaturedPictures(updatedPictures);

      const updatedCategories = [...featuredCategories];
      updatedCategories.splice(index, 1);
      setFeaturedCategories(updatedCategories);
    } else if (section === "topPicked") {
      const updatedPictures = [...topPickedPictures];
      updatedPictures.splice(index, 1);
      setTopPickedPictures(updatedPictures);

      const updatedCategories = [...topPickedCategories];
      updatedCategories.splice(index, 1);
      setTopPickedCategories(updatedCategories);
    }
  };

  const handleChangeCategory = (event, index, section) => {
    const { value } = event.target;
    if (section === "featured") {
      const updatedCategories = [...featuredCategories];
      updatedCategories[index] = value;
      setFeaturedCategories(updatedCategories);
    } else if (section === "topPicked") {
      const updatedCategories = [...topPickedCategories];
      updatedCategories[index] = value;
      setTopPickedCategories(updatedCategories);
    }
  };

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <h2>PRODUCT VIEWER</h2>
        <div className="divider"></div>

        {/* Featured Products */}
        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h1>Featured Products</h1>
          <div className="divider"></div>
          <div className="featured-pictures-container">
            {featuredPictures.map((picture, index) => (
              <div key={index} className="featured-picture">
                <img
                  src={picture}
                  alt={`Featured ${index + 1}`}
                  style={{ maxWidth: "300px", maxHeight: "200px", margin: "10px" }}
                />
                <div className="category-input">
                  <label>Category: </label>
                  <input
                    type="text"
                    value={featuredCategories[index]}
                    onChange={(e) => handleChangeCategory(e, index, "featured")}
                    placeholder="Enter category"
                  />
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(index, "featured")}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            ))}
          </div>
          <input type="file" accept="image/*" multiple onChange={(e) => handleUpload(e, "featured")} />
        </div>

        {/* Top Picked Products */}
        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h1>Top Picked Products</h1>
          <div className="divider"></div>
          <div className="top-picked-pictures-container">
            {topPickedPictures.map((picture, index) => (
              <div key={index} className="top-picked-picture">
                <img
                  src={picture}
                  alt={`Top Picked ${index + 1}`}
                  style={{ maxWidth: "300px", maxHeight: "200px", margin: "10px" }}
                />
                <div className="category-input">
                  <label>Category: </label>
                  <input
                    type="text"
                    value={topPickedCategories[index]}
                    onChange={(e) => handleChangeCategory(e, index, "topPicked")}
                    placeholder="Enter category"
                  />
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(index, "topPicked")}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            ))}
          </div>
          <input type="file" accept="image/*" multiple onChange={(e) => handleUpload(e, "topPicked")} />
        </div>

        {/* Example of Posted Photos */}
        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h1>Posted Featured Product Photos</h1>
          <div className="divider"></div>
          <div className="posted-photos-container">
            {/* Example images */}
            <div className="posted-photo">
              <img
                src="example1.jpg"
                alt="Example 1"
                style={{ maxWidth: "300px", maxHeight: "200px" }}
              />
              <div className="category-info">Category: Furniture</div>
              <button
                className="delete-button"
                style={{ backgroundColor: "red", color: "white" }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
            <div className="posted-photo">
              <img
                src="example2.jfif"
                alt="Example 2"
                style={{ maxWidth: "300px", maxHeight: "200px", margin: "10px" }}
              />
              <div className="category-info">Category: Electronics</div>
              <button
                className="delete-button"
                style={{ backgroundColor: "red", color: "white" }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
            <div className="posted-photo">
              <img
                src="example3.jpg"
                alt="Example 3"
                style={{ maxWidth: "300px", maxHeight: "200px", margin: "10px" }}
              />
              <div className="category-info">Category: Clothing</div>
              <button
                className="delete-button"
                style={{ backgroundColor: "red", color: "white" }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductViewer;