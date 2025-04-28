import React, {Component} from 'react'; 
import '../styles/InputBox.css';
import { getTweetSentiment } from '../actions/Tweet.js';

class InputBox extends Component {
    //to get information passed to InputBox  this.props.variableName
    constructor(props) {
        super(props); 
        this.state = {
            tweetUrl: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitTweetUrl = this.submitTweetUrl.bind(this);
        this.validateTweetUrl = this.validateTweetUrl.bind(this);
    }

    validateTweetUrl(url){
        // accepts https://twitter.com/username/status/id-number
        const re = /^https:\/\/twitter.com\/\w+\/status\/[0-9?s=\s]{10,50}$/;
        return re.test(String(url).toLowerCase());
    }

    submitTweetUrl(event) {
        event.preventDefault();

        this.props.saveTweetUrlToLanding(this.state.tweetUrl);

        if(this.validateTweetUrl(this.state.tweetUrl)){
            getTweetSentiment(this.state.tweetUrl)
            .then(result => {
                if(result){
                    this.props.saveSentimentToLanding(result);
                } else {
                    this.props.saveSentimentToLanding({error:"error in getting tweet result"});
                }
            });
        } else {
            this.props.saveSentimentToLanding({error: "invalid url " + this.state.tweetUrl})
        }       
    }

    handleChange(event){
        event.preventDefault();
        this.setState({tweetUrl: event.target.value});        
    }

    render(){
        return (
            <div className="inputBox">
                <form className="form-inline center-form">
                    <i className="fas fa-search" aria-hidden="true"></i>
                    <input 
                        className="form-control form-control-lg ml-3 w-75" 
                        type="text" 
                        placeholder="Enter https://twitter.com/username/status/id-number" 
                        value={this.state.tweetUrl} 
                        onChange={this.handleChange} 
                        aria-label="Search">
                    </input>
                    <button onClick={this.submitTweetUrl} className="btn btn-lg btn-light">Analyze</button>
                </form>
            </div>    
        );
    }
}

export default InputBox;