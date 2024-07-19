import React, { useState } from "react";
import SurveyButton from "../components/SurveyButton";
import styled from "styled-components";
import TinyButton from "../components/TinyButton";

const Survey = () => {
  const [answers, setAnswers] = useState({});

  const handleSelect = (questionIndex, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));
  };

  return (
    <Container>
      <Title>간단한 ADHD 테스트</Title>

      <Question>
        <p>
          1. 어떤 일의 어려운 부분은 끝내 놓고, 그 일을 마무리를 짓지 못 해
          곤란을 겪은 적이 있습니까?
        </p>
        <Options>
          <SurveyButton
            content={"매우 아니다"}
            selected={answers[1] === "매우 아니다"}
            onClick={() => handleSelect(1, "매우 아니다")}
          />
          <SurveyButton
            content={"보통이다"}
            selected={answers[1] === "보통이다"}
            onClick={() => handleSelect(1, "보통이다")}
          />
          <SurveyButton
            content={"매우 그렇다"}
            selected={answers[1] === "매우 그렇다"}
            onClick={() => handleSelect(1, "매우 그렇다")}
          />
        </Options>
      </Question>

      <Question>
        <p>
          2. 체계가 필요한 일을 해야 할 때 순서대로 진행하기 어려운 경우가
          있습니까?
        </p>
        <Options>
          <SurveyButton
            content={"매우 아니다"}
            selected={answers[2] === "매우 아니다"}
            onClick={() => handleSelect(2, "매우 아니다")}
          />
          <SurveyButton
            content={"보통이다"}
            selected={answers[2] === "보통이다"}
            onClick={() => handleSelect(2, "보통이다")}
          />
          <SurveyButton
            content={"매우 그렇다"}
            selected={answers[2] === "매우 그렇다"}
            onClick={() => handleSelect(2, "매우 그렇다")}
          />
        </Options>
      </Question>

      <Question>
        <p>3. 약속이나 해야 할 일을 잊어버려 곤란을 겪은 적이 있습니까?</p>
        <Options>
          <SurveyButton
            content={"매우 아니다"}
            selected={answers[3] === "매우 아니다"}
            onClick={() => handleSelect(3, "매우 아니다")}
          />
          <SurveyButton
            content={"보통이다"}
            selected={answers[3] === "보통이다"}
            onClick={() => handleSelect(3, "보통이다")}
          />
          <SurveyButton
            content={"매우 그렇다"}
            selected={answers[3] === "매우 그렇다"}
            onClick={() => handleSelect(3, "매우 그렇다")}
          />
        </Options>
      </Question>

      <Question>
        <p>4. 골치 아픈 일은 피하거나 미루는 경우가 있습니까?</p>
        <Options>
          <SurveyButton
            content={"매우 아니다"}
            selected={answers[4] === "매우 아니다"}
            onClick={() => handleSelect(4, "매우 아니다")}
          />
          <SurveyButton
            content={"보통이다"}
            selected={answers[4] === "보통이다"}
            onClick={() => handleSelect(4, "보통이다")}
          />
          <SurveyButton
            content={"매우 그렇다"}
            selected={answers[4] === "매우 그렇다"}
            onClick={() => handleSelect(4, "매우 그렇다")}
          />
        </Options>
      </Question>

      <Question>
        <p>
          5. 오래 앉아 있을 때, 손을 만지작거리거나 발을 꼼지락거리는 경 우가
          있습니까?
        </p>
        <Options>
          <SurveyButton
            content={"매우 아니다"}
            selected={answers[5] === "매우 아니다"}
            onClick={() => handleSelect(5, "매우 아니다")}
          />
          <SurveyButton
            content={"보통이다"}
            selected={answers[5] === "보통이다"}
            onClick={() => handleSelect(5, "보통이다")}
          />
          <SurveyButton
            content={"매우 그렇다"}
            selected={answers[5] === "매우 그렇다"}
            onClick={() => handleSelect(5, "매우 그렇다")}
          />
        </Options>
      </Question>

      <Question>
        <p>6. 과도하게 혹은 멈출 수 없이 활동을 하는 경우가 있습니까? </p>
        <Options>
          <SurveyButton
            content={"매우 아니다"}
            selected={answers[6] === "매우 아니다"}
            onClick={() => handleSelect(6, "매우 아니다")}
          />
          <SurveyButton
            content={"보통이다"}
            selected={answers[6] === "보통이다"}
            onClick={() => handleSelect(6, "보통이다")}
          />
          <SurveyButton
            content={"매우 그렇다"}
            selected={answers[6] === "매우 그렇다"}
            onClick={() => handleSelect(6, "매우 그렇다")}
          />
        </Options>
      </Question>

      <SaveBtn>
        <TinyButton>저장</TinyButton>
      </SaveBtn>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  /* border: 1px solid #ccc; */
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
`;
const Question = styled.div`
  margin-bottom: 70px;
  ${(props) => props.theme.fonts.mediumText};
  p {
    margin-bottom: 34px;
  }
`;
const Options = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 40px;
  margin-top: 10px;
`;
const SaveBtn = styled.div`
  text-align: right;
  margin-top: 20px;
`;

export default Survey;
