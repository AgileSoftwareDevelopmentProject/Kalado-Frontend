import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from './Filter';

describe('Filter Component', () => {
  it('renders the filter header and sections', () => {
    render(<Filter />);

    expect(screen.getByText('فیلترها')).toBeInTheDocument();

    expect(screen.getByText('قیمت')).toBeInTheDocument();

    expect(screen.getByText('قدمت آگهی')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('حداقل')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('حداکثر')).toBeInTheDocument();

    expect(screen.getByText('یک روز')).toBeInTheDocument();
    expect(screen.getByText('یک هفته')).toBeInTheDocument();
    expect(screen.getByText('یک ماه')).toBeInTheDocument();
  });

  it('allows entering price values', () => {
    render(<Filter />);

    const minPriceInput = screen.getByPlaceholderText('حداقل');
    const maxPriceInput = screen.getByPlaceholderText('حداکثر');

    fireEvent.change(minPriceInput, { target: { value: '1000' } });
    fireEvent.change(maxPriceInput, { target: { value: '5000' } });

    expect(minPriceInput).toHaveValue(1000);
    expect(maxPriceInput).toHaveValue(5000);
  });

  it('handles ad age button clicks', () => {
    render(<Filter />);

    const oneDayButton = screen.getByText('یک روز');
    const oneWeekButton = screen.getByText('یک هفته');
    const oneMonthButton = screen.getByText('یک ماه');

    fireEvent.click(oneDayButton);
    fireEvent.click(oneWeekButton);
    fireEvent.click(oneMonthButton);

    expect(oneDayButton).toBeInTheDocument();
    expect(oneWeekButton).toBeInTheDocument();
    expect(oneMonthButton).toBeInTheDocument();
  });
});