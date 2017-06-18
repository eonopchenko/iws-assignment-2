/**
 * Document ready event handler registration
 * @param  {function} () handler callback
 */
$( document ).ready(
	function() {
		$( document ).on( "click", ".cart-icon",
			function( e ) {
				$( this ).parent().parent().remove();
				removeFromCart( $( this ).attr( "name" ) );
				e.stopPropagation();
			}
		);
		refreshCartButton()
		if ( !isCartEmpty() ) {
			getCart();
		}
	}
);

/**
 * Actual cart table obtainig
 * @return {String} URI component
 */
function getCart() {
	var total = 0;
	var cart = getCartElements();
	$( ".cart table tr" ).remove();
	$.getJSON( "../catalog.json",
		function( data ) {
			$( data.wines ).each(
				function( o, wine ) {
					for( var i = 0; i < cart.length; i++ ) {
						if ( cart[ i ] != null &&  wine[ 'id' ] == cart[ i ] ) {
							$( ".cart table" ).append( "<tr><td><img src='images/wines/" + wine[ 'id' ] + ".jpg' height='80px' width='32px'></img></td><td><h5>" + wine[ 'name' ] + "</h5></td><td><h4> $" + wine[ 'price' ] + "</h4></td><td><i class='fa fa-check cart-icon' aria-hidden='true' name='"+ wine[ 'id' ] +"'></i></td><td><button class='btn btn-danger' type='button' onClick='removeFromCart(" + wine[ 'id' ] + ")'>Remove</button></td></tr>" );
							total = total + parseFloat( wine[ 'price' ] );
						}
					}
				}
			);
			$( ".cart table" )[ 0 ].innerHTML += "<tr><td></td><td>Subtotal $" + total + "</td></tr>";
			refreshCartButton();
		}
	);

	return cart;
}

/**
 * Empty cart checking
 * @return {Boolean} true if cart is empty
 */
function isCartEmpty() {
	if ( readCookie( "cart" ) != null && readCookie( "cart" ) != "" ) {
		return false;
	}
	return true;
}

/**
 * Cart content updating
 */
function refreshCartButton() {
	$( ".cart-button .badge" ).each( function( i, el ) {
		if ( !isCartEmpty() ) {
			el.innerHTML = getCartElements().length;
		}
		else {
			el.innerHTML = 0;
			$( ".cart table" )[ i ].innerHTML = "<tr><td>The cart is empty</td></tr>";
		}
	});
}

/**
 * Adding an item to cart
 * @param {String} wine item to be added
 */
function addToCart( wine ) {
	if ( ( wine == null ) || ( wine < 1 ) ) {
		return;
	}

	var cart = [];
	if ( readCookie( "cart" ) != null) {
		var cart = getCartElements();
	}

	cart.push( wine );
	createCookie( "cart", cart, 1 );

	getCart();
}

/**
 * Obtaining of cart content from cookies
 * @return {String} URI component
 */
function getCartElements() {
	var cart = readCookie( "cart" );
	cart = trimChar( cart, "," );
	cart = cart.split( "," );

	if ( ( cart.length < 1 ) || ( ( cart.length > 1 ) && ( cart[ 0 ] == "" ) ) ) {
		return [];
	}

	return cart;
}

/**
 * Deletion of an item from cart
 * @param  {String} wine Wine ID
 */
function removeFromCart( wine ) {
	var cart = readCookie( "cart" ).split( "," );
	var newCart = [];
	var deleted = false;
	for( var i = 0; i < cart.length; i++ ) {
		var wineNo = cart[ i ];
		if ( wineNo != null ) {
			if ( ( wineNo == wine ) && !deleted ) {
				deleted = true;
			}
			else {
				newCart.push( wineNo );
			}
		}
	}
	createCookie( "cart", newCart, 1 );
	refreshCartButton();
	getCart();
}

/**
 * String characters trim
 * @param  {String} string	     input string
 * @param  {String} charToRemove character to remove
 * @return {String}			         result string
 */
function trimChar(string, charToRemove)
{
	if ( charToRemove === "" ) {
		return string;
	}

	var start = 0, end = string.length - 1;
	while ( string.charAt( end ) == charToRemove ) {
		end--;
	}
	if ( end === -1 ) {
		return "";
	}

	while ( string.charAt( start ) == charToRemove ) {
		start++;
	}

	return string.slice( start, end + 1 );
}

/**
 * Syncronization cookies with cart
 * @param  {String} name  name of cookie
 * @param  {String} value values to be saved
 * @param  {Number} days  days before disposal
 * @return {[type]}	   [description]
 */
function createCookie( name, value, days ) {

	var expires = "";

	if ( days ) {
		var date = new Date();
		date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
		expires = "; expires=" + date.toGMTString();
	}

	document.cookie = encodeURIComponent( name ) + "=" + encodeURIComponent( value ) + expires + "; path=/";
}

/**
 * Obtaining data from cookies
 * @param  {String} name cookie name
 * @return {String}      URI component
 */
function readCookie( name ) {
	var nameEQ = encodeURIComponent( name ) + "=";
	var ca = document.cookie.split( ';' );

	for( var i = 0; i < ca.length; i++ ) {
		var c = ca[ i ];

		while ( c.charAt( 0 ) === ' ' ) {
			c = c.substring( 1, c.length );
		}

		if ( c.indexOf( nameEQ ) === 0 ) {
			return decodeURIComponent( c.substring( nameEQ.length, c.length ) );
		}
	}

	return null;
}

/**
 * Cookie deletion
 * @param  {String} name cookie name
 */
function eraseCookie( name ) {
	createCookie( name, "", -1 );
}
