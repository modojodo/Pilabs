(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ThumbnailGridComponent = require('./components/ThumbnailGridComponent');
React.render(React.createElement(ThumbnailGridComponent, {URL: "e.g:"}), document.getElementById('thumbnail-mount'));
},{"./components/ThumbnailGridComponent":3}],2:[function(require,module,exports){
/**
 * Created by Umer on 7/7/2015.
 */

var ThumbnailComponent = React.createClass({displayName: "ThumbnailComponent",
        render: function () {
            var thumbList = [];
            console.log(this.state);
            for (var i = 0; i < this.state.Images.length; i++) {
                thumbList.push(React.createElement("img", {src: this.state.Images[i]}));
        }

        return (
        React.createElement("div", null, 
        thumbList
        )
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

module.exports = ThumbnailComponent;

},{}],3:[function(require,module,exports){
/**
 * Created by Umer on 7/7/2015.
 */
var ThumbnailComponent = require('./ThumbnailComponent');
var ThumbnailGridComponent = React.createClass({displayName: "ThumbnailGridComponent",
    render: function () {
        return (
            React.createElement("div", null, 
            React.createElement("form", {onSubmit: this.submit}, 
    React.createElement("label", null, "Enter URL to the image:"), 
React.createElement("input", {type: "text", placeholder: this.state.URL, ref: "url"}), 
React.createElement("input", {type: "submit", value: "submit"})
), 
React.createElement(ThumbnailComponent, null)
)
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

module.exports = ThumbnailGridComponent;
},{"./ThumbnailComponent":2}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvYXBwLmpzIiwianMvY29tcG9uZW50cy9UaHVtYm5haWxDb21wb25lbnQuanMiLCJqcy9jb21wb25lbnRzL1RodW1ibmFpbEdyaWRDb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBUaHVtYm5haWxHcmlkQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1RodW1ibmFpbEdyaWRDb21wb25lbnQnKTtcclxuUmVhY3QucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGh1bWJuYWlsR3JpZENvbXBvbmVudCwge1VSTDogXCJlLmc6XCJ9KSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RodW1ibmFpbC1tb3VudCcpKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBVbWVyIG9uIDcvNy8yMDE1LlxyXG4gKi9cclxuXHJcbnZhciBUaHVtYm5haWxDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiVGh1bWJuYWlsQ29tcG9uZW50XCIsXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aHVtYkxpc3QgPSBbXTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5JbWFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRodW1iTGlzdC5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwge3NyYzogdGhpcy5zdGF0ZS5JbWFnZXNbaV19KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgdGh1bWJMaXN0XHJcbiAgICAgICAgKVxyXG4pO1xyXG59LFxyXG5cclxuY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB1cmxzID0gW107XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmdldChcImh0dHA6Ly9kYXRhc3RvcmUuYXNhZG1lbW9uLmNvbS90aHVtYm5haWxzL1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGZvciAodmFyIGQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICB1cmxzLnB1c2goZGF0YVtkXS51cmwpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1cmxzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7SW1hZ2VzOiB1cmxzfSk7XHJcbiAgICB9KTtcclxufSxcclxuZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIEltYWdlczogW11cclxuICAgIH1cclxufVxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRodW1ibmFpbENvbXBvbmVudDtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVW1lciBvbiA3LzcvMjAxNS5cclxuICovXHJcbnZhciBUaHVtYm5haWxDb21wb25lbnQgPSByZXF1aXJlKCcuL1RodW1ibmFpbENvbXBvbmVudCcpO1xyXG52YXIgVGh1bWJuYWlsR3JpZENvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJUaHVtYm5haWxHcmlkQ29tcG9uZW50XCIsXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCB7b25TdWJtaXQ6IHRoaXMuc3VibWl0fSwgXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJFbnRlciBVUkwgdG8gdGhlIGltYWdlOlwiKSwgXHJcblJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJ0ZXh0XCIsIHBsYWNlaG9sZGVyOiB0aGlzLnN0YXRlLlVSTCwgcmVmOiBcInVybFwifSksIFxyXG5SZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwic3VibWl0XCIsIHZhbHVlOiBcInN1Ym1pdFwifSlcclxuKSwgXHJcblJlYWN0LmNyZWF0ZUVsZW1lbnQoVGh1bWJuYWlsQ29tcG9uZW50LCBudWxsKVxyXG4pXHJcbik7XHJcblxyXG59LFxyXG5nZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgVVJMOiBcImh0dHA6Ly93d3d3LmZvby5jb20vc2VsZmllLmpwZ1wiLFxyXG4gICAgICAgIEltYWdlczogW11cclxuICAgIH1cclxufSxcclxuc3VibWl0OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICdodHRwOi8vZGF0YXN0b3JlLmFzYWRtZW1vbi5jb20vdGh1bWJuYWlscy8nICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XCJ1cmxcIjogUmVhY3QuZmluZERPTU5vZGUodGhpcy5yZWZzLnVybCkudmFsdWV9KSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm47XHJcbn1cclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUaHVtYm5haWxHcmlkQ29tcG9uZW50OyJdfQ==
