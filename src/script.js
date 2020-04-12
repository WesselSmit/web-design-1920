//Variables
const video = document.querySelector("video")
const videoCC = document.getElementById("captions")
let CC



//Set volume to last known volume (if available)
const volumePref = localStorage.getItem("volumePref")
if (volumePref) {
	video.volume = volumePref
}

video.addEventListener('volumechange', e => {
	const volume = e.target.volume
	localStorage.setItem("volumePref", volume)
})







//Make sure CC-data is available before using it
fetch('./media/CC/feelSomething.json')
	.then(res => res.json())
	.then(json => {
		CC = json.CC
		addVideoController()
	})




function addVideoController() {

	//Update the video
	video.addEventListener('timeupdate', e => {
		const videoTime = e.target.currentTime //This triggers approx. 4x each second


		const matchingCC = findCC(videoTime)
		// console.log("matching CC: ", matchingCC)

		// if ("captions are new") { //Todo: check of captions nieuw zijn of al zichtbaar waren
		updateVideoCC(matchingCC)
		// }
	})
}




function findCC(time) {
	return CC.filter(cc => cc.startTime < time && time < cc.endTime)
}



function updateVideoCC(captions) {
	videoCC.innerHTML = captions
	//todo: insert captions into DOM
}