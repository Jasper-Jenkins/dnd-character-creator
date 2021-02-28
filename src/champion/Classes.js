import React, { Component } from 'react'
import isSelected from '../helper/helper-functions'
import SearchBar from '../helper/search-bar'
import SearchResults from '../helper/search-results'

export default class CharacterClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: {},
            classesInfo: [],
            classSelected: {},           
            searchResults:[],
            word: "",            
        }
        
        this.selectClass = this.selectClass.bind(this);
      //  this.classCards = this.classCards.bind(this);
    };   

    componentDidMount() {
        if (isSelected(this.props.classSelected)) {
            this.setState({ classSelected: this.props.classSelected, });
        }
        if (isSelected(this.props.classes) && this.props.classesInfo.length === 12) {//needs better validation
            this.setState({ classes: this.props.classes, classesInfo: this.props.classesInfo, })
        } else {
            this.getClasses();
        }
    }

    componentWillUnmount() {
        if (this.state.classesInfo.length === 12) {
            this.props.setClasses(this.state.classes);
            this.props.setClassesInfo(this.state.classesInfo);
        }
    }

    getClasses() {
        const url = 'https://www.dnd5eapi.co/api/'
        fetch(url + 'classes')
            .then(result => result.json())
            .then(result => { this.setState({ classes: result, }, this.getInfo(result)); })
            .catch(e => { console.log(e + " -- getClasses() -- " + url); });

    }

    getInfo(data) {
         const url = 'https://www.dnd5eapi.co'
        for (var i = 0; i < data.results.length; i++) {
            fetch(url + data.results[i].url)
                .then(result => result.json())
                .then(result => { this.setState((state) => ({ classesInfo: [...state.classesInfo, result] })) });
        }        
    }

    selectClass(index) {
        const { classesInfo } = this.state;
        const { setClass } = this.props;
        const { navigate } = this.props;
        for (let i = 0; i < classesInfo.length; i++) {
            if (classesInfo[i].index === index) {
                const classSelected = classesInfo.filter(function (cClass) { return cClass.name === classesInfo[i].name });
                this.setState({ classSelected: classSelected[0], }, this.props.getLevelData(classSelected[0].index, 1));
                setClass(classSelected[0]);
                navigate('Ability-Scores');
                break;
            }
        }        
    } 

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
             this.setState({ searchResults: oldList, });
        }
    }

    render() {
        const { word } = this.state;
        const { searchResults } = this.state;
        const { classesInfo } = this.state;
        return (<div className='col-12 selection'>
                    <div className='row selectionTitle'>
                        <h5 className='col-5 text-center choose'>Choose a Class</h5>
                        <SearchBar value={word} handleChange={e => this.searchClasses(e.target.value)} />
                    </div>
                    <div className='row'>
                        <SearchResults champions={word !== '' ? searchResults : classesInfo} category='classes' select={this.selectClass} />
                    </div>
                </div>);
    }
}

