/**
 * @jsx React.DOM
 */
/**
 *  Journal Page displays journal details
 */
var React = require('react');
var Header = require('./Header.jsx');
var Canvas = require('./Canvas.jsx');
var SidebarRight = require('./SidebarRight.jsx');

var JournalPage = React.createClass({
    getInitialState: function() {
        return {
            img : {
                display: this.props.journal.journal,
                url: 'images/journal/' + 1 + '.jpg',
                half: true
            },
            nav: [
                {
                    display: this.props.journal.state,
                    url: '/location/state/' + this.props.journal.state_id
                },
                {
                    display: this.props.journal.city,
                    url: '/location/city/' + this.props.journal.city_id
                },
                {
                    display: this.props.journal.objective,
                    url: '/objective/' + this.props.journal.objective_id
                },
                {
                    display: this.props.journal.journal,
                    url: '/journal/' + this.props.journal.journal_id
                }
            ],
            by: this.props.params.by,
            id: this.props.params.id,
            sidebarRight: false,
            results: [],
            display: 'Journals',
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
                { this.state.sidebarRight ? <SidebarRight by={this.state.by} id={this.state.id} /> : null }
                <div className="row">
                    <Canvas img={this.state.img} />
                    <div className='main col-md-offset-6 col-sm-offset-6 col-md-6 col-sm-6'>
                      <h3>{ this.props.journal.journal }</h3>
                      <h5>by <a href={'/author/' + this.props.journal.author_id}>{ this.props.journal.author }</a></h5>
                      <div>
                        <span className='journal-highlight'>
                          <span>{ this.props.journal.journal_entry }</span>
                        </span>
                      </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = JournalPage;
