import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Avatar, CircularProgress, IconButton } from '@mui/material';
import { CustomButton, NameInput, EmailInput, PhoneNumberInput, PasswordInput, FormError } from '../../atoms';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';
import defaultImage from '../../../assets/images/no-image.png';
import { getProfile, modifyProfile } from '../../../api/services/UserService';


interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    profileImage: File | null;
}

const ProfileManagement = () => {
    const { t } = useTranslation();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { token } = useAuth();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            // GetUserByToken API call
            console.log("GetUserByToken API call");
            console.log(token);
            const response = await getProfile(token);
            console.log(response);
            setUserData(response);
        } catch (err) {
            setError(t("error.profile_management.retrive_failed"));
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData!,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setUserData(prevData => ({
                ...prevData!,
                profileImage: file
            }));
        }
    };

    const handleSaveChanges = async () => {
        if (!userData) return;

        const formData = new FormData();
        formData.append('firstName', userData.firstName);
        formData.append('lastName', userData.lastName);
        formData.append('phoneNumber', userData.phoneNumber);
        formData.append('password', userData.password);
        formData.append('address', userData.address);

        if (userData.profileImage) {
            formData.append('profileImage', userData.profileImage);
        }

        // Update Profile API call
        console.log("Update Profile API call");
        console.log(formData);
        const response = await modifyProfile(formData);
        console.log(response);
        if (response.isSuccess) {
            toast(t('success.profile_management'));
        } else {
            toast(t("error.profile_management.save_failed"));
        }
    };


    return (
        <Box sx={{ maxWidth: 600, margin: '90px auto', padding: 3 }}>
            {
                (loading) && (<CircularProgress />)
            }

            {error && (
                <FormError message={error} />
            )}

            {userData && (
                <>
                    <Box sx={{ position: 'relative', width: 100, height: 100, margin: '20px auto' }}>
                        <Avatar
                            src={userData.profileImage ? URL.createObjectURL(userData.profileImage) : defaultImage}
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
                    <NameInput
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                    />
                    <NameInput
                        name="lastName"
                        placeholder={t('dashboard.user.profile_management.last_name')}
                        value={userData.lastName}
                        onChange={handleInputChange}
                    />
                    <EmailInput
                        value={userData.email}
                        onChange={handleInputChange}
                        disabled
                    />
                    <PhoneNumberInput
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        name="password"
                        value={userData.password}
                        placeholder={t('dashboard.user.profile_management.password')}
                        onChange={handleInputChange}
                    />
                    <NameInput
                        name="address"
                        placeholder={t('dashboard.user.profile_management.address')}
                        value={userData.address}
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
