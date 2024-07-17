import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useDiary } from '../components/DiaryContext';
import DiaryDetailForm from '../components/DiaryDetailForm';
import TinyButton from '../components/TinyButton';
import GlobalStyle from '../styles/GlobalStyle';
import { Theme } from '../styles/Theme';

const DiaryDetail = () => {
    const { entries, editEntry, deleteEntry } = useDiary();
    const { id } = useParams();
    const navigate = useNavigate();
    const entry = entries[parseInt(id)];

    const [title, setTitle] = useState(entry.title);
    const [content, setContent] = useState(entry.content);

    const handleSave = () => {
        const updatedEntry = { ...entry, title, content };
        editEntry(parseInt(id), updatedEntry);
        navigate("/diary");
    };

    const handleDelete = () => {
        deleteEntry(parseInt(id));
        navigate("/diary");
    };

    const handleBackToList = () => {
        navigate("/diary");
    };

    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Container>
                <Header>
                    <DateHeader>{entry.date}</DateHeader>
                    <TinyButton onClick={handleBackToList}>목록으로</TinyButton>
                </Header>
                <DiaryDetailForm
                    title={title}
                    setTitle={setTitle}
                    content={content}
                    setContent={setContent}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    isNew={entry.title === '' && entry.content === ''}
                />
            </Container>
        </ThemeProvider>
    );
};

export default DiaryDetail;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1117px;
    margin-top: 52px;
`;

const DateHeader = styled.div`
    margin-top: 20px;
    ${({ theme }) => theme.fonts.DateHeader};
    color: ${({ theme }) => theme.colors.pink3};
`;
