import axios from 'axios'

const url = "https://covid19.mathdro.id/api"

async function getGlobalCount(){
    const response = await axios.get(url);
    return response;
}

export async function getGlobalDailyChartData(){
    const response = await axios.get(url + "/daily");
    return response.data; 
}