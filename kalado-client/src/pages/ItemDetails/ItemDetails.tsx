import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CardMedia, CardContent, Card } from '@mui/material';
import { CustomButton, Backdrop } from '../../components/atoms';
import { ReportSubmissionForm } from '../../components/organisms';
import mockData from '../../mockData.json';
import defaultImage from '../../assets/images/default-image-url.jpg';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    description: string;
    itemId: string;
}

const items: Item[] = mockData.Items;

const ItemDetails: React.FC = () => {
    const [isReportSubmissionVisible, setReportSubmissionVisible] = useState(false);

    const handleOpenReportSubmission = () => setReportSubmissionVisible(true);

    const handleCloseReportSubmission = () => setReportSubmissionVisible(false);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            handleCloseReportSubmission
        }
    };


    const { itemId } = useParams<{ itemId: string }>();

    const item = items.find((item) => item.itemId === itemId);

    if (!item) {
        return <Typography variant="h6">Item not found</Typography>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: '#272C48',
                p: 2
            }}
        >
            <Card sx={{ width: 500, height: 'auto', bgcolor: "white" }}>
                <CardMedia
                    component="img"
                    image={defaultImage}
                    alt={item.title}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        قیمت: {item.price.toLocaleString()} تومان
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        شهر: {item.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        تاریخ ثبت: {item.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        توضیحات: {item.description}
                    </Typography>
                </CardContent>
                <CustomButton
                    text="ثبت تخلف"
                    onClick={handleOpenReportSubmission}
                />
            </Card>
            {isReportSubmissionVisible && (
                <Backdrop open={isReportSubmissionVisible} onClick={handleBackdropClick}>
                    <ReportSubmissionForm onClose={handleCloseReportSubmission} />
                </Backdrop>
            )}
        </Box>
    );
};

export default ItemDetails;
