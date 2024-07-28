import React from 'react';
import styled from 'styled-components';
import { PlannersCompleteGetApi } from '../api/Planners/PlannersCompleteGetApi';
import Header from '../components/Header';
import PlannerHeader from '../components/Planner/PlannerHeader';
import PlannerListContainer from '../components/Planner/PlannerListContainer';
import PlannerTabs from '../components/Planner/PlannerTabs';
import PlannerTopBar from '../components/Planner/PlannerTopBar';

const CompletedPlanner = () => {
  const [activeTab, setActiveTab] = React.useState('completed');
  const [completedList, setCompletedList] = React.useState([]);
  const [totalDone, setTotalDone] = React.useState(0);

  React.useEffect(() => {
    PlannersCompleteGetApi()
      .then((response) => {
        if (response.statusCode === '200 OK') {
          const completedPlans = [];
          Object.values(response.data).forEach((plans) => {
            completedPlans.push(...plans);
          });
          const sortedCompletedPlans = completedPlans
            .filter((item) => item !== null)
            .sort(
              (a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate)
            );
          setCompletedList(sortedCompletedPlans);
          setTotalDone(sortedCompletedPlans.length);
        }
      })
      .catch((error) => {
        console.error(
          'There was an error fetching the completed planner data!',
          error
        );
      });
  }, []);

  return (
    <Div>
      <Header />
      <PageContainer>
        <PlannerHeader />
        <PlannerContainer>
          <PlannerTopBar totalDone={totalDone} />
          <Content>
            <PlannerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <InnerContent>
              <PlannerListContainer
                activeTab={activeTab}
                toDoList={[]}
                completedList={completedList}
                handleCheck={() => {}}
                handleUpdate={() => {}}
              />
            </InnerContent>
          </Content>
        </PlannerContainer>
      </PageContainer>
    </Div>
  );
};

export default CompletedPlanner;

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
    min-width: 300px;
    padding: 2vh;
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
    padding: 1vh;
  }
`;
