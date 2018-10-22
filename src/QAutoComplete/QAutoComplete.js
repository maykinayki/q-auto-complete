import React, { Component, Fragment } from "react";

class QAutoComplete extends Component {
    constructor(props) {
        super(props);

        // create autocomplete dropdown element
        // Use React Portals feature for dropdown to prevent z-index and overflow:hidden issues
        this.dropDownEl = document.createElement('div');
        this.dropDownEl.classList.add('auto-complete-dropdown');

        this.state = {
            selectedDataItem: null,
            inputValue: ""
        };
    }

    static defaultProps = {
        data: [],
        valueProp: "value",
        labelProp: "label",
        isAjaxFilter: false,
        showLoader: false
    };

    componentDidMount() {
        document.body.appendChild(this.dropDownEl);
    }

    componentWillUnmount() {
        document.body.removeChild(this.dropDownEl);
    }

    onInputChange = (e) => {
        const value = e.target.value;
        this.setState({
            inputValue: value
        })
    };

    render() {
        return (
            <Fragment>
                <input className="auto-complete"
                       type="text"
                       onChange={this.onInputChange}
                       value={this.state.inputValue}
                />
            </Fragment>
        )
    }
}

export default QAutoComplete