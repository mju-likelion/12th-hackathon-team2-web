import { format } from 'date-fns';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDiary } from "../components/DiaryContext";
import DiaryHeader from "../components/DiaryHeader";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

const Diary = () => {
  const { entries, setEntries } = useDiary();
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;
  const navigate = useNavigate();

  const handleAddEntry = () => {
    const newEntry = {
      title: "",
      date: format(new Date(), 'yyyy.MM.dd'),
      content: "",
    };
    const newEntries = [...entries, newEntry];
    setEntries(newEntries);
    navigate(`/diaries/${newEntries.length - 1}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntryClick = (index) => {
    navigate(`/diaries/${index}`);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(entries.length / entriesPerPage);

  return (
    <Container>
      <Header />
      <DiaryHeader onAddEntry={handleAddEntry} />
      <DiaryList entries={currentEntries} onEntryClick={handleEntryClick} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default Diary;

const Container = styled.div`
  width: 100%;
  padding: 20px;
`;
