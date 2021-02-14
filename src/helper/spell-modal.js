import React from 'react'
import { Component } from 'react';
import isSelected from './helper-functions'
export default class SpellModal extends Component {
    constructor(props) {
        super(props)
       
    }

  

    showSpell() {
        const { spell } = this.props
        let spellDescriptions = spell.desc.map((desc, index) => {
            return (<p className='' key={index}>{desc}</p>);
        });
        return spellDescriptions;
    }

    render() {
        console.log("spell modal: ", this.props.spell);
        return (<div className=' info-modal'>
            <div className="modal fade" id={'spell-'+this.props.spell.index} tabIndex="-1" role="dialog" aria-labelledby="spellInfo" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="spellInfo">{this.props.spell.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.showSpell()}
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