import { sendRequest } from './axiosInstance';
import { REPORT } from './urls';
import {
    ReportData,
    ReportStatusUpdateData,
    ReportResponse,
    SingleReport,
    ReportListResponse,
    TReportResponseType,
} from '../../utils/apiTypes';
import { useAuth } from '../../contexts/AuthContext';

// export async function createReport(reportData: ReportData, images: File[]): Promise<ReportResponse> {
//     const formData = new FormData();
//     formData.append('violationType', reportData.violationType);
//     formData.append('description', reportData.description);

//     // append images to FormData
//     images.forEach((image) => {
//         formData.append('images', image);
//     });

//     try {
//         const response = await sendRequest<ReportResponse>(
//             REPORT.CREATE,
//             'POST',
//             formData,
//             undefined,
//             {
//                 'Content-Type': 'multipart/form-data', // required for file uploads
//             }
//         );
//         return response; // (isSuccess, message)
//     } catch (error) {
//         console.error('Error creating report:', error);
//         throw new Error('Error while submitting report');
//     }
// }

export async function createReportWithImages(reportData: ReportData, imageFiles: File[]) {
    console.log('**************************** createReportWithImages called');
    console.log('**************************** reportData:', reportData);
    console.log('**************************** imageFiles:', imageFiles);
    
    const { token } = useAuth();
    console.log('****************************token retrieved from useAuth:', token);
    if (!token) {
        throw new Error('user is not authenticated');
    }

    const formData = new FormData();
    console.log('**************************** formData: ',formData);
    formData.append('report', JSON.stringify(reportData));

    imageFiles.forEach((file, index) => {
        formData.append(`evidence[${index}]`, file);
    });

    console.log('**************************** formData before submission:');
    for (let i of formData.entries()) {
        console.log(i[0], i[1]);
    }

    try {
        const response = await sendRequest<TReportResponseType>(
            REPORT.CREATE,
            'POST',
            formData,
            undefined,
            {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        );
        console.log('****************************  api response:', response);
        return response;
    } catch (error) {
        console.error('****************************  error in createReportWithImages:', error);
        throw error;
    }
}


export async function updateReportStatus(reportId: number, reportStatusData: ReportStatusUpdateData) {
    const { token } = useAuth();
    return sendRequest<TReportResponseType>(
        REPORT.UPDATE_STATUS(reportId),
        'POST',
        reportStatusData,
        undefined,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    );
}

// (admin-level access)
// export async function getAllReports(): Promise<SingleReport[]> {
//     const { token } = useAuth();

//     try {
//         const response = await sendRequest<ReportListResponse>(
//             REPORT.GET_ALL_REPORTS,
//             'GET',
//             undefined,
//             undefined,
//             {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             }
//         );

//         if (!response || !response.isSuccess || !Array.isArray(response.data)) {
//             throw new Error(response.message || 'Failed to fetch all reports.');
//         }

//         return response.data; // array of SingleReport
//     } catch (error: unknown) {
//         console.error('Error fetching all reports:', error);
//         throw new Error('An unexpected error occurred while fetching all reports.');
//     }
// }

export async function getAllReports() {
    const { token } = useAuth();
    return sendRequest<TReportResponseType[]>(
        REPORT.GET_ALL_REPORTS,
        'GET',
        undefined,
        undefined,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    );
}


// fetch reports created by the logged-in user
// export async function getMyReports(): Promise<SingleReport[]> {
//     const { token } = useAuth();

//     try {
//         const response = await sendRequest<ReportListResponse>(
//             REPORT.GET_MY_REPORTS,
//             'GET',
//             undefined,
//             undefined,
//             {
//                 Authorization: `Bearer ${token}`,
//             }
//         );

//         if (!response || !response.isSuccess || !Array.isArray(response.data)) {
//             throw new Error(response.message || 'Failed to fetch your reports.');
//         }

//         return response.data; // array of SingleReport
//     } catch (error: unknown) {
//         console.error('Error fetching my reports:', error);
//         throw new Error('An unexpected error occurred while fetching your reports.');
//     }
// }
export async function getMyReports() {
    const { token } = useAuth();
    return sendRequest<TReportResponseType[]>(
        REPORT.GET_MY_REPORTS,
        'GET',
        undefined,
        undefined,
        {
            Authorization: `Bearer ${token}`,
        }
    );
}


// fetch report statistics for a date range
export async function getReportStatistics(startDate: string, endData: string) {
    const { token } = useAuth();
    return sendRequest<TReportResponseType[]>(
        REPORT.GET_REPORT_STATISTICS(startDate, endData),
        'GET',
        undefined,
        undefined,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    );
}