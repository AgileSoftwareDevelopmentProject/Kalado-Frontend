import React from 'react';
import './Backdrop.css';

interface BackdropProps {
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    children?: React.ReactNode;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick, children }) => {
    return (
        <div className="backdrop" onClick={onClick}>
            {children}
        </div>
    );
};

export default Backdrop;
