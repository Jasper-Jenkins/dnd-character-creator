import React from 'react'

export default function TraitsModal(props) {
    const { race, traits } = props;


    function showTraits() {
      //  const { traits } = props;    
        let info = traits.map((trait) => {
            return (<div key={'trait-'+trait.name}>
                <h5>{trait.name}</h5>
                <p>{trait.desc[0]}</p>
            </div>)
        });
        return info;
    }

    
    return (<div className='col-1 info-modal'>
        <div className="modal fade" id={'race-traits'} tabIndex="-1" role="dialog" aria-labelledby="raceTraits" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="raceTraits">{race.name} Traits</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {traits.length !== 0 ? showTraits() : "Humans do not have racial traits"}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>                            
                    </div>
                </div>
            </div>
        </div>
    </div>)
}