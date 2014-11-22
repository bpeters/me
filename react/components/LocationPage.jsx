/**
 * @jsx React.DOM
 */
/**
 *  Location Page displays objectives by location (City, State, Etc.)
 */
var React = require('react');
var Header = require('./Header.jsx');
var Canvas = require('./Canvas.jsx');
var SidebarRight = require('./SidebarRight.jsx');
var ObjectiveList = require('./ObjectiveList.jsx');
var JournalList = require('./JournalList.jsx');
var MissionList = require('./MissionList.jsx');
var LocationStore = require('../stores/LocationStore');
var LocationActions = require('../actions/LocationActions');

var LocationPage = React.createClass({
    getInitialState: function() {
        var url;
        var nav = [];
        if (this.props.params.by === 'state') {
            url = '/images/state/' + 1 + '.jpg';
            nav = [
                {
                    display: this.props.location.state,
                    url: '/location/state/' + this.props.location.state_id
                }
            ];
        } else if (this.props.params.by === 'city') {
            url = '/images/city/' + 1 + '.jpg';
            nav = [
                {
                    display: this.props.location.city,
                    url: '/location/city/' + this.props.location.city_id
                },
                {
                    display: this.props.location.state,
                    url: '/location/state/' + this.props.location.state_id
                }
            ];
        }
        return {
            img : {
                display: this.props.location.name,
                url: url
            },
            nav: nav,
            by: this.props.params.by,
            id: this.props.params.id,
            sidebarRight: false,
            results: [],
            display: 'Objectives'
        };
    },
    componentDidMount: function() {
        this.unsubscribe = LocationStore.listen(this.displayChanged);
        LocationActions.load(this.state.display, this.state.by, this.state.id);
    },
    componentWillUnmount: function() {
        this.unsubscribe();
    },
    displayChanged: function(results) {
        this.setState({
            results: results.list,
            display: results.display
        });
    },
    showSidebar: function(sidebar) {
        if (sidebar === 'right') {
            this.setState({
                sidebarRight: !this.state.sidebarRight
            });
        }
    },
    render: function() {
        console.log(this.state.display);
        console.log(this.state.results);
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
                <Header nav={this.state.nav} onClick={this.showSidebar}/>
                { this.state.sidebarRight ? <SidebarRight by={this.state.by} id={this.state.id} filters={true} /> : null }
                <div className="row">
                    <Canvas img={this.state.img} />
                    {list}
                </div>
            </div>
        )
    }
});

module.exports = LocationPage;
