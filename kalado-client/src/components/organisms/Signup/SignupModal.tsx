import React from 'react';
import { Backdrop } from '../../../components/atoms';
import SignupForm from './SignupForm';

interface SignupModalProps {
    open: boolean;
    onClose: () => void;
    onOpenLogin: () => void;
    onSignUpSuccess: (email: string) => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ open, onClose, onOpenLogin, onSignUpSuccess }) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            onClose();
        }
    };

    return (
        <Backdrop open={open} onClick={handleBackdropClick}>
            <SignupForm
                onClose={onClose}
                onOpenLogin={onOpenLogin}
                onSignUpSuccess={onSignUpSuccess}
            />
        </Backdrop>
    );
};

export default SignupModal;
