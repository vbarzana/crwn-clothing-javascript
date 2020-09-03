import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collection/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  async componentDidMount() {
    const { updateCollections } = this.props;

    try {
      const collectionRef = firestore.collection('collections');

      this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
      });
      // let data = await collectionRef.values;
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
