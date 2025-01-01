import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Avatar, Typography, CircularProgress, IconButton } from '@mui/material';
import { CustomButton, NameInput, EmailInput, PhoneNumberInput, PasswordInput } from '../../atoms';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

interface UserData {
    profileImage: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    residentialLocation: string;
}

const ProfileManagement = () => {
    const { t } = useTranslation();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/user-profile');
            response.data = {
                profileImage: "string",
                firstName: "string",
                lastName: "string",
                email: "foroz.iraji@gmail.com",
                phoneNumber: "09122890678",
                residentialLocation: "string",
                password: "Kalado1403@"
            }
            setUserData(response.data);
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError('Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData!,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserData(prevData => ({
                    ...prevData!,
                    profileImage: e.target?.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            await axios.put('/api/user-profile', userData);
            alert(t('profile.saveSuccess'));
        } catch (err) {
            console.error('Error saving user data:', err);
            setError('Failed to save changes');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 600, margin: '90px auto', padding: 3 }}>
            {userData && (
                <>
                    <Box sx={{ position: 'relative', width: 100, height: 100, margin: '20px auto' }}>
                        <Avatar
                            src={userData.profileImage}
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
                        placeholder={t('dashboard.user.profile_management.new_password')}
                        onChange={handleInputChange}
                    />
                    <NameInput
                        name="residentialLocation"
                        placeholder={t('dashboard.user.profile_management.location')}
                        value={userData.residentialLocation}
                        onChange={handleInputChange}
                    />
                    <CustomButton
                        text={t('dashboard.user.profile_management.save_changes_btn')}
                        onClick={handleSaveChanges}
                        type="submit"
                        padding="10px 40px"
                    />
                </>
            )}
        </Box>
    );
};

export default ProfileManagement;
