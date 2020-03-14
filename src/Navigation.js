import React from 'react'

const Navigation = (props) => {
    console.log("Navigation", props)
    const navigation = props.navigation
    const navigationCategories = props.navigationCategories
    const navigate = props.navigate

    let navButtons = navigationCategories.map((category, index) => {
        if (navigation === category) {
            return (<button className='navigationButtons disabled' tabIndex='-1' aria-disabled='true' key={index}>{category}</button>);
        } else {
            return (<button onClick={() => navigate(category)} className='navigationButtons' key={index}>{category}</button>);
        }        
    });
    return (<div className="col-12 text-center navigation">{navButtons}</div>);
}
export default Navigation