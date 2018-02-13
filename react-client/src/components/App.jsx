import React, { Component } from 'react';
import { Header, Grid, Segment, Menu } from 'semantic-ui-react';
import NavHeader from './NavHeader.jsx';
import Search from './Search.jsx';
import NewProjects from './NewProjects.jsx';
import ProjectsMenu from './ProjectsMenu.jsx';
import UserFeed from './UserFeed.jsx';
import FeedPopular from './FeedPopular.jsx';
import FeedFriends from './FeedFriends.jsx';
import FeedGithub from './FeedGithub.jsx';
import SideTechFilter from './SideTechFilter.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedActiveItem: 'Popular',
      currentMainView: 'Popular'
    };
    this.handleFeedClick = this.handleFeedClick.bind(this);
  }

  componentDidMount() {
    this.props.getProjects();
    this.props.getGithubRepos();
    if (this.props.userId) {
      this.props.checkMessages(this.props.userId);
    }
  }

  setFeedToRender() {
    let feed;
    if (this.state.feedActiveItem === 'Popular') {
      feed = <FeedPopular />;
    } else if (this.state.feedActiveItem === 'Friends') {
      feed = <FeedFriends />;
    }
    return feed;
  }

  handleFeedClick(e, { name }) {
    this.setState({
      feedActiveItem: name
    }, () => {
      this.feedToRender = this.setFeedToRender();
    });
  }

  handleMainProjectsFilter(e, { currentMainView }) {
    console.log('clicked: ', currentMainView);

    // this.setState({
    //   feedActiveItem: name
    // }, () => {
    //   this.feedToRender = this.setFeedToRender();
    // });
  }

  render() {
    const { feedActiveItem } = this.state.feedActiveItem;
    const { currentMainView } = this.state.currentMainView;
    // const { feedToRender } = this.setFeedToRender;
    // let test = this.setFeedToRender();
    // console.log('test: ', test);

    const feedToRender = this.setFeedToRender();
    // console.log('feedToRender is: ', feedToRender);


    return (
      <div className="ui container">
        <Header id="titleHeader"size="huge" style={{ textAlign: 'center' }}>Squashed</Header>
        <SideTechFilter
          handleTechs={this.props.handleTechs}
        />

        <Grid>
          <Grid.Column id="mainProjectsMenu">
            <Segment>
              <Menu fluid widths={3} id="mainBG">
               <Menu.Item name="Popular" active={currentMainView === "Popular"} onClick={this.handleMainProjectsFilter} />
               <Menu.Item name="New" active={currentMainView === "New"} onClick={this.handleMainProjectsFilter} />
               <Menu.Item name="Featured on Github" active={currentMainView === "Featured on Github"} onClick={this.handleMainProjectsFilter} />              
              </Menu>
            </Segment>
          </Grid.Column>
        </Grid>

        {/* This is the main content area. We have 3 columns. */}
        <Grid columns={3} stackable>

          {/* Left column for frpoject filtering by tech */}
          <Grid.Column width={2} id="column-1">
            <p>filter area</p>
            {/* <Segment>
              <NewProjects
                projects={this.props.projects}
                isViewFilter={this.props.isViewFilter}
                toggleViewFilter={this.props.toggleViewFilter}
                techFilter={this.props.techFilter}
              />
            </Segment> */}
          </Grid.Column>

          {/* Middle column to show projects */}
          <Grid.Column width={11} id="column-2">
            <Segment>
              <NewProjects
                projects={this.props.projects}
                isViewFilter={this.props.isViewFilter}
                toggleViewFilter={this.props.toggleViewFilter}
                techFilter={this.props.techFilter}
              />
            </Segment>
          </Grid.Column>

          {/* Left Column for the feed */}
          <Grid.Column width={3} id="column-3">
            <div>
              <div id="feedmenu">
                <Menu pointing secondary>
                  <div id="feedmenu1"><Menu.Item name="Popular" active={feedActiveItem === 'popular'} onClick={this.handleFeedClick} /></div>
                  <div id="feedmenu2"><Menu.Item name="Friends" active={feedActiveItem === 'friends'} onClick={this.handleFeedClick} /></div>
                  <div id="feedmenu3"><Menu.Item name="On Github" active={feedActiveItem === 'github'} onClick={this.handleFeedClick} /></div>
                </Menu>
              </div>
              <Segment>
                {feedToRender}
              </Segment>
            </div>
          </Grid.Column>
        </Grid>
        <Search searchByUserInput={this.props.searchByUserInput} />
        <ProjectsMenu
          getProjects={this.props.getProjects}
          handleGetLatest={this.props.handleGetLatest}
          filterByViews={this.props.filterByViews}
        />
        <UserFeed />
        <FeedGithub repos={this.props.githubRepos} />
      </div>);
  }
}
export default App;
