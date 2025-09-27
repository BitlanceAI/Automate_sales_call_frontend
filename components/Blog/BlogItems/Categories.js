import React from "react";

const Categories = ({ category }) => {
  return (
    <>
      <div className="inner">
        <ul className="category-list ">
          {category.map((data, index) => (
            <li key={index}>
              <a href="#">
                <span className="left-content">{data.name}</span>
                <span className="count-text">{data.count || data.num || 0}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Categories;