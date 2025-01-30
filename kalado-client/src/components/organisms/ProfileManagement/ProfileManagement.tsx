import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Avatar, IconButton, Typography } from '@mui/material';
import { CustomButton, NameInput, PhoneNumberInput, PasswordInput, EmailInput } from '../../atoms';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import defaultImage from '../../../assets/images/no-image.png';
import { modifyProfile } from '../../../api/services/UserService';
import { TUserProfileResponse, ProfileData } from '../../../constants/apiTypes';

interface ProfileManagementProps {
    userData: TUserProfileResponse | null;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ userData }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<ProfileData>({
        id: 0,
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState<string>(defaultImage);

    useEffect(() => {
        if (userData) {
            setFormData({
                id: userData.id,
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                address: userData.address || '',
                phoneNumber: userData.phoneNumber || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setProfileImageUrl(userData.profileImageUrl || defaultImage);
        }
    }, [userData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImageFile(file);
            setProfileImageUrl(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = async () => {
        if (formData.newPassword || formData.confirmPassword) {
            if (!formData.currentPassword) {
                toast.error(t('error.profile_management.required_current_password'));
                return;
            }
            if (formData.newPassword !== formData.confirmPassword) {
                toast.error(t('error.profile_management.password_mismatch'));
                return;
            }
            if (!formData.confirmPassword) {
                toast.error(t('error.profile_management.confirm_password_required'));
                return;
            }
            const response = await modifyProfile(formData, profileImageFile);
            if (response.isSuccess) {
                toast.success(t('success.profile_management'));
            } else {
                toast.error(t('error.profile_management.save_failed'));
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '90px auto', padding: 3 }}>
            <Box sx={{ position: 'relative', width: 100, height: 100, margin: '20px auto' }}>
                <Avatar src={profileImageUrl} sx={{ width: 100, height: 100 }} />
                <IconButton
                    sx={{ position: 'absolute', bottom: 0, right: 0 }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <EditIcon />
                </IconButton>
                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                />
            </Box>
            <EmailInput
                    value={userData?.username || ''}
                    disabled={true}
            />

            <NameInput 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleInputChange}
            />

            <NameInput
                    name="lastName"
                    placeholder={t('dashboard.user.profile_management.last_name')}
                    value={formData.lastName}
                    onChange={handleInputChange}
            />

            <PhoneNumberInput
                        value={formData.phoneNumber}
                        disabled={true}
                        isValidatorActive={false}
            />

            <NameInput 
                    name="address" 
                    placeholder={t('dashboard.user.profile_management.address')}
                    value={formData.address}
                    onChange={handleInputChange}
            />

            <PasswordInput
                        name="currentPassword"
                        value={formData.currentPassword}
                        placeholder={t('dashboard.user.profile_management.current_password')}
                        onChange={handleInputChange}
                        isValidatorActive={true}
            />

            <PasswordInput
                        name="newPassword"
                        placeholder={t('dashboard.user.profile_management.new_password')}
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        isValidatorActive={true}
            />
            
            <PasswordInput
                        name="confirmPassword"
                        placeholder={t('dashboard.user.profile_management.repeat_new_password')}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        isValidatorActive={true}
            />

            <CustomButton text={t('dashboard.user.profile_management.save_changes_btn')} onClick={handleSaveChanges} type="submit" />
        </Box>
    );
};

export default ProfileManagement;
