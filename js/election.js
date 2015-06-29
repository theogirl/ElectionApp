$(document).ready(function() {

//------GLOBAL VARIABLES---------//
	var total = '';
	var maleCount = 0;
	var femaleCount = 0;
	var photo = '';
	var myData = {};
	var myStats = '';

//-----Display current date---//
	var today = new Date();
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var weekday = days[today.getDay()];
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var mm = months[today.getMonth()];
	var dd = today.getDate();
	var yyyy = today.getFullYear();
	today = weekday+', '+mm+' '+dd+', '+yyyy;
	$('#date').text(today);


//-------EVENTS---------//

	$('#btn-party').click(function(e) {  //listen for submit event
		e.preventDefault();
		getAll();

		//displayInfo();
	})

//-------FUNCTIONS---------//

function getAll() {

var url = 'https://represent.opennorth.ca/candidates/?callback=?';
var params = {
	  limit: 20//use limit=1000 to get full list
	};

$.getJSON(url, params, function(data) {
	console.log(data)//just for me so I can see data object	

	if (data.objects && data.objects.length > 0) {
			myData = data.objects;
			myStats = data.meta;
			total = myStats.total_count;
			$('.infographic p:first-child').append(total);//to update stat for total candidates
	}
	else {
			alert('no data!');
	}

	$.each(data.objects, function(i, candidates) {


		//update global variables with actual data
		var name = candidates.name;
		var personalURL = candidates.personal_url;
		var gender = candidates.gender;
		var photoURL = candidates.photo_url;
		var district = candidates.district_name;
		var email = candidates.email;
		var party = candidates.party_name;
		var photo = '<div class="avatar" style=\"background-image: url('+photoURL+')\"></div>';
		
		if (personalURL !== "") {
			var website = '<a href=\"'+personalURL+'\">Website</a>';
			var candidate = '<li class="list-item">'+photo+'<div class="info">'+name+'<br />'+party+'<br />'+website+'</div></li>';
				$('.list-all').append(candidate);
		}
		else {
			var candidate = '<li class="list-item">'+photo+'<div class="info">'+name+'<br />'+party+'</div></li>';
			$('.list-all').append(candidate);
		};
		
	});//end each

});//end AJAX request

} //end getData


//this was just for testing purposes...
function getType() {
	var type = typeof myData;
	alert('myData is: '+type);
}




})//end doc ready