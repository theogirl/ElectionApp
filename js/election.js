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
		updateGender();
		alert('done!');

		//displayInfo();
	})

//-------FUNCTIONS---------//

function getData() {

var url = 'https://represent.opennorth.ca/candidates/?callback=?';
var params = {
	  limit: 20//use limit=1000 to get full list
	};

$.getJSON(url, params, function(data) {

	if (data.objects && data.objects.length > 0) {
			myData = data.objects;
			myStats = data.meta;
			total = myStats.total_count;
			$('.infographic p:first-child').append(total);//to update stat for total candidates
	}
	else {
			alert('no data!');
	}

	console.log(myData);

	$.each(data.objects, function(i, candidates) {

		//update global variables with actual data
		var name = candidates.name;
		var personalURL = candidates.personal_url;
		var gender = candidates.gender;
		var photoURL = candidates.photo_url;
		var photo = '<div class="avatar" style=\"background-image: url('+photoURL+')\"></div>';
		var candidate = photo+'<p><a href=\"'+personalURL+'\">'+name+'</a> ('+gender+')</p>';
		$('.content-test').append(candidate);
		if (gender === "M") {
			maleCount++;
		}
		else if (gender === "F") {
			femaleCount++;
		};

	});//end each

});//end AJAX request

} //end getData


//this was just for testing purposes...
function getType() {
	var type = typeof myData;
	alert('myData is: '+type);
}


function updateGender() {
	$('.infographic p:nth-child(2)').append(maleCount);
	$('.infographic p:nth-child(3)').append(femaleCount);
}




})//end doc ready