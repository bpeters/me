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
var ObjectiveList = require('./ObjectiveList.jsx');
var MissionStore = require('../stores/MissionStore');
var MissionActions = require('../actions/MissionActions');

var MissionPage = React.createClass({
    getInitialState: function() {
        return {
            img : {
                display: this.props.mission.mission,
                url: 'images/mission/' + 1 + '.jpg'
            },
            nav: [
                {
                    display: this.props.mission.mission,
                    url: '/mission/' + this.props.mission.mission_id
                }
            ],
            by: 'mission',
            id: this.props.params.id,
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
                  }
                ],
                current: 'Objectives',
                action: MissionActions.load
            }
        };
    },
    componentDidMount: function() {
        this.unsubscribe = MissionStore.listen(this.displayChanged);
        MissionActions.load(this.state.display, this.state.by, this.state.id);
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
        if (this.state.display === 'Objectives') {
            list = <ObjectiveList list={this.state.results} by={this.state.by} />;
        } else if (this.state.display === 'Journals') {
            list = <JournalList list={this.state.results} by={this.state.by} />;
        }
        return (
            <div className="container-fluid">
                <Header nav={this.state.nav} user={this.props.user} onClick={this.showSidebar}/>
                { this.state.sidebarLeft ? <SidebarLeft user={this.props.user} /> : null }
                { this.state.sidebarRight ? <SidebarRight by={this.state.by} id={this.state.id} filters={this.state.filters} /> : null }
                <div className="row">
                    <Canvas img={this.state.img} />
                    <div className='main'>
                        {list}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = MissionPage;
