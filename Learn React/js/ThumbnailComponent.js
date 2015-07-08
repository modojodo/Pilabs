/**
 * Created by Umer on 7/7/2015.
 */

var ThumbnailComponent = React.createClass({
        render: function () {
            var thumbList = [];
            console.log(this.state);
            for (var i = 0; i < this.state.Images.length; i++) {
                thumbList.push(<img src={this.state.Images[i]} class="img-thumbnail"/>);
        }

        return (
        <div>
        {thumbList}
        </div>
);
},

componentDidMount: function () {
    var urls = [];
    var that = this;
    $.get("http://datastore.asadmemon.com/thumbnails/", function (data) {
        for (var d in data) {
            urls.push(data[d].url);
            console.log(urls);
        }
        that.setState({Images: urls});
    });
},
getInitialState: function () {
    return {
        Images: []
    }
}

});