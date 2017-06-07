// JavaScript Document
//variables
"use strict";
var url ='catalog.json';

function useWines()
{
	url='catalog.json';
}
function listFeature()
{
	var feature = document.getElementById("featured-wines");
	var jsonHttp;
	var jsonCatalog, WineID, WineName, WineCategory, WineYear, WinePrice, WineRegion, WineDesc;
	var wholeList;
	var i = 0;
	var count = 0;

   }
$(function(){
    $.getJSON('catalog.json', function(data) {
            for(var i=0;i<data.wineArray.length;i++){
                $('#featured-wines').append('<div class="coll-md-3"><img src="images/' + data.wineArray[i].imageLarge + '" width="86" height="302" alt=""/><br>' + '<h4>' + data.wineArray[i].name + '</h4><br>');
            }
    });
});

// About page

function initMap() {
	var wsw = {lat: -45.870823, lng: 170.504931};
	var map = new google.maps.Map(document.getElementById("googleMap"), {
		center: wsw,
		zoom: 15
	});
	var contentString = '<div id="content">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<h5 id="firstHeading" class="firstHeading">Wall Street Wines</h5>'+
		'<div id="bodyContent">'+
		'<p>211 George St, Dunedin, 9016</p>'+
		'</div>'+
		'</div>';
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	var marker = new google.maps.Marker({
	position: wsw,
	map: map,
	animation: google.maps.Animation.DROP
	});
	marker.addListener('click', function() {
	infowindow.open(map, marker);
	});
}
