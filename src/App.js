import React, { Component } from 'react';
import employersList from './data.json';

const departaments_list = [];
employersList.map(employee => {
    if (departaments_list.indexOf(employee.departament) === -1) {
        departaments_list.push(employee.departament)
    }
});


function filtering(search_filter, dropdown_filter){

  return function(employee){
    
    var search_filter_check = employee.first_name.toLowerCase().includes(search_filter.toLowerCase()) ||
           employee.last_name.toLowerCase().includes(search_filter.toLowerCase()) ||
           !search_filter;
    
    if(!dropdown_filter){
      return search_filter_check
    }
    
    return search_filter_check && (employee.departament == dropdown_filter)
  }

}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      employersList : employersList,
      search_filter: '',
      dropdown_filter: ''
    }
    this.searchHandler = this.searchHandler.bind(this);
    this.dropdownHandler = this.dropdownHandler.bind(this);
  }
  
  searchHandler(event){
    this.setState({ search_filter: event.target.value })
  }

  dropdownHandler(event){
    this.setState({ dropdown_filter: event.target.value })
  }

  render() {
    const {search_filter, dropdown_filter} = this.state;
    return (
      <div className="App">
        <form>
          <input placeholder="Search" type="text" onChange={this.searchHandler} value={search_filter}/>
          <select defaultValue="" onChange={this.dropdownHandler} value={dropdown_filter}>
            <option value="">All Departaments</option>
            {
              departaments_list.map(departament =>
                <option value={ departament }>{ departament }</option>
              )
            }
          </select>
        </form>
        <ul>
        {
          employersList.filter(filtering(search_filter,dropdown_filter)).map(employee =>
    
              <li key={employee.id}>
                <b>{ employee.first_name } { employee.last_name }</b>
                <p>{ employee.departament }</p>           
              </li>
            )
        }
        </ul>
        
      </div>
    );
  }
}

export default App;
