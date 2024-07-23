import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PlannersGetApi } from "../api/Planners/PlannersGetApi";
import { PlannersPatchApi } from "../api/Planners/PlannersPatchApi";
import { PlannersPostApi } from "../api/Planners/PlannersPostApi";
import { PlannersPutApi } from "../api/Planners/PlannersPutApi";
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

  return `${year}-${month}-${day}`;
};

const Planner = () => {
  const [toDoList, setToDoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [activeTab, setActiveTab] = useState("to-do");

  useEffect(() => {
    PlannersGetApi()
      .then(response => {
        if (response.data.statusCode === "200 OK") {
          const filteredList = response.data.data.plannerList.filter(item => item !== null);
          setToDoList(filteredList);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the planner data!", error);
      });
  }, []);

  const handleCheck = (id) => {
    PlannersPutApi(id)
      .then(response => {
        if (response.data.statusCode === "200 OK") {
          setToDoList((prevList) =>
            prevList
              .map((item) =>
                item && item.plannerId === id
                  ? {
                      ...item,
                      completed: true,
                      completedDate: formatDate(new Date()),
                    }
                  : item
              )
              .filter(item => item !== null)
          );

          setTimeout(() => {
            setToDoList((prevList) => {
              const itemToMove = prevList.find((item) => item && item.plannerId === id);
              if (itemToMove && itemToMove.completed) {
                setCompletedList((prevCompleted) => {
                  if (!prevCompleted.some((completedItem) => completedItem.plannerId === id)) {
                    return [...prevCompleted, itemToMove]
                      .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
                      .filter(item => item !== null);
                  }
                  return prevCompleted.filter(item => item !== null);
                });
                return prevList.filter((item) => item && item.plannerId !== id);
              }
              return prevList.filter(item => item !== null);
            });
          }, 2000);
        }
      })
      .catch(error => {
        console.error("There was an error completing the planner item!", error);
      });
  };

  const handleUpdate = (id, newText) => {
    PlannersPatchApi(id, newText)
      .then(response => {
        if (response.data.statusCode === "200 OK") {
          const updatedItem = response.data.data;
          if (updatedItem) {
            setToDoList((prevList) =>
              prevList
                .map((item) =>
                  item && item.plannerId === updatedItem.plannerId ? { ...item, content: updatedItem.content } : item
                )
                .filter(item => item !== null)
            );
            setCompletedList((prevList) =>
              prevList
                .map((item) =>
                  item && item.plannerId === updatedItem.plannerId ? { ...item, content: updatedItem.content } : item
                )
                .filter(item => item !== null)
            );
          } else {
            console.error("Updated item is null or undefined.");
          }
        }
      })
      .catch(error => {
        console.error("There was an error updating the planner item!", error);
      });
  };

  const handleAddItem = () => {
    const content = "할 일을 입력하세요";
    PlannersPostApi(content)
      .then(response => {
        if (response.data.statusCode === "201 CREATED") {
          const newItem = {
            plannerId: response.data.data.plannerId,
            content: content,
            completed: false,
          };
          setToDoList((prevList) => [...prevList, newItem].filter(item => item !== null));
        }
      })
      .catch(error => {
        console.error("There was an error creating the planner item!", error);
      });
  };

  const sortedCompletedList = completedList
    .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
    .filter(item => item !== null);

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
                toDoList={toDoList.filter(item => item !== null)}
                completedList={sortedCompletedList}
                handleCheck={handleCheck}
                handleUpdate={handleUpdate}
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
