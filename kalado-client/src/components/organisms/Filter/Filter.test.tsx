import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Filter from './Filter';
import { fetchItems } from '../../../services/filterService';

jest.mock('../../../services/filterService', () => ({
  fetchItems: jest.fn(),
}));


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Filter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial state', () => {
    const { getByText, getByPlaceholderText } = render(<Filter />);

    expect(getByText('filter.title')).toBeInTheDocument();
    expect(getByPlaceholderText('filter.min_price')).toBeInTheDocument();
    expect(getByPlaceholderText('filter.max_price')).toBeInTheDocument();
    expect(getByText('filter.apply')).toBeInTheDocument();
  });

  it('updates minPrice and maxPrice on input change', () => {
    const { getByPlaceholderText } = render(<Filter />);

    const minPriceInput = getByPlaceholderText('filter.min_price');
    const maxPriceInput = getByPlaceholderText('filter.max_price');

    fireEvent.change(minPriceInput, { target: { value: '100' } });
    expect(minPriceInput.value).toBe('100');

    fireEvent.change(maxPriceInput, { target: { value: '200' } });
    expect(maxPriceInput.value).toBe('200');
  });

  it('sets minPrice to 0 if negative value is entered', () => {
    const { getByPlaceholderText } = render(<Filter />);

    const minPriceInput = getByPlaceholderText('filter.min_price');

    fireEvent.change(minPriceInput, { target: { value: '-50' } });
    expect(minPriceInput.value).toBe('0');
  });

  it('selects a filter option when clicked', () => {
    const { getByText } = render(<Filter />);

    const oneDayButton = getByText('filter.one_day');
    fireEvent.click(oneDayButton);

    expect(oneDayButton).toHaveAttribute('variant', 'contained');

    const oneWeekButton = getByText('filter.one_week');
    fireEvent.click(oneWeekButton);

    expect(oneWeekButton).toHaveAttribute('variant', 'contained');
    expect(oneDayButton).toHaveAttribute('variant', 'text');
  });

  it('calls fetchItems with correct parameters on apply button click', async () => {
    (fetchItems as jest.Mock).mockResolvedValueOnce([]);

    const { getByPlaceholderText, getByText } = render(<Filter />);

    fireEvent.change(getByPlaceholderText('filter.min_price'), { target: { value: '100' } });
    fireEvent.change(getByPlaceholderText('filter.max_price'), { target: { value: '500' } });

    fireEvent.click(getByText('filter.one_week'));
    fireEvent.click(getByText('filter.apply'));

    await waitFor(() => {
      expect(fetchItems).toHaveBeenCalledWith(
        'oneWeek',
        100,
        500
      );
    });
  });

  it('handles errors when applying filters', async () => {
    (fetchItems as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    const { getByPlaceholderText, getByText } = render(<Filter />);

    fireEvent.change(getByPlaceholderText('filter.min_price'), { target: { value: '100' } });

    fireEvent.click(getByText('filter.apply'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
      consoleSpy.mockRestore();
    });
  });
});
