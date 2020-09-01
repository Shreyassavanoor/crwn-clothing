import React, { useState } from 'react';

import './shop.styles.scss';

import SHOP_DATA from './shop.data';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

const ShopPage = () => {
    const [collections, setCollections] = useState(SHOP_DATA);

    return (
        <div className="shop-page">
            {
                collections.map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps}></CollectionPreview>
                ))
            }
        </div>
    );
}

export default ShopPage;