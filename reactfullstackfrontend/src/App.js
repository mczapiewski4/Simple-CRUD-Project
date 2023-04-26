import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users:[],
      id:0,
      name:'',
      surname:'',
      dateOfBirth:'',
      login:''
    }
  }

  componentDidMount() {
    axios.get("http://localhost:8080/user/")
    .then((res)=> {
      this.setState({
        users:res.data,
        id:0,
        name:'',
        surname:'',
        dateOfBirth:'',
        login:''
      })
    })
  }

  submit(event,id) {
    event.preventDefault();
    if(id === 0) {
      axios.post("http://localhost:8080/user/add/", {
        name:this.state.name,
        surname:this.state.surname,
        dateOfBirth:this.state.dateOfBirth,
        login:this.state.login
      })
      .then((res) => {
        this.componentDidMount();
      })
    } else {
      axios.put("http://localhost:8080/user/", {
        id:this.state.id,
        name:this.state.name,
        surname:this.state.surname,
        dateOfBirth:this.state.dateOfBirth,
        login:this.state.login
      }) .then(() => {
        this.componentDidMount();
      })
    }
  }

  delete(id) {
    axios.delete('http://localhost:8080/user/${id}')
    .then(() => {
      this.componentDidMount();
    })
  }

  edit(id) {
    axios.get('http://localhost:8080/user/${id}')
    .then((res) => {
      console.log(res.data);
      this.setState({
        id:res.data.id,
        name:res.data.name,
        surname:res.data.surname,
        dateOfBirth:res.data.dateOfBirth,
        login:res.data.login
      })
    })
  }

  render() {
    return (
      <div className = "container">

      <div className = "row">

      <div className = "col s6">
          <form onSubmit={(e) => this.submit(e,this.state.id)}>

          <div class="input-field col s12">
          <i class="material-icons prefix">person</i>
          <input onChange={(e) => this.setState({name:e.target.value})} value={this.state.name} type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">Name</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">people</i>
          <input onChange={(e) => this.setState({surname:e.target.value})} value={this.state.surname} type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">Surname</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">query_builder</i>
          <input onChange={(e) => this.setState({dateOfBirth:e.target.value})} value={this.state.dateOfBirth} type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">Date of birth</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">security</i>
          <input onChange={(e) => this.setState({login:e.target.value})} value={this.state.login} type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">Login</label>
        </div>
        <button class="btn waves-effect waves-light right" type="submit" name="action">Submit
          <i class="material-icons right">send</i>
        </button>

          </form>
        </div>
        <div className = "col s6">
        <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Date of birth</th>
              <th>Login</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          
          {
            this.state.users.map(user =>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.login}</td>
                <td>
                <button onClick={(e) => this.edit(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                  <i class="material-icons ">edit</i>
                </button>
                </td>
                <td>
                <button onClick={(e) => this.delete(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                  <i class="material-icons ">delete</i>
                </button>
                </td>
              </tr>
            )
          }

        </tbody>
      </table>
        </div> 
      </div>

      </div>
    );
  }
  
}

export default App;
