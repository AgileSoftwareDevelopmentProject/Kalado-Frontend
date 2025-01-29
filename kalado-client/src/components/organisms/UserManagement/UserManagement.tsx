import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box, Typography, Card, CardContent, Select, MenuItem, Grid, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Button
} from "@mui/material";
// import { blockUser } from '../../../api/services/UserService';
import { TUserProfileResponse } from '../../../constants/apiTypes';
import { useAuth } from '../../../contexts';
import { toast } from 'react-toastify';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface UserManageMentProps {
  userDataList: TUserProfileResponse[] | null;
}

const UserManagement: React.FC<UserManageMentProps> = ({ userDataList }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const [users, setUsers] = useState<TUserProfileResponse[] | null>(userDataList);
  const { token } = useAuth();
  const [selectedUser, setSelectedUser] = useState<TUserProfileResponse | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBlockUser = async (id: number) => {
    // const response = await blockUser(id);
    // if (response.isSuccess) {
    //   toast(t("success.user_management.block_user"));
    // } else {
    //   toast(t('error.user_management.block_failed'));
    // }
    // // setSelectedUser(users.find((user) => user.id === id) || null);
    // setIsDialogOpen(true);
  };

  const confirmStatusChange = () => {
    // if (selectedUser && newStatus) {
    //   setUsers((prevUsers) =>
    //     prevUsers.map((user) =>
    //       user.id === selectedUser.id ? { ...user, status: newStatus } : user
    //     )
    //   );
    // }
    setIsDialogOpen(false);
    setSelectedUser(null);
    // setNewStatus(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        maxWidth: '100vw',
        margin: '0 auto',
        padding: 20,
        direction: isRtl ? "rtl" : "ltr",
        overflow: "auto",
      }}
    >
      {!userDataList && (
        <Box sx={{ textAlign: 'center' }}>
          <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main' }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            {t("'error.user_management.retrieve_failed'")}
          </Typography>
        </Box>
      )}


      {userDataList && userDataList.length > 0 && (
        <Box sx={{ width: "100%", maxWidth: "800px" }}>
          <Grid container spacing={3}>
            {
              userDataList.map((user) => (
                <Grid item xs={12} sm={6} key={user.id}>
                  <Card
                    sx={{
                      height: "200px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      borderRadius: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        position: "absolute",
                        top: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {t("report.user_management.user_info")}
                    </Typography>
                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          marginBottom: 2,
                        }}
                      >
                        {t("report.user_management.email")}: {user.username}
                      </Typography>
                      <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        {t("report.user_management.status")}
                      </Typography>
                      {/* Add a button to block user */}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            }
          </Grid>

          {/* Add confirmation Dialog */}
        </Box>
      )}

    </Box>
  );
};

export default UserManagement;
