import React from "react";

import CollectionItem from "../../components/collection/collection-item/collection-item.component";

import CollectionsContext from "../../contexts/collections/collections.context";

import { CollectionPageContainer } from "./collection.styles";

const CollectionPage = ({ match }) => {
  return (
    <CollectionsContext.Consumer>
      {(collections) => {
        const collection = collections[match.params.collectionId];
        const { title, items } = collection;
        return (
          <CollectionPageContainer>
            <h2 className="title">{title}</h2>
            <div className="items">
              {items.map((item) => (
                <CollectionItem key={item.id} item={item} />
              ))}
            </div>
          </CollectionPageContainer>
        );
      }}
    </CollectionsContext.Consumer>
  );
};

export default CollectionPage;
