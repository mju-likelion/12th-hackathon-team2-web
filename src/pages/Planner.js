import React, { useState } from "react";
import styled from "styled-components";
import PlannerHeader from "../components/PlannerHeader";
import PlannerListContainer from "../components/PlannerListContainer";
import PlannerTabs from "../components/PlannerTabs";
import PlannerTopBar from "../components/PlannerTopBar";
import Header from "../components/Header";

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
            </InnerContent>
          </Content>
        </PlannerContainer>
      </PageContainer>
    </Div>
  );
};

export default Planner;

const Div = styled.div`
  width: 100%;
  padding: 20px;
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const PlannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.pink1};
  border-radius: 10px;
  width: 1082px;
  height: 696px;
  margin-top: 20px;
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  position: relative;
`;

const InnerContent = styled.div`
  width: 859px;
  height: 553px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
