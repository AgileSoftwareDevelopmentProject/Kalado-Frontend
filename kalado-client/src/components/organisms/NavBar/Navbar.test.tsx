import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Navbar from './NavBar';

describe('Navbar Component', () => {
  test('renders the logo correctly', () => {
    render(<Navbar />);
    const logo = screen.getByAltText('کالادو');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('logo');
  });

  test('renders the search bar correctly', () => {
    render(<Navbar />);
    const searchInput = screen.getByPlaceholderText('جستجوی کالا');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
  });

  test('renders the search button', () => {
    render(<Navbar />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  test('renders the "ثبت آگهی" button', () => {
    render(<Navbar />);
    const signupButton = screen.getByText('ثبت آگهی');
    expect(signupButton).toBeInTheDocument();
    expect(signupButton).toHaveClass('navbar-button signup');
  });

  test('renders the "ورود/ثبت‌نام" button', () => {
    render(<Navbar />);
    const loginButton = screen.getByText('ورود/ثبت‌نام');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveClass('navbar-button login');
  });

  test('handles typing in the search bar', async () => {
    render(<Navbar />);
    const searchInput = screen.getByPlaceholderText('جستجوی کالا');
    await userEvent.type(searchInput, 'Test Query');
    expect(searchInput).toHaveValue('Test Query');
  });

  test('handles click events on buttons', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const signupButton = screen.getByText('ثبت آگهی');
    const loginButton = screen.getByText('ورود/ثبت‌نام');

    await user.click(signupButton);
    await user.click(loginButton);

    expect(signupButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});