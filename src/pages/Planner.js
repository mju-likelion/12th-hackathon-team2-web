import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlannersDeleteApi } from '../api/Planners/PlannersDeleteApi';
import { PlannersGetApi } from '../api/Planners/PlannersGetApi';
import { PlannersPatchApi } from '../api/Planners/PlannersPatchApi';
import { PlannersPostApi } from '../api/Planners/PlannersPostApi';
import { PlannersPutApi } from '../api/Planners/PlannersPutApi';
import Header from '../components/Header';
import Calendar from '../components/Planner/Calendar.js';
import PlannerHeader from '../components/Planner/PlannerHeader';
import PlannerListContainer from '../components/Planner/PlannerListContainer';
import PlannerTabs from '../components/Planner/PlannerTabs';
import PlannerTopBar from '../components/Planner/PlannerTopBar';
import TinyButton from '../components/TinyButton';

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
                console.error(
                    'There was an error fetching the planner data!',
                    error
                );
            });
    }, []);

    const handleCheck = (id) => {
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
                                            (completedItem) =>
                                                completedItem.plannerId === id
                                        )
                                    ) {
                                        return [...prevCompleted, itemToMove]
                                            .sort(
                                                (a, b) =>
                                                    new Date(b.completedDate) -
                                                    new Date(a.completedDate)
                                            )
                                            .filter((item) => item !== null);
                                    }
                                    return prevCompleted.filter(
                                        (item) => item !== null
                                    );
                                });
                                return prevList.filter(
                                    (item) => item && item.plannerId !== id
                                );
                            }
                            return prevList.filter((item) => item !== null);
                        });
                    }, 2000);
                }
            })
            .catch((error) => {
                console.error(
                    'There was an error completing the planner item!',
                    error
                );
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
                                    item &&
                                    item.plannerId === updatedItem.plannerId
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
                                    item &&
                                    item.plannerId === updatedItem.plannerId
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
                console.error(
                    'There was an error updating the planner item!',
                    error
                );
            });
    };

    const handleAddItem = () => {
        const content = '할 일을 입력하세요';
        PlannersPostApi(content)
            .then((response) => {
                if (response.data.statusCode === '201 CREATED') {
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
                    setToDoList((prevList) => {
                        const newList = filteredList.filter(
                            (item) =>
                                !prevList.some(
                                    (prevItem) =>
                                        prevItem &&
                                        prevItem.plannerId === item.plannerId
                                )
                        );
                        return [...newList, ...prevList];
                    });
                } else {
                    throw new Error('Failed to fetch updated planner list');
                }
            })
            .catch((error) => {
                console.error(
                    'There was an error handling the planner item!',
                    error
                );
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
                console.error(
                    'There was an error deleting the planner item!',
                    error
                );
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
                        <PlannerTabs
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        <InnerContent>
                            <PlannerListContainer
                                activeTab={activeTab}
                                toDoList={toDoList.filter(
                                    (item) => item !== null
                                )}
                                completedList={sortedCompletedList}
                                handleCheck={handleCheck}
                                handleUpdate={handleUpdate}
                                handleDelete={handleDelete}
                            />
                            <AddButtonContainer>
                                <TinyButton onClick={handleAddItem}>
                                    추가하기
                                </TinyButton>
                            </AddButtonContainer>
                        </InnerContent>
                    </Content>
                </PlannerContainer>
                <Calendar /> {/* 캘린더 컴포넌트 추가 */}
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

    @media (max-width: 768px) {
        min-width: 462px;
    }
`;

const Content = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
    flex-direction: column;

    @media (min-width: 768px) {
        min-width: 362px;
        flex-direction: row;
    }
`;

const InnerContent = styled.div`
    width: 100%;
    height: 60vh;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 14px;
    padding: 2vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        min-width: 362px;
        height: 50vh;
    }
`;

const AddButtonContainer = styled.div`
    position: absolute;
    bottom: 2vh;
    right: 2vh;
    z-index: 1000;

    @media (max-width: 768px) {
        right: 1vh;
        bottom: 1vh;
    }
`;
