import React from 'react';
import { Backdrop } from '../../../components/atoms';
import CodeVerificationForm from './CodeVerificationForm';

interface CodeVerificationModalProps {
    open: boolean;
    onClose: () => void;
}

const CodeVerificationModal: React.FC<CodeVerificationModalProps> = ({ open, onClose }) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            onClose();
        }
    };

    return (
        <Backdrop open={open} onClick={handleBackdropClick}>
            <CodeVerificationForm onClose={onClose} />
        </Backdrop>
    );
};

export default CodeVerificationModal;
