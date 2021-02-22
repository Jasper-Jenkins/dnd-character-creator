import React, { Component } from 'react';
import isSelected from './helper/helper-functions';
import SpellModal from './helper/spell-modal';

class ClassSpells extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classSelected: {},
            classSpells: [], 
            spellSlots: [], 
            spellsChosen: [],
            levelData: {},
            navigationCategory: 0,
            selected: false, 
            spellBook: {},
            spells: {},
            spellsInfo: [],
            selectedSpell: {},
        };
        this.spellSlots = this.spellSlots.bind(this);
        this.getSpells = this.getSpells.bind(this);
        this.getInfo = this.getInfo.bind(this);   
        this.setSpellInfo = this.setSpellInfo.bind(this);
    }

    componentDidMount() {   
        if (isSelected(this.props.classSelected) && this.props.classSelected.spellcasting !== undefined) {
           // this.setState({ selected: true, });
            
            // character level: 1
            if (this.props.spellsInfo.length === this.props.spells.count) {
                console.log("setting spells from props")
                this.setState({ spells: this.props.spells, spellsInfo: this.props.spellsInfo, })
                this.spellSlots();
                this.setClassSpells(1, this.props.spellsInfo);
            } else {
                console.log("setting spells from api")
                this.getSpells();
                this.spellSlots();
             //   this.setClassSpells(1);
            }
        } else {
            console.log("not a caster")
        }
    }

    componentWillUnmount() {
        if (this.state.spellsInfo.length === this.state.spells.count) {
            this.props.setSpells(this.state.spells)
            this.props.setSpellsInfo(this.state.spellsInfo)
       //     console.log("checked it");
        }
    }   
    
    getSpells() {
        const { classSelected } = this.props;
        const url = 'https://www.dnd5eapi.co'
        fetch(url + classSelected.spells)
                .then(result => result.json())
                .then(result => { this.setState({ spells: result, }, this.getInfo(result)); console.log('getSpell() result: ', result) })
                .catch(e => { console.log(e + " -- getSpells() -- " + url); });
    }

    getInfo(data) {
        const { classSelected } = this.props;
        console.log(classSelected.name, ' spells ', data);
        let info = []
        const url = 'https://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            fetch(url + data.results[i].url)
                .then(result => result.json())
                .then(result => { info.push(result); if (this.state.spellsInfo.length === this.state.spells.count) { this.setClassSpells(1, info) } /* console.log('getInfo() for spells request: ', result)*/ })
                .catch(e => { console.log(e + " -- getInfo() for spells -- " + url); });
        }
        this.setState({ spellsInfo: info });      
    }

    setClassSpells(level, spellsInfoData) {
       // const { classSelected } = this.props;
        const spellsInfo = spellsInfoData;
     //   const { spellsInfo } = this.state;
        let spells = [];

        console.log('setClassSpells ', spellsInfo)
        switch (level) {
            case 1:
                for (var i = 0; i < spellsInfo.length; i++) {
                       if (spellsInfo[i].level <= level) {
                           spells.push(spellsInfo[i])
                       }
                }
                this.setState({
                    classSpells: spells,
                });
                console.log("state classSpells updated", spells);
                break;
            default:
                alert("level of character is invalid in spells creation. ")
        }
    }



    //getLevelData(currentLevel) { //
    //    const { classSelected } = this.props; 
    //   // console.log("getLeveData()");
    //    //let level = {}; 
    //    const url = 'https://www.dnd5eapi.co'
    //    Promise.resolve(fetch(url + "/api/classes/" + classSelected.index + "/levels/" + currentLevel))
    //        .then(result => result.json())
    //        .then(result => {
    //            this.setState({
    //                levelData: result,
    //            }, this.props.setLevelData(result));
    //        });
        
        
    //}

    spellSlots() { // this function assumes the level of the character is already resolved and the data for that level has been retrieved: 'levelData'
        const { classSelected } = this.props;
        const { levelData } = this.props;
        let slotsAvailable = [];
        console.log("spellSlots(), levelData: ", levelData)
        if (levelData.spellcasting !== undefined) {
            if (classSelected.name === 'Ranger' || classSelected.name === 'Paladin') {        
                for (var i = 1; i < 6; i++) {
                    if (levelData.spellcasting['spell_slots_level_' + i] !== 0) {
                        slotsAvailable[i] = levelData.spellcasting['spell_slots_level_' + i]; 
                        console.log(classSelected.name, " spell slots available: ", slotsAvailable[i])
                    }
                }
            } else {
                slotsAvailable[0] = levelData.spellcasting.cantrips_known;
                for (var k = 1; k < 10; k++) {
                    if (levelData.spellcasting['spell_slots_level_' + k] !== 0) {
                        slotsAvailable[k] = levelData.spellcasting['spell_slots_level_' + k];
                    }
                }                
            }
        }
        console.log("Slots available ", slotsAvailable);
        this.setState({
            spellSlots: slotsAvailable,
        }, this.props.updateSpellSlots(slotsAvailable));
    }
      

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
        for (var i = 0; i < spellsChosen.length; i++) {
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
        let level0, level1;
        let message = "You cannot add " + spell.name + " to your spell book.";
        
        switch(classSelected.name) {
            case "Barbarian":
                break;
            case "Bard":
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
                [level0, level1] = spellSlots; 
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
                [level0, level1] = spellSlots;
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
                [level0, level1] = spellSlots;
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
                [level0, level1] = spellSlots;
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
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
                [level0, level1] = spellSlots;
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
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }               
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
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                }
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
                console.log("Wizard Spell source. ")
                if (spellsChosen.length === 0) {
                    this.updateSpells(spell);
                    break;
                } 
                [cantrips, levelOneSpells] = this.spellsChosenByLevel();
                if (cantrips < 3 && spell.level === 0) {
                    this.updateSpells(spell);
                    break;
                } 
                if (levelOneSpells < 6 && spell.level === 1) {
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
        for (var i = 0; i < spellsChosen.length; i++) {
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
      //  const { spellsChosen } = this.props;
        const { navigationCategory } = this.state;
        const { spellSlots } = this.state;
        let buttons = [];
        let spellsSlots = this.spellsChosenByLevel();
        for (var a = 0; a < spellSlots.length; a++) {
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
       //let target = ''
        for (var a = 0; a < spellSlots.length; a++) {         
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
                   // console.log("Target, ", target);
                    return (<div className="btn-group col-12 spell-selection" role="group" aria-label="spell-buttons" key={index}>
                        <button className={classNames} type='button' onClick={() => this.addSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>
                        <button className='btn btn-sm btn-primary ' type='button' data-toggle="modal" data-target='#spell-info' onClick={() => { this.setSpellInfo(spell) }} key={'info-btn-spell' + spell.name}>?</button>
                                          </div>);
                }
                for (var b = 0; b < spellsChosen.length; b++) {
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
        let spellChoiceDisplay = [];
        for (var b = 0; b < spellChoices.length; b++) {
            if (b === 0) {
                if (classSelected.name === "Paladin" || classSelected.name === "Ranger") {
                    spellChoiceDisplay[b] = <div className='card-body ' key='no-known-spells'><h3 className='card-text text-center'>You have no spells to choose from at level 1</h3></div>
                } else {
                    spellChoiceDisplay[b] = <div className='card-body ' key='cantrips'><h3 className='card-text text-center'>Cantrips</h3>{spellChoices[b]}</div>
                }                
            } else {
                let keyForThee = "spellLevel";
                spellChoiceDisplay[b] = <div className='card-body ' key={keyForThee + b}><h3 className='card-text text-center'>Level {b} spells</h3>{spellChoices[b]}</div> 
            }            
        }
        return (spellChoiceDisplay);
    }  
    
    render() {        
        const { navigationCategory } = this.state; 
        const { selectedSpell } = this.state;
        const spells = this.displaySpells();
        console.log("Render spells, ", spells);
       // const navigation = this.spellsNavigation();
        
        return ( isSelected(this.props.classSelected) ?
            <div className='col-12 selection'>
                <div className='row'>
                    <div className="card col-12 border-dark mb-3 character-card ">
                        <div className="card-header text-white text-center bg-dark">
                            {this.spellsNavigation()}
                        </div>                        
                        {spells[navigationCategory]}
                        <SpellModal spell={selectedSpell} />
                    </div>
                </div>
            </div> :
            <div className='col-12 text-center selection'>
           <h3>Choose a class to select your spells.</h3>
                </div>);
    }
}




export default ClassSpells;