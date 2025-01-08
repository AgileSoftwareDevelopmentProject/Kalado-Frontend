import { FaHome, FaCar, FaLaptop, FaGamepad, FaSuitcase, FaEllipsisH, FaUtensils, FaUser, FaAd, FaHistory } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const OptionsComponent = () => {
    const { t } = useTranslation();

    const product_categories = [
        { value: 'Real estate', title: t("category.one"), icon: <FaHome /> },
        { value: 'Transportation', title: t("category.two"), icon: <FaCar /> },
        { value: 'House and Kitchen', title: t("category.three"), icon: <FaUtensils /> },
        { value: 'Digital Stuff', title: t("category.four"), icon: <FaLaptop /> },
        { value: 'Entertainment', title: t("category.five"), icon: <FaGamepad /> },
        { value: 'Personal Stuff', title: t("category.six"), icon: <FaSuitcase /> },
        { value: 'Others', title: t("category.seven"), icon: <FaEllipsisH /> },
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

    const report_options = [
        { value: 'Abuse', label: t("report.category.one") },
        { value: 'Inproper Content', label: t("report.category.two") },
        { value: 'Inproper Price', label: t("report.category.three") },
    ];

    const search_options = [
        t("search.option1"),
        t("search.option2"),
        t("search.option3"),
        t("search.option4"),
        t("search.option5"),
        t("search.option6"),
        t("search.option7"),
        t("search.option8"),
        t("search.option9"),
        t("search.option10"),
    ];

    const date_filter_options = [
        { title: t('filter.one_day'), value: 'oneDay' },
        { title: t('filter.one_week'), value: 'oneWeek' },
        { title: t('filter.one_month'), value: 'oneMonth' },
    ];

    return { product_categories, user_dashboard_menu, admin_dashboard_menu, report_options, search_options, date_filter_options };
};
