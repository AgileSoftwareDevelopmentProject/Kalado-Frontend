import React, { useState, useRef } from 'react';
import './ImageUpload.css';
import { FaTrash } from 'react-icons/fa';

const ImageUpload: React.FC = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).slice(0, 3);
            setSelectedImages(newImages);
            setImagePreviews(newImages.map(image => URL.createObjectURL(image)));
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
        <div className="image-upload-container">
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="image-input"
                ref={fileInputRef}
            />
            <div className="image-preview-square" onClick={handleBrowseClick}>
                {imagePreviews.length === 0 ? (
                    <label className="upload-label">افزودن عکس</label>
                ) : (
                    imagePreviews.map((preview, index) => (
                        <div key={index} className="image-preview">
                            <img src={preview} alt={`Preview ${index + 1}`} />
                            <button onClick={() => handleRemoveImage(index)} className="remove-button">
                                <FaTrash />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
