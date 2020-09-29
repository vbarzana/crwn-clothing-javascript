import styled, { css } from 'styled-components';

const largeStyles = css`
  height: 380px;
`;

const getSizeStyles = ({ size }) => (size === 'large' ? largeStyles : null);
const getBackgroundImage = ({ imageUrl }) => {
  return css`
    background-image: url(${imageUrl});
  `;
};

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;

  ${getBackgroundImage};
`;

export const ContentContainer = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background: white;
  opacity: 0.7;
  position: absolute;

  .title {
    font-weight: bold;
    margin-bottom: 6px;
    font-size: 22px;
    color: #4a4a4a;
  }

  .subtitle {
    font-weight: lighter;
    font-size: 16px;
  }
`;

export const MenuItemContainer = styled.div`
  min-width: 30%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;
  @media (max-width: 750px) {
    width: 100% !important;
  }

  &:hover {
    cursor: pointer;

    & ${ImageContainer} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
  }

  ${getSizeStyles}

  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }
`;
