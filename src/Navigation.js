import React, { Component } from 'react'
import isSelected from './helper/helper-functions'


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }         
    }

   

    navigationButtons() {
        const navigation = this.props.navigation
        const navigationCategories = this.props.navigationCategories
        const navigate = this.props.navigate
        const classSelected = this.props.classSelected       

        let navButtons = navigationCategories.map((category, index) => {
            if (isSelected(classSelected)) {
                if (navigation === category) {
                    return (<button type='button' className='btn btn-sm btn-success btn-nav' tabIndex='-1' aria-disabled='true' key={index}>{category}</button>);
                } else {
                    return (<button type='button' onClick={() => { navigate(category); }} className='btn btn-sm  btn-dark btn-nav' key={index}>{category}</button>);
                }
            } else {
                if (navigation === category) {
                    return (<button type='button' className='btn btn-sm btn-success btn-nav' tabIndex='-1' aria-disabled='true' key={index}>{category}</button>);
                } else {
                    if (category === 'Classes' && (navigation === 'Proficiencies' || navigation === 'Spells')) {
                        switch (navigation) {
                            case 'Proficiencies':
                                return (<button type='button' onClick={() => { navigate(category); }} className='btn btn-sm btn-dark btn-nav' key={index}>{category}</button>);
                            default:
                                return (<button type='button' onClick={() => { navigate(category); }} className='btn btn-sm btn-dark btn-nav' key={index}>{category}</button>);
                        }
                    } else {
                        return (<button type='button' onClick={() => { navigate(category); }} className='btn btn-sm btn-dark btn-nav' key={index}>{category}</button>);
                    }
                }
            }
        });        
        return (navButtons);
    }

    render() {
        return (<nav className="navbar navbar-expand-lg navbar-light col-12" id="navigation-bottom-container">            
                    <button className="btn btn-sm navbar-toggler bg-light col-2" type="button" data-toggle="collapse" data-target="#navigation-bottom" aria-controls="navigation-bottom" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse col-10" id="navigation-bottom">
                       {this.navigationButtons()}            
                    </div>            
                </nav>);
    }


   


    //render() {
    //    const { champion } = this.props; 
    //    return (<div className='col-12 text-center' id='navigation' > 
    //        <div className='col-6' id='navigation-container' onBlur={(e) => {               
    //            if (!e.currentTarget.contains(e.relatedTarget)) {
    //                // Not triggered when swapping focus between children
    //                this.hideButtons();                  
    //            }
    //        }}>
    //            <div id='navigation-buttons'>
    //                {this.state.toggle ? this.navigationButtons() : null}</div>
    //                    <button className='btn btn-sm btn-primary' id='navigation-toggle' onClick={() => this.toggleNavigation() }>{champion}</button>
    //                </div>                    
    //            </div>);
    //}
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

//    <div className="btn-group dropup">
//        <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//            Champion
//        </button>
//        <div className="dropdown-menu">
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