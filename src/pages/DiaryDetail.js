import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import deleteDiary from '../api/Diaries/DiariesDeleteApi';
import getDiary from '../api/Diaries/DiariesDetailGetApi';
import updateDiary from '../api/Diaries/DiariesPatchApi';
import DiaryDetailForm from '../components/Diary/DiaryDetailForm';
import Header from '../components/Header';
import TinyButton from '../components/TinyButton';
import { schemaDiaryDetail } from '../hooks/ValidationYup';
import { Theme } from '../styles/Theme';

const DiaryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [entry, setEntry] = useState({ title: '', content: '', date: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schemaDiaryDetail),
        mode: 'onChange',
        defaultValues: {
            title: '',
            content: '',
        },
    });

    useEffect(() => {
        const fetchDiary = async () => {
            try {
                setLoading(true);
                const response = await getDiary(id);
                const diaryData = response.data;
                setEntry({
                    id: diaryData.id,
                    title: diaryData.title,
                    content: diaryData.content,
                    date: diaryData.createdAt,
                });
                reset({
                    title: diaryData.title,
                    content: diaryData.content,
                });
            } catch (err) {
                setError('일기조회실패');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDiary();
    }, [id, reset]);

    const handleSaveEntry = async (data) => {
        const updatedEntry = {
            title: data.title,
            content: data.content,
        };

        try {
            await updateDiary(entry.id, updatedEntry);
            navigate('/diaries');
        } catch (err) {
            setError('일기수정실패');
            console.error(err);
        }
    };

    const handleDeleteEntry = async () => {
        const confirmDelete = window.confirm(
            '정말로 이 일기를 삭제하시겠습니까?'
        );
        if (confirmDelete) {
            try {
                await deleteDiary(entry.id);
                navigate('/diaries');
            } catch (err) {
                setError('일기삭제실패');
                console.error(err);
            }
        }
    };

    const handleBackToList = () => {
        navigate('/diaries');
    };

    const formattedDate = entry.date
        ? format(new Date(entry.date), 'yyyy.MM.dd')
        : '';

    if (loading) return <div>로딩...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Div>
            <Header />
            <Container>
                <Title>감정 일기장</Title>
                <SubTitle>
                    <DateHeader>{formattedDate}</DateHeader>
                    <TinyButton onClick={handleBackToList}>목록으로</TinyButton>
                </SubTitle>
                <DiaryDetailForm
                    control={control}
                    handleSave={handleSubmit(handleSaveEntry)}
                    handleDelete={handleDeleteEntry}
                    isNew={false}
                    errors={errors}
                />
            </Container>
        </Div>
    );
};

export default DiaryDetail;

const Div = styled.div`
    width: 100%;
    padding: 20px;
`;

const Container = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1117px;
    margin-top: 3vh;
    margin-bottom: 3vh;
    ${Theme.fonts.subTitle};
    color: ${Theme.colors.black};
`;
const SubTitle = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1117px;
`;

const DateHeader = styled.div`
    margin-top: 20px;
    ${Theme.fonts.Context};
    color: ${Theme.colors.pink3};
`;
