import React from 'react';
import styled from 'styled-components';
import { PlannersCompleteGetApi } from "../api/Planners/PlannersCompleteGetApi";
import Header from '../components/Header';
import PlannerHeader from '../components/Planner/PlannerHeader';
import PlannerListContainer from '../components/Planner/PlannerListContainer';
import PlannerTabs from '../components/Planner/PlannerTabs';
import PlannerTopBar from '../components/Planner/PlannerTopBar';
const CompletedPlanner = () => {
  const [activeTab, setActiveTab] = React.useState('completed');
  const [completedList, setCompletedList] = React.useState([]);

  React.useEffect(() => {
    PlannersCompleteGetApi()
      .then(response => {
        if (response.statusCode === '200 OK') {
          const completedPlans = [];
          Object.values(response.data).forEach(plans => {
            completedPlans.push(...plans);
          });
          setCompletedList(completedPlans.filter(item => item !== null));
        }
      })
      .catch(error => {
        console.error('There was an error fetching the completed planner data!', error);
      });
  }, []);

  return (
    <Div>
      <Header />
      <PageContainer>
        <PlannerHeader />
        <PlannerContainer>
          <PlannerTopBar toDoCount={0} />
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
