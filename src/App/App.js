import React, { Component } from "react";
import QAutoComplete from "../QAutoComplete/QAutoComplete";
import "./app.scss";

class App extends Component {
    constructor(props) {
        super(props);
        this.vimeoAccessToken = "02317c4726a1bcbeb27c55cb25bf6f86";
        this.state = {
            data: [],
            showLoader: false
        };
    }

    fetchFromVimeo = (query) => {
        if (query) {
            this.setState({
                showLoader: true
            });
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
                .finally(() => {
                    this.setState({
                        showLoader: false
                    });
                });
            }, 450);
        }
    };

    render() {

        const mockData = [
            {
                label: "Test",
                value: "test-1"
            },
            {
                label: "Test 2",
                value: "test-2"
            }
        ];

        return (
            <div className="app">

                <QAutoComplete
                    data={mockData}
                />

            </div>
        );
    }
}

export default App;
