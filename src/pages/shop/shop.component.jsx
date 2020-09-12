import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { firestore, convertCollectionsSnapShotToMap } from '../../firebase/firebase.utils';

import './shop.styles.scss';
import { updateCollections } from '../../redux/shop/shop.actions';

let unsubscribeFromSnapShot = null;
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, updateCollections }) => {

    const [ isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetchShopCollection();
        return () => {
            unsubscribeFromSnapShot();
        };
    }, []);

    const fetchShopCollection = () => {
        const collectionRef = firestore.collection('collections');
        unsubscribeFromSnapShot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
            updateCollections(collectionsMap);
            setLoading(false);
        });
    };

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isLoading} {...props}></CollectionsOverviewWithSpinner>}></Route>
            <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={isLoading} {...props}></CollectionPageWithSpinner>}></Route>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);