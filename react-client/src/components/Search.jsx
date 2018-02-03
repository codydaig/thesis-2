import React from 'react';
import { Input, Header } from 'semantic-ui-react';
import $ from 'jquery';
import _ from 'underscore';
import {Typeahead} from 'react-bootstrap-typeahead';
import { Button } from 'semantic-ui-react';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchProject: '',
      projects: [],
      selectedProject: '',
      flag: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.debounceFunc = _.debounce(this.handleSearchBar, 500);
    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleChange(e) {
    console.log('on input change', e);
    this.setState({
      searchProject: e
    });
    this.debounceFunc();
    console.log('above if', this.state.selectedProject);

  }

  handleSearchBar() {
    console.log('im first search', this.state.searchProject);
    const that = this;
    $.ajax({
      url: `/searchProjects?title=${that.state.searchProject}`,
      success: (response) => {
        console.log('RESPONSE IN SearchBar', response);

        that.setState({
          projects :response
        });
    //     if (this.state.selectedProject.length > 0) {
    //   this.handleSearch();
    // }
      },
      error: () => {
        console.log('check access token error');
      }
    });
  }

  handleSearch() {
    console.log('new search', this.state.selectedProject);
    this.props.searchByUserInput(this.state.selectedProject);
  }

  render() {
    console.log('render', this.state.projects);

    return (
      <div>
      <Typeahead
        options={this.state.projects}
        multiple={false}
        onInputChange={this.handleChange}
         onChange={(selected) => {
          console.log('selecteD----', selected);
           this.setState({
            selectedProject: selected
           });
         }}
        labelKey={option=> `${option.project_name}`}
      />
      <button className="ui button" onClick={this.handleSearch}>
        Button
      </button>
      </div>

    );
  }
}

export default Search;