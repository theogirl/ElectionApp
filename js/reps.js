$(document).ready(function() {

var postalCode = '';

	//user enters code
	$('.user-input').find('button').click(function(e) {  //listen for submit event
		e.preventDefault();
		postalCode = $('.user-input').find('input').val();  //capture input and store in var
		//alert(input); 	//log var to ensure capture working
		requestTweeters();
		//displayInfo();
	})


function requestInfoByPC() {
	var url = 'https://represent.opennorth.ca/postcodes/'+postalCode+'/?callback=?';

	$.getJSON(url, function(data) {
		console.log(data);
	});

}

function requestCandidates() {
	var url = 'https://represent.opennorth.ca/candidates/house-of-commons/?callback=?';

	$.getJSON(url, function(data) {
		console.log(data);

		if (data.objects && data.objects.length > 0) {
				var $results = $('.search-results');
				$results.text('');
				$.each(data.objects, function(i, candidates) {
					var candidate = '<p>' + candidates.first_name + ' ' + candidates.last_name + '</p>';
					$results.append(candidate);
				});
		}
		else {
			alert('error!');
		}
	});

}

function requestTweeters() {
	var url = 'https://represent.opennorth.ca/candidates/?callback=?';

	$.getJSON(url, function(data) {
		console.log(data);

		if (data.objects && data.objects.length > 0) {
				var $tweeters = $('.tweeter-results');
				$tweeters.text('');
				var objects = data.objects;
			//if (objects.personal_url != '') {
				$.each(data.objects, function(i, candidates) {
					var personalURL = candidates.personal_url;
					var name = candidates.first_name + ' ' + candidates.last_name;
					var photoURL = candidates.photo_url;
					var photo = '<img src=\"' + photoURL + '\" class="photo" alt="candidate">';
					
					if (candidates.party_name == 'Green Party') { // or use switch statement?
						name = '<span style="color: green">' + name +'</span>'; 
					}
					else if (candidates.party_name == 'Conservative') {
						name = '<span style="color: blue">' + name +'</span>'; 
					}
					else if (candidates.party_name == 'Liberal') {
						name = '<span style="color: red">' + name +'</span>'; 
					}
					else if (candidates.party_name == 'NDP') {
						name = '<span style="color: orange">' + name +'</span>'; 
					}

					var candidate = '<p>' + photo + '<br />' + name + '<br />' + 'Personal site: ' + personalURL + '</p>';
					$tweeters.append(candidate);
				});
			//}

		}
		else {
			alert('No data has been returned!');
		}
	});

}



})//end doc ready