/**
 * Created by Umer on 7/7/2015.
 */

var ThumbnailGridComponent = React.createClass({
    render: function () {
        return (
            <div>
            <form onSubmit={this.submit}>
    <label>Enter URL to the image:</label>
<input type="text" placeholder={this.state.URL} ref="url"/>
<input type="submit" value="submit"/>
</form>
<ThumbnailComponent/>
</div>
);

},
getInitialState: function () {
    return {
        URL: "http://wwww.foo.com/selfie.jpg",
        Images: []
    }
},
submit: function (e) {
    e.preventDefault();
    $.ajax({
        url: 'http://datastore.asadmemon.com/thumbnails/' + (new Date().getTime()),
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({"url": React.findDOMNode(this.refs.url).value}),
        success: function (res) {
            console.log(res);
        }
    });
    return;
}

});