import React, { Component } from 'react'
import isSelected from '../helper/helper-functions'

export default class CharacterClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classSelected: {},
        }
        this.buttons = this.buttons.bind(this);
        this.selectClass = this.selectClass.bind(this);
    };   

    componentDidMount() {
        if (isSelected(this.props.classSelected)) {
            this.setState({ classSelected: this.props.classSelected, });
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

    buttons() {
        const { classes } = this.props
        const { classSelected } = this.state;

        let classButtons = classes.results.map((characterClass) => {
            if (isSelected(classSelected) && classSelected.index === characterClass.index) {
                //console.log("selection disabled for class");
                return (<button className='selectionButtons buttonSelected col-4' key={characterClass.index}>{characterClass.name}</button>);
            }
            return (<button onClick={() => this.selectClass(characterClass.index)} className='selectionButtons col-4' key={characterClass.index}>{characterClass.name}</button>);

        });       
        return classButtons;
    }

    render() {
        return (<div className="row">
                    <div className="col-12 text-center selection">
                        {this.buttons()}
                    </div>
                </div>);
    }
}

