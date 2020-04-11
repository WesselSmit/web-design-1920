const video = document.querySelector("video")



// * Testing purposes
// video.volume = 0.1
video.volume = 0

video.addEventListener("loadedmetadata", function (e) {
	const width = this.videoWidth
	const height = this.videoHeight

	console.log("video aspect ratio: " + (width / 80) + "/" + (height / 80))
}, false)
// * Testing purposes