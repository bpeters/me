/**
 * @jsx React.DOM
 */
/**
 *  List Page displays Cities, States, Users, anything that can be tied to an Objective in a list view.
 */
var React = require('react');
var Header = require('./Header.jsx');
var Canvas = require('./Canvas.jsx');
var SidebarRight = require('./SidebarRight.jsx');
var Table = require('./Table.jsx');
var ListStore = require('../stores/ListStore');
var ListActions = require('../actions/ListActions');

var ListPage = React.createClass({
    getDefaultProps: function() {
        return {
            params: {
                by: 'cities'
            }
        };
    },
    getInitialState: function() {
        var display = "All " + this.props.params.by.charAt(0).toUpperCase() + this.props.params.by.slice(1);
        return {
            nav: [{
                display: display,
                url: '/list/' + this.props.params.by
            }],
            img : {
                display: display,
                url: '/images/' + this.props.params.by + '.jpg'
            },
            by: this.props.params.by,
            sidebarRight: false,
            list: []
        };
    },
    componentDidMount: function() {
        this.unsubscribe = ListStore.listen(this.listChanged);
        ListActions.load(this.state.by);
    },
    componentWillUnmount: function() {
        this.unsubscribe();
    },
    listChanged: function(list) {
        this.setState({
            list: list
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
        return (
            <div className="container-fluid">
                <Header nav={this.state.nav} onClick={this.showSidebar}/>
                { this.state.sidebarRight ? <SidebarRight by={this.state.by} /> : null }
                <div className="row">
                    <Canvas img={this.state.img} />
                    <Table by={this.state.by} results={this.state.list} />
                </div>
            </div>
        )
    }
});

module.exports = ListPage;
