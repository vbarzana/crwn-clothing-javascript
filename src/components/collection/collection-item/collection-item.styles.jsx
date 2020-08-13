import styled from 'styled-components';
import { CustomButtonContainer } from '../../generic/custom-button/custom-button.styles';

export const ImageContainer = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
`;

export const CollectionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  &:hover ${ImageContainer} {
    opacity: 0.8;
  }

  &:hover ${CustomButtonContainer} {
    opacity: 0.85;
    display: flex;
  }

  ${CustomButtonContainer} {
    width: 100%;
    height: 95%;
    max-height: 50px;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
  }
`;

export const CollectionFooterContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  min-height: 30px;

  .name {
    width: 90%;
    margin-bottom: 15px;
  }

  .price {
    width: 10%;
  }
`;
