import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {compose} from 'redux';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';

import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from '../collections-overview/collection-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionsLoaded(state)
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;