import { sendRequest } from './axiosInstance';
import { REPORT } from './urls';
import {
    ReportData,
    ReportStatusUpdateData,
    ReportResponse,
    SingleReport,
    ReportListResponse,
} from '../../utils/apiTypes';
import { useAuth } from '../../contexts/AuthContext';

export async function createReport(reportData: ReportData, images: File[]): Promise<ReportResponse> {
    const formData = new FormData();
    formData.append('violationType', reportData.violationType);
    formData.append('description', reportData.description);

    // append images to FormData
    images.forEach((image) => {
        formData.append('images', image);
    });

    try {
        const response = await sendRequest<ReportResponse>(
            REPORT.CREATE,
            'POST',
            formData,
            undefined,
            {
                'Content-Type': 'multipart/form-data', // required for file uploads
            }
        );
        return response; // (isSuccess, message)
    } catch (error) {
        console.error('Error creating report:', error);
        throw new Error('Error while submitting report');
    }
}

export async function updateReportStatus(reportId: number, reportStatusData: ReportStatusUpdateData): Promise<void> {
    const { token } = useAuth();
    try {
        await sendRequest(
            REPORT.UPDATE_STATUS(reportId),
            'POST',
            reportStatusData,
            undefined,
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Bearer token for authorization
            }
        );
    } catch (error) {
        console.error('Error updating report status:', error);
        throw new Error('Error while updating report status');
    }
}

// (admin-level access)
export async function getAllReports(): Promise<SingleReport[]> {
    const { token } = useAuth();

    try {
        const response = await sendRequest<ReportListResponse>(
            REPORT.GET_ALL_REPORTS,
            'GET',
            undefined,
            undefined,
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response || !response.isSuccess || !Array.isArray(response.data)) {
            throw new Error(response.message || 'Failed to fetch all reports.');
        }

        return response.data; // array of SingleReport
    } catch (error: unknown) {
        console.error('Error fetching all reports:', error);
        throw new Error('An unexpected error occurred while fetching all reports.');
    }
}

// fetch reports created by the logged-in user
export async function getMyReports(): Promise<SingleReport[]> {
    const { token } = useAuth();

    try {
        const response = await sendRequest<ReportListResponse>(
            REPORT.GET_MY_REPORTS,
            'GET',
            undefined,
            undefined,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response || !response.isSuccess || !Array.isArray(response.data)) {
            throw new Error(response.message || 'Failed to fetch your reports.');
        }

        return response.data; // array of SingleReport
    } catch (error: unknown) {
        console.error('Error fetching my reports:', error);
        throw new Error('An unexpected error occurred while fetching your reports.');
    }
}

// fetch report statistics for a date range
export async function getReportStatistics(startDate: string, endDate: string): Promise<any> {
    const { token } = useAuth();
    try {
        const response = await sendRequest<{
            isSuccess: boolean;
            data: any;
            status: number;
            message?: string;
        }>(
            REPORT.GET_REPORT_STATISTICS(startDate, endDate),
            'GET',
            undefined,
            undefined,
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response.isSuccess || !response.data) {
            throw new Error(response.message || 'Failed to fetch report statistics.');
        }

        return response.data; // statistics data
    } catch (error) {
        console.error('Error fetching report statistics:', error);
        throw new Error('Error while fetching report statistics');
    }
}
