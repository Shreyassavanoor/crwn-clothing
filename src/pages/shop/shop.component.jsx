import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';

import Spinner from '../../components/spinner/spinner.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import './shop.styles.scss';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

const CollectionsOverview = lazy(() => import('../../components/collections-overview/collection-overview.component'));
const CollectionPage = lazy(() => import('../collection/collection.component'));
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, isCollectionFetching, fetchCollectionsStartAsync, isCollectionLoaded }) => {

    useEffect(() => {
        fetchCollectionsStartAsync();
    }, []);

    return (
        <div className="shop-page">
            <Suspense fallback={<Spinner></Spinner>}>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={!isCollectionLoaded} {...props}></CollectionsOverviewWithSpinner>}></Route>
                <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}></CollectionPageWithSpinner>}></Route>
            </Suspense>
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