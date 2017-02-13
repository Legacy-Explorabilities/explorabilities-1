import React from 'react';
import axios from 'axios';


export default class Deals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        data: {
            contents: [
            {
                city: "Los Angeles",
                dealName: "10% off at Disneyland!"
            },
            {
                city: "San Jose",
                dealName:  "12% off at Great America!"
            },
                {
                    city: "San Jose",
                    dealName:  "Free tours at Winchester Mystery House!"
                },
                {
                    city: "San Francisco",
                    dealName:  "20% off on wine tasting!"
                }
        ]
        }
        }
    }
    componentDidMount() {
        console.log(data);
        console.log(this.state.data);
    }
    render() {
        return (
            <div class="deals">
                <h2>DEALS</h2>
                {this.state.data.contents.map(function(obj){
                    return (<div><a href="#">{obj.dealName}</a></div>);
                })}
            </div>
        );
    }
}
