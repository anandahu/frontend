import React, { useState, useEffect, Component } from 'react';
import profileImage from '../assets/profile.png';
import mk from '../assets/muskan.jpg';
import '../styles/About.css';


class About extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    };

    render(){
        return (
            <div className="about-body">
                <div className="card card-container">
                    <img src={mk} className="card-img-top" alt="Card image cap"/>
                    <div className="card-body">
                        <h5 class="card-title">Muskan Kapoor</h5>
                        <p className="card-text">Lead and developed project direction and goals.</p>
                        <p className="card-text">Designed backend logic for retrieving tweets.</p>
                    </div>
                </div>

                <div className="card card-container">
                    <img src={profileImage} className="card-img-top" alt="Card image cap"/>
                    <div className="card-body">
                        <h5 class="card-title">Yuna Kim</h5>
                        <p className="card-text">Lead backend application development and deployment.</p>
                        <p className="card-text">Designed backend architecture and database logic.</p>
                    </div>
                </div>

                <div className="card card-container">
                    <img src={profileImage} className="card-img-top" alt="Card image cap"/>
                    <div className="card-body">
                        <h5 class="card-title">Joseph Ruocco</h5>
                        <p className="card-text">Lead backend logic for sentiment analysis.</p>
                        <p className="card-text">Designed layout in displaying results in frontend application.</p>
                    </div>
                </div>

                <div className="card card-container">
                    <img src={profileImage} className="card-img-top" alt="Card image cap"/>
                    <div className="card-body">
                        <h5 class="card-title">Nicole Liang</h5>
                        <p className="card-text">Lead frontend application development and deployment.</p>
                        <p className="card-text">Designed the user experience & data flow in frontend application.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;