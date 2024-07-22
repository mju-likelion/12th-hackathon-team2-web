import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import PlannerHeader from "../components/Planner/PlannerHeader";
import PlannerListContainer from "../components/Planner/PlannerListContainer";
import PlannerTabs from "../components/Planner/PlannerTabs";
import PlannerTopBar from "../components/Planner/PlannerTopBar";
import TinyButton from "../components/TinyButton";

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day} `;
};

const Planner = () => {
  const [toDoList, setToDoList] = useState([
    { id: 1, text: "할 일을 입력하세요", completed: false },
  ]);
  const [completedList, setCompletedList] = useState([]);
  const [activeTab, setActiveTab] = useState("to-do");

  const handleCheck = (id) => {
    setToDoList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
              completedDate: formatDate(new Date()),
            }
          : item
      )
    );

    setTimeout(() => {
      setToDoList((prevList) => {
        const itemToMove = prevList.find((item) => item.id === id);
        if (itemToMove && itemToMove.completed) {
          setCompletedList((prevCompleted) => {
            if (
              !prevCompleted.some((completedItem) => completedItem.id === id)
            ) {
              return [...prevCompleted, itemToMove].sort(
                (a, b) => new Date(b.completedDate) - new Date(a.completedDate)
              );
            }
            return prevCompleted;
          });
          return prevList.filter((item) => item.id !== id);
        }
        return prevList;
      });
    }, 2000);
  };

  const handleUpdate = (id, newText) => {
    setToDoList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
    setCompletedList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      text: "할 일을 입력하세요",
      completed: false,
    };
    setToDoList((prevList) => [...prevList, newItem]);
  };

  const sortedCompletedList = completedList.sort(
    (a, b) => new Date(b.completedDate) - new Date(a.completedDate)
  );

  return (
    <Div>
      <Header />
      <PageContainer>
        <PlannerHeader />
        <PlannerContainer>
          <PlannerTopBar toDoCount={toDoList.length} />
          <Content>
            <PlannerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <InnerContent>
              <PlannerListContainer
                activeTab={activeTab}
                toDoList={toDoList}
                completedList={sortedCompletedList}
                handleCheck={handleCheck}
                handleUpdate={handleUpdate}
                handleAddItem={handleAddItem}
              />
              <AddButtonContainer>
                <TinyButton onClick={handleAddItem}>추가하기</TinyButton>
              </AddButtonContainer>
            </InnerContent>
          </Content>
        </PlannerContainer>
      </PageContainer>
    </Div>
  );
};

export default Planner;

const Div = styled.div`
  width: 100vw;
  padding: 20px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
`;

const PlannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.pink1};
  border-radius: 10px;
  width: 100%;
  max-width: 1082px;
  min-height: 553px;
  margin-top: 20px;
  padding: 20px;
  position: relative;

  @media (max-width: 768px) {
    max-width: 90%;
    max-height: 90%;
  }
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const InnerContent = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 553px;
  max-height: 553px;

  @media (min-width: 859px) {
    width: 100%;
  }
`;

const AddButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    right: 10px;
    bottom: 10px;
  }
`;

