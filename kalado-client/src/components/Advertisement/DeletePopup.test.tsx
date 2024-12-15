import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeletePopup from './DeletePopup';

const mockOnConfirm = jest.fn();
const mockOnCancel = jest.fn();

test('calls onConfirm when the confirm button is clicked', () => {
  render(<DeletePopup onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
  fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

  expect(mockOnConfirm).toHaveBeenCalledTimes(1);
});

test('calls onCancel when the cancel button is clicked', () => {
  render(<DeletePopup onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
  fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

  expect(mockOnCancel).toHaveBeenCalledTimes(1);
});