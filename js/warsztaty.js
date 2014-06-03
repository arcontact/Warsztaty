document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
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