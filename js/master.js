// Navbar

function addMenuDown(element){
	element.innerHTML += '<span class="glyphicon glyphicon-menu-down" id="arrow" aria-hidden="true"></span>';
}

function hideMenuDown(){
	var span = document.getElementById('arrow');
	span.parentNode.removeChild(span);
}

// About Page

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

// Sign Up Page
function onClickSubmit() {
  var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (document.getElementById("InputName").value.length < 5) {
    document.getElementById("groupName").className = "form-group has-error";
    document.getElementById("errorName").innerHTML = "Name must be at least 5 letters";
  }
  else {
    document.getElementById("groupName").className = "form-group has-success";
    document.getElementById("errorName").innerHTML = "";
  }
  if (document.getElementById("InputSurname").value.length < 8) {
    document.getElementById("groupSurname").className = "form-group has-error";
    document.getElementById("errorSurname").innerHTML = "Surname must be at least 8 letters";
  }
  else {
    document.getElementById("groupSurname").className = "form-group has-success";
    document.getElementById("errorSurname").innerHTML = "";
  }
  if (validEmail.test(document.getElementById("InputEmail").value)) {
    document.getElementById("groupEmail").className = "form-group has-success";
    document.getElementById("errorEmail").innerHTML = "";
  }
  else {
    document.getElementById("groupEmail").className = "form-group has-error";
    document.getElementById("errorEmail").innerHTML = "Please enter valid Email";
  }
  if (document.getElementById("CheckboxAccept").checked) {
    document.getElementById("groupCheckbox").className = "has-success";
    document.getElementById("errorCheckboxAccept").innerHTML = "";
  }
  else {
    document.getElementById("groupCheckbox").className = "has-error";
    document.getElementById("errorCheckboxAccept").innerHTML = "Please accept the Terms of Service";
  }
  if (document.getElementById("errorName").innerHTML == "" && document.getElementById("errorSurname").innerHTML == "" &&
      document.getElementById("errorEmail").innerHTML == "" && document.getElementById("errorCheckboxAccept").innerHTML == "") {
    document.getElementById("submitSuccess").className = "alert alert-success paragraph";
    document.getElementById("submitSuccess").innerHTML = "Thank you! Your form was successfully submitted.";
  }
}
