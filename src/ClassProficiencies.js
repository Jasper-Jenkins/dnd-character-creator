import React from 'react'

const ClassProficiencies = props => {
    const { proficiencies } = props
    const { proficienciesChoices } = props
    const { addProficiency } = props   

    let startingProficiencies = proficiencies.map((proficiency, index) => {
        return (<button key={index}>{proficiency.name}</button>)
    })

    let choicesChoices=[];
    for (var i = 0; i < proficienciesChoices.length; i++) {
        let aIndex = i;
        let chooseProficiencies = proficienciesChoices[i].from.map((proficiency, index) => {
            return (<button onClick={() => addProficiency(proficiency.name, aIndex)} key={proficiency.name}>{proficiency.name}</button>)
    })
         
        choicesChoices.push(<div className='col-4 chooseProficiency' key={i}>{chooseProficiencies}</div>)
    }    
    
    return (<div className='row'>
                <div className='col-12'>
                    <div className='row'>
                         <div className='col-12'>
                            {startingProficiencies}
                         </div>
                    </div>
                    <div className='row'>
                            {choicesChoices}
                    </div>
                </div>
            </div>);

}


export default ClassProficiencies