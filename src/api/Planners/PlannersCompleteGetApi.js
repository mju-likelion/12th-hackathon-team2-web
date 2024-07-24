import { Axios } from '../Axios';

export const PlannersCompleteGetApi = () => {
    return Axios.get('/planners/completed')
        .then(response => {
            console.log("API Response:", response);
            const data = response.data.data.groupedPlanners;
            const sortedData = {};

            const dates = Object.keys(data).sort((a, b) => new Date(b) - new Date(a));

            dates.forEach(date => {
                sortedData[date] = data[date].filter(plan => plan !== null).sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
            });

            console.log("Sorted Data:", sortedData);

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
