import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios'
import Styles from './GlobalDailyChart.module.css'
import {Typography} from '@material-ui/core'

class GlobalDailyChart extends Component{
  
    
    
    constructor(props){
        super(props);

       

        this.state = {
            chartDailyData:[]
        }
    }

    async componentDidMount(){
        // const chartData = getGlobalDailyChartData();
        // this.setState({
        //     chartDailyData: chartData
        // })
        const url = "https://covid19.mathdro.id/api"

        const response = await axios.get(url + "/daily");
        this.setState({
            chartDailyData:response.data
        }); 
    }

    render(){
        var dates = [];
        var confirmedCases = []; 
        var deathCases = [];

        var lineData = this.state.chartDailyData;
        console.log("DATA::"+ {lineData})
        if (lineData.length === 0) {
            return "Loading...";
        }
       
        console.log({lineData})
      //  lineData = lineData.slice(-10,lineData.length);
       // const dates = lineData.map(({reportDate}) => reportDate);
      
    lineData.map(({reportDate},index) => {
        if (index === 0){
            dates.push(reportDate);
        }else if(index%14 === 0){
            dates.push(reportDate);
        } else if(index === (lineData.length -1)){
            dates.push(reportDate);
        }
    });
     //   const confirmedCases = lineData.map(({confirmed}) => confirmed.total);
   lineData.map(({confirmed},index) => {
        if (index === 0){
            confirmedCases.push(confirmed.total);
        }else if(index%14 === 0){
            confirmedCases.push(confirmed.total);
        }else if(index === (lineData.length -1)){
            confirmedCases.push(confirmed.total);
        }
    });
     //const deaths = lineData.map(({deaths}) => deaths.total);
     lineData.map(({deaths},index) => {
        if (index === 0){
            deathCases.push(deaths.total);
        }else if(index%14 === 0){
            deathCases.push(deaths.total);
        }else if(index === (lineData.length -1)){
            deathCases.push(deaths.total);
        }
    });
  
     const lineChartData = {
            labels: dates,
            datasets:[{
                label: 'Confirmed',
                data : confirmedCases,
                backgroundColor: ['rgba(0,0,255,0.5)'],
                borderColor: ['rgba(0,0,255,0.75)']
            },
            {
                label: 'Deaths',
                data : deathCases,
                backgroundColor: ['rgba(255,0,0,0.5)'],
                borderColor: ['rgba(255,0,0,0.75)']
            }],
        };

        return(
            <div className={Styles.container}>
                <div>
                    <Typography variant="h3" className={Styles.caption}>
                        Global Trend
                    </Typography>
                    <Typography className={Styles.content}>
                        The line chart depicts the number of people infected and dead due to COVID-19 from the beginning until now. Please hover over the chart and click legends to know more information.
                    </Typography>
                </div>
                 <Line data={lineChartData} />
            </div>
           
        );
    }

    
}

export default GlobalDailyChart;