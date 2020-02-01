import React from 'react'

const ClassProficiencies = props => {
    const { classProficiencies } = props
    const { classProficienciesChoices } = props
    const { addProficiency } = props
    const { removeProficiency } = props
    
    let currentProficiencies = classProficiencies.map((proficiency) => {
        if (proficiency.index === undefined) {
            return (<button key={proficiency.name}>{proficiency.name}</button>);
        } else {
            return (<button onClick={() => removeProficiency(proficiency.name, proficiency.index)} key={proficiency.name}>{proficiency.name}</button>);
        }
    })
    
    let proficienciesToChooseFrom = [];

    for (var i = 0; i < classProficienciesChoices.length; i++) {
        let choiceArrayIndex = i;
        const chooseProficiencies = classProficienciesChoices[i].from.map((proficiency) => {
            return (<button onClick={() => addProficiency(proficiency.name, choiceArrayIndex)} key={proficiency.name}>{proficiency.name}</button>);
    })
        proficienciesToChooseFrom.push(<div className='col-4 chooseProficiency' key={i}>{chooseProficiencies}</div>)
    }    
       
    return (<div className='row'>
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-12'>
                            {currentProficiencies}
                         </div>
                    </div>
                    <div className='row'>
                        {proficienciesToChooseFrom}
                    </div>
                </div>
            </div>);

}


export default ClassProficiencies