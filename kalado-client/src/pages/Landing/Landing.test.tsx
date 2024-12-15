import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Landing from './Landing';

jest.mock('../../components/Navbar/Navbar', () => ({ onLoginClick }: any) => (
  <button onClick={onLoginClick} data-testid="navbar-login-button">Login</button>
));
jest.mock('../../components/Category/Category', () => () => <div data-testid="category-sidebar">Category Sidebar</div>);
jest.mock('../../components/Filter/Filter', () => () => <div data-testid="filter">Filter</div>);
jest.mock('../../components/Advertisement/ItemCard', () => ({ title }: any) => (
  <div data-testid="item-card">{title}</div>
));
jest.mock('../../components/Login/LoginForm', () => ({ onClose, onOpenSignup }: any) => (
  <div role="dialog" aria-labelledby="login-dialog">
    <h2 id="login-dialog">Login</h2>
    <button onClick={onClose} aria-label="close login">Close</button>
    <button onClick={onOpenSignup} aria-label="open signup">Sign Up</button>
  </div>
));
jest.mock('../../components/Signup/SignupForm', () => ({ onClose, onOpenLogin }: any) => (
  <div role="dialog" aria-labelledby="signup-dialog">
    <h2 id="signup-dialog">Sign Up</h2>
    <button onClick={onClose} aria-label="close signup">Close</button>
    <button onClick={onOpenLogin} aria-label="open login">Log In</button>
  </div>
));

describe('Landing Component', () => {
  test('renders all main components', () => {
    render(<Landing />);

    expect(screen.getByTestId('navbar-login-button')).toBeInTheDocument();
    expect(screen.getByTestId('category-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByText('Category Sidebar')).toBeInTheDocument();
  });

  test('opens and closes the login modal', () => {
    render(<Landing />);

    // Open Login Modal
    const loginButton = screen.getByTestId('navbar-login-button');
    fireEvent.click(loginButton);
    expect(screen.getByRole('dialog', { name: /Login/i })).toBeInTheDocument();

    // Close Login Modal
    const closeLoginButton = screen.getByLabelText('close login');
    fireEvent.click(closeLoginButton);
    expect(screen.queryByRole('dialog', { name: /Login/i })).not.toBeInTheDocument();
  });

  test('switches from login modal to signup modal', () => {
    render(<Landing />);

    // Open Login Modal
    const loginButton = screen.getByTestId('navbar-login-button');
    fireEvent.click(loginButton);

    // Switch to Signup Modal
    const openSignupButton = screen.getByLabelText('open signup');
    fireEvent.click(openSignupButton);
    expect(screen.getByRole('dialog', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.queryByRole('dialog', { name: /Login/i })).not.toBeInTheDocument();
  });

  test('renders item cards when items are provided', () => {
    const mockItems = [
      { title: 'Test Item 1', imageUrl: '/test1.jpg', price: 100, city: 'City 1', date: '2024-12-14', itemId: '1' },
      { title: 'Test Item 2', imageUrl: '/test2.jpg', price: 200, city: 'City 2', date: '2024-12-13', itemId: '2' },
    ];

    render(
      <Landing />
    );

    // Mock the items directly in the component if needed.
    mockItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });

    const itemCards = screen.getAllByTestId('item-card');
    expect(itemCards).toHaveLength(mockItems.length);
  });
});
