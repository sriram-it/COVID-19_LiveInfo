import React, {Component} from 'react'
import axios from 'axios'
import {Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography} from '@material-ui/core'
import Styles from './AllCountriesStatistics.module.css'

class AllCountriesStatistics extends Component {

    constructor(props){

        super(props);

        this.state = {
            statisticsData:[]
        }
    }

    componentDidMount(){
        axios({
            url:"https://covid-193.p.rapidapi.com/statistics",
            method:"get",
            headers:{
                "content-type": "application/json",
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "9d7151f0d8msh0835ea4adc62658p12d707jsn957be81cdabe",
                "useQueryString": "true"
            }
        }).then(resp => {
            console.log(resp);
            var countries = resp.data.response;
            if(countries.length > 400){
                countries = countries.slice(0,227);
            }
            const uniqueCountriesSet = new Set(countries);
            const uniqueCountries = [... uniqueCountriesSet];
            const data = uniqueCountries.map((uniqueCountries)=> {
                return {
                    countryName: uniqueCountries.country,
                    total:  uniqueCountries.cases.total,
                    recovered: uniqueCountries.cases.recovered,
                    active: uniqueCountries.cases.active,
                    critical: uniqueCountries.cases.critical,
                    new: uniqueCountries.cases.new,
                    deaths: uniqueCountries.deaths.total
                }
            });
            this.setState({
                statisticsData: data
            });
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    render(){
        const tableData = this.state.statisticsData;
        return (
            <div className={Styles.container}>
                <div>
                    <Typography variant="h3">Regional Wise</Typography>
                    <Typography className={Styles.content}>
                        The table will give the detailed breakdown of cases by Country, Contenient, and Conveyance. Please click the table header to sort the data.
                    </Typography>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead className={Styles.tableHeader}>
                            <TableRow>
                                <TableCell>Country</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Recovered</TableCell>
                                <TableCell>Active Cases</TableCell>
                                <TableCell>Critical Cases</TableCell>
                                <TableCell>New Cases</TableCell>
                                <TableCell>Deaths</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((tableData)=>(
                                <TableRow key={tableData.countryName}>
                                    <TableCell>{tableData.countryName}</TableCell>
                                    <TableCell>{tableData.total}</TableCell>
                                    <TableCell>{tableData.recovered}</TableCell>
                                    <TableCell>{tableData.active}</TableCell>
                                    <TableCell>{tableData.critical}</TableCell>
                                    <TableCell>{tableData.new}</TableCell>
                                    <TableCell>{tableData.deaths}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default AllCountriesStatistics;