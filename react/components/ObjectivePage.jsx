/**
 * @jsx React.DOM
 */
/**
 *  Objective Page displays objective details
 */
var React = require('react');
var Header = require('./Header.jsx');
var Canvas = require('./Canvas.jsx');
var SidebarRight = require('./SidebarRight.jsx');
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
            objective: this.props.objective,
            by: 'objective',
            id: this.props.params.id,
            user: this.props.user,
            sidebarRight: false,
            sidebarLeft: false,
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
        var filters = this.state.filters;
        filters.current = results.display;

        this.setState({
            results: results.list,
            display: results.display,
            filters: filters
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
        if (this.state.display === 'Journals') {
            list = <JournalList list={this.state.results} by={this.state.by} />;
        } else if (this.state.display === 'Missions') {
            list = <MissionList list={this.state.results} by={this.state.by} />;
        }
        return (
            <div className="container-fluid">
                <Header nav={this.state.nav} user={this.props.user} onClick={this.showSidebar}/>
                { this.state.sidebarLeft ? <SidebarLeft user={this.props.user} /> : null }
                { this.state.sidebarRight ? <SidebarRight by={this.state.by} id={this.state.id} filters={this.state.filters} /> : null }
                <div className="row">
                    <Canvas img={this.state.img} objective={this.state.objective} user={this.state.user} />
                    <div className='main'>
                        {list}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = ObjectivePage;
