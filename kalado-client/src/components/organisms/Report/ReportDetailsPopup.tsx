import React from 'react';
import { PopupBox } from '../../molecules';
import ReportDetails from './ReportDetails';
import { useModalContext } from '../../../contexts';
import { TReportResponseType } from '../../../constants/apiTypes';

interface ReportDetailsPopup {
    selectedReport: TReportResponseType;
}

const ReportDetailsPopup: React.FC<ReportDetailsPopup> = ({ selectedReport }) => {
    const { isProductDetailsOpen, handleClosePopups } = useModalContext();

    return (
        <PopupBox open={isProductDetailsOpen} onClose={handleClosePopups} isLogoNeeded={false} maxContent={true}>
            <ReportDetails
                report={selectedReport}
            />
        </PopupBox>
    );
};

export default ReportDetailsPopup;
