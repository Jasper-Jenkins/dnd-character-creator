import React from 'react'

const Navigation = (props) => {
    console.log("Navigation", props)
    const navigationCategories = props.navigationCategories
    const navigate = props.navigate   

    let navbuttons = navigationCategories.map((category, index) => {
        return (<button onClick={() => navigate(category)} className='btn btn-primary' key={index}>{category}</button>);
    });
    return (<div className="col-12 text-center navigation">{navbuttons}</div>);
}
export default Navigation