/** @jsx React.DOM */
(function(){

	var pie = React.createClass({
		render: function(){
			return (
				<div>
					<h2>{this.props.label}</h2>
					<svg></svg>
				</div>
			)
		},

		componentDidMount: function () {
			var props = this.props;
			var target = props.targetId;
			var that = this;
			$.get(this.props.source, function(result) {
				if (props.callback) {
					result = props.callback && props.callback(result);
				}
		      	renderPie(result);
		    });
			var renderPie = function(data){	
				var x = props.x || 'label';
				var y = props.y || 'value';
				nv.addGraph(function() {
				  var chart = nv.models.pieChart()
				      .x(function(d) { return d[x] })
				      .y(function(d) { return d[y] })
				      .showLabels(true);

				    d3.select(that.getDOMNode().getElementsByTagName('svg')[0])
				        .datum(data)
				        .transition().duration(350)
				        .call(chart);

				  return chart;
				});
			}
		}
	})
	var digestRetweet = function(data){
		var genders = {
			male: {
				label: 'Male',
				value: 0
			},
			female: {
				label: 'Female',
				value: 0
			}
		};

		data.forEach(function(t){
			genders[t.gender].value += t.retweets;
		});

		return [genders.male, genders.female];
	}
	// Regular pie chart example
	React.renderComponent(
		<pie source={ApiCalls.GENDER} 
			callback={digestRetweet} 
			label="Retweets By Gender"
			targetId="retweets-chart"/>,
		document.getElementById('retweets-chart')
	)

	var digestReplies = function(data){
		var genders = {
			male: {
				label: 'Male',
				value: 0
			},
			female: {
				label: 'Female',
				value: 0
			}
		};
		console.log('before', data);
		data.forEach(function(t){
			genders[t.gender].value += t.total;
		});

		return [genders.male, genders.female];
	}
	React.renderComponent(
		<pie source={ApiCalls.GENDER} 
			targetId="replies-chart" 
			label="Replies By Gender"
			x="gender" y="age"/>,
		document.getElementById('replies-chart')
	)
}())