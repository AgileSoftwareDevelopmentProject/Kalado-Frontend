import { FaHome, FaCar, FaLaptop, FaGamepad, FaSuitcase, FaUtensils, FaUser, FaAd, FaHistory } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const OptionsComponent = () => {
    const { t } = useTranslation();

    const product_categories = [
        { title: t("category.one"), icon: <FaHome /> },
        { title: t("category.two"), icon: <FaCar /> },
        { title: t("category.three"), icon: <FaUtensils /> },
        { title: t("category.four"), icon: <FaLaptop /> },
        { title: t("category.five"), icon: <FaGamepad /> },
        { title: t("category.six"), icon: <FaSuitcase /> },
    ];

    const user_dashboard_menu = [
        { title: t("dashboard.user.menu.one"), icon: <FaUser /> },
        { title: t("dashboard.user.menu.two"), icon: <FaAd /> },
    ];

    const admin_dashboard_menu = [
        { title: t("dashboard.admin.menu.one"), icon: <FaUser /> },
        { title: t("dashboard.admin.menu.two"), icon: <FaAd /> },
        { title: t("dashboard.admin.menu.three"), icon: <FaHistory /> },
    ];

    return { product_categories, user_dashboard_menu, admin_dashboard_menu };
};
