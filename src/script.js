//Dev function : remove before production
document.querySelector('video').volume = 0.1


//Variables
const video = document.querySelector("video")



//Update if video is playing
video.addEventListener('timeupdate', e => {
	console.log("update", e.target.currentTime)
})








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