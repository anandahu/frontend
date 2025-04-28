import React, { Component } from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import WarningIcon from '@material-ui/icons/Warning';
import { green, blue, deepPurple, teal, cyan } from '@material-ui/core/colors';
import {SentimenDef} from '../components/SentimentDef';
import '../styles/WatsonInfo.css';

class WatsonInfo extends Component {
    render(){
        return (
            <div className="sentiment-body rounded">
                <h1 className="sentiment-title"><a href={SentimenDef.source}>@Watson</a> Sentiments</h1>
                <div className="sentiment-table">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th scope="row" className="sentiment-type">
                                    score % 
                                </th>
                                <td className="sentiment-def align-middle">{SentimenDef.percentage}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="sentiment-type">
                                    <SentimentVerySatisfiedRoundedIcon
                                        style={{ 
                                            fontSize: 90,
                                            color: green[500]
                                            
                                        }}
                                    />
                                </th>
                                <td className="sentiment-def align-middle">{SentimenDef.joy}</td>
                            </tr>

                            <tr>
                                <th scope="row" className="sentiment-type">
                                    <SentimentVeryDissatisfiedIcon
                                        
                                        style={{ 
                                            fontSize: 90,
                                            color: blue[500]
                                        }}
                                    />
                                </th>
                                    <td className="sentiment-def align-middle">{SentimenDef.sadness}</td>
                            </tr>
                            
                            <tr>
                                <th scope="row" className="sentiment-type">
                                    <WhatshotIcon
                                        color="secondary"
                                        style={{ 
                                            fontSize: 90
                                        }}
                                    />
                                </th>
                                <td className="sentiment-def align-middle">{SentimenDef.anger}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="sentiment-type">
                                    <WarningIcon
                                        style={{ 
                                            fontSize: 90
                                        }}
                                    />
                                </th>
                                <td className="sentiment-def align-middle">{SentimenDef.fear}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="sentiment-type">
                                    <MultilineChartIcon
                                        style={{ 
                                            fontSize: 90,
                                            color: deepPurple[400]
                                        }}
                                    />
                                </th>
                                <td className="sentiment-def align-middle">{SentimenDef.analytical}</td>
                            </tr>

                            <tr>
                                <th scope="row" className="sentiment-type">
                                    <ThumbUpIcon
                                        style={{ 
                                            fontSize: 90,
                                            color: cyan[500]
                                        }}
                                    />
                                </th>
                                <td className="sentiment-def align-middle">{SentimenDef.confident}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="sentiment-type">
                                    <VisibilityIcon
                                        style={{ 
                                            fontSize: 90,
                                            color: teal[500]
                                        }}
                                    />
                                </th>
                                <td className="sentiment-def align-middle">{SentimenDef.tentative}</td>
                            </tr>
                        </tbody>
                    </table>
                    

                </div>
            </div>
        );
    }
}

export default WatsonInfo;