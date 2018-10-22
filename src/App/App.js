import React, { Component } from "react";
import "./app.scss";

class App extends Component {
    constructor(props) {
        super(props);
        this.vimeoAccessToken = "02317c4726a1bcbeb27c55cb25bf6f86";
        this.state = {
            data: []
        };
    }

    fetchFromVimeo = (query) => {
        if (query) {
            this.timeout && window.clearTimeout(this.timeout);
            this.timeout = window.setTimeout(() => {
                fetch(`https://api.vimeo.com/videos?access_token=${this.vimeoAccessToken}&query=${query}`)
                .then((response) => {
                    return response.json()
                })
                .then(response => {
                    this.setState({
                        data: response.data
                    })
                })
                .catch(function(e) {
                    console.log(e);
                })
            }, 450);
        }
    };

    render() {
        return (
            <div className="app">

            </div>
        );
    }
}

export default App;
