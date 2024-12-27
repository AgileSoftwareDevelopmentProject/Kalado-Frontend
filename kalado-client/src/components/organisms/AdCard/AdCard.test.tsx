import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdCard from './AdCard';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';

describe('AdCard Component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
  };

  test('opens the delete confirmation dialog when delete button is clicked', () => {
    const handleDelete = jest.fn();
    const handleEditTitle = jest.fn();
    const handleStatusChange = jest.fn();

    // Render the AdCard component
    renderWithProviders(
      <AdCard
        title="Test Ad"
        status="active"
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onEditTitle={handleEditTitle}
      />
    );
    
    // Ensure that delete button is rendered and has the correct aria-label
    const deleteButton = screen.getByRole('button', { name: /حذف/i });
    
    // Click on delete button
    fireEvent.click(deleteButton);

    // Ensure that the delete confirmation dialog opens
    expect(screen.getByText(/آیا از حذف این آگهی اطمینان دارید؟/)).toBeInTheDocument();
  });

  test('clicking confirm button in delete dialog calls onDelete', () => {
    const handleDelete = jest.fn();
    const handleEditTitle = jest.fn();
    const handleStatusChange = jest.fn();

    // Render the AdCard component
    renderWithProviders(
      <AdCard
        title="Test Ad"
        status="active"
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onEditTitle={handleEditTitle}
      />
    );

    // Click delete button to open dialog
    fireEvent.click(screen.getByRole('button', { name: /حذف/i }));
    
    // Ensure that the delete dialog is open
    expect(screen.getByText(/آیا از حذف این آگهی اطمینان دارید؟/)).toBeInTheDocument();

    // Find the confirm button by its aria-label or text content
    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    
    // Click the confirm button in the DeleteAd dialog
    fireEvent.click(confirmButton);

    // Ensure the onDelete function was called
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});