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
            by: this.props.params.by,
            id: this.props.params.id,
            sidebarRight: false,
            sidebarLeft: false,
            results: []
        };
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
        return (
            <div className="container-fluid">
                <Header nav={this.state.nav} user={this.props.user} onClick={this.showSidebar}/>
                { this.state.sidebarLeft ? <SidebarLeft user={this.props.user} /> : null }
                { this.state.sidebarRight ? <SidebarRight by={this.state.by} id={this.state.id} /> : null }
                <div className="row">
                    <Canvas img={this.state.img} />
                    <div className='main col-md-offset-6 col-sm-offset-6 col-md-6 col-sm-6'>
                      
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = AuthorPage;
