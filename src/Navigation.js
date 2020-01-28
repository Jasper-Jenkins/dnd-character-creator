import React from 'react'

const Navigation = (props) => {
    console.log("navigation props", props)

    let navbuttons = props.navigationCategories.map((category, index) => {
        return <button onClick={() => props.navigate(category)} className='btn btn-primary' key={index}>{category}</button>
    })
    return (<div className="col-12 text-center navigation">{navbuttons}</div>);
}
export default Navigation