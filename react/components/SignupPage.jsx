/**
 * @jsx React.DOM
 */
/**
 *  Signup Page displays signup information
 */
var React = require('react');
var Header = require('./Header.jsx');
var Canvas = require('./Canvas.jsx');
var SidebarRight = require('./SidebarRight.jsx');
var SignupForm = require('./SignupForm.jsx');

var ListPage = React.createClass({
    getInitialState: function() {
        return {
            nav: [{
                display: 'Signup',
                url: '/signup'
            }],
            img : {
                display: 'Signup',
                url: ''
            },
            by: '',
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
                    <SignupForm messages={this.state.messages} />
                </div>
            </div>
        )
    }
});

module.exports = ListPage;
