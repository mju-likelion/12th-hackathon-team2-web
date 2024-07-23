import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DiaryHeader from '../components/Diary/DiaryHeader';
import DiaryList from '../components/Diary/DiaryList';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import fetchDiaries from '../api/Diaries/DiariesGetApi';

const Diary = () => {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const entriesPerPage = 6;

  useEffect(() => {
    const loadDiaries = async (page) => {
      try {
        setLoading(true);
        const response = await fetchDiaries(page);

        console.log('API Response:', response);

        const diaryList = response.data?.diaryList || [];
        const pagination = response.data?.pagination || { totalPage: 1 };

        setEntries(diaryList);
        setTotalPages(pagination.totalPage);
      } catch (err) {
        console.error('Failed to fetch diaries:', err);
        setError('다이어리 목록을 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadDiaries(currentPage);
  }, [currentPage]);

  const handleAddEntry = () => {
    navigate(`/diaries/new`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntryClick = (id) => {
    navigate(`/diaries/${id}`);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <Div>
      <Header />
      <Container>
        <DiaryHeader onAddEntry={handleAddEntry} />
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <DiaryList
              entries={currentEntries}
              onEntryClick={handleEntryClick}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Container>
    </Div>
  );
};

export default Diary;

const Div = styled.div`
  width: 100%;
  padding: 20px;
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
`;
