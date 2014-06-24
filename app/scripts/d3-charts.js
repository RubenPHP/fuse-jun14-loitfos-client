/** @jsx React.DOM */
(function(){
	// var list = React.createClass({
	// 	getInitialState: function() {
	// 	    return {
	// 	      model: []
	// 	    };
	// 	},

	// 	render: function () {
	// 		return (
	// 			<div>
	// 				<h2>{this.props.title}</h2>
	// 				<div class="items">
	// 					{this.state.model && this.state.model.map(function(user){
	// 						return <item image={user.picture} name={user.name} total={user.total}></item>
	// 					})}
	// 				</div>
	// 			</div>
	// 		)
	// 	},

	// 	componentDidMount: function() {
	// 	    $.get(this.props.source, function(result) {
	// 	      this.setState({
	// 	        model: result
	// 	      });
	// 	    }.bind(this));
	// 	}
	// });

	// var item = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div className="item clearfix">
	// 				<img src={this.props.image}/>
	// 				<div className="color--blue">
	// 					{this.props.name}
	// 					<aside className="color--blue-secondary">{this.props.total} Tweets</aside>
	// 				</div>
	// 			</div>
	// 		)
	// 	}
	// });

	// [
	// 	{ id: 'top-users', label: 'Top Tweet Users'}, 
	// 	{ id: 'gender', label: 'Gender'}, 
	// 	{ id: 'top-ages', label: 'Ages'},
	// 	{ id: 'tweets', label: 'Tweets'}
	// ].forEach(function(section){
	// 	var ajaxPath = 'mock/' + section.id + '.json';
	// 	React.renderComponent(
	// 	  <list title={section.label} source={ajaxPath} />,
	// 	  document.getElementById(section.id)
	// 	);
	// }
	var pie = React.createClass({
		render: function(){
			return (
				<svg></svg>
			)
		},

		componentDidMount: function () {
			var target = this.props.targetId;
			$.get(this.props.source, function(result) {
		      	renderPie(result);
		    });

			var renderPie = function(data){	
				nv.addGraph(function() {
				  var chart = nv.models.pieChart()
				      .x(function(d) { return d.name })
				      .y(function(d) { return d.age })
				      .showLabels(true);

				    d3.select("#" + target + " svg")
				        .datum(data)
				        .transition().duration(350)
				        .call(chart);

				  return chart;
				});
			}
		}
	})
	//Regular pie chart example
	React.renderComponent(
		<pie source={ApiCalls.GENDER} targetId="gender-chart"/>,
		document.getElementById('gender-chart')
	)
}())