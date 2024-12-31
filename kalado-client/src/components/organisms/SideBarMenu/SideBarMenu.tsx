import React from 'react';
import { IconList } from '../../molecules';


interface SideBarMenu {
    title: string;
    icon: React.ReactNode;
}

interface SideBarMenuProps {
    categories: SideBarMenu[];
    onSelectCategory: (categoryTitle: string) => void;
    title?: string;
}

const SideBarMenu: React.FC<SideBarMenuProps> = ({ categories, onSelectCategory, title }) => {
    return (
        <IconList items={categories} onSelect={onSelectCategory} title={title} />
    );
};

export default SideBarMenu;
