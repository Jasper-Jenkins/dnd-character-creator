import React from 'react'
import Info from './Info'
import Navigation from './Navigation'
import Selection from './Selection'


const Create = props => { 
    const { navigationCategories } = props
    const { navigation } = props
    const { navigate } = props // function

    const { category } = props // races, classes, ability-scores, proficiencies, spells
    
    if (navigation === navigationCategories[0]) {
        const { races } = props
        const { raceSelected } = props
        const { racesInfo } = props
        const { isRaceSelected } = props
        const { displayRaceInfo } = props

        return (<div className="container-fluid">
            <div className="row creation">
                <div className="col-12">
                    <div className="row">
                        <Info raceSelected={raceSelected} isRaceSelected={isRaceSelected} category={category} />
                    </div>
                    <div className="row">
                        <Selection races={races} racesInfo={racesInfo} displayRaceInfo={displayRaceInfo} category={category} />
                    </div>
                    <div className="row">
                        <Navigation navigationCategories={navigationCategories} navigate={navigate} />
                    </div>
                </div>
            </div>
        </div>);

    } else if (navigation === navigationCategories[1]) {

        const { classes } = props
        const { classSelected } = props
        const { isClassSelected } = props
        const { classesInfo } = props
        const { displayClassInfo } = props
        const { classProficiencies } = props
        const { classProficienciesChoices } = props
        const { addProficiency } = props
        const { removeProficiency } = props

        return (<div className="container-fluid">
            <div className="row creation">
                <div className="col-12">
                    <div className="row">
                        <Info classSelected={classSelected} isClassSelected={isClassSelected} category={category} classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} addProficiency={addProficiency} removeProficiency={removeProficiency} />
                    </div>
                    <div className="row">
                        <Selection classes={classes} classesInfo={classesInfo} displayClassInfo={displayClassInfo} category={category} />
                    </div>
                    <div className="row">
                        <Navigation navigationCategories={navigationCategories} navigate={navigate} />
                    </div>
                </div>
            </div>
        </div>);
    } else if (navigation === navigationCategories[2]) {
        console.log(props)
        const { abilityScores } = props
        const { abilityScoresSelected } = props
        const { category } = props
        const { getScore } = props
        const { handleSubmit } = props

        return (<div className="container-fluid">
            <div className="row creation">
                <div className="col-12">
                    <div className="row">
                        <Info abilityScores={abilityScores} abilityScoresSelected={abilityScoresSelected} category={category} />
                    </div>
                    <div className="row">
                        <Selection abilityScores={abilityScores} getScore={getScore} category={category} handleSubmit={handleSubmit} />
                    </div>
                    <div className="row">
                        <Navigation navigationCategories={navigationCategories} navigate={navigate} />
                    </div>
                </div>
            </div>
        </div>);
    } else if (navigation === navigationCategories[3]) {
        console.log(props)

        const { classSelected } = props
        const { isClassSelected } = props
        const { classProficiencies } = props
        const { classProficienciesChoices } = props
        const { addProficiency } = props
        const { removeProficiency } = props


        return (<div className='container-fluid'>
            <div className='row creation'>
                <div className='col-12'>
                    <div className='row'>
                        <Info classSelected={classSelected} isClassSelected={isClassSelected} category={category} classProficiencies={classProficiencies} classProficienciesChoices={classProficienciesChoices} addProficiency={addProficiency} removeProficiency={removeProficiency} />
                    </div>

                    <div className='row'>
                        <Navigation navigationCategories={navigationCategories} navigate={navigate} />
                    </div>
                </div>
            </div>
        </div>);
    } else if (navigation === navigationCategories[4]) {
        console.log(props)
        const { classSelected } = props
        const { isClassSelected } = props
        const { spellsInfo } = props

        return (<div className='container-fluid'>
                    <div className='row creation'>
                        <div className='col-12'>
                            <div className='row'>
                                <Info classSelected={classSelected} isClassSelected={isClassSelected} spellsInfo={spellsInfo} category={category} />
                            </div>
                            <div className='row'>
                                <Navigation navigationCategories={navigationCategories} navigate={navigate} />
                            </div>
                        </div>
                    </div>
                </div>);
    } else {
        return (<div>Broke something</div>);
    }

   
        
    

}







export default Create