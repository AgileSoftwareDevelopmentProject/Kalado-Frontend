import React from 'react';
import './Filter.css';

const Filter: React.FC = () => {

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(e.target.value) < 0) {
      e.target.value = '0';
    }
  };

  return (
    <div className="filter-container">
      <div className="filter-header">فیلترها</div>
      <div className="filter-section">
        <div className="filter-label">قیمت</div>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="حداقل"
            className="price-input"
            min="0"
            onChange={handlePriceChange}
          />
          <input
            type="number"
            placeholder="حداکثر"
            className="price-input"
            min="0"
            onChange={handlePriceChange}
          />
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-label">قدمت آگهی</div>
        <div className="ad-age-options">
          <button className="ad-age-option">یک روز</button>
          <button className="ad-age-option">یک هفته</button>
          <button className="ad-age-option">یک ماه</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
