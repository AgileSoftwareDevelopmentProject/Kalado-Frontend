import React from 'react';
import LoginForm from './Login/LoginForm';
import ForgetPasswordForm from './Login/ForgetPasswordForm';
import ResetPasswordForm from './Login/ForgetPasswordForm';
import SignupForm from './Register/SignupForm';
import CodeVerificationForm from './Register/CodeVerificationForm';
import CreateAdForm from './CreateAd/CreateAdForm';


const FormGroup: React.FC = () => {
    return (
        <>
            <LoginForm />
            <ForgetPasswordForm />
            <ResetPasswordForm />
            <SignupForm />
            <CodeVerificationForm />
            <CreateAdForm />
        </>
    );
};

export default FormGroup;
