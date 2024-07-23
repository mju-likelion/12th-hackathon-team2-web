import { Axios } from '../Axios';

export const PlannersCompleteGetApi = () => {
    return Axios.get('/planners/completed')
        .then(response => {
            const data = response.data.data;
            const formattedData = {};

            data.forEach(plan => {
                const date = plan.modifiedDate.split('T')[0];
                if (!formattedData[date]) {
                    formattedData[date] = [];
                }
                formattedData[date].push(plan);
            });

            return {
                statusCode: "200 OK",
                message: "completed plans",
                data: formattedData
            };
        })
        .catch(error => {
            console.error("There was an error fetching the completed planner data!", error);
            throw error;
        });
};
