import { FaHome, FaCar, FaLaptop, FaGamepad, FaSuitcase, FaPlusCircle, FaUtensils } from 'react-icons/fa';
import './Category.css';

const CategorySidebar: React.FC = () => {
  const handleCategoryClick = (category: string) => {
    console.log(`${category} clicked`);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">دسته‌بندی‌ها</div>
      <div className="category-item" onClick={() => handleCategoryClick('املاک')}>
        <FaHome className="category-icon" aria-label="Home" role="img" />
        <span>املاک</span>
      </div>
      <div className="category-item" onClick={() => handleCategoryClick('وسایل نقلیه')}>
        <FaCar className="category-icon" aria-label="Car" role="img" />
        <span>وسایل نقلیه</span>
      </div>
      <div className="category-item" onClick={() => handleCategoryClick('خانه و آشپزخانه')}>
        <FaUtensils className="category-icon" aria-label="Utensils" role="img" />
        <span>خانه و آشپزخانه</span>
      </div>
      <div className="category-item" onClick={() => handleCategoryClick('کالای دیجیتال')}>
        <FaLaptop className="category-icon" aria-label="Laptop" role="img" />
        <span>کالای دیجیتال</span>
      </div>
      <div className="category-item" onClick={() => handleCategoryClick('سرگرمی')}>
        <FaGamepad className="category-icon" aria-label="Gamepad" role="img" />
        <span>سرگرمی</span>
      </div>
      <div className="category-item" onClick={() => handleCategoryClick('لوازم شخصی')}>
        <FaSuitcase className="category-icon" aria-label="Suitcase" role="img" />
        <span>لوازم شخصی</span>
      </div>
      <div className="category-item" onClick={() => handleCategoryClick('... موارد دیگر')}>
        <FaPlusCircle className="category-icon" aria-label="More" role="img" />
        <span>... موارد دیگر</span>
      </div>
    </div>
  );
};

export default CategorySidebar;