import { Axios } from '../Axios';

export const PlannersCompleteGetApi = () => {
    return Axios.get('/planners/completed')
        .then(response => {
            const data = response.data.data.groupedPlanners;
            const sortedData = {};

            const dates = Object.keys(data).sort((a, b) => new Date(b) - new Date(a));

            dates.forEach(date => {
                sortedData[date] = data[date].filter(plan => plan !== null);
            });

            return {
                statusCode: "200 OK",
                message: "completed plans",
                data: sortedData
            };
        })
        .catch(error => {
            console.error("There was an error fetching the completed planner data!", error);
            throw error;
        });
};
