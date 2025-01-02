import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UserDashboard from './UserDashboard';
import { useTranslation } from 'react-i18next';

// Mocking necessary components and hooks
jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

jest.mock('../../components/organisms', () => ({
    NavBar: ({ onCreateAdClick }) => <button onClick={onCreateAdClick}>Create Ad</button>,
    CreateAdModal: ({ open, onClose }) => (
        open ? <div role="dialog">Create Ad Modal <button onClick={onClose}>Close</button></div> : null
    ),
    SideBarMenu: ({ categories, onSelectCategory }) => (
        <div>
            {categories.map((cat, index) => (
                <button key={index} onClick={() => onSelectCategory(cat.title)}>{cat.title}</button>
            ))}
        </div>
    ),
    ProfileManagement: () => <div>Profile Management Content</div>,
    AdManagement: () => <div>Ad Management Content</div>,
    ReportHistory: () => <div>Report History Content</div>,
}));

describe('UserDashboard', () => {
    const mockSetState = jest.fn();

    beforeEach(() => {
        (useTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => key, // Mock translation function
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    test('renders correctly', () => {
        render(<UserDashboard toggleTheme={jest.fn()} isDarkMode={false} />);

        // Check if the sidebar menu items are rendered
        expect(screen.getByText("dashboard.user.menu.one")).toBeInTheDocument();
        expect(screen.getByText("dashboard.user.menu.two")).toBeInTheDocument();
        expect(screen.getByText("dashboard.user.menu.three")).toBeInTheDocument();

        // Check that Profile Management is rendered by default
        expect(screen.getByText("Profile Management Content")).toBeInTheDocument();
    });

    test('opens CreateAdModal when Create Ad button is clicked', () => {
        render(<UserDashboard toggleTheme={jest.fn()} isDarkMode={false} />);

        // Click the Create Ad button
        fireEvent.click(screen.getByText("Create Ad"));

        // Check if the modal is opened
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('closes CreateAdModal when Close button is clicked', () => {
        render(<UserDashboard toggleTheme={jest.fn()} isDarkMode={false} />);

        // Open the modal first
        fireEvent.click(screen.getByText("Create Ad"));

        // Close the modal
        fireEvent.click(screen.getByRole('button', { name: /close/i }));

        // Check if the modal is closed
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('displays correct content based on selected menu item', () => {
        render(<UserDashboard toggleTheme={jest.fn()} isDarkMode={false} />);

        // Select Ad Management menu item
        fireEvent.click(screen.getByText("dashboard.user.menu.two"));

        // Check if Ad Management content is displayed
        expect(screen.getByText("Ad Management Content")).toBeInTheDocument();

        // Select Report History menu item
        fireEvent.click(screen.getByText("dashboard.user.menu.three"));

        // Check if Report History content is displayed
        expect(screen.getByText("Report History Content")).toBeInTheDocument();

        // Ensure Profile Management content is not displayed anymore
        expect(screen.queryByText("Profile Management Content")).not.toBeInTheDocument();
    });
});
