var newsUrl = 'http://www.q-service.com.pl/rss/';
var dataUrl = 'http://www.arcontact.pl/warsztaty_inter_cars/feed.php';
var fi_path = 'installed.dat';
var w_path = 'wdata.json';

/*if(typeof window.plugins != 'undefined' && typeof window.plugins.Shortcut != 'undefined'){
	window.plugins.Shortcut.CreateShortcut("Inter Cars", function(a){
	}, function(b){
	} );
}*/

document.addEventListener("deviceready", onDeviceReady, fail);

function onDeviceReady() {
	$('body').text('Ładowanie danych...');
	//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSWrite, fail);
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
		fs.root.getFile(fi_path, {create: false}, function(fe){
			console.log(fe);
		}, function(ee){
			console.log(ee);
		});
	}, fail);
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
		alert("Read as text");
		alert(evt.target.result);
	};
	reader.readAsText(file);
}

function fail(err) {
	alert(err);
}