import React, { useState } from 'react';
import './ImageUpload.css';

const ImageUpload: React.FC = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            // Convert FileList to an array and limit to 3 images
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

    return (
        <div className="image-upload-container">
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="image-input"
            />
            <div className="image-previews">
                {imagePreviews.map((preview, index) => (
                    <div key={index} className="image-preview">
                        <img src={preview} alt={`Preview ${index + 1}`} />
                        <button onClick={() => handleRemoveImage(index)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUpload;
