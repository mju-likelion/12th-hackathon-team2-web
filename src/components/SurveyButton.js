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
`;

export default SurveyButton;
