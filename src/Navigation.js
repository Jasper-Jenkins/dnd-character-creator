import React, { Component } from 'react'
//import isSelected from './helper/helper-functions'


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = { //why is this a class? there is no state...

        }

    }

    navigationButtons() {
        const navigation = this.props.navigation
        const navigationCategories = this.props.navigationCategories
        const navigate = this.props.navigate
        // const classSelected = this.props.classSelected       
        let navButtons = navigationCategories.map((category, index) => {
            if (navigation === category) {
                return (<button type='button' className='btn btn-sm btn-success btn-nav' tabIndex='-1' aria-disabled='true' key={index}>{category}</button>);
            } else {
                return (<button type='button' onClick={() => { navigate(category); }} className='btn btn-sm  btn-dark btn-nav' key={index}>{category}</button>);
            }
        });
        return (navButtons);
    }


    render() {
        return (<nav className="navbar navbar-expand-lg navbar-light" id="navigation-bottom-container">
            <button className="btn btn-sm navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navigation-bottom" aria-controls="navigation-bottom" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon col-2"></span>
            </button>
            <div className="collapse navbar-collapse col-10" id="navigation-bottom">
                {this.navigationButtons()}
            </div>
        </nav>);
    }
}

export default Navigation