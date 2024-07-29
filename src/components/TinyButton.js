import React from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';

const TinyButton = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default TinyButton;

const Button = styled.button`
  ${Theme.fonts.tinyButton};
  color: ${Theme.colors.white};
  padding: 10px;
  background-color: ${Theme.colors.pink2};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  width: 145.36px;
  height: 50.77px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &:hover {
    background-color: ${Theme.colors.pink3};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 8px;
    width: 120px;
    height: 45px;
    font-size: 0.9em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 6px;
    width: 100px;
    height: 40px;
    font-size: 0.8em;
  }
`;
