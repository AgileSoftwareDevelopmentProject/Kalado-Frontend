import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Category from './Category';

describe('CategorySidebar', () => {
  it('renders the sidebar header and all category items', () => {
    render(<Category />);

    expect(screen.getByText('دسته‌بندی‌ها')).toBeInTheDocument();

    const categories = [
      'املاک',
      'وسایل نقلیه',
      'خانه و آشپزخانه',
      'کالای دیجیتال',
      'سرگرمی',
      'لوازم شخصی',
      '... موارد دیگر',
    ];

    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });

    expect(screen.getAllByRole('img')).toHaveLength(categories.length);
  });

  it('calls handleCategoryClick for each category when clicked', async () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

    render(<Category />);

    const categories = [
      { name: 'املاک', log: 'املاک clicked' },
      { name: 'وسایل نقلیه', log: 'وسایل نقلیه clicked' },
      { name: 'خانه و آشپزخانه', log: 'خانه و آشپزخانه clicked' },
      { name: 'کالای دیجیتال', log: 'کالای دیجیتال clicked' },
      { name: 'سرگرمی', log: 'سرگرمی clicked' },
      { name: 'لوازم شخصی', log: 'لوازم شخصی clicked' },
      { name: '... موارد دیگر', log: '... موارد دیگر clicked' },
    ];

    for (const { name, log } of categories) {
      const categoryElement = screen.getByText(name);
      await userEvent.click(categoryElement);
      expect(consoleLogMock).toHaveBeenCalledWith(log);
    }

    consoleLogMock.mockRestore();
  });
});