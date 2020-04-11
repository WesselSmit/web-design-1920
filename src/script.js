//Variables
const video = document.querySelector("video")


//Get video info
document.onkeypress = e => {
	e = e || window.event
	const pressedKey = e.code
	const infoKey = "KeyF"

	if (pressedKey === infoKey) {
		console.log("current video time: ", getCurrentTime())
		console.log("video playing: ", isVideoPlaying())
		console.log("video aspect ratio: ", getVideoAspectRatio())
		console.log("---------------------------------")
	}
}



//Helper functions
function getCurrentTime() {
	const currentTime = video.currentTime
	return currentTime
}

function setVideoTime(time) {
	video.currentTime = time //time in seconds
	console.log("set video time: ", time)
}

function isVideoPlaying() {
	return video.playing
}

function getVideoAspectRatio() {
	const width = video.videoWidth
	const height = video.videoHeight
	const aspectRatio = (width / 80) + "/" + (height / 80)
	return aspectRatio
}



//Video properties
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
	get: function () {
		return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2)
	}
})