var newsUrl = 'http://www.q-service.com.pl/rss/';
var dataUrl = 'http://arcontact.pl/warsztaty_inter_cars/feed.php';

document.addEventListener("deviceready", onDeviceReady, false);
alert('xx');

function onDeviceReady() {
	if(navigator.onLine) {
		$.ajax({
			type: 'GET',
			url: dataUrl,
			dataType: 'json',
			data: {type: 'list'},
			success: function(dat){
				alert(dat);
			},
			error: function(xhr, type){
				alert('Ajax error!!!')
			}
		});
	}
	//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
function gotFS(fileSystem) {
	var path = "data.xml";
	fileSystem.root.getFile(path, {create: true, exclusive: false}, gotFileEntry, fail);
}
function gotFileEntry(fileEntry) {
	//fileEntry.createWriter(gotFileWriter, fail);
	alert(fileEntry.fullPath);
}

function gotFileWriter(writer) {
	writer.onwrite = function(evt) {
		alert("write success");
	};
	writer.write("some sample text");
}

function fail(err) {
	alert(err);
}