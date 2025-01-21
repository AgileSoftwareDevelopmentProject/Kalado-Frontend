import React from 'react';
import LoginForm from './Login/LoginForm';
import ForgetPasswordForm from './Login/ForgetPasswordForm';
import SignupForm from './Register/SignupForm';
import CodeVerificationForm from './Register/CodeVerificationForm';
import CreateAdForm from './CreateAd/CreateAdForm';
import ReportSubmissionForm from './Report/ReportSubmissionForm';


const FormGroup: React.FC = () => {
    return (
        <>
            <LoginForm />
            <ForgetPasswordForm />
            <SignupForm />
            <CodeVerificationForm />
            <CreateAdForm />
            <ReportSubmissionForm />
        </>
    );
};

export default FormGroup;
