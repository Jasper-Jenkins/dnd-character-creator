import React from 'react'
import isSelected from './helper/helper-functions'

const Navigation = (props) => {
 //   console.log("Navigation", props)
    const navigation = props.navigation
    const navigationCategories = props.navigationCategories
    const navigate = props.navigate
    const classSelected = props.classSelected

    let navButtons = navigationCategories.map((category, index) => {
        if (isSelected(classSelected)) {
            if (navigation === category) {
                return (<button type='button' className='btn btn-sm btn-success btn-nav disabled' tabIndex='-1' aria-disabled='true' key={index}>{category}</button>);
            } else {
                return (<button onClick={() => navigate(category)} type='button' className='btn btn-sm btn-dark btn-nav' key={index}>{category}</button>);
            }
        } else {
            if (navigation === category) {
                return (<button type='button' className='btn btn-sm btn-success btn-nav disabled' tabIndex='-1' aria-disabled='true' key={index}>{category}</button>);
            } else {
                if (category === 'Classes' && (navigation === 'Proficiencies' || navigation === 'Spells')) {
                    switch (navigation) {
                        case 'Proficiencies':
                            return (<button onClick={() => navigate(category)} type='button' className='btn btn-sm btn-dark btn-nav' key={index}>{category}</button>);
                        default:
                            return (<button onClick={() => navigate(category)} type='button'className='btn btn-sm btn-dark btn-nav' key={index}>{category}</button>);
                    }     
                } else {
                    return (<button onClick={() => navigate(category)} type='button' className='btn btn-sm btn-dark btn-nav' key={index}>{category}</button>);
                }
            }
        }                
    });
    return (<div className='col-12 text-center navigation'>
                {navButtons}
            </div>);
}
export default Navigation