document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	alert('READY');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
function gotFS(fileSystem) {
	var path = "readme.txt";
	fileSystem.root.getFile(path, {create: true, exclusive: false}, gotFileEntry, fail);
}
function gotFileEntry(fileEntry) {
	fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
	writer.onwrite = function(evt) {
		console.log("write success");
	};
	writer.write("some sample text");
}