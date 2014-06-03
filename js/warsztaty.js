var newsUrl = 'http://www.q-service.com.pl/rss/';

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	if(navigator.onLine) {
		/*$.ajax({
			type: 'GET',
			url: newsUrl,
			success: function(data){
				alert(data.html());
			},
			error: function(xhr, type){
				alert('Ajax error!')
			}
		});*/
		$.getJSON('http://arcontact.pl/warsztaty_inter_cars/feed.php?type=list', function(remoteData){
			alert('xxx');
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