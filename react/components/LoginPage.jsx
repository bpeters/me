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
var LoginForm = require('./LoginForm.jsx');

var ListPage = React.createClass({
    getDefaultProps: function() {
        return {
            params: {
                by: 'cities'
            }
        };
    },
    getInitialState: function() {
        return {
            img : {
                display: 'Login',
                url: '/images/login.jpg'
            },
            by: this.props.params.by,
            messages: this.props.messages,
            sidebarRight: false
        };
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
                    <LoginForm messages={this.state.messages} />
                </div>
            </div>
        )
    }
});

module.exports = ListPage;
