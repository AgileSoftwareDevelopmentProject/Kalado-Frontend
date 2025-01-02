import React from 'react';
import { Backdrop } from '../../../components/atoms';
import ReportSubmissionForm from './ReportSubmissionForm';

interface ReportSubmissionModalProps {
    open: boolean;
    onClose: () => void;
}

const ReportSubmissionModal: React.FC<ReportSubmissionModalProps> = ({ open, onClose }) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            onClose();
        }
    };

    return (
        <Backdrop open={open} onClick={handleBackdropClick}>
            <ReportSubmissionForm onClose={onClose} />
        </Backdrop>
    );
};

export default ReportSubmissionModal;
