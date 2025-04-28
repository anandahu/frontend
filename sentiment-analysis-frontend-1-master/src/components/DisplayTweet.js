import React, {Component} from "react";
import Gauge from "./Gauge";

export default class DisplayTweet extends Component {

       constructor(props){
          super(props);
       }
       
       render() {
       		return ( {Object.keys(initialEmotions).map(emotion => {
						if(this.state.emotions[emotion] > 0 ) {
							return (
								<Gauge
									value={this.state.emotions[emotion]}
									title={`${emotion}`}
									key={emotion}
								/>

							);
						}
					})}
       }
}
