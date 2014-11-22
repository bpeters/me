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
var ObjectiveStore = require('../stores/ObjectiveStore');
var ObjectiveActions = require('../actions/ObjectiveActions');

var ObjectivePage = React.createClass({
    getInitialState: function() {
        return {
            img : {
                display: this.props.objective.objective,
                url: 'images/objective/' + 1 + '.jpg'
            },
            nav: [
                {
                    display: this.props.objective.state,
                    url: '/location/state/' + this.props.objective.state_id
                },
                {
                    display: this.props.objective.city,
                    url: '/location/city/' + this.props.objective.city_id
                },
                {
                    display: this.props.objective.objective,
                    url: '/objective/' + this.props.objective.objective_id
                }
            ],
            by: this.props.params.by,
            id: this.props.params.id,
            sidebarRight: false,
            results: [],
            display: 'Journals',
            filters: {
                display: [
                  {
                    class: 'fa-book',
                    name: 'Journals'
                  },
                  {
                    class: 'fa-rocket',
                    name: 'Missions'
                  }
                ],
                current: 'Journals',
                action: ObjectiveActions.load
            }
        };
    },
    componentDidMount: function() {
        this.unsubscribe = ObjectiveStore.listen(this.displayChanged);
        ObjectiveActions.load(this.state.display, this.state.by, this.state.id);
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
        var list;
        if (this.state.display === 'Journals') {
            list = <JournalList list={this.state.results} by={this.state.by} />;
        } else if (this.state.display === 'Missions') {
            list = <MissionList list={this.state.results} by={this.state.by} />;
        }
        return (
            <div className="container-fluid">
                <Header nav={this.state.nav} onClick={this.showSidebar}/>
                { this.state.sidebarRight ? <SidebarRight by={this.state.by} id={this.state.id} filters={this.state.filters} /> : null }
                <div className="row">
                    <Canvas img={this.state.img} />
                    {list}
                </div>
            </div>
        )
    }
});

module.exports = ObjectivePage;
