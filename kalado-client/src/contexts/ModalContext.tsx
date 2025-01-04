import React, { createContext, useState, useContext } from 'react';

interface ModalContextType {
    isLoginVisible: boolean;
    isSignupVisible: boolean;
    isCodeVerificationVisible: boolean;
    isCreateAdVisible: boolean;
    isReportSubmissionVisible: boolean;
    setLoginVisible: (visible: boolean) => void;
    setSignupVisible: (visible: boolean) => void;
    setCodeVerificationVisible: (visible: boolean) => void;
    setCreateAdVisible: (visible: boolean) => void;
    setReportSubmissionVisible: (visible: boolean) => void;
    handleClosePopups: () => void;
    handleOpenLogin: () => void;
    handleOpenSignup: () => void;
    handleOpenCodeVerification: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isSignupVisible, setSignupVisible] = useState(false);
    const [isCodeVerificationVisible, setCodeVerificationVisible] = useState(false);
    const [isCreateAdVisible, setCreateAdVisible] = useState(false);
    const [isReportSubmissionVisible, setReportSubmissionVisible] = useState(false);

    const handleClosePopups = () => {
        setLoginVisible(false);
        setSignupVisible(false);
        setCreateAdVisible(false);
        setCodeVerificationVisible(false);
        setReportSubmissionVisible(false)
    };

    const handleOpenLogin = () => {
        setLoginVisible(true);
        setSignupVisible(false);
    };

    const handleOpenSignup = () => {
        setLoginVisible(false);
        setSignupVisible(true);
    };

    const handleOpenCodeVerification = () => {
        handleClosePopups();
        setCodeVerificationVisible(true);
    };

    return (
        <ModalContext.Provider value={{
            isLoginVisible,
            isSignupVisible,
            isCodeVerificationVisible,
            isCreateAdVisible,
            isReportSubmissionVisible,
            setLoginVisible,
            setSignupVisible,
            setCodeVerificationVisible,
            setCreateAdVisible,
            handleClosePopups,
            handleOpenLogin,
            handleOpenSignup,
            handleOpenCodeVerification,
            setReportSubmissionVisible,
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};
