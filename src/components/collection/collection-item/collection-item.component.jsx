import React from 'react';
import {
  CollectionItemContainer,
  ImageContainer,
  CollectionFooterContainer
} from './collection-item.styles';
import CustomButton from '../../generic/custom-button/custom-button.component';
import { connect } from 'react-redux';
import { addItem } from '../../../redux/cart/cart.actions';

const CollectionItem = ({ item, addItem }) => {
  const { imageUrl, name, price } = item;
  return (
    <CollectionItemContainer>
      <ImageContainer style={{ backgroundImage: `url(${imageUrl})` }} />
      <CollectionFooterContainer>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </CollectionFooterContainer>
      <CustomButton
        additionalClassName='add-to-cart'
        inverted
        onClick={() => addItem(item)}
      >
        ADD TO CART
      </CustomButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);
