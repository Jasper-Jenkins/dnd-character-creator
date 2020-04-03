import React, { Component, createElement } from 'react' 
const cE = createElement; // you dont need this... the createElement above does the job

class FormFind extends Component {
    constructor(props) {
        super(props);
        this.state = { //intitialized the state, with all properties I plan on having in it 
            firstName: "", 
            lastName: "",
            email: "",
            phone: "",
            numberOfTravelers: "",
            dateTrip: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //there are two functions that I did not bind directly in the constructor
        //formCreate = () => {}
        //formDisplay = () => {}
        //When written in this format they function as if you had bound them in the constructor 
        //as you did handleChange() and handleSubmit()

    }
         
    handleChange(event) {
        //you had this function creating a new key:value pair with 'value' as the key, not a value from any input 
        //but the string 'value' was being used as the key, and you were giving it a value of undefined because
        //event.target.firstName isnt a part of the input element you just used, instead you would use the name 
        //property of the input element. 
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { firstName, lastName } = this.state
        const fullName = firstName + " " + lastName;

        alert('Your information is: ' + fullName);        
    }

    formCreate = (props) => {
        console.log("PROPS", props)
        let formMake = createElement(
            "label",
            { key: props.key },
            createElement("br", {}),
            (createElement(
                "input",
                {
                    type: "text",
                    name: props.item.text,
                    placeholder: props.item.placeholder,
                    size: "auto",
                    required: "required",
                 //   onChange: (e) => this.handleChange(e),

                    //You have a handleChange() function that wasnt being used, and
                    //you were trying to setState({}) similar to the way I explained it on the 
                    //handleChangea() function. 

                    // If you would like to use setState()
                    onChange: (e) => this.setState({ [e.target.name]: e.target.value }),
                    value: this.state[props.item.text],
                }
            ))
        )

        console.log("CHECKING", this.state[props.item.text])

        return formMake
    }

    formDisplay = () => { 
        let props = [{ id: 10, text: "firstName", placeholder: "Please Enter Your First Name" },
        { id: 11, text: "lastName", placeholder: "Please Enter Your Last Name" },
        { id: 12, text: "email", placeholder: "Please Enter Your Email" },
        { id: 13, text: "phone", placeholder: "Please Enter Your Phone Number" },
        { id: 14, text: "numberOfTravelers", placeholder: "Please Enter The Number of Children and Adults Going" },
        { id: 15, text: "dateTrip", placeholder: "Please Enter Your Date For The Trip" }];
        const listItems = props.map((item) => this.formCreate({ key: item.id, item: item }));

        return (cE("div", {}, listItems));
        //the above cE() is the React.createElement() that we initialized at the top, cE is ambiguous
        //and was used only to press that intializing React.createElement() twice, lines 1 & 2, before using 
        //it is unnecessary and names that are stripped down to far are confusing and bad practice.  

    }
    render() {          
        
        var x = this.formDisplay();
        return createElement("form", { onSubmit: this.handleSubmit }, (x), createElement("input", { type: "submit", value: "Submit" }));
    }
}

export default FormFind 

