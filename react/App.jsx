/**
 * @jsx React.DOM
 */
/**
 *  For rendering the app on server side.
 */
var React = require('react');

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

var App = React.createClass({
    getInitialState: function() {
        return {
            page: this.props.page,
            title: this.props.title,
            params: this.props.params
        };
    },
    render: function() {
        var json = safeStringify(this.props);
        return (
            <html>
                <head lang="en">
                    <base href="/"/>
                    <meta charSet="utf-8"/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <title>{this.state.title}</title>
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" />
                    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" />
                    <link href="/css/style.css" rel="stylesheet" />
                </head>
                <body>
                    <div id="body"></div>
                    <span id="props" dangerouslySetInnerHTML={{__html: json}}></span>
                    <script src="/js/Chart.js"></script>
                    <script type="text/javascript" src="/js/browserify/bundle.js"></script>
                </body>
            </html>
        )
    }
});

module.exports = App;
