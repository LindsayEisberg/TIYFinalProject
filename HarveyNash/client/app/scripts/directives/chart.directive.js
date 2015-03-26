angular.module('app', [])
.directive('chart', ['$http', function($http) {
  return {
    restrict: 'EA',
    scope: {
      data: '=data',
      outerR: '=outerR',
      innerR: '=innerR',
      fontSize: '=fontSize',
      displayNumber: '=displayNumber',
      innerString: '=innerString',
      innerStringFontSize: '=innerStringFontSize',
      url: '=src',
    },
    
    link: function($scope, elements, attrs){
      
      //TODO ALSO A WORK IN PROGRESS
      if ($scope.url) {
        $http.get($scope.url).success(function(response) {
         response;
        })
      }
     if($scope.data){
        var data = $scope.data;    
      } else {
        var data = [35, 45, 50, 60];
      } 
      
      var color = d3.scale.ordinal().range(["red", "blue", "orange", "green", "yellow", "purple", "violet", "grey", "pink"]); //Color of the data
      
      if($scope.outerR){
        var outerR = $scope.outerR; 
      } else {
        var outerR = 100;
      }
      
      if($scope.innerR){
        var innerR = $scope.innerR;
      } else {
        var innerR = 50;
      }      
      
      if($scope.fontSize){
        var fontSize = $scope.fontSize;
      } else {
        var fontSize = 17 * outerR / 100;
      }
      
      if($scope.innerStringFontSize){
        var innerStringFontSize = $scope.innerStringFontSize;
      } else {
        var innerStringFontSize = innerR / 3;
      }
      
      //Creates the Chart
      var canvas = d3.select("body").append("svg").attr("width", outerR * 2).attr("height", outerR * 2); // Creates the paintable canvas
      var group = canvas.append("g").attr("transform", "translate(" + outerR + "," + outerR + ")"); // Sets the location
      var arc = d3.svg.arc().innerRadius(innerR).outerRadius(outerR); // Creates the donut look
      var pie = d3.layout.pie();
      var arcs = group.selectAll(".arc").data( pie(data) ).enter().append("g").attr("class", "arc");
      arcs.append("path").attr("d", arc).attr("fill", function(d) { return color(d.data); } );
      if($scope.displayNumber != false){
        arcs.append("text").attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; } ).attr("text-anchor","middle").attr("font-size",fontSize + "px").text(function (d) {return d.data;} );
      }
      //TODO THIS IS A WORK IN PROGRESS TO HAVE TEXT BE IN THE MIDDLE
      var text = canvas.selectAll("text").data($scope.innerString)
                    .enter()
                    .append("text")
                    .attr("font-size", innerStringFontSize + "px")
                    .attr("x", function(d) { return outerR; })
                        .attr("y", function(d) { return outerR + innerStringFontSize / 2; })//TODO outerR - font size
                        .text( function (d) { return $scope.innerString; });    
    }
  };
}])