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
	var wsw = {lat: -36.853507, lng: 174.766542};
	var map = new google.maps.Map(document.getElementById("googleMap"), {
		center: wsw,
		zoom: 15
	});
	var marker = new google.maps.Marker({
	position: wsw,
	map: map,
	animation: google.maps.Animation.DROP
	});
}
