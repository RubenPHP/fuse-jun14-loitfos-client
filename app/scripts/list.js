/** @jsx React.DOM */
(function(){
	var list = React.createClass({
		render: function () {
			return (
				<h2>{this.props.model.title}</h2>
				{this.props.model.map(function(user){
					return <item image={user.image} name={user.name} total={user.totalTweets}></item>
				})}
			)
		}
	});

	var item = React.createClass({
		render: function() {
			return (
				<div>
					<img src={this.props.image}>
					{this.props.name}
					{this.props.total} Tweets
				</div>
			)
		}
	});

	React.renderComponent(
	  <list model={tweets} title="Top Tweet Users"></list>,
	  document.getElementById('example')
	);

}())