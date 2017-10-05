import React, { Component } from 'react';
import config from '../config';
import ThankCard from './ThankCard';
import { getRandomColour } from '../helpers/randomColour';
import getCardStore from '../data/card_store';

export default class FlippingCards extends Component {
    constructor(props) {
        super(props);
        this.store = getCardStore();
        this.state = {
            flipped: false,
            back:{name:'dummy', message:'dummy', from:'dummy'},
            front:{name:'dummy', message:'dummy', from:'dummy'}
        };
        this.flip = this.flip.bind(this);
        this.getRandomWaitTime = this.getRandomWaitTime.bind(this);
    }

    getRandomWaitTime() {
        var message = this.state.back.message;
        if (this.state.flipped === 'flipped') {
            message = this.state.front.message;
        }
        var numberOfWords = message.split(' ').length

        var baseTime = Math.floor(Math.random() * (config.speedUpperBound - config.speedLowerBound + 1)) + config.speedLowerBound;
        var extraTime = numberOfWords * config.timePerWord;
        var timeToWait = 1000 * (baseTime + extraTime);

        return timeToWait;
    }

    componentDidMount() {
        this.store.getNext().then((card) => {
            this.setState({ front: card });
        });
        this.setState({ frontColour: getRandomColour() })
        this.setState({ backColour: getRandomColour() })

        setTimeout(this.flip, this.getRandomWaitTime());
    }

    flip() {
        var flipped = this.state.flipped
        if (!flipped) {
            this.store.getNext()
                .then((card) =>
                    this.setState({
                        flipped: 'flipped',
                        backColour: getRandomColour(),
                        back: card
                    }));
        } else {
            this.store.getNext()
                .then((card) =>{
                    this.setState({
                        flipped: '',
                        frontColour: getRandomColour(),
                        front: card
                    });
                    console.log(this.state);
                });
        }

        setTimeout(this.flip, this.getRandomWaitTime());
    }

    render() {
        return (
            <section className="container">
                <div className={'card ' + this.state.flipped}>
                    <ThankCard className={'front ' + this.state.frontColour} row={this.state.front} flipped={this.state.flipped} />
                    <ThankCard className={'back ' + this.state.backColour} row={this.state.back} flipped={this.state.flipped} />
                </div>
            </section>);
    }
}