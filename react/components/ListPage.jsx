/**
 * @jsx React.DOM
 */
/**
 *  List Page displays Cities, States, Users, anything that can be tied to an Objective in a list view.
 */
var React = require('react');
var Header = require('./Header.jsx');
var Canvas = require('./Canvas.jsx');
var ListTable = require('./ListTable.jsx');
var ListStore = require('../stores/ListStore.jsx');

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
            nav: {
                display: display,
                url: '/list/' + this.props.params.by
            },
            img : {
                display: display,
                url: '/images/' + this.props.params.by + '.jpg'
            },
            by: this.props.params.by,
            list: ListStore.getList()
        };
    },
    componentDidMount: function() {
        ListStore.listen(this.listChanged);
        console.log()
    },
    listChanged: function(list) {
        this.setState({
            list: list
        });
    },
    render: function() {
        return (
            <div className="container-fluid">
                <Header nav={this.state.nav} />
                <div className="row">
                    <Canvas img={this.state.img} />
                    <ListTable by={this.state.by} list={this.state.list} />
                </div>
            </div>
        )
    }
});

module.exports = ListPage;
