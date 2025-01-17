

d3.json("https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json").then(data => {
    console.log(data);
    graph(data)
});
function graph(data){
    // set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
width = 500 - margin.left - margin.right,
height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#canvas")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

//Read the data


// Add X axis
var x = d3.scaleLinear()
.domain([0, Math.max.apply(Math, data.map(function(o) { return o.purchasingpower; }))])
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([0, Math.max.apply(Math, data.map(function(o) { return o.lifeexpectancy; }))])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Add a scale for bubble size
var z = d3.scaleLinear()
.domain([0, Math.max.apply(Math, data.map(function(o) { return o.population; }))])
.range([ 5, 30]);

// Add a scale for bubble color
var myColor = d3.scaleOrdinal()
.domain(data.map(d=>d.country))
.range(d3.schemeSet2);

// -1- Create a tooltip div that is hidden by default:
var tooltip = d3.select("#canvas")
.append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white")

// -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
var showTooltip = function(d) {
tooltip
  .transition()
  .duration(200)
tooltip
  .style("opacity", 1)
  .html("Country: " + d.country)
  .style("left", (d3.mouse(this)[0]+30) + "px")
  .style("top", (d3.mouse(this)[1]+30) + "px")
}
var moveTooltip = function(d) {
tooltip
  .style("left", (d3.mouse(this)[0]+30) + "px")
  .style("top", (d3.mouse(this)[1]+30) + "px")
}
var hideTooltip = function(d) {
tooltip
  .transition()
  .duration(200)
  .style("opacity", 0)
}

// Add dots
svg.append('g')
.selectAll("dot")
.data(data)
.enter()
.append("circle")
  .attr("class", "bubbles")
  .attr("cx", function (d) { return x(d.purchasingpower); } )
  .attr("cy", function (d) { return y(d.lifeexpectancy); } )
  .attr("r", function (d) { return z(d.population); } )
  .style("fill", function (d) { return myColor(d.country); } )
// -3- Trigger the functions
.on("mouseover", showTooltip )
.on("mousemove", moveTooltip )
.on("mouseleave", hideTooltip )


}


 /*   
svg.append("rect")
    .attr("x",10)
    .attr("y",10)
    .attr("width",100)
    .attr("height",100)
    .style("fill","steelblue")

const data=[
    {name: "Juan", age: 4},
    {name: "Maria", age: 7},
    {name: "Sandra", age: 24},
    {name: "Elvia", age: 40},
]
const ul = canvas.append("ul");

const li =ul.selectAll("li").data(data)
li.enter()
    .append("li")
    .text(d=>d.name)

data.forEach(d=> ul.append("li").text(d.name))*/
