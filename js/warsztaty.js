var newsUrl = 'http://www.q-service.com.pl/rss/';
var dataUrl = 'http://www.arcontact.pl/warsztaty_inter_cars/feed.php';
var w_path = 'wdata.json';

document.addEventListener("deviceready", onDeviceReady, fail);

function onDeviceReady() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
function gotFS(fileSystem) {
	checkIfFileExists(w_path);
	
	//fileSystem.root.getFile(w_path, {create: true, exclusive: false}, gotFileEntry, fail);
}
function gotFileEntry(fileEntry) {
	fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
	writer.onwrite = function(evt) {
		alert("write success");
	};
	
	if(navigator.onLine) {
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

function checkIfFileExists(path){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile(path, { create: false }, function(){
			alert(1);
		}, function(){
			alert(0);
		});
    }, false);
}

function fail(err) {
	alert(err);
}