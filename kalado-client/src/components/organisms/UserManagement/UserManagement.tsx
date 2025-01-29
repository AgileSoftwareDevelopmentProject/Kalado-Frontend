import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { ConfirmationDialog } from '../../../components/molecules';
import { changeUserToAdmin } from '../../../api/services/AuthService';
import { TUserProfileResponse } from '../../../constants/apiTypes';
import { toast } from 'react-toastify';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CustomButton } from "../../atoms";

interface UserManageMentProps {
  userDataList: TUserProfileResponse[] | null;
}

const UserManagement: React.FC<UserManageMentProps> = ({ userDataList }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const [users, setUsers] = useState<TUserProfileResponse[] | null>(userDataList);
  const [selectedUser, setSelectedUser] = useState<TUserProfileResponse | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBecomeAdmin = async (id: number) => {
    const response = await changeUserToAdmin(id);
    if (response.isSuccess) {
      toast(t("success.user_management.block_user"));
    } else {
      toast(t('error.user_management.block_failed'));
    }
    // setIsDialogOpen(true);
  };

  const confirmUserStatusChange = () => {
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
      {(!userDataList || userDataList.length == 0) && (
        <Box sx={{ textAlign: 'center' }}>
          <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main' }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            {t("'error.user_management.retrieve_failed'")}
          </Typography>
        </Box>
      )}


      {userDataList && (
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
                        {t("report.user_management.status")}:
                        {user.blocked ? t("report.user_management.blocked") : t("report.user_management.allowed")}
                      </Typography>

                      <CustomButton
                        onClick={() => handleBecomeAdmin(user.id)}
                        text={t("report.user_management.become_admin")}
                      />
                    </CardContent>
                  </Card>
                  <ConfirmationDialog
                    isDialogOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onCheck={confirmUserStatusChange}
                    title={t("report.user_management.confirmation_title")}
                    message={t("report.user_management.confirmation_message")}
                  />
                </Grid>
              ))
            }
          </Grid>
        </Box>
      )}

    </Box>
  );
};

export default UserManagement;
