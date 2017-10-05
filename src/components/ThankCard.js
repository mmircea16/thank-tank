import React, { Component } from 'react';

import ThankText from './ThankText'

export default class ThankCard extends Component{
    constructor(props){
        super(props);
        this.state = { ...props, autoScroll: false};
        this.shouldAutoScroll = this.shouldAutoScroll.bind(this);
    }

    shouldAutoScroll() {
        var result = (this.props.flipped === 'flipped' && this.props.className.includes('back')) ||
                     (this.props.flipped !== 'flipped' && this.props.className.includes('front'));

        if(result !== this.state.autoScroll){
            this.setState({autoScroll: result});
        }
    }

    componentDidUpdate(){
        if(!this.state.autoScroll)
        {
            setTimeout(this.shouldAutoScroll, 4000); 
        } else{
            this.shouldAutoScroll();
        }       
    }

    componentDidMount(){
        this.shouldAutoScroll();
    }

    render(){     
        //this.shouldAutoScroll();  
        var row = this.props.row;
        //var thankedBy = row[4] === 'Yes'? 'Anonymous' : row[1];
        return (<article className={'thankCard ' + this.props.className}>
            <header><strong>Thank you <span className="name">{row.name}!</span></strong></header>
            <ThankText message={row.message} autoScrollEnabled={this.state.autoScroll}/>
            <footer>from {row.from}</footer>
        </article>);
    }
}