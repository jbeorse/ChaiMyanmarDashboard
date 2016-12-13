$SCRIPT_ROOT = {{ request.script_root|tojson|safe }};
///////////////////////////////////////////// Query imports /////////////////////////////////////////////////////

$.getJSON($SCRIPT_ROOT + '/_get_avgAgePerState', {}, function(data) {
    $("#avgAgePerState").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgAgePerTown', {}, function(data) {
    $("#avgAgePerTown").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgAgePerProvince', {}, function(data) {
    $("#avgAgePerProvince").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgAgePerFacilityName', {}, function(data) {
    $("#avgAgePerFacilityName").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgAgePerFacilityType', {}, function(data) {
    $("#avgAgePerFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultTotal', {}, function(data) {
    $("#eidTestResultTotal").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultAIDSTFacilityType', {}, function(data) {
    $("#eidTestResultAIDSTFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultAMIFacilityType', {}, function(data) {
    $("#eidTestResultAMIFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultDisHFacilityType', {}, function(data) {
    $("#eidTestResultDisHFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultGenHFacilityType', {}, function(data) {
    $("#eidTestResultGenHFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultMSFHFacilityType', {}, function(data) {
    $("#eidTestResultMSFHFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultNHLFacilityType', {}, function(data) {
    $("#eidTestResultNHLFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultSpHFacilityType', {}, function(data) {
    $("#eidTestResultSpHFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultSRHFacilityType', {}, function(data) {
    $("#eidTestResultSRHFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultTHFacilityType', {}, function(data) {
    $("#eidTestResultTHFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatTotal', {}, function(data) {
    $("#avgTatTotal").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatAIDSTFacilityType', {}, function(data) {
    $("#avgTatAIDSTFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatAMIFacilityType', {}, function(data) {
    $("#avgTatAMIFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatDisHFacilityType', {}, function(data) {
    $("#avgTatDisHFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatGenHFacilityType', {}, function(data) {
    $("#avgTatGenHFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatMSFHFacilityType', {}, function(data) {
    $("#avgTatMSFHFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatNHLFacilityType', {}, function(data) {
    $("#avgTatNHLFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatSpHFacilityType', {}, function(data) {
    $("#avgTatSpHFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatSRHFacilityType', {}, function(data) {
    $("#avgTatSRHFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatTHFacilityType', {}, function(data) {
    $("#avgTatTHFacilityType").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_trackSample', {}, function(data) {
    $("#trackSample").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgAgeNHL', {}, function(data) {
    $("#avgAgeNHL").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgAgePHL', {}, function(data) {
    $("#avgAgePHL").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgAgeUNION', {}, function(data) {
    $("#avgAgeUNION").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultNHLLab', {}, function(data) {
    $("#eidTestResultNHLLab").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultPHLLab', {}, function(data) {
    $("#eidTestResultPHLLab").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_eidTestResultUNIONLab', {}, function(data) {
    $("#eidTestResultUNIONLab").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatNHLLab', {}, function(data) {
    $("#avgTatNHLLab").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatPHLLab', {}, function(data) {
    $("#avgTatPHLLab").text(data.result);
});
$.getJSON($SCRIPT_ROOT + '/_get_avgTatUNIONLab', {}, function(data) {
    $("#avgTatUNIONLab").text(data.result);
});
 

/////////////////////////////////////////// End Query Import ////////////////////////////////////////////////////
////////////////////////////////////////  D3 with import example ////////////////////////////////////////////////
var w = 960,
h = 500
// create canvas
var svg = d3.select("#viz").append("svg:svg")
.attr("class", "chart")
.attr("width", w)
.attr("height", h )
.append("svg:g")
.attr("transform", "translate(10,470)");
x = d3.scale.ordinal().rangeRoundBands([0, w-50])
y = d3.scale.linear().range([0, h-50])
z = d3.scale.ordinal().range(["darkblue", "blue", "lightblue"])
console.log("RAW MATRIX---------------------------");
// 4 columns: ID,c1,c2,c3
var matrix = {{ data_arr }}
console.log(matrix)
console.log("REMAP---------------------------");
var remapped =["c1","c2","c3"].map(function(dat,i){
    return matrix.map(function(d,ii){
        return {x: ii, y: d[i+1] };
    })
});
console.log(remapped)
console.log("LAYOUT---------------------------");
var stacked = d3.layout.stack()(remapped)
console.log(stacked)
x.domain(stacked[0].map(function(d) { return d.x; }));
y.domain([0, d3.max(stacked[stacked.length - 1], function(d) { return d.y0 + d.y; })]);
// show the domains of the scales
console.log("x.domain(): " + x.domain())
console.log("y.domain(): " + y.domain())
console.log("------------------------------------------------------------------");
// Add a group for each column.
var valgroup = svg.selectAll("g.valgroup")
.data(stacked)
.enter().append("svg:g")
.attr("class", "valgroup")
.style("fill", function(d, i) { return z(i); })
.style("stroke", function(d, i) { return d3.rgb(z(i)).darker(); });
// Add a rect for each date.
var rect = valgroup.selectAll("rect")
.data(function(d){return d;})
.enter().append("svg:rect")
.attr("x", function(d) { return x(d.x); })
.attr("y", function(d) { return -y(d.y0) - y(d.y); })
.attr("height", function(d) { return y(d.y); })
.attr("width", x.rangeBand());