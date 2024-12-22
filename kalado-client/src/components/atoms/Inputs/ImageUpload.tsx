import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton } from '@mui/material';
import { FaTrash } from 'react-icons/fa';

const ImageUpload: React.FC = () => {
    const { t } = useTranslation();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages: File[] = [];
            const newPreviews: string[] = [];
            let errorFound = false;

            Array.from(files).forEach((file) => {
                if (file.size <= 1 * 1024 * 1024) {
                    newImages.push(file);
                    newPreviews.push(URL.createObjectURL(file));
                } else {
                    errorFound = true;
                }
            });

            if (errorFound) {
                setErrorMessage(t("error.input.invalid_image.max_size"));
            } else {
                setErrorMessage(null);
            }

            setSelectedImages(newImages);
            setImagePreviews(newPreviews);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        setSelectedImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };

    const handleBrowseClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Box className="image-upload-container" sx={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <Box
                className="image-preview-square"
                onClick={handleBrowseClick}
                sx={{
                    width: 100,
                    height: 100,
                    border: '2px dashed white',
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    margin: 0,
                    padding: 0,
                }}
            >
                {imagePreviews.length === 0 ? (
                    <Button variant="outlined" sx={{ color: 'white' }}>{t("create_ad.input.add_image")}</Button>
                ) : (
                    imagePreviews.map((preview, index) => (
                        <Box key={index} className="image-preview" sx={{ position: 'relative', width: '100%', height: '100%' }}>
                            <img src={preview} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <IconButton
                                onClick={() => handleRemoveImage(index)}
                                sx={{
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        color: '#D74101',
                                    },
                                }}
                            >
                                <FaTrash />
                            </IconButton>
                        </Box>
                    ))
                )}
            </Box>
            {errorMessage && (
                <Box sx={{ mt: 1, color: 'red', textAlign: 'right' }}>
                    {errorMessage}
                </Box>
            )}
        </Box>
    );
};

export default ImageUpload;
