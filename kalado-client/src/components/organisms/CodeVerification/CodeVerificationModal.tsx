import React from 'react';
import { Backdrop } from '../../../components/atoms';
import CodeVerification from './CodeVerification';

interface CodeVerificationModalProps {
    open: boolean;
    email: string;
    onClose: () => void;
}

const CodeVerificationModal: React.FC<CodeVerificationModalProps> = ({ open, email, onClose }) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            onClose();
        }
    };

    return (
        <Backdrop open={open} onClick={handleBackdropClick}>
            <CodeVerification email={email} onClose={onClose} />
        </Backdrop>
    );
};

export default CodeVerificationModal;
