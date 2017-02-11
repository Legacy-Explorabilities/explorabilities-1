import React from 'react';
import axios from 'axios';


export default class Deals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        data: {
            contents: [
            {
                productID: 34,
                productName: "SuperWidget",
                quantity: 1
            },
            {
                productID: 56,
                productName: "WonderWidget",
                quantity: 3
            }
        ]
        }
        }
    }
    componentDidMount() {
        console.log(this.state.data);
    }
    render() {
        return (
            <div>
                <h2>DEALS</h2>
                {this.state.data.contents.map(function(obj){
                    return (<h3>{obj.productName}</h3>);
                })}
            </div>
        );
    }
}
