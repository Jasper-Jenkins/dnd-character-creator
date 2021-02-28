import React from 'react'
import isSelected from '../helper-functions'

export default function ProficiencyModal(props){
    function showProficiency() {
        const { proficiencySelectedInfo } = props;         
        if (isSelected(proficiencySelectedInfo)) {
             let description = proficiencySelectedInfo.desc.map((desc, index) => {
                return (<p className='' key={index}>{desc}</p>);
             });
            return description;
        }
       
        return null;      
    }
    const { proficiencySelectedInfo } = props;
    const noProficiencyTitle = "Choose a proficiency."        

    return (<div className=' info-modal'>
            <div className="modal fade" id='proficiency-info' tabIndex="-1" role="dialog" aria-labelledby="proficiencyInfo" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="proficiencyInfo">{isSelected(proficiencySelectedInfo) ? proficiencySelectedInfo.name : noProficiencyTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {showProficiency()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>);
}