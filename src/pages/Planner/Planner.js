import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PlannersDeleteApi } from '../../api/Planners/PlannersDeleteApi';
import { PlannersGetApi } from '../../api/Planners/PlannersGetApi';
import { PlannersPatchApi } from '../../api/Planners/PlannersPatchApi';
import { PlannersPostApi } from '../../api/Planners/PlannersPostApi';
import { PlannersPutApi } from '../../api/Planners/PlannersPutApi';
import Header from '../../components/Header';
import PlannerHeader from '../../components/Planner/PlannerHeader';
import PlannerListContainer from '../../components/Planner/PlannerListContainer';
import PlannerTabs from '../../components/Planner/PlannerTabs';
import PlannerTopBar from '../../components/Planner/PlannerTopBar';
import TinyButton from '../../components/TinyButton';
import CalendarView from './CalendarView';

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Planner = () => {
  const [toDoList, setToDoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [activeTab, setActiveTab] = useState('to-do');
  const { month } = useParams();

  useEffect(() => {
    PlannersGetApi()
      .then((response) => {
        if (response.data.statusCode === '200 OK') {
          const filteredList = response.data.data.plannerList.filter(
            (item) => item !== null
          );
          setToDoList(filteredList);
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the planner data!', error);
      });
  }, []);

  const handleCheck = (id) => {
    const itemToUpdate = toDoList.find((item) => item.plannerId === id);

    if (!itemToUpdate || !itemToUpdate.content.trim()) {
      console.log('할 일 내용이 비어있습니다. 체크할 수 없습니다.');
      return;
    }

    PlannersPutApi(id, { isCompleted: true })
      .then((response) => {
        if (response.data.statusCode === '200 OK') {
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
              .filter((item) => item !== null)
          );

          setTimeout(() => {
            setToDoList((prevList) => {
              const itemToMove = prevList.find(
                (item) => item && item.plannerId === id
              );
              if (itemToMove && itemToMove.completed) {
                setCompletedList((prevCompleted) => {
                  if (
                    !prevCompleted.some(
                      (completedItem) => completedItem.plannerId === id
                    )
                  ) {
                    return [...prevCompleted, itemToMove]
                      .sort(
                        (a, b) =>
                          new Date(b.completedDate) - new Date(a.completedDate)
                      )
                      .filter((item) => item !== null);
                  }
                  return prevCompleted.filter((item) => item !== null);
                });
                return prevList.filter((item) => item && item.plannerId !== id);
              }
              return prevList.filter((item) => item !== null);
            });
          }, 2000);
        }
      })
      .catch((error) => {
        console.error('There was an error completing the planner item!', error);
      });
  };

  const handleUpdate = (id, newText) => {
    PlannersPatchApi(id, newText)
      .then((response) => {
        if (response.data.statusCode === '200 OK') {
          const updatedItem = response.data.data;
          if (updatedItem) {
            setToDoList((prevList) =>
              prevList
                .map((item) =>
                  item && item.plannerId === updatedItem.plannerId
                    ? {
                        ...item,
                        content: updatedItem.content,
                      }
                    : item
                )
                .filter((item) => item !== null)
            );
            setCompletedList((prevList) =>
              prevList
                .map((item) =>
                  item && item.plannerId === updatedItem.plannerId
                    ? {
                        ...item,
                        content: updatedItem.content,
                      }
                    : item
                )
                .filter((item) => item !== null)
            );
          } else {
            console.error('Updated item is null or undefined.');
          }
        }
      })
      .catch((error) => {
        console.error('There was an error updating the planner item!', error);
      });
  };

  const handleAddItem = () => {
    const newItem = {
      plannerId: Date.now().toString(),
      content: '',
      completed: false,
    };
    setToDoList((prevList) => [newItem, ...prevList]);
  };

  const handleSaveItem = (id, text) => {
    if (!text.trim()) {
      console.log('내용을 입력해 주세요');
      return;
    }

    console.log(`Saving item with id: ${id} and text: ${text}`);

    PlannersPostApi(text)
      .then((response) => {
        if (response.data.statusCode === '201 CREATED') {
          console.log('Item created successfully:', response.data);
          return PlannersGetApi();
        } else {
          throw new Error('Failed to create new item');
        }
      })
      .then((response) => {
        if (response.data.statusCode === '200 OK') {
          const filteredList = response.data.data.plannerList.filter(
            (item) => item !== null
          );
          setToDoList(filteredList);
        } else {
          throw new Error('Failed to fetch updated planner list');
        }
      })
      .catch((error) => {
        console.error('There was an error creating the planner item!', error);
      });
  };

  const handleDelete = (id) => {
    PlannersDeleteApi(id)
      .then((response) => {
        if (response.data.statusCode === '200 OK') {
          setToDoList((prevList) =>
            prevList.filter((item) => item && item.plannerId !== id)
          );
          setCompletedList((prevList) =>
            prevList.filter((item) => item && item.plannerId !== id)
          );
        }
      })
      .catch((error) => {
        console.error('There was an error deleting the planner item!', error);
      });
  };

  const sortedCompletedList = completedList
    .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
    .filter((item) => item !== null);

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
              {activeTab === 'calendar' ? (
                <CalendarView
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  totalDone={completedList.length}
                  month={month}
                />
              ) : (
                <PlannerListContainer
                  activeTab={activeTab}
                  toDoList={toDoList.filter((item) => item !== null)}
                  completedList={sortedCompletedList}
                  handleCheck={handleCheck}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  handleSaveItem={handleSaveItem}
                />
              )}
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
  padding: 2vh;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh;
  position: relative;
`;

const PlannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.pink1};
  border-radius: 20px;
  width: 100%;
  max-width: 1082px;
  min-height: 453px;
  margin-top: 2vh;
  padding: 4vh;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 462px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 320px;
  }
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
  }
`;

const InnerContent = styled.div`
  width: 100%;
  height: 60vh;
  min-height: 447px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  padding: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 50vh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 40vh;
  }
`;

const AddButtonContainer = styled.div`
  position: absolute;
  bottom: 2vh;
  right: 2vh;
  z-index: 1000;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: 1vh;
    bottom: 1vh;
    transform: scale(0.8);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 0.1vh;
    bottom: 0.1vh;
    transform: scale(0.6);
  }
`;
