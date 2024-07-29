import React from 'react';
import styled from 'styled-components';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {totalPages > 0 && (
        <>
          <PageNumber
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </PageNumber>
          {pageNumbers.map((number) => (
            <PageNumber
              key={number}
              active={number === currentPage ? 1 : 0}
              onClick={() => onPageChange(number)}
            >
              {number}
            </PageNumber>
          ))}
          <PageNumber
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </PageNumber>
        </>
      )}
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px 0;
`;

const PageNumber = styled.div`
  margin: 0 10px;
  cursor: pointer;
  ${({ theme }) => theme.fonts.mediumText};
  color: ${({ theme, active }) =>
    active ? theme.colors.black : theme.colors.gray};

  &:hover {
    color: ${({ theme }) => theme.colors.pink2};
  }

  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
    opacity: 0.5;
  `}
`;
