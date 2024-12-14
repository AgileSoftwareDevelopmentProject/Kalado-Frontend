// Backdrop.tsx
import React from 'react';
import './Backdrop.css';

interface BackdropProps {
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void; // Accept MouseEvent
    children?: React.ReactNode;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick, children }) => {
    return (
        <div className="backdrop" onClick={onClick}>
            {children} {/* Render children (like LoginForm) here */}
        </div>
    );
};

export default Backdrop;
