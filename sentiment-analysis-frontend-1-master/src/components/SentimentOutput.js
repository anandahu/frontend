import React, { Component } from "react";
import Gauge from "./Gauge";
import {SentimenDef} from './SentimentDef';
import '../styles/SentimentResult.css'

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';


const initialEmotions = {
    sadness: 0,
    analytical: 0,
    anger: 0,
    fear: 0,
    tentative: 0,
    confident: 0,
    joy: 0
};

class SentimentOutput extends Component {
    constructor(props) {
		super(props);
		this.state = {
			documentView: true,
			sentenceTones: [],
			sentenceId: -1,
			emotions: { ...initialEmotions }
		};
		this.renderView = this.renderView.bind(this);
		this.renderNoDocTonesView = this.renderNoDocTonesView.bind(this);
	
    }

    setEmotions = () => {
		const sentimentAnalysis = this.state.sentenceId === -1  ? this.props.sentiment["document_tone"]  : this.props.sentiment["sentences_tone"][this.state.sentenceId];

		let newEmotions = {};

		if(sentimentAnalysis.tones){
			sentimentAnalysis.tones.forEach(
				analysis => (newEmotions = { ...newEmotions, [analysis.tone_id]: analysis.score })
			);
		}
		

		this.setState(prevState => {
			return { documentView:true, sentenceTones: [], emotions: { ...initialEmotions, ...newEmotions } };
		});
	}


    componentDidMount = () => {
		if(this.props.sentiment && this.props.sentiment["document_tone"]) {
			this.setEmotions();
		}
    }

    componentDidUpdate = (prevProps, prevState) => {
		if (this.props.sentiment !== prevProps.sentiment && this.props.sentiment && this.props.sentiment["document_tone"]) {
			this.setEmotions();
		}
    };

    renderNoDocTonesView(){
        var noEmotions = true; 
        for (var item in this.state.emotions) {
	    if (this.state.emotions[item] !== 0)
	    {
	        noEmotions = false; 
	        break;
	    }
        }
        
        if(noEmotions){
	    return(
	        <p className="no-sentiment">No Document Tones Available</p>
	    );
        }
	}


    renderView() {
	
    	const data =  this.props.sentiment.sentences_tone ;
	var sentences; 
	if(data){
	    sentences = data.map(info =>
		                 {
                                     return (
                                         <Accordion allowMultipleExpanded allowZeroExpanded>
                                           <AccordionItem uuid="c">
					     <AccordionItemHeading>
					       <AccordionItemButton>
					         {info.text}
					       </AccordionItemButton>
					     </AccordionItemHeading>
					     <AccordionItemPanel>
					       {info.tones.length === 0 ? <p className="no-sentiment">No Sentiments Found</p> : info.tones.map( tones =>
	                                                                                                                                        <span title={SentimenDef[tones.tone_id]}>
	                                                                                                                                          <Gauge
	                                                                                                                                            value={tones.score}
	                                                                                                                                            title={tones.tone_name}
	                                                                                                                                          />
	                                                                                                                                        </span>
                                                                                                                     )
					       

					       }
					     </AccordionItemPanel>
				           </AccordionItem>
				         </Accordion>

                                     );
		                 } );

	}

	return (
	    <div className="sentimentOutputBox">
	      <div className="center-output rounded">
                <Accordion preExpanded={['e']}  allowMultipleExpanded allowZeroExpanded>
                  <AccordionItem uuid="e">
                    <AccordionItemHeading>
                      <AccordionItemButton>
	                Tweet Text 
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      {this.props.sentiment.tweet_text }
                    </AccordionItemPanel>
                  </AccordionItem>
		</Accordion>
		<Accordion preExpanded={['a']} allowMultipleExpanded allowZeroExpanded>
		  <AccordionItem uuid="a">
		    <AccordionItemHeading>
		      <AccordionItemButton>
                        Watson Document Analysis
		      </AccordionItemButton>
		    </AccordionItemHeading>
		    <AccordionItemPanel>
		      {this.renderNoDocTonesView()}
		      { this.state.emotions.length ===  0?  <p className="no-sentiment">No Sentiments Found</p> :
			Object.keys(initialEmotions).map(emotion => {
			    if(this.state.emotions[emotion] > 0 ) {
				return (
				    <span title={SentimenDef[emotion]}>
				      <Gauge
					value={this.state.emotions[emotion]}
					title={`${emotion}`}
					key={emotion}
				      />
				    </span>

				);
			    }
			    
			})
		      }
                    
                    </AccordionItemPanel>
                    
		  </AccordionItem>
                </Accordion>
                <Accordion preExpanded={['b']}  allowMultipleExpanded allowZeroExpanded>
                  <AccordionItem uuid="b">
                    <AccordionItemHeading>
                      <AccordionItemButton>
	                Watson Sentence Analysis
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      {data? sentences :  <p className="no-sentiment">No Sentence Tones Available</p> }
                    </AccordionItemPanel>
                  </AccordionItem>
		</Accordion>
		
	      </div>
	      
	    </div>
	);
	}

    waitRender(){
		return (
			<div className="sentimentOutputBox">
				<div className="center-output rounded">
				<Accordion preExpanded={['a']}  allowMultipleExpanded allowZeroExpanded>
				<AccordionItem uuid="a">
				     <AccordionItemHeading>
				       <AccordionItemButton>
                                         Waiting for Tweet Input...
				       </AccordionItemButton>
				     </AccordionItemHeading>
				  <AccordionItemPanel>
                                    <span>
                                      <Gauge
                                        value={0}
                                        title={`waiting for input`}
                                      /> </span>
				
				  </AccordionItemPanel>
				</AccordionItem>
                                </Accordion>

				</div>
			</div>
		);
	}

    render() {
		if(this.props.sentiment && this.props.sentiment.document_tone){
			if(this.state.documentView){
				return this.renderView();
			} else {
				return this.renderSentenceView();
			}
			
		}
		else{
			return this.waitRender();
		}
    }
}

export default SentimentOutput;
