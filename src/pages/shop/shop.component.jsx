import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';

import './shop.styles.scss';

const ShopPage = ({ match }) => {
    console.log(match);
    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionsOverview}></Route>
            <Route exact path={`${match.path}/:collectionId`} component={CollectionPage}></Route>
        </div>
    );
}

export default ShopPage;