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
					<div class="items">
						{this.state.model && this.state.model.map(function(user){
							return <item image={user.picture} name={user.name} total={user.total}></item>
						})}
					</div>
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
				<div className="item clearfix">
					<img src={this.props.image}/>
					<div className="color--blue">
						{this.props.name}
						<aside className="color--blue-secondary">{this.props.total} Tweets</aside>
					</div>
				</div>
			)
		}
	});

	[
		{ id: 'top-users', label: 'Top Tweet Users'}, 
		{ id: 'gender', label: 'Gender'}, 
		{ id: 'top-ages', label: 'Ages'},
		{ id: 'tweets', label: 'Tweets'}
	].forEach(function(section){
		var ajaxPath = 'mock/' + section.id + '.json';
		React.renderComponent(
		  <list title={section.label} source={ajaxPath} />,
		  document.getElementById(section.id)
		);
	})

}())