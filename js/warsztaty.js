var newsUrl = 'http://www.q-service.com.pl/rss/';
var dataUrl = 'http://www.arcontact.pl/warsztaty_inter_cars/feed.php';
var w_path = 'wdata.json';

document.addEventListener("deviceready", onDeviceReady, fail);

function onDeviceReady() {
	$('body').text('Ładowanie danych...');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSWrite, fail);
}

function gotFSRead(fileSystem) {	
	fileSystem.root.getFile(w_path, {create: false}, gotFileEntryRead, fail);
}

function gotFSWrite(fileSystem) {	
	fileSystem.root.getFile(w_path, {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntryRead(fileEntry) {
	fileEntry.file(readFile, fail);
}

function gotFileEntry(fileEntry) {
	fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
	writer.onwrite = function(evt) {
		console.log(evt);
		$('body').text('Dane zostały zapisane do pliku.');
	};
	
	if(navigator.onLine) {
		$.ajax({
			type: 'GET',
			url: dataUrl,
			dataType: 'json',
			data: {type: 'list'},
			success: function(dat){
				writer.write(dat);
				//wyswietlanie...
			},
			error: function(xhr, type){
				alert('Ajax error!!!')
			}
		});
	} else {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSRead, fail);
	}
}

function readFile(file) {
	var reader = new FileReader();
	reader.onloadend = function(evt) {
		console.log("Read as text");
		console.log(evt.target.result);
	};
	reader.readAsText(file);
}

function fail(err) {
	alert(err);
}