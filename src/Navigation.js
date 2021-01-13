import React, { Component } from 'react'
import isSelected from './helper/helper-functions'


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
        }
        this.toggleNavigation = this.toggleNavigation.bind(this);
        this.hideButtons = this.hideButtons.bind(this);
    }

    toggleNavigation() {       
        this.setState({
            toggle: !this.state.toggle,
        });
    }

    hideButtons() { 
        const alertNode = document.getElementById('navigation-buttons');
        setTimeout(() => {
            console.log("is it happening?")
            let fade = setInterval(() => {
                if (!alertNode.style.opacity) {
                    alertNode.style.opacity = 1;
                }
                if (alertNode.style.opacity > 0) {
                    alertNode.style.opacity -= 0.01;
                } else {
                    clearInterval(fade);
                    this.toggleNavigation();
                    alertNode.style.opacity = 1;
                }
            }, 1);
        }, 0);  
    }

    navigationButtons() {
        const navigation = this.props.navigation
        const navigationCategories = this.props.navigationCategories
        const navigate = this.props.navigate
        const classSelected = this.props.classSelected       

        let navButtons = navigationCategories.map((category, index) => {
            if (isSelected(classSelected)) {
                if (navigation === category) {
                    return (<button onClick={() => this.hideButtons() } type='button' className='btn btn-sm btn-block btn-success btn-nav disabled' tabIndex='-1' aria-disabled='true' key={index}>{category}</button>);
                } else {
                    return (<button onClick={() => { navigate(category); this.hideButtons(); }} type='button' className='btn btn-sm btn-block btn-dark btn-nav' key={index}>{category}</button>);
                }
            } else {
                if (navigation === category) {
                    return (<button onClick={() => this.hideButtons()} type='button' className='btn btn-sm btn-block btn-success btn-nav disabled' tabIndex='-1' aria-disabled='true' key={index}>{category}</button>);
                } else {
                    if (category === 'Classes' && (navigation === 'Proficiencies' || navigation === 'Spells')) {
                        switch (navigation) {
                            case 'Proficiencies':
                                return (<button onClick={() => { navigate(category); this.hideButtons() }} type='button' className='btn btn-sm btn-block btn-dark btn-nav' key={index}>{category}</button>);
                            default:
                                return (<button onClick={() => { navigate(category); this.hideButtons() }} type='button' className='btn btn-sm btn-block btn-dark btn-nav' key={index}>{category}</button>);
                        }
                    } else {
                        return (<button onClick={() => { navigate(category); this.hideButtons()}} type='button' className='btn btn-sm btn-block btn-dark btn-nav' key={index}>{category}</button>);
                    }
                }
            }
        });        
        return (navButtons);
    }
    
    render() {
        const { champion } = this.props; 
        return (<div className='col-12 text-center' id='navigation' > 
            <div className='col-6' id='navigation-container' onBlur={(e) => {               
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    // Not triggered when swapping focus between children
                    this.hideButtons();                  
                }
            }}>
                <div id='navigation-buttons'>
                    {this.state.toggle ? this.navigationButtons() : null}</div>
                        <button className='btn btn-sm btn-primary' id='navigation-toggle' onClick={() => this.toggleNavigation() }>{champion}</button>
                    </div>                    
                </div>);
    }
}

//setup() {

//    <div className='row'>
//        <div className='col-12'>
//             {!this.state.toggle ? this.navigationButtons() : null}
//        </div>
//    </div>
//        <div className='row'>
//            <div className='col-12'>
//                <button className='btn btn-sm btn-primary' id='navigation-toggle' onClick={() => this.toggleNavigation()}>{!this.state.toggle ? 'Hide' : 'Show'}</button>
//            </div>
//        </div>              

//    <div class="btn-group dropup">
//        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//            Champion
//        </button>
//        <div class="dropdown-menu">
//            {!this.state.toggle ? this.navigationButtons() : null}
//        </div>
//    </div>
//}




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