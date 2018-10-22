import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";

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
        showLoader: false,
        onInputChange: function () {}
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
        }, () => {
            this.props.onInputChange(value);
        })
    };

    renderLoader = () => {
        return (
            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" xmlSpace="preserve">
                <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
                <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
                    <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite" />
                </path>
            </svg>
        )
    };

    renderDropDown = () => {
        const data = this.props.isAjaxFilter ? this.props.data : this.props.data.filter(item => {
            return item[this.props.labelProp].toLowerCase().indexOf(this.state.inputValue.toLowerCase()) > -1;
        });
        const dropDownList = data.map((item, index) => {
            return (
                <div
                    className="auto-complete-dropdown-list-item"
                    tabIndex={index + 1}
                    key={item[this.props.valueProp]}
                >
                    {item[this.props.labelProp]}
                </div>
            )
        });
        return ReactDOM.createPortal((
            <div className={classnames('auto-complete-dropdown-list', {'hide': !this.state.inputValue, 'loading': this.props.showLoader})}>
                {this.props.showLoader && (
                    <div className="loader-container">
                        {this.renderLoader()}
                    </div>
                )}
                {dropDownList}
            </div>
        ), this.dropDownEl)
    };

    render() {
        return (
            <Fragment>
                <input className="auto-complete"
                       type="text"
                       onChange={this.onInputChange}
                       value={this.state.inputValue}
                />
                {this.renderDropDown()}
            </Fragment>
        )
    }
}

export default QAutoComplete