import React, { Component } from 'react';
import ReactAutoScroll from 'react-to-target-auto-scroll'

export default class ThankText extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    render(){
        return (
            <ReactAutoScroll
            targetPosition={9000}
            easeType={'linear'}
            speed={1}
            updateInterval={60}
            scrollTargetRef={this.refs.scrollSection}
            isEnabled={this.props.autoScrollEnabled}>
                <section ref="scrollSection">{this.props.message}</section>
            </ReactAutoScroll>)
    }
}
