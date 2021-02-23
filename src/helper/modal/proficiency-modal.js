import React from 'react'
import { Component } from 'react';
import isSelected from '../helper-functions'
export default class ProficiencyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            proficiencies: [],

        }
    }

    showProficiency() {
        const { proficiencies } = this.props
        console.log("showProficiency()", proficiencies)
        let proficiencyDescriptions = []
        for (var a = 0; a < proficiencies.length; a++) {
            proficiencyDescriptions[a] = proficiencies[a].desc.map((desc, index) => {
                console.log(desc);
                return (<p className='' key={index}>{desc}</p>);
            });
        }    
        return proficiencyDescriptions;
        
      //  return null;
    }

    render() {
        //console.log("proficiency modal: ", this.props.proficiency);
      //  proficiency \
        const { proficiencies, classSelected } = this.props;
        const startingProficienciesTitle = classSelected.name+" starting proficiencies"
        return (<div className=' info-modal'>
            <div className="modal fade" id='proficiency-info' tabIndex="-1" role="dialog" aria-labelledby="proficiencyInfo" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="proficiencyInfo">{proficiencies.length === 1 ? proficiencies[0].name : startingProficienciesTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.showProficiency()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}