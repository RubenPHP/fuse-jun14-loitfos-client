/** @jsx React.DOM */
(function(){

	var line = React.createClass({
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
		      	renderLine(result);
		    });
			var renderLine = function(data){	
				var x = props.x || 'label';
				var y = props.y || 'value';
				
				nv.addGraph(function() {
				  var chart = nv.models.lineChart()
				                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
				                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
				                .transitionDuration(350)  //how fast do you want the lines to transition?
				                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
				                .showYAxis(true)        //Show the y-axis
				                .showXAxis(true)        //Show the x-axis
				  ;

				  chart.xAxis     //Chart x-axis settings
				      .axisLabel('Hours')
				      .tickFormat(d3.format(',r'));

				  chart.yAxis     //Chart y-axis settings
				      .axisLabel('Months')
				      .tickFormat(d3.format('.02f'));

				  /* Done setting the chart up? Time to render it!*/
				  var myData =data;   //You need data...

				  d3.select(this.getDomNode().getElementsByTagName('svg')[0])    //Select the <svg> element you want to render the chart in.   
				      .datum(myData)         //Populate the <svg> element with chart data...
				      .call(chart);          //Finally, render the chart!

				  //Update the chart when window resizes.
				  nv.utils.windowResize(function() { chart.update() });
				  return chart;
				});
			}
		}
	});

	var digest = function(data){
		console.log(data);
		var series = data.map(function(t){
			var d = new Date(t.date);
			return { x: t.getHours(), y: t.getMonth() }
		});

		return series;
	}
	// Regular pie chart example
	React.renderComponent(
		<line source={ApiCalls.GENDER} 
			callback={digest} 
			label="tweets by time"
			targetId="line-chart"/>,
		document.getElementById('line-chart')
	)
}())