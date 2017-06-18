/**
 * Product page initialization
 */
function init() {
	$.getJSON( "../catalog.json",
		function( data ) {
			var items = [];
			var categories = [];

			$.each( data.wines,
				function( i, wine ) {
					var cat = wine[ 'category' ];
					cat = cat.replace( / /g, '_' );
					items.push( generateProductDiv( wine ) );
					var current = "<li name='" + cat + "'>" + wine[ 'category' ] + "</li>";
					if( $.inArray( current, categories ) === -1 ) {
						categories.push( current );
					}
				}
			);

			items.push( "<div class='clear'></div>" );
			$( ".products" )[ 0 ].innerHTML = "";
			$( ".categories" )[ 0 ].innerHTML = "";
			for( var i = 0; i < categories.length; i++ ) {
				$( ".categories" ).get( 0 ).innerHTML += categories[ i ];
			}
			for( var i = 0; i < items.length; i++ ) {
				$( ".products" ).get( 0 ).innerHTML += items[ i ];
			}
		}
	);
	$( document ).on( "click", ".infobox button",
		function( e ) {
			addToCart( $( this ).attr( "name" ) );
			e.stopPropagation();
		}
	);
}

/**
 * Product div block generation
 * @param  {String} wine [description]
 * @return {String}      div block markup
 */
function generateProductDiv( wine ) {
	var cat = wine[ 'category' ];
	cat = cat.replace( / /g, '_' );
	return "<div class='lightbox infobox " + cat + "'><img src='images/wines/" + wine[ 'id' ] + ".jpg'></img><h5>" + wine[ 'name' ] + "</h5><center><h4>$" + wine[ 'price' ] + "</h4></center><button type='button' class='btn btn-default' aria-haspopup='true' name='" + wine[ 'id' ] + "' aria-expanded='false'>Add to cart <span class='glyphicon glyphicon-shopping-cart'></span></button><div class='lightbox-more'><div class='col-sm-14 text-center'><img class='img-responsive text-center center-block' src='images/wines/" + wine[ 'id' ] + ".jpg' /></div><br />			<div class='text-center'> <h2>" + wine[ 'name' ] + "</h2><p>Description: " + wine[ 'desc' ] + "</p><p>Category: " + wine[ 'category' ] + "</p><h4>Price: $" + wine[ 'price' ] + "</h4></div><button style='position:absolute;bottom:10px;right:10px;' class='btn btn-danger' type='button' onClick='addToCart(" + wine[ 'id' ] + ")'>Add to cart</button></div></div>";
}

/**
 * Deals block initialization
 */
function initDeal()
{
	$.getJSON( "../catalog.json",
		function( data ) {
			var items = [];
			$.each( data.wines,
				function( i, wine ) {
					if( wine[ 'onsale' ] == "yes") {
						var cat = wine[ 'category' ];
						cat = cat.replace( / /g, '_' );
						items.push( generateProductDiv( wine ) );
						var current = "<li name='" + cat + "'>" + wine[ 'category' ] + "</li>";
					}
				}
			);
			$( ".deal" )[ 0 ].innerHTML = "";
			for( var i = 0; i < items.length; i++ ) {
				$( ".deal" ).get( 0 ).innerHTML += items[ i ];
			}
		}
	);
}

/**
 * Popular products block initialization
 */
function initPopular() {
	$.getJSON( "../catalog.json", function( data ) {
		var items = [];

		$.each( data.wines,
		 	function( i, wine ) {
				if( wine[ 'popularity' ] == "high") {
					var cat = wine[ 'category' ];
					cat = cat.replace( / /g, '_' );
					items.push( generateProductDiv( wine ) );
					var current = "<li name='" + cat + "'>" + wine[ 'category' ] + "</li>";
				}
			}
		);
		$( ".popular" )[ 0 ].innerHTML = "";
		for( var i = 0; i < items.length; i++ ) {
			$( ".popular" ).get( 0 ).innerHTML += items[ i ];
		}
	});
}

/**
 * Home page initialization
 */
function initHome() {
	$( document ).on( "click", ".infobox button",
		function( e ) {
			addToCart($( this ).attr( "name" ));
			e.stopPropagation();
		}
	);
}

/**
 * Document ready event handler registration
 * @param  {function} () handler callback
 */
$( document ).ready(
	function() {
		$( "body" )[ 0 ].innerHTML += "<div class='lightbox-lightbox'></div>";

		$( document ).on( 'click', ".lightbox",
			function( event ) {
				var lightboxMore = $(this).find(".lightbox-more");
				if( lightboxMore.length > 0 ) {
					lightboxMore.css( { "display" : "block" } );
				} else {
					var newEl = $( this ).find( "img" ).clone( true ).addClass( "lightbox-imageonly" ).appendTo( $( this ) );
				}
				$( "body" ).find( ".lightbox-lightbox" ).css( { "display" : "block" } );
				event.stopPropagation();
			}
		);

		$(document).on('click', '.lightbox-lightbox',
			function() {
				$( document ).find( ".lightbox-more" ).css( { "display" : "none" } );
				$( this ).css( { "display" : "none" } );
			}
		);

		$( document ).on( 'click', '.categories li',
			function( event ) {
				var name = $( this ).attr( "name" );
				if( $( this ).css( "color" ).replace( /\D+/g, '' ) === '128128128' ) {
					$( this ).css( { "color" : "black" } );
					$( ".products" ).find( "." + name ).css( { "display" : "block" } );
				} else {
					$( ".products" ).find( "." + name ).css( { "display" : "none" } );
					$( this ).css( { "color" : "gray" } );
				}
				event.stopPropagation();
			}
		);
	}
);
