import React from 'react';
import './App.css';
import AppDropDown from './components/app-dropdown'
import location from './data/country-list'

class App extends React.Component {

  constructor(props){
      super(props);
      this.state =  {
        source: location,
        maxLimit: 5,
        filteredSource: location,
        selectedItemTitle: "",
        addPrivilege: true,
      }
  };

  // selected list item emited from child, to update title
  onClickListItem = (selectedListItem) => {
    console.log("selected country " + selectedListItem.title)
    let selectedItemTitle = selectedListItem.title
    this.setState({
      selectedItemTitle
    })
  }

  render() {
    return (
      <div className="formContainer">
        <AppDropDown 
         source={this.state.source}
         maxLimit={this.state.maxLimit}
         onClickListItem={this.onClickListItem} 
         drpDwnTitle={this.state.selectedItemTitle}
         addPrivilege={this.state.addPrivilege}>
        </AppDropDown>
      </div>
    )
  }
}

export default App;
