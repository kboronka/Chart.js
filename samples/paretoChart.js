  app.directive('paretoChart', function () {
    return {
      restrict: 'E',
      transclude: true,  
      scope: {
        data: '=',
        title: '=',
        labels: '='
      },
      templateUrl : 'paretoChart.html',
      link: function (scope, element, attrs) {
        scope.test = "my test";
        
        
        var canvasTag = element[0].getElementsByClassName("chart-canvas")[0].getContext("2d");
        var legendTag = element[0].getElementsByClassName("chart-legend")[0];
        
        var chart = createParetoChart(canvasTag, legendTag, scope.data, scope.labels, scope.title);
        
        scope.$watch('data', function (newVal, oldVal) {
          if (!newVal || !newVal.length || (Array.isArray(newVal[0]) && !newVal[0].length)) return;
          chart.destroy();
          chart = createParetoChart(canvasTag, legendTag, scope.data, scope.labels, scope.title);
        }, true);
        
      }   
    };
  });
  
  
  function createParetoChart(canvasTag, legendTag, data, labels, title)
  {
    function CalculatePercent(data) {
      var percent = [];
      var sum = eval(data.join('+'));
      var accumulator = 0;

      for (var i = 0; i < data.length; i++) {
        accumulator += data[i];
        var raw = accumulator / sum * 100;
        percent.push(Math.round(raw * 10) / 10);
      }

      return percent;
    }
    
    var overlayData = {
      labels: labels.slice(0, 10),
      datasets: [{
        label: title,
        type: "bar",
        yAxesGroup: "1",
        fillColor: "rgba(255,0,0,0.4)",
        strokeColor: "rgba(255,0,0,0.7)",
        pointColor: "rgba(255,0,0,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(255,0,0,1)",
        data: data.slice(0, 10)
         }, {
        label: "% accumulated " + title,
        type: "line",
        yAxesGroup: "2",
        fillColor: "rgba(0,0,255,0)",
        strokeColor: "rgba(0,0,255,1)",
        pointColor: "rgba(0,0,255,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(0,0,255,1)",
        data: CalculatePercent(data).slice(0, 10)
         }],
      yAxes: [{
        name: "2",
        scalePositionLeft: false,
        scaleLabel: "<%=value%>%",
        scaleFontColor: "rgba(0,0,255,0.8)",
        labelLength: 5,
         }, {
        name: "1",
        scalePositionLeft: true,
        scaleFontColor: "rgba(255,0,0,0.7)"
         }]
    };

    var options = {
      populateSparseData: true,
      animation: false,
      overlayBars: false,
      datasetFill: true,
      labelLength: 16,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: false,
      multiTooltipTemplate: "<%= value %> <%=datasetLabel %>",
    }
    
    var newChart = new Chart(canvasTag).Overlay(overlayData, options);
    legendTag.innerHTML = newChart.generateLegend();
    return newChart;
  } 