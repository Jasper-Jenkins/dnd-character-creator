import React from 'react'

const Navigation = (props) => {
    console.log(props)
   
    let navbuttons = props.categories.map((category, index) => {
        return <button onClick={() => props.navigate(category)} className='btn btn-primary' key={index}>{category}</button>
    })
    return (<div className="row">
                <div className="col text-center">{navbuttons}</div>
            </div>);
}
export default Navigation