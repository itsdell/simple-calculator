import React from 'react';

export default class Calculator extends React.Component {
    state = {
        first: 0,
        second: 0,
        result: 0,
        operator: ''
    }

    constructor(props) {
        super(props);
        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.handleOperatorClick = this.handleOperatorClick.bind(this);
        this.computeResult = this.computeResult.bind(this);
        this.enterDigit = this.enterDigit.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset = () => {
        this.setState({first: 0, second: 0, result: 0, operator: ''});
    }

    enterDigit = (number, digit) => {
        console.log(number, typeof number);
        console.log(digit, typeof digit);
        return number * 10 + digit;
    }

    handleNumberClick = (event) => {
        let digit = parseInt(event.target.value);
        let {first, second} = this.state;

        if (this.state.operator) {
            this.setState({second: this.enterDigit(second, digit)});
        } else {
            this.setState({first: this.enterDigit(first, digit)});
        }
    }

    handleOperatorClick = (event) => {
        this.setState({operator: event.target.value});        
    }

    computeResult = () => {
        const {operator, first, second} = this.state;
        let result = 0;

        switch (operator) {
            case 'add':
                result = first + second;
                break;
            case 'subtract':
                result = first - second;
                break;
            case 'multiply':
                result = first * second;
                break;
            case 'divide':
                result = first / second;
                break;
            default: break;
        }

        this.setState({
            first: result, second: 0, result: result, operator: ''
        })
    }

    render() {
        let numbers = [...Array(10).keys()];

        return <div>
            <div style={{"display": "block"}}>{this.state.second || this.state.first}</div>
            
            {numbers.map(number => <button key={number} value={number} onClick={this.handleNumberClick}>
                {number}
            </button>)}

            <button value='add' onClick={this.handleOperatorClick}>+</button>
            <button value='subtract' onClick={this.handleOperatorClick}>-</button>
            <button value='multiply' onClick={this.handleOperatorClick}>&times;</button>
            <button value='divide' onClick={this.handleOperatorClick}>÷</button>
            <button onClick={this.computeResult}>=</button>
            <button onClick={this.reset}>AC</button>
        </div>
    }
}