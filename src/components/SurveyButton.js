import React from 'react';
import styled from 'styled-components';

const SurveyButton = ({ content, selected, onClick, className }) => {
  return (
    <Button className={className} onClick={onClick} clicked={selected}>
      {content}
    </Button>
  );
};

const Button = styled.button`
  padding: 14px 39px;
  border-radius: 11px;
  cursor: pointer;
  ${(props) => props.theme.fonts.helperText};
  font-weight: 500;
  color: ${(props) =>
    props.clicked ? props.theme.colors.white : props.theme.colors.black};
  background-color: ${(props) =>
    props.clicked ? props.theme.colors.pink2 : props.theme.colors.white};
  border: ${(props) =>
    props.clicked
      ? `1px solid ${props.theme.colors.pink2}`
      : `1px solid ${props.theme.colors.gray}`};
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.3);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export default SurveyButton;
