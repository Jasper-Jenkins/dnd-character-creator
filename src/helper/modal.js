import React, { Component } from 'react'
import isSelected from './helper-functions.js'

//async function getTraits(raceSelected) {
//    const url = 'https://www.dnd5eapi.co'
//    let traitsInfo = [];    
//    if (raceSelected.index === "human") {
//        console.log("Got to the humans")
//    } else {
//        for (var a = 0; a < raceSelected.traits.length; a++) {
//            fetch(url + raceSelected.traits[a].url)
//                .then(result => result.json())
//                .then(result => { console.log(result); traitsInfo.push(result) })
//                .catch(e => { console.log(e + " -- getTraits() -- " + url); });
           
//        }
//    }
    
//    console.log(traitsInfo);
//    return traitsInfo;    
//}



class InfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            traits: [],
        }
        // this.getTraits(props.info);
        this.getTraits = this.getTraits.bind(this);
    }

    componentDidMount() {
        console.log("did it mount?")
        this.getTraits(this.props.info);

    }

    getTraits(raceSelected) {
        const url = 'https://www.dnd5eapi.co'
        //let traitsInfo = [];
        if (raceSelected.index === "human") {
           console.log("Got to the humans")
        } else {
            for (var a = 0; a < raceSelected.traits.length; a++) {
                fetch(url + raceSelected.traits[a].url)
                    .then(result => result.json())
                    .then(result => { this.setState((state) => ({ traits: [...state.traits, result],}))})
                    .catch(e => { console.log(e + " -- getTraits() -- " + url); });
            }
        }     
    }

    showTraits() {
        const { traits } = this.state;
        let info = traits.map((trait) => {
            return (<div key={'trait-'+trait.name}>
                <h5>{trait.name}</h5>
                <p>{trait.desc[0]}</p>
            </div>)
        });
        return info;
    }

    render() {
        const { traits } = this.state;
        const { name } = this.props.info;
        return (<div className='col-1 info-modal'>
            <div className="modal fade" id={'race-'+this.props.info.index} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{name} Traits</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {traits.length !== 0 ? this.showTraits() : "not loaded"}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

//}
//<button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModalLong">
//    i
//            </button> 

//function InfoModal(props) {
//    let traits = [];

//  //  console.log(props.info);

    
//   // traits = getTraits(props.info);
   
//    console.log("Access: ", traits);
//    return (<div className='col-1 info-modal'>
                  
//        <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
//            <div className="modal-dialog" role="document">
//                <div className="modal-content">
//                    <div className="modal-header">
//                        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
//                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                            <span aria-hidden="true" >&times;</span>
//                        </button>
//                    </div>
//                    <div className="modal-body">
//                        <p>{traits[0]}</p>
//                    </div>
//                    <div className="modal-footer">
//                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                        <button type="button" className="btn btn-primary">Save changes</button>
//                    </div>
//                </div>
//            </div>
//        </div>
//    </div>)
    
//}

export default InfoModal