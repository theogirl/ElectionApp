$(document).ready(function() {

//------GLOBAL VARIABLES---------//
	var total = '';
	var maleCount = 0;
	var femaleCount = 0;
	var photo = '';
	var myData = {};
	var myStats = '';


//-------EVENTS---------//

	$('#btn-party').click(function(e) {  //listen for submit event
		e.preventDefault();
		getData();
		updateTotal();

		//displayInfo();
	})

//-------FUNCTIONS---------//

function getData() {

var url = 'https://represent.opennorth.ca/candidates/?callback=?';
var params = {
	  limit: 1000//use limit=1000 to get full list
	};

$.getJSON(url, params, function(data) {

	if (data.objects && data.objects.length > 0) {
			myData = data.objects;
			myStats = data.meta;
	}
	else {
			alert('no data!');
	}

	$.each(data.objects, function(i, candidates) {

		//update global variables with actual data
		var name = candidates.name;
		var personalURL = candidates.personal_url;
		var gender = candidates.gender;
		var candidate = '<p>'+name+'is a '+gender+'. See their website<a href=\"'+personalURL+'\">HERE</a></p>';
		$('.content-test').append(candidate);

	});//end each

});//end AJAX request
} //end getData


//this was just for testing purposes...
function getType() {
	var type = typeof myData;
	alert('myData is: '+type);
}


function updateGender() {
	$('.infographic p:nth-child(2)').append(male);
	$('.infographic p:nth-child(3)').append(female);
}


function updateTotal() {
	total = myStats.total_count;
	$('.infographic p:first-child').append(total);//to update stat for total candidates
}



})//end doc ready