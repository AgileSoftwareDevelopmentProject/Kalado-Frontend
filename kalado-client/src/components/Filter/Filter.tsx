import './Filter.css';

const Filter: React.FC = () => {
  return (
    <div className="filter-container">
      <div className="filter-header">فیلترها</div>
      <div className="filter-section">
        <div className="filter-label">قیمت</div>
        <div className="price-inputs">
          <input type="number" placeholder="حداقل" className="price-input" />
          <input type="number" placeholder="حداکثر" className="price-input" />
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-label">قدمت آگهی</div>
        <div className="ad-age-options">
          <button className="ad-age-option">۲۴ ساعت</button>
          <button className="ad-age-option">یک هفته</button>
          <button className="ad-age-option">یک ماه</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;