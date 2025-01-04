import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import { useTranslation } from 'react-i18next';

// Mocking the necessary components and hooks
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
    UserManagement: () => <div>User Management Content</div>,
    ReportHistory: () => <div>Report History Content</div>,
}));

describe('AdminDashboard', () => {
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
        render(<AdminDashboard toggleTheme={jest.fn()} isDarkMode={false} />);

        // Check if the sidebar menu items are rendered
        expect(screen.getByText("dashboard.admin.menu.one")).toBeInTheDocument();
        expect(screen.getByText("dashboard.admin.menu.two")).toBeInTheDocument();
        expect(screen.getByText("dashboard.admin.menu.three")).toBeInTheDocument();

        // Check that Profile Management is rendered by default
        expect(screen.getByText("Profile Management Content")).toBeInTheDocument();
    });

    test('opens CreateAdModal when Create Ad button is clicked', () => {
        render(<AdminDashboard toggleTheme={jest.fn()} isDarkMode={false} />);

        // Click the Create Ad button
        fireEvent.click(screen.getByText("Create Ad"));

        // Check if the modal is opened
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('closes CreateAdModal when Close button is clicked', () => {
        render(<AdminDashboard toggleTheme={jest.fn()} isDarkMode={false} />);

        // Open the modal first
        fireEvent.click(screen.getByText("Create Ad"));

        // Close the modal
        fireEvent.click(screen.getByRole('button', { name: /close/i }));

        // Check if the modal is closed
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('displays correct content based on selected menu item', () => {
        render(<AdminDashboard toggleTheme={jest.fn()} isDarkMode={false} />);

        // Select User Management menu item
        fireEvent.click(screen.getByText("dashboard.admin.menu.two"));

        // Check if User Management content is displayed
        expect(screen.getByText("User Management Content")).toBeInTheDocument();

        // Select Report History menu item
        fireEvent.click(screen.getByText("dashboard.admin.menu.three"));

        // Check if Report History content is displayed
        expect(screen.getByText("Report History Content")).toBeInTheDocument();

        // Ensure Profile Management content is not displayed anymore
        expect(screen.queryByText("Profile Management Content")).not.toBeInTheDocument();
    });
});
