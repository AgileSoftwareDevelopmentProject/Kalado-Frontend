import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import Category from './Category';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Category Component', () => {
  it('renders correctly with categories', () => {
    const { getByText } = render(<Category />);

    expect(getByText('category.title')).toBeInTheDocument();
    expect(getByText('category.one')).toBeInTheDocument();
    expect(getByText('category.two')).toBeInTheDocument();
    expect(getByText('category.three')).toBeInTheDocument();
    expect(getByText('category.four')).toBeInTheDocument();
    expect(getByText('category.five')).toBeInTheDocument();
    expect(getByText('category.six')).toBeInTheDocument();
    expect(getByText('category.seven')).toBeInTheDocument();
  });

  it('changes background color when a category is clicked', () => {
    const { getByText } = render(<Category />);

    const firstCategory = getByText('category.one');
    fireEvent.click(firstCategory);
    expect(firstCategory.closest('li')).toHaveStyle('background-color: #D74101');
  });

  it('logs the selected category when clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByText } = render(<Category />);

    const firstCategory = getByText('category.one');

    fireEvent.click(firstCategory);

    expect(consoleSpy).toHaveBeenCalledWith('category.one clicked');

    consoleSpy.mockRestore();
  });
});
