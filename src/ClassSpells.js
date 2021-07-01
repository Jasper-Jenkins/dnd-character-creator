import React, { Component } from 'react';
import isSelected from './helper/helper-functions';
import SpellModal from './helper/modal/spell-modal';

class ClassSpells extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classSelected: {},
            classSpells: [], 
            spellSlots: [0,0], 
            spellsAvailableByLevel: [],
            spellsChosen: [],
            levelData: {},
            navigationCategory: 0,
            selected: false, 
            spellBook: [],
            spells: {},
            spellsInfo: [],
            selectedSpell: {},
        };
       // this.spellSlots = this.spellSlots.bind(this);
        this.spellBook = this.spellBook.bind(this);
        this.getSpells = this.getSpells.bind(this);
       // this.getSpellInfo = this.getSpellInfo.bind(this);   
        this.setSpellInfo = this.setSpellInfo.bind(this);
    }

    componentDidMount() {   
        if (isSelected(this.props.classSelected) && this.props.classSelected.spellcasting !== undefined) {        
            if (this.props.spellsInfo.length === this.props.spells.count) {
                this.setState({ spells: this.props.spells, spellsInfo: this.props.spellsInfo, })
               // this.spellSlots(); 
                this.setClassSpells(1, this.props.spellsInfo);
                this.spellBook();
            } else {
                this.getSpells();
            //    this.spellSlots();
                this.spellBook();
            }
        } else {
            console.log("not a caster");
        }
    }

    componentWillUnmount() {
        if (this.state.spellsInfo.length === this.state.spells.count) {
            this.props.setSpells(this.state.spells);
            this.props.setSpellsInfo(this.state.spellsInfo);    
        }
    }   
    
    getSpells() {
        const { classSelected } = this.props;
        const url = 'https://www.dnd5eapi.co'
        fetch(url + classSelected.spells)
            .then(result => result.json())
            .then(result => { this.setState({ spells: result, }, this.getSpellInfo(result)) })
            .catch(e => { console.log(e + " -- getSpells() -- " + url); });
    }

    getSpellInfo(data) {             
        let info = [];
        const url = 'https://www.dnd5eapi.co';
        for (let i = 0; i < data.results.length; i++) {
            fetch(url + data.results[i].url)
                .then(result => result.json())
                .then(result => { info.push(result); if (this.state.spellsInfo.length === this.state.spells.count) { this.setClassSpells(1, info) }})
                .catch(e => { console.log(e + " -- getSpellInfo() -- " + url); });
        }
        this.setState({ spellsInfo: info, });      
    }
    
    setClassSpells(level, spellsInfoData) {       
        const spellsInfo = spellsInfoData;    
        let spells = [];
        switch (level) {
            case 1:
                for (let i = 0; i < spellsInfo.length; i++) {
                       if (spellsInfo[i].level <= level) {
                           spells.push(spellsInfo[i]);
                       }
                }
                this.setState({
                    classSpells: spells,
                });
               break;
            default:
                alert("level of character is invalid in spells creation. ");
        }
    }

   
    spellBook() { // was chooseSpells(), use to search out other places in code to make changes.
        const { classSelected } = this.props;
        const { levelData, abilityScoresModifiers } = this.props;
       
        let modifier = 0; 
        
        console.log(" -- spellBook() -- ", this.props);
        let spellCountAvailableAtLevelOne = [];
        if (levelData.spellcasting !== undefined) { // checked when component mounts, should I check spells_known instead?
            if (levelData.spellcasting.cantrips_known !== undefined) { // Cantrips for all classes checked
                spellCountAvailableAtLevelOne[0] = levelData.spellcasting.cantrips_known;
            } else {
                spellCountAvailableAtLevelOne[0] = 0; //this is catch for class without use of cantrips
            }
            if (levelData.spellcasting.spells_known !== undefined) {
                spellCountAvailableAtLevelOne[1] = levelData.spellcasting.spells_known;
                console.log("Setting up amount of spells known for " + classSelected.name + " to choose from at level " + levelData.level + ". Spells known: " + levelData.spellcasting.spells_known + ". ");
                //switch (classSelected.name) {
                //    case 'Bard':                          
                //        //Cantrips
                //        //Spells known
                //    case 'Ranger':
                //        //No Cantrips
                //        //Spells known
                //    case 'Sorcerer':                        
                //        //Cantrips
                //        //Spells known
                //    case 'Warlock':                        
                //        //Cantrips
                //        //Spells known   
                //        break;
                //    default:
                //        break;
                //}
            } else {
                if (abilityScoresModifiers[classSelected.spellcasting.spellcasting_ability.index] !== undefined) {
                    console.log(abilityScoresModifiers);
                    modifier = abilityScoresModifiers[classSelected.spellcasting.spellcasting_ability.index];
                } else {
                    console.log("Something aint right cletus");
                }
                spellCountAvailableAtLevelOne[1] = modifier + levelData.level;
                console.log(abilityScoresModifiers[classSelected.spellcasting.spellcasting_ability.index], "Setting up spells known based on ability score modifiers + character level: " + classSelected.name + ". Modifier: " + modifier + ", level " + levelData.level);
                if (classSelected.name === 'Wizard' && levelData.level === 1) {
                    spellCountAvailableAtLevelOne[1] = 6;
                }

                //switch (classSelected.name) {
                //    case 'Cleric':
                //        //Cantrips
                //        //wisdom modifier + level 
                //    case 'Druid':
                //        //Cantrips
                //        //wisdom modifier + level 
                //    case 'Paladin':
                //        //No Cantrips
                //        //Charisma modifier + leve1/2 rounding down. no spells available at level 1. 
                //    case 'Wizard':
                //        //Cantrips                        
                //        //Intelligence modifier + level, gets 6 spells in spell book at level 1
                //      break;
                //    default:

                //        break;
                //}
            }            
        }
        this.setState({ // need to change key name from 'spellSlots' to something else that matches how many can be added to the spellbook not how many can be casted
            spellSlots: spellCountAvailableAtLevelOne,
        }, this.props.updateSpellSlots(spellCountAvailableAtLevelOne));
    }

    //spellSlots() { // this function assumes the level of the character is already resolved and the data for that level has been retrieved: 'levelData'
    //    const { classSelected } = this.props;
    //    const { levelData } = this.props;
    //    let slotsAvailable = [];
    //    if (levelData.spellcasting !== undefined) {
    //        if (classSelected.name === 'Ranger' || classSelected.name === 'Paladin') {        
    //            for (let i = 1; i < 6; i++) {
    //                if (levelData.spellcasting['spell_slots_level_' + i] !== 0) {
    //                    slotsAvailable[i] = levelData.spellcasting['spell_slots_level_' + i]; 
    //                }
    //            }
    //        } else {
    //            slotsAvailable[0] = levelData.spellcasting.cantrips_known;
    //            console.log(levelData);
    //            for (let k = 1; k < 10; k++) {
    //                if (levelData.spellcasting['spell_slots_level_' + k] !== 0) {
    //                    slotsAvailable[k] = levelData.spellcasting['spell_slots_level_' + k];
    //                }
    //            }                
    //        }
    //    }
    //    this.setState({
    //        spellSlots: slotsAvailable,
    //    }, this.props.updateSpellSlots(slotsAvailable));
    //}      

    updateSpells = (spell) => {
        const { spellsChosen } = this.props;
        let spells = [...spellsChosen, spell];
        this.setState({
            spellsChosen: spells,
        });
        this.props.setChosenSpells(spells); //parent spells update so Info can display chosen spells
    }

    spellsChosenByLevel = () => { //this will only work for level one character creation. Works for this app as its for level one only. 
        const { spellsChosen } = this.props;
        let cantrips = 0;
        let levelOneSpells = 0;
        let spells = [];
        for (let i = 0; i < spellsChosen.length; i++) {
            if (spellsChosen[i].level === 0) {
                cantrips++;
            } else if (spellsChosen[i].level === 1) {
                levelOneSpells++;
            }
        }
        spells.push(cantrips);
        spells.push(levelOneSpells);
        return spells;
    }

    spellSource = (spell, currentLevel) => { // DUDE! this needs some loving. refactor this.
        const { classSelected } = this.props;
        const { spellsChosen } = this.props;
        const { spellSlots } = this.state;
      
        let cantrips = 0;
        let levelOneSpells = 0;
        let level0, level1 = 0;
        [level0, level1] = spellSlots;
        let message = "You cannot add " + spell.name + " to your spell book.";        
        switch(classSelected.name) {
            case "Barbarian":
                break;
            case "Bard":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < level0 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }
                if (levelOneSpells < level1 && spell.level === 1) {
                    this.updateSpells(spell);
                    break;
                }               
                this.props.updateAlertMessage(message);
                break;
            case "Cleric":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
              
                if (cantrips < level0 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }

                if (levelOneSpells < level1 && spell.level === 1) {
                    this.updateSpells(spell);
                    break;
                }
                
                this.props.updateAlertMessage(message);
                break;
            case "Druid":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < level0 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }
                if (levelOneSpells < level1 && spell.level === 1) {
                    this.updateSpells(spell);
                    break;
                }               
                this.props.updateAlertMessage(message);
                break;
            case "Fighter":
                break;
            case "Monk":
                break;
            case "Paladin":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
               [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < level0 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }

                if (levelOneSpells < level1 && spell.level === 1) {
                    this.updateSpells(spell);
                    break;
                }
                break;
            case "Ranger":        
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < level0 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }
                if (levelOneSpells < level1 && spell.level === 1) {
                    this.updateSpells(spell);
                }
                break;
            case "Rogue":
                break;
            case "Sorcerer":
                //if (spellsChosen.length === 0) {
                //    this.updateSpells(spell);
                //    break;
                //}               
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < 4 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }

                if (levelOneSpells < 2 && spell.level === 1) {
                    this.updateSpells(spell);
                    break;
                }
               
                this.props.updateAlertMessage(message);
                break;
            case "Warlock":
               
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < 2 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                }

                if (levelOneSpells < 2 && spell.level === 1) {
                    this.updateSpells(spell);
                    break;
                }
               
                this.props.updateAlertMessage(message);
                break;
            case "Wizard":
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                console.log("Cantrips: ", level0, " level one spells: ", level1);
                if (cantrips < level0 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                } 
                if (levelOneSpells < level1 && spell.level === 1) { //breaks UI, they can choose 6, but can only equip 2, so the UI shows up at -4.
                    this.updateSpells(spell);
                    break;
                }               
                this.props.updateAlertMessage(message);
                break;
            default:
                break;
        }              
    }

    
    
    addSpell = (spell) => {
        const { setSelectedSpell } = this.props;
        this.spellSource(spell, 1);
        setSelectedSpell(spell)
    }

    removeSpell = (spell) => {
        const { spellsChosen } = this.props
        const { setSelectedSpell } = this.props
        let spells = []
        for (let i = 0; i < spellsChosen.length; i++) {
            if (spellsChosen[i].name !== spell.name) {
                spells.push(spellsChosen[i])
            }
        }
        this.setState({
            spellsChosen: spells,
        });
        this.props.setChosenSpells(spells)
        setSelectedSpell({})
    }

    setNavigationCategory(newCategory) {
        this.setState({ navigationCategory: newCategory, });
    }

    spellsNavigation() {     
        const { navigationCategory } = this.state;
        const { spellSlots } = this.state;
        let buttons = [];
        let spellsSlots = this.spellsChosenByLevel();
        for (let a = 0; a < spellSlots.length; a++) {
            let newCategory = a;
            let num;
            num = spellsSlots[a];            
            if (navigationCategory === a) {
                buttons.push(<button className='btn-sm btn btn-primary' onClick={() => void (0)} key={a}> Choose: {spellSlots[a] - num}</button>)
            } else {
                buttons.push(<button className='btn-sm btn btn-seconday color-white' onClick={() => this.setNavigationCategory(newCategory)} key={a}>Choose: {spellSlots[a] - num}</button>)
            }
        }
        return (<div className='col-12'>{buttons}</div>);
    }

    setSpellInfo(spell) {
        this.setState({ selectedSpell: spell });
    }

    displaySpells = () => {
        const { classSelected } = this.props;
        const { classSpells } = this.state;
        const { spellSlots } = this.state;
        const { spellsChosen } = this.props;
        let spellChoices = []; 
        let spellChoiceDisplay = [];
       //let target = ''
        console.log(classSpells);
        if (classSelected.spellcasting === undefined) {
            spellChoiceDisplay[0] = <div className='card-body ' key='no-known-spells'><h3 className='card-text text-center'>You do not have spells as a {classSelected.name}</h3></div>
            return (spellChoiceDisplay);
        }

        if (classSpells.length < 1 && classSelected.name !== 'Paladin' && classSelected.name !== 'Ranger') {
            const element = <h2 className='text-center'>Retrieving spells...</h2> //Need to figure out why I cant put this in the return() without doing it this way
            const stillLoading = [element,];
            return (stillLoading);
        } else {
            console.log("Well");
            for (let a = 0; a < spellSlots.length; a++) {
                const slotLevel = a;
                let slotSpells = classSpells.filter((spell) => {
                    return (spell.level === slotLevel ? spell : null);
                });
                spellChoices[slotLevel] = slotSpells.map((spell, index) => {
                    let classNames = 'btn btn-md ';
                    //let target = '#spell-' + spell.index;
                    //if (spell.damage !== undefined) { // Is there a better way to style by damage type?
                    //    if (spell.damage.damage_type !== undefined) {
                    //        classNames += spell.damage.damage_type.index + " ";
                    //    }
                    //}
                    if (spellsChosen.length === 0) {
                        classNames += 'btn-secondary col-11';
                        return (<div className="btn-group col-12 spell-selection" role="group" aria-label="spell-buttons" key={index}>
                            <button className={classNames} type='button' onClick={() => this.addSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>
                            <button className='btn btn-sm btn-primary ' type='button' data-toggle="modal" data-target='#spell-info' onClick={() => { this.setSpellInfo(spell) }} key={'info-btn-spell' + spell.name}>?</button>
                        </div>);
                    }
                    for (let b = 0; b < spellsChosen.length; b++) {
                        let chosen = b;
                        if (spellsChosen[chosen].name === spell.name) {
                            classNames += 'btn-success col-11';
                            return (<div className="btn-group col-12 spell-selection" role="group" aria-label="spell-buttons" key={index}>
                                <button className={classNames} type='button' onClick={() => this.removeSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>
                                <button className='btn btn-sm btn-primary ' type='button' data-toggle="modal" data-target='#spell-info' onClick={() => { this.setSpellInfo(spell) }} key={'info-btn-spell' + spell.name}>?</button>

                            </div>);
                        }
                    }
                    classNames += 'btn-secondary col-11';
                    return (<div className="btn-group col-12 spell-selection" role="group" aria-label="spell-buttons" key={index}>
                        <button className={classNames} onClick={() => this.addSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>
                        <button className='btn btn-sm btn-primary ' type='button' data-toggle="modal" data-target='#spell-info' onClick={() => { this.setSpellInfo(spell) }} key={'info-btn-spell' + spell.name}>?</button>

                    </div>);
                });
            }            
            // console.log("what", spellChoices)

            if (spellChoices.length === 0) {
                spellChoiceDisplay[0] = <div className='card-body ' key='no-known-spells'><h3 className='card-text text-center'>You have no spells to choose from at level 1</h3></div>
            }

            for (let b = 0; b < spellChoices.length; b++) {
                if (b === 0) {
                    // console.log("HERE");                    
                    spellChoiceDisplay[b] = <div className='card-body ' key='cantrips'><h3 className='card-text text-center'>Cantrips</h3>{spellChoices[b]}</div>
                   
                } else {
                    let keyForThee = "spellLevel";
                    spellChoiceDisplay[b] = <div className='card-body ' key={keyForThee + b}><h3 className='card-text text-center'>Level {b} spells</h3>{spellChoices[b]}</div>
                }
            }
            return (spellChoiceDisplay);
        }       
    }  
    
    render() {        
        const { navigationCategory } = this.state; 
        const { selectedSpell } = this.state;
        const { classSelected } = this.props;
        const spells = this.displaySpells();
        return ( isSelected(this.props.classSelected) ?
            <div className='col-12 selection'>
                <div className="col-12 text-center selectionTitle">
                    <h3>{classSelected.name} Spellsss</h3>
                </div>
                <div className='row'>
                    <div className="card col-12 border-dark mb-3 character-card ">
                        <div className="card-header text-white bg-dark text-center">
                            {this.spellsNavigation()}
                        </div>                        
                        {spells[navigationCategory]}
                        <SpellModal spell={selectedSpell} />
                    </div>
                </div>
            </div> :
            <div className='col-12 selection'>
                <h3 className="col-12 text-center selectionTitle">Choose a class to select your spells.</h3>
            </div>);
    }
}

//Druid can select unlimited spells... fix this.



export default ClassSpells;