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
	
	React.renderComponent(
	  <list title="Top Tweet Users" source="mock/data.json"/>,
	  document.getElementById('top-users')
	);

}())