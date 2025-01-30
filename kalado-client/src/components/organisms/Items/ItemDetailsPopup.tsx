import React from 'react';
import { PopupBox } from '../../molecules';
import ItemDetailsCard from './ItemDetailsCard';
import { useModalContext } from '../../../contexts';
import { TProductResponseType } from '../../../constants/apiTypes';

interface ItemDetailsPopup {
    singleProduct: TProductResponseType;
}

const ItemDetailsPopup: React.FC<ItemDetailsPopup> = ({ singleProduct }) => {
    const { isProductDetailsOpen, handleCloseProductDetails } = useModalContext();

    return (
        <PopupBox open={isProductDetailsOpen} onClose={handleCloseProductDetails} isLogoNeeded={false} maxContent={true}>
            <ItemDetailsCard
                item={singleProduct}
            />
        </PopupBox>
    );
};

export default ItemDetailsPopup;
