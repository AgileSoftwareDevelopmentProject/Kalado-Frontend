import React from 'react';
import { Backdrop } from '../../atoms';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
    return (
        <Backdrop open={open} onClose={onClose}>
            {children}
        </Backdrop>
    );
};

export default Modal;
