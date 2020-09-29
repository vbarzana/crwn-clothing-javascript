import styled from 'styled-components';
import { CollectionItemContainer } from '../../components/collection/collection-item/collection-item.styles';

export const CollectionPageContainer = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-size: 38px;
    margin: 0 auto 30px;
  }

  .items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 10px;
    width: 80%;
    margin: auto;
  }

  &${CollectionItemContainer} {
    margin-bottom: 30px;
  }
`;
