import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  MenuItemContainer,
  ContentContainer,
  ImageContainer
} from './menu-item.styles';

const MenuItem = ({ title, history, linkUrl, match, ...otherProps }) => (
  <MenuItemContainer onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <ImageContainer {...otherProps}/>
    <ContentContainer>
      <h1 className='title'>{title && title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </ContentContainer>
  </MenuItemContainer>
);

export default withRouter(MenuItem);
