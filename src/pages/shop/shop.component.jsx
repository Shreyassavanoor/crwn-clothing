import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';

import CollectionsOverview from '../../components/collections-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import './shop.styles.scss';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, isCollectionFetching, fetchCollectionsStartAsync, isCollectionLoaded }) => {

    useEffect(() => {
        fetchCollectionsStartAsync();
    }, []);

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={!isCollectionLoaded} {...props}></CollectionsOverviewWithSpinner>}></Route>
            <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}></CollectionPageWithSpinner>}></Route>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);