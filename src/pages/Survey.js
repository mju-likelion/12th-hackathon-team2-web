import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchSurveyQuestions } from '../api/Surveys/SurveyGetApi';
import { submitSurveyResults } from '../api/Surveys/SurveyPostApi';
import SurveyButton from '../components/SurveyButton';
import TinyButton from '../components/TinyButton';

const Survey = () => {
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const optionMapping = {
    '매우 아니다': 'NO',
    보통이다: 'NORMAL',
    '매우 그렇다': 'YES',
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questionsData = await fetchSurveyQuestions();
        setQuestions(questionsData);
      } catch (error) {
        console.error('질문 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleSelect = (questionIndex, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = async () => {
    const surveyResultList = questions.map((question) => ({
      surveyId: question.surveyId,
      option: optionMapping[answers[question.number]] || 'N/A',
    }));

    const requestBody = { surveyResultList };

    console.log('Request Body:', JSON.stringify(requestBody, null, 2));

    try {
      const resultData = await submitSurveyResults(requestBody);
      console.log('Result Data:', resultData);
      navigate('/surveys/result', { state: { resultData } });
    } catch (error) {
      console.error('설문 조사 결과 전송 실패:', error);
    }
  };

  return (
    <Container>
      <Title>간단한 ADHD 테스트</Title>
      {loading ? (
        <LoadingMessage>질문 로딩 중...</LoadingMessage>
      ) : (
        questions.map((question) => (
          <Question key={question.number}>
            <p>
              {question.number}. {question.question}
            </p>
            <Options>
              <SurveyButton
                content={'매우 아니다'}
                selected={answers[question.number] === '매우 아니다'}
                onClick={() => handleSelect(question.number, '매우 아니다')}
              />
              <SurveyButton
                content={'보통이다'}
                selected={answers[question.number] === '보통이다'}
                onClick={() => handleSelect(question.number, '보통이다')}
              />
              <SurveyButton
                content={'매우 그렇다'}
                selected={answers[question.number] === '매우 그렇다'}
                onClick={() => handleSelect(question.number, '매우 그렇다')}
              />
            </Options>
          </Question>
        ))
      )}
      <SaveBtn>
        <TinyButton onClick={handleSubmit}>저장</TinyButton>
      </SaveBtn>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  border: 2px solid ${(props) => props.theme.colors.pink2};
  border-radius: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 20px;
    margin: 30px auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    padding: 15px 30px;
    margin: auto;
    background-color: ${(props) => props.theme.colors.pink1};
    border: none;
    border-radius: 0;
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.div`
  padding-top: 50px;
  text-align: center;
  margin: auto;
  ${(props) => props.theme.fonts.semiText};
  margin-bottom: 70px;
  border-bottom: 3px solid ${(props) => props.theme.colors.gray};
  width: 310px;
  padding-bottom: 25px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 30px;
    margin-bottom: 50px;
    width: 260px;
    padding-bottom: 15px;
    border-bottom: 3px solid ${(props) => props.theme.colors.pink2};
  }
`;

const Question = styled.div`
  margin-bottom: 70px;
  ${(props) => props.theme.fonts.mediumText};
  p {
    margin-bottom: 34px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 50px;
    p {
      margin-bottom: 20px;
    }
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 30px;
  margin-top: 10px;
  @media (max-width: 700px) {
    flex-direction: column;
    margin: 0 70px;
    gap: 20px;
  }
`;

const SaveBtn = styled.div`
  text-align: right;
  margin-top: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: center;
    margin-top: 0;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  ${(props) => props.theme.fonts.mediumText};
  color: ${(props) => props.theme.colors.gray};
  margin-top: 50px;
`;

export default Survey;
