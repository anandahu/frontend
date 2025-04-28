import React, { Component } from "react";
import ReactSpeedometer from "react-d3-speedometer";

export default class Gauge extends Component {
    render() {
	return (
		<ReactSpeedometer
            width={325}
            needleHeightRatio={0.7}
			value={this.props.value * 1000}
			currentValueText={`${this.props.title}: ${(this.props.value * 100).toFixed(1)}%`}
		customSegmentLabels={[
			{
				text: "Unlikely",
				position: "INSIDE",
				color: "#555",
			},
			{
				text: "Unlikely",
				position: "INSIDE",
				color: "#555"
			},
			{
				text: "Low",
				position: "INSIDE",
				color: "#555",
				fontSize: "19px"
			},
			{
				text: "Maybe",
				position: "INSIDE",
				color: "#555"
			},
			{
				text: "High",
				position: "INSIDE",
				color: "#555"
			}
            ]}
            ringWidth={47}
            needleTransitionDuration={3333}
            needleTransition="easeElastic"
            needleColor={"#90f2ff"}
            textColor={"#000000"}
		/>
	);
    }
}