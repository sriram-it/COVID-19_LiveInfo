import React, {Component} from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import Styles from './GlobalCount.module.css';
import axios from 'axios';
import cx from 'classnames';
import CountUp from 'react-countup';

class GlobalCounter extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: {}
        }
    }

   async componentDidMount(){
        await axios.get( "https://covid19.mathdro.id/api")
        .then(response => {
            this.setState({
                data: response.data
            });
        }).catch(error => {
            console.log(error);
        })
    }

    

    render(){
        const lastUpdatedDate = this.state.data.lastUpdate;
        if(Object.entries(this.state.data).length === 0){
            return "Loading..."
        }
        
        return(
            <div  className={Styles.container}>  
                <Grid container spacing={10}>
                    <Grid item component={Card} className={cx(Styles.card,Styles.confirmed)}>
                        <CardContent >
                            <Typography className={Styles.title}>
                                Confirmed Cases                            
                            </Typography>
                            <Typography className={Styles.count}>
                                <strong>
                                    <CountUp
                                        start={0}
                                        end={this.state.data.confirmed.value}
                                        duration={2.75}
                                        separator=","
                                        />
                                </strong>                          
                            </Typography>
                            <Typography>
                                {new Date(lastUpdatedDate).toDateString()}
                            </Typography>
                        </CardContent>
                    </Grid>

                    <Grid item component={Card} className={cx(Styles.card,Styles.recovered)}>
                        <CardContent>
                            <Typography className={Styles.title}>
                                Recovered Cases                            
                            </Typography>
                            <Typography className={Styles.count}>
                                <strong>
                                    <CountUp
                                        start={0}
                                        end={this.state.data.recovered.value}
                                        duration={2.75}
                                        separator=","
                                        />
                                </strong>             
                            </Typography>
                            <Typography>
                                {new Date(lastUpdatedDate).toDateString()}
                            </Typography>
                        </CardContent>
                    </Grid>

                    <Grid item component={Card} className={cx(Styles.card,Styles.deaths)}>
                        <CardContent>
                            <Typography className={Styles.title}>
                                Death Cases                            
                            </Typography>
                            <Typography className={Styles.count}>
                                <strong>
                                    <CountUp
                                        start={0}
                                        end={this.state.data.deaths.value}
                                        duration={2.75}
                                        separator=","
                                        /> 
                                </strong>                   
                            </Typography>
                            <Typography>
                                 {new Date(lastUpdatedDate).toDateString()}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default GlobalCounter;