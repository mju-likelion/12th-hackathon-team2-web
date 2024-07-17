import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useDiary } from '../components/DiaryContext';
import DiaryHeader from '../components/DiaryHeader';
import DiaryList from '../components/DiaryList';
import Pagination from '../components/Pagination';
import GlobalStyle from '../styles/GlobalStyle';
import { Theme } from '../styles/Theme';

const Diary = () => {
    const { entries, setEntries } = useDiary();
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 6;
    const navigate = useNavigate();

    const handleAddEntry = () => {
        const newEntry = {
            title: '',
            date: new Date().toISOString().split('T')[0],
            content: ''
        };
        const newEntries = [...entries, newEntry];
        setEntries(newEntries);
        navigate(`/diary/${newEntries.length - 1}`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEntryClick = (index) => {
        navigate(`/diary/${index}`);
    };

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

    const totalPages = Math.ceil(entries.length / entriesPerPage);

    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Container>
                <DiaryHeader onAddEntry={handleAddEntry} />
                <DiaryList entries={currentEntries} onEntryClick={handleEntryClick} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </Container>
        </ThemeProvider>
    );
};

export default Diary;

const Container = styled.div`
    width: 100%;
    padding: 20px;
`;
