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