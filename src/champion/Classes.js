import React, { Component } from 'react'
import isSelected from '../helper/helper-functions'
import SearchBar from '../helper/search-bar'
import SearchResults from '../helper/search-modal'

export default class CharacterClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: {},
            classesInfo: [],
            classSelected: {},           
            searchResults:[],
            word: '',
        }
       
        this.selectClass = this.selectClass.bind(this);
      //  this.classCards = this.classCards.bind(this);
    };   

    componentDidMount() {
        if (isSelected(this.props.classSelected)) {
            this.setState({ classSelected: this.props.classSelected, });
        }
        if (isSelected(this.props.classes)) {
            this.setState({ classes: this.props.classes, classesInfo: this.props.classesInfo, })
        } else {
            this.getClasses();
        }
    }

    componentWillUnmount() {
        if (!isSelected(this.props.classes)) { //need a better check for all the information
            console.log("first time");
            this.props.setClasses(this.state.classes);
            this.props.setClassesInfo(this.state.classesInfo);
        } else {
            console.log("every other time");
        }
        
    }


    getClasses() {
        console.log("Getting Classes")
        const url = 'https://www.dnd5eapi.co/api/'
        fetch(url + 'classes')
            .then(result => result.json())
            .then(result => { this.setState({ classes: result, }, this.getInfo(result)); })
            .catch(e => { console.log(e + " -- getClasses() -- " + url); });

    }

    getInfo(data) {
        console.log(data);
        let info = []
        const url = 'https://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            fetch(url + data.results[i].url)
                .then(result => result.json())
                .then(result => { this.setState((state) => ({ classesInfo: [...state.classesInfo, result] })) });
        }        
    }


    selectClass(index) {
        const { classesInfo } = this.props;
        const { setClass } = this.props;
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const classSelected = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name });
                this.setState({ classSelected: classSelected[0], });
                setClass(classSelected[0]);
                break;
            }
        }        
    } 

    //classProficiences(championClass) {
    //    let proficiencies = "";
    //    let count = 0;
    //    proficiencies = championClass.proficiencies.map((prof) => {
    //        if (count === championClass.proficiencies.length - 1) {
    //            return (prof.name + ". ");
    //        } 
    //        count++;
    //        return (prof.name + ", ");
    //    });
    //    return (proficiencies);
    //}

    //classSavingThrows(championClass) {
    //    let savingThrows = '';
    //    savingThrows = championClass.saving_throws.map((savingThrow) => {
    //        return (savingThrow.name + " ")
    //    });
    //    return savingThrows;
    //}

    //classCards() {
    //    const { classesInfo } = this.state;
    //    let classCards = classesInfo.map((championClass) => {
    //        //let bonuses = this.abilityBonuses(race);
    //        return (<div className="card border-dark mb-3 " key={championClass.index}>
    //            <div className="card-header text-white bg-dark text-center">
    //                <h4>{championClass.name}</h4>
    //            </div>
    //            <div className="card-body">
    //                <p className="card-text"><strong>Hit die:</strong> {championClass.hit_die}</p>
    //                <p className="card-text"><strong>Starting proficiencies:</strong> {this.classProficiences(championClass)}</p>
    //                <p className="card-text"><strong>Saving Throws:</strong> {this.classSavingThrows(championClass)}</p>
    //                <p className="card-text">{}</p>
    //                <p className="card-text">{}</p>
    //                <p className="card-text">{}</p>
    //                <button className="btn btn-primary" onClick={() => this.selectClass(championClass.index)}>Choose {championClass.name}</button>
    //            </div>
    //        </div>);
    //    });
    //    return (classCards);
    //}


    searchClasses = (word) => {
        const { classesInfo } = this.state;
        this.setState({
            word: word,
        });
        let oldList = classesInfo.map((characterClass) => {
            return characterClass;
        });
        let newList = [];
        if (word !== "") {
            newList = oldList.filter(characterClass => characterClass.index.includes(word.toLowerCase()));            
            this.setState({ searchResults: newList, });
        } else {
            console.log(newList);
            this.setState({ searchResults: oldList, });
        }
    }

    render() {
        const { word } = this.state;
        const { searchResults } = this.state;
        const { classesInfo } = this.state;
        return (<div className="col-12 selection">
                <div className="col-12 selectionTitle">
                    <h2 className="text-center">Choose your Class</h2>
                    <SearchBar value={word} handleChange={e => this.searchClasses(e.target.value)} />
                    </div>
                    <SearchResults champions={word !== '' ? searchResults: classesInfo} category='classes' select={this.selectClass} />
                </div>);
    }
}

