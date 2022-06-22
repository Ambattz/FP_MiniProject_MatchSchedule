import { Component } from "react";
import { name } from "../package.json";
import { List, Modal, Button, Error, Form } from "./components";

// Assign the backend base url here
export const NODE_APP_URL = "http://localhost:8001/fixtures/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: undefined,
      showModal: false,
      formValues: {},
      formError: undefined
    }
  }

  componentDidMount = () => {
    this.fetchData();
  };

  // Function to Show the Modal component
  showModalHandler = () => {
    // Your code goes here
    this.setState({ showModal: true });
  }

  // Function to Hide the Modal component
  closeModalHandler = () => {
    // Your code goes here
    this.setState({
      error: undefined,
      showModal: false,
      formValues: {},
      formError: undefined
    });
  }

  // Handles all input entered in the form component
  // and stores the values in the state variable "formValues" of Object type
  // formValues is a key-value pair of input elements { name: "value", name1: "value1" }
  inputChangeHandler = (e) => {
    const { name, value, type } = e.target;
    let { formValues } = this.state;
    formValues = { ...formValues, [name]: type === "number" ? parseInt(value) : value };
    this.setState({ formValues });
  }

  deleteHandler = (id) => {
    var URL = NODE_APP_URL + id;
    console.log(URL);
    fetch(URL, {
      method: "delete",
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) this.setState({ error: res.error.message });
        else {
          this.setState({ error: res.message })
          this.fetchData();
        }
      });
  }

  // Fetch data from the api
  // use NODE_APP_URL variable for the url in fetch method
  // NODE_APP_URL variable is assigned in the top of this file (src/App.js).
  fetchData = async () => {
    // Your code goes here
    // Fill up the code required for posting data to backend
    const fetchData = await fetch(NODE_APP_URL);
    const data = await fetchData.json();
    this.setState({ data });
  };

  // SubmitHandler should be used to create a record i.e., to execute post request to backend
  // On success of post request close modal and fetch call fetchData method again.
  // On Error set the error message in the banner.
  submitHandler = (e) => {
    e.preventDefault();
    var { formValues } = this.state;

    fetch(NODE_APP_URL, {
      // Your code goes here
      // Fill up the params required for posting data to backend
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues)
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) this.setState({ formError: res.error.message });
        else {
          this.fetchData();
          this.closeModalHandler();
        }
      });
  }

  render() {
    const { showModal, error, data, formError } = this.state;

    return (
      <div className="app">
        <div className="app-body">
          <h2 className="app-title">{name.replace(/_/g, ' ')}</h2>
          <Error message={error} />
          <List data={data} onDeleteHandler={(id) => this.deleteHandler(id)} />

          <div className="footer-controls">
            {/* Your code goes here */}
            {/* Render a Button that will display the Modal */}
            <Button onClick={this.showModalHandler} className="success">Add</Button>
          </div>

        </div>

        <Modal show={showModal} closeHandler={this.closeModalHandler}>
          {/* Your code goes here */}
          {/* Render the Form component here */}
          <Form title={"Add"} inputOnChangeHandler={this.inputChangeHandler} onSaveHandler={this.submitHandler} error={formError}></Form>
        </Modal>
      </div>
    );
  }
}

export default App;
