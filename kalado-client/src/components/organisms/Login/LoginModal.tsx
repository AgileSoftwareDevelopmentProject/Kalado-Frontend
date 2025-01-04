import React from 'react';
import { Backdrop } from '../../../components/atoms';
import LoginForm from './LoginForm';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onOpenSignup: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onOpenSignup }) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            onClose();
        }
    };

    return (
        <Backdrop open={open} onClick={handleBackdropClick}>
            <LoginForm
                onClose={onClose}
                onOpenSignup={onOpenSignup}
            />
        </Backdrop>
    );
};

export default LoginModal;
