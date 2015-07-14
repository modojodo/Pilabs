/**
 * Created by Umer on 7/7/2015.
 */
var Store = require('../store');

var ThumbnailComponent = React.createClass({
    render: function () {
        var thumbList = [];
        console.log(this.state);

        for (var i = 0; i < this.state.Images.length; i++) {
            thumbList.push(<img src={this.state.Images[i].url}/>);
        }

        return (
            <div>
                {thumbList}
            </div>
        );
    },

    componentDidMount: function () {
        Store.addChangeListener(this._onChange);

        //var urls = [];
        //var that = this;
        //$.get("http://datastore.asadmemon.com/thumbnails/", function (data) {
        //    for (var d in data) {
        //        urls.push(data[d].url);
        //        console.log(urls);
        //    }
        //    that.setState({Images: urls});
        //});
    },
    componentWillUnmount: function () {
        Store.removeChangeListener(this._onChange);

    },
    _onChange: function () {
        var temp =Store.getAll();
        var arr=[];
        for(var i in temp){
            arr.push(temp[i]);
        }
        console.log('onChange called',Store.getAll());
        this.setState({Images:arr});
    },
    getInitialState: function () {
        return {
            Images: []
        }
    }


});

module.exports = ThumbnailComponent;
