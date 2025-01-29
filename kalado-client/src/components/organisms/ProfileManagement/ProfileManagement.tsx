import React, { useState, useRef } from 'react';
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
    const [modifiedUserData, setModifiedUserData] = useState<TUserProfileResponse | null>(userData);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newPassword, setNewPassword] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setModifiedUserData(prevData => ({
            ...prevData!,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setModifiedUserData(prevData => ({
                ...prevData!,
                profileImage: file
            }));
        }
    };

    const handleSaveChanges = async () => {
        if (!modifiedUserData) return;

        const dataToSend: ProfileData = {
            firstName: modifiedUserData.firstName,
            lastName: modifiedUserData.lastName,
            address: modifiedUserData.address,
            profileImageUrl: modifiedUserData.profileImageUrl,
            newPassword: newPassword
        };

        console.log('Update Profile API call', dataToSend);
        const response = await modifyProfile(dataToSend);
        console.log(response);

        if (response.isSuccess) {
            toast(t('success.profile_management'));
        } else {
            toast(t('error.profile_management.save_failed'));
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '90px auto', padding: 3 }}>

            {!modifiedUserData ? (
                <Typography color="error" align="center">
                    {t('error.profile_management.save_failed')}
                </Typography>
            ) : (
                <>
                    <Box sx={{ position: 'relative', width: 100, height: 100, margin: '20px auto' }}>
                        <Avatar
                            src={modifiedUserData.profileImageUrl || defaultImage}
                            sx={{ width: 100, height: 100 }}
                        />
                        <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                            }}
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
                        value={modifiedUserData.username}
                        onChange={handleInputChange}
                        disabled={true}
                    />
                    <NameInput
                        name="firstName"
                        value={modifiedUserData.firstName || ''}
                        onChange={handleInputChange}
                    />
                    <NameInput
                        name="lastName"
                        placeholder={t('dashboard.user.profile_management.last_name')}
                        value={modifiedUserData.lastName || ''}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        value={newPassword}
                        placeholder={t('dashboard.user.profile_management.enter_new_password')}
                        onChange={(e) => setNewPassword(e.target.value)}
                        isValidatorActive={true}
                    />
                    <PhoneNumberInput
                        value={modifiedUserData.phoneNumber || ''}
                        onChange={handleInputChange}
                        disabled={true}
                    />
                    <NameInput
                        name="address"
                        placeholder={t('dashboard.user.profile_management.address')}
                        value={modifiedUserData.address || ''}
                        onChange={handleInputChange}
                    />
                    <CustomButton
                        text={t('dashboard.user.profile_management.save_changes_btn')}
                        onClick={handleSaveChanges}
                        type="submit"
                    />
                </>
            )}
        </Box>
    );
};

export default ProfileManagement;
