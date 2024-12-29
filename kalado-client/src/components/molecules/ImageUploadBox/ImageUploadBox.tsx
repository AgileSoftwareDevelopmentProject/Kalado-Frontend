import React from 'react';
import Box from '@mui/material/Box';
import { ImageUpload } from '../../atoms';

interface ImageUploadBoxProps {
    onUpload: (files: File[]) => void;
    title: string;
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({ onUpload, title }) => {
    return (
        <Box>
            <p style={{ textAlign: 'right', marginBottom: '8px' }}>{title}</p>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ImageUpload onUpload={onUpload} />
                <ImageUpload onUpload={onUpload} />
                <ImageUpload onUpload={onUpload} />
            </Box>
        </Box>
    );
};

export default ImageUploadBox;
