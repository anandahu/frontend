import React, { Component } from "react";

export default class DisplaySentences extends Component {
    render() {
	return (
		<>
		<h1 onClick={() => this.props.setSentenceId(-1)}>
		[Document Analysis]
            </h1>
		{this.props.sentences.map(sentence => (
			<h4 onClick={() => this.props.setSentenceId(sentence.sentence_id)}>
			{sentence.text}
		    </h4>
		))}
	    </>
	);
    }
}
