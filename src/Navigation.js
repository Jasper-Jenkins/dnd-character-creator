import React, { Component } from 'react'
import isSelected from './helper/helper-functions'


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
        }
        this.toggleNavigation = this.toggleNavigation.bind(this);
    }

    toggleNavigation() {       
        this.setState({
            toggle: !this.state.toggle,
        });

    }

    navigationButtons() {
        const navigation = this.props.navigation
        const navigationCategories = this.props.navigationCategories
        const navigate = this.props.navigate
        const classSelected = this.props.classSelected

        let navButtons = navigationCategories.map((category, index) => {
            if (isSelected(classSelected)) {
                if (navigation === category) {
                    return (<li key={index}><button type='button' className='btn btn-sm btn-block btn-success btn-nav disabled' tabIndex='-1' aria-disabled='true' key={index}>{category}</button></li>);
                } else {
                    return (<li key={index}><button onClick={() => navigate(category)} type='button' className='btn btn-sm btn-block btn-dark btn-nav' key={index}>{category}</button></li>);
                }
            } else {
                if (navigation === category) {
                    return (<li key={index}><button type='button' className='btn btn-sm btn-block btn-success btn-nav disabled' tabIndex='-1' aria-disabled='true' key={index}>{category}</button></li>);
                } else {
                    if (category === 'Classes' && (navigation === 'Proficiencies' || navigation === 'Spells')) {
                        switch (navigation) {
                            case 'Proficiencies':
                                return (<li key={index}><button onClick={() => navigate(category)} type='button' className='btn btn-sm btn-block btn-dark btn-nav'>{category}</button></li>);
                            default:
                                return (<li key={index}><button onClick={() => navigate(category)} type='button' className='btn btn-sm btn-block btn-dark btn-nav' >{category}</button></li>);
                        }
                    } else {
                        return (<li key={index}><button onClick={() => navigate(category)} type='button' className='btn btn-sm btn-block btn-dark btn-nav' >{category}</button></li>);
                    }
                }
            }
        });
        return (<ul className='col-12' id='navigation-buttons'>{navButtons}</ul>);
    }

    render() {
        return (<div className='col-12 text-center' id='navigation'>
            {!this.state.toggle ? this.navigationButtons() : null}
            <button onClick={() => this.toggleNavigation()}>{ !this.state.toggle ? 'Hide' : 'Show' }</button>
                </div>);
    }
}


//const Navigation = (props) => {
// //   console.log("Navigation", props)
//    const navigation = props.navigation
//    const navigationCategories = props.navigationCategories
//    const navigate = props.navigate
//    const classSelected = props.classSelected

//    let navButtons = navigationCategories.map((category, index) => {
//        if (isSelected(classSelected)) {
//            if (navigation === category) {
//                return (<button type='button' className='btn btn-sm btn-success btn-nav disabled' tabIndex='-1' aria-disabled='true' key={index}>{category}</button>);
//            } else {
//                return (<button onClick={() => navigate(category)} type='button' className='btn btn-sm btn-dark btn-nav' key={index}>{category}</button>);
//            }
//        } else {
//            if (navigation === category) {
//                return (<button type='button' className='btn btn-sm btn-success btn-nav disabled' tabIndex='-1' aria-disabled='true' key={index}>{category}</button>);
//            } else {
//                if (category === 'Classes' && (navigation === 'Proficiencies' || navigation === 'Spells')) {
//                    switch (navigation) {
//                        case 'Proficiencies':
//                            return (<button onClick={() => navigate(category)} type='button' className='btn btn-sm btn-dark btn-nav' key={index}>{category}</button>);
//                        default:
//                            return (<button onClick={() => navigate(category)} type='button'className='btn btn-sm btn-dark btn-nav' key={index}>{category}</button>);
//                    }     
//                } else {
//                    return (<button onClick={() => navigate(category)} type='button' className='btn btn-sm btn-dark btn-nav' key={index}>{category}</button>);
//                }
//            }
//        }                
//    });
//    return (<div className='col-12 text-center navigation'>
//                {navButtons}
//            </div>);
//}
export default Navigation