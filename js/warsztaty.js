var newsUrl = 'http://www.q-service.com.pl/rss/';
var dataUrl = 'http://www.arcontact.pl/warsztaty_inter_cars/feed.php';
var w_path = 'wdata.json';

document.addEventListener("deviceready", onDeviceReady, fail);

function onDeviceReady() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
function gotFS(fileSystem) {	
	fileSystem.root.getFile(w_path, {create: true, exclusive: false}, gotFileEntry, fail);
}
function gotFileEntry(fileEntry) {
	fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
	writer.onwrite = function(evt) {
		console.log(evt);
		$('body').text('Dane zostały załadowane.');
	};
	
	if(navigator.onLine) {
		$('body').text('Ładowanie danych...');
		$.ajax({
			type: 'GET',
			url: dataUrl,
			dataType: 'json',
			data: {type: 'list'},
			success: function(dat){
				writer.write(dat);
			},
			error: function(xhr, type){
				alert('Ajax error!!!')
			}
		});
	}
}

function fail(err) {
	alert(err);
}