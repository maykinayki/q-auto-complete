import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import './qautocomplete.scss';

class QAutoComplete extends Component {
    constructor(props) {
        super(props);

        // create autocomplete dropdown element
        // Use React Portals feature for dropdown to prevent z-index and overflow:hidden issues
        this.dropDownEl = document.createElement('div');
        this.dropDownEl.classList.add('auto-complete-dropdown');

        this.state = {
            isInputFocused: false,
            isDropDownItemFocused: false,
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

    toPx = (value) => {
        return value + "px";
    };

    componentDidMount() {
        document.body.appendChild(this.dropDownEl);
    }

    componentWillUnmount() {
        document.body.removeChild(this.dropDownEl);
    }

    componentDidUpdate() {
        window.setTimeout(() => {
            if(this.state.isInputFocused || this.state.isDropDownItemFocused) {
                this.dropDownEl.style.display = 'block';
            } else {
                this.dropDownEl.style.display = 'none';
            }
        }, 0);
    }

    onInputChange = (e) => {
        const value = e.target.value;
        this.setState({
            inputValue: value
        }, () => {
            this.props.onInputChange(value);
        })
    };

    onInputBlur = () => {
        this.setState({
            isInputFocused: false
        })
    };

    onInputFocus = (e) => {
        const input = e.target;
        this.setState({
            isInputFocused: true
        }, () => {
            this.setDropDownPosition(input);
        });
    };

    // focus first element in dropdown list when arrow down or tab clicked while input focused
    onInputKeyDown = (e) => {
        // TAB keycode = 40
        // arrow down keycode = 9
        if(e.which === 40 || e.which === 9) {
            e.preventDefault();
            const listElements = this.dropDownEl.getElementsByClassName('auto-complete-dropdown-list-item');
            if(listElements.length > 0) {
                listElements[0].focus();
            }
        }
    };

    setDropDownPosition = (input) => {
        const inputClientRect = input.getBoundingClientRect();
        const inputWidth = inputClientRect.width;
        const inputHeight = inputClientRect.height;
        const inputOffsetX = inputClientRect.left;
        const inputOffsetY = inputClientRect.top;
        this.dropDownEl.style.width = this.toPx(inputWidth);
        this.dropDownEl.style.left = this.toPx(inputOffsetX);
        this.dropDownEl.style.top = this.toPx(inputOffsetY + inputHeight);
    };

    onDropDownItemFocus = () => {
        this.setState({
            isDropDownItemFocused: true
        });
    };

    onDropDownItemBlur = () => {
        this.setState({
            isDropDownItemFocused: false
        });
    };

    onDropDownItemKeyDown = (e, item) => {
        if(e.which === 13) {
            e.preventDefault();
            this.onDropDownItemSelect(e, item)
        }
        if(e.which === 40) {
            e.preventDefault();
            e.target.nextSibling.focus();
        }
    };

    onDropDownItemSelect = (e, item) => {
        this.setState({
            selectedDataItem: item,
            inputValue: item[this.props.labelProp],
            isInputFocused: false,
            isDropDownItemFocused: false
        });
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
                    onFocus={this.onDropDownItemFocus}
                    onBlur={this.onDropDownItemBlur}
                    onClick={(e) => this.onDropDownItemSelect(e, item)}
                    onKeyDown={(e) => this.onDropDownItemKeyDown(e, item)}
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
                       onFocus={this.onInputFocus}
                       onBlur={this.onInputBlur}
                       onKeyDown={this.onInputKeyDown}
                       value={this.state.inputValue}
                />
                {this.renderDropDown()}
            </Fragment>
        )
    }
}

export default QAutoComplete