/** @jsx React.DOM */
(function(){
	var list = React.createClass({
		getInitialState: function() {
		    return {
		      model: []
		    };
		},

		render: function () {
			return (
				<div>
					<h2>{this.props.title}</h2>
					<ul className="list-guides-intro list-centered list--reset clear">
						{this.state.model && this.state.model.map(function(user){
							return <item image={user.picture} id={user.id}></item>
						})}
					</ul>
				</div>
			)
		},

		componentDidMount: function() {
		    $.get(this.props.source, function(result) {
		      this.setState({
		        model: result
		      });
		    }.bind(this));
		}
	});

	var item = React.createClass({
		render: function() {
			return (
				<li className="g-medium--half g-wide--1 theme--multi-device-layouts">
					<a href="#" className="themed">
						<img src={this.props.image} />
			        </a>
					<p>{this.props.image}</p>
				</li>
			)
		}
	});

	[
		{ id: 'latest-pics', label: 'Latest Pics' }
	].forEach(function(section){
		var ajaxPath = 'mock/' + section.id + '.json';
		React.renderComponent(
		  <list title={section.label} source={ajaxPath} />,
		  document.getElementById(section.id)
		);
	})

}())