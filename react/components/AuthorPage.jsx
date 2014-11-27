/**
 * @jsx React.DOM
 */
/**
 *  Author Page displays author details aka public user profiles
 */
var React = require('react');
var Header = require('./Header.jsx');
var Canvas = require('./Canvas.jsx');
var SidebarRight = require('./SidebarRight.jsx');
var ObjectiveList = require('./ObjectiveList.jsx');
var JournalList = require('./JournalList.jsx');
var MissionList = require('./MissionList.jsx');
var AuthorStore = require('../stores/AuthorStore');
var AuthorActions = require('../actions/AuthorActions');
var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');

var AuthorPage = React.createClass({
    getInitialState: function() {
        return {
            img : {
                display: this.props.author.author,
                url: 'images/author/' + 1 + '.jpg',
                half: true
            },
            nav: [
                {
                    display: this.props.author.username,
                    url: '/author/' + this.props.author.username
                }
            ],
            author: this.props.author,
            by: 'author',
            username: this.props.params.username,
            sidebarRight: false,
            sidebarLeft: false,
            results: [],
            display: 'Objectives',
            filters: {
                display: [
                  {
                    class: 'fa-dot-circle-o',
                    name: 'Objectives'
                  },
                  {
                    class: 'fa-book',
                    name: 'Journals'
                  },
                  {
                    class: 'fa-rocket',
                    name: 'Missions'
                  }
                ],
                current: 'Objectives',
                action: AuthorActions.load
            },
            userProgress: {
                progress: {
                    complete: '',
                    total: '',
                    precentage: ''
                  }
            }
        };
    },
    componentDidMount: function() {
        this.unsubscribeAuthor = AuthorStore.listen(this.displayChanged);
        AuthorActions.load(this.state.display, this.state.username);

        this.unsubscribeUser = UserStore.listen(this.loadUser);
        UserActions.load(this.props.params.username);
    },
    componentWillUnmount: function() {
        this.unsubscribeAuthor();
        this.unsubscribeUser();
    },
    displayChanged: function(results) {
        var filters = this.state.filters;
        filters.current = results.display;

        this.setState({
            results: results.list,
            display: results.display,
            filters: filters
        });
    },
    loadUser: function(user) {
        this.setState({
            userProgress: user
        }); 
    },
    showSidebar: function(sidebar) {
        if (sidebar === 'right') {
            this.setState({
                sidebarRight: !this.state.sidebarRight
            });
        } else if (sidebar === 'left') {
            this.setState({
                sidebarLeft: !this.state.sidebarLeft
            });
        }
    },
    render: function() {
        var list;
        if (this.state.display === 'Objectives') {
            list = <ObjectiveList list={this.state.results} by={this.state.by} />;
        } else if (this.state.display === 'Journals') {
            list = <JournalList list={this.state.results} by={this.state.by} />;
        } else if (this.state.display === 'Missions') {
            list = <MissionList list={this.state.results} by={this.state.by} />;
        }
        return (
            <div className="container-fluid">
                <Header nav={this.state.nav} user={this.props.user} onClick={this.showSidebar}/>
                { this.state.sidebarLeft ? <SidebarLeft user={this.state.author} /> : null }
                { this.state.sidebarRight ? <SidebarRight id={this.state.username} filters={this.state.filters} /> : null }
                <div className="row">
                    <Canvas img={this.state.img} userProgress={this.state.userProgress} author={this.state.author}/>
                    <div className='main-side col-md-offset-6 col-sm-offset-6 col-md-6 col-sm-6'>
                      {list}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = AuthorPage;
