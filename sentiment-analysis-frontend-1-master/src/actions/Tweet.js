import axios from 'axios';

export const getTweetSentiment = async (url) => {
    try {
        let urlArr = url.split("/");
        let tweetId = urlArr[urlArr.length -1].replace(/\s+/g, '');
        let result = await axios.get(`https://sat-backend.herokuapp.com/api/v1/sentiment_analyses/${tweetId}`);
        return result.data; 
    } catch (err) {
        console.log(err.response);
    }
}

export default getTweetSentiment;