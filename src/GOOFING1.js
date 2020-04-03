'use strict'

let d = React.createElement;



class FormFind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }




    handleChange = (event) => {
        this.setState({
            value: event.target.firstname
        });
    }

    handleSubmit(event) {
        alert('Your information is: ' + this.state.value);
        event.preventDefault();
    }


    render() {


        function FormCreate(props) {
            let formMake = React.createElement("label", { key: props.id }, React.createElement("br", {}), (React.createElement("input",
                {
                    type: "text", name: props.item.text, placeholder: props.item.placeholder, size: "auto", required: "required", onChange: (e) => this.setState({ value: e.target.value }),
                    value: this.state.value
                })))

            return formMake
        }

        function FormDisplay() {
            let props = [{ id: 10, text: "fname", placeholder: "Please Enter Your First Name" },
            { id: 11, text: "lname", placeholder: "Please Enter Your Last Name" },
            { id: 12, text: "email", placeholder: "Please Enter Your Email" },
            { id: 13, text: "Phone", placeholder: "Please Enter Your Phone Number" },
            { id: 14, text: "numtravelers", placeholder: "Please Enter The Number of Children and Adults Going" },
            { id: 15, text: "datetrip", placeholder: "Please Enter Your Date For The Trip" }];
            var listItems = props.map((item) => FormCreate({ key: props.id, item: item }));

            return (
                React.createElement("div", {}, listItems))
                ;
        }

        var x = FormDisplay();



        return React.createElement("form", { onSubmit: this.handleSubmit }, (x), React.createElement("input", { type: "submit", value: "Submit" }));

    }
}

const domContainer44 = document.getElementById("formfind");

ReactDOM.render(
    (d(FormFind)),
    domContainer44); ```