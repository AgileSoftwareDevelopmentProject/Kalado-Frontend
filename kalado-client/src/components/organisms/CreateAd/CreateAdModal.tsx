import React from 'react';
import { Backdrop } from '../../../components/atoms';
import CreateAdForm from './CreateAdForm';

interface CreateAdModalProps {
    open: boolean;
    onClose: () => void;
}

const CreateAdModal: React.FC<CreateAdModalProps> = ({ open, onClose }) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            onClose();
        }
    };

    return (
        <Backdrop open={open} onClick={handleBackdropClick}>
            <CreateAdForm onClose={onClose} />
        </Backdrop>
    );
};

export default CreateAdModal;
