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
var SidebarLeft = require('./SidebarLeft.jsx');
var List = require('./List.jsx');
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
            sidebarLeft: false,
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
        } else if (sidebar === 'left') {
            this.setState({
                sidebarLeft: !this.state.sidebarLeft
            });
        }
    },
    render: function() {
        var header = this.state.by.charAt(0).toUpperCase() + this.state.by.slice(1);
        return (
            <div className="container-fluid">
                <Header nav={this.state.nav} user={this.props.user} onClick={this.showSidebar}/>
                { this.state.sidebarLeft ? <SidebarLeft user={this.props.user} /> : null }
                { this.state.sidebarRight ? <SidebarRight by={this.state.by} /> : null }
                <div className="row">
                    <Canvas img={this.state.img} />
                    <div className='main'>
                        <List list={this.state.list} by={this.state.by} header={header} />
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = ListPage;
