import React, { Component, Fragment } from "react";

class QAutoComplete extends Component {
    constructor(props) {
        super(props);

        // create autocomplete dropdown element
        // Use React Portals feature for dropdown to prevent z-index and overflow:hidden issues
        this.dropDownEl = document.createElement('div');
        this.dropDownEl.classList.add('auto-complete-dropdown');

        this.state = {
        };
    }

    render() {
        return (
            <Fragment>
                <input className="auto-complete"
                       type="text"
                />
            </Fragment>
        )
    }
}

export default QAutoComplete