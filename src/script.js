//Variables
const video = document.querySelector("video")
const videoCC = document.getElementById("captions")
let CC



//Set volume to last known volume (if available in localStorage)
const volumePref = localStorage.getItem("volumePref")
if (volumePref) {
	video.volume = volumePref
}

//Update volumePref in localStorage
video.addEventListener('volumechange', e => {
	const volume = e.target.volume
	localStorage.setItem("volumePref", volume)
})






//Make sure CC-data is available before using it
fetch('./media/CC/APerfectLap.json')
	.then(res => res.json())
	.then(json => {
		CC = json.CC
		addVideoController()
	})





//Update the video
function addVideoController() {
	video.addEventListener('timeupdate', e => {
		const videoTime = e.target.currentTime //This triggers approx. 4x every second

		const matchingCC = findCC(videoTime)

		if (matchingCC != null) {
			if (CCisNew(matchingCC)) {
				consoleLogUpdate(matchingCC)

				updateVideoCC(matchingCC)
			}
		} else {
			resetCC()
		}
	})
}








//Helper functions
function findCC(time) {
	const matchingCaptions = CC.find(cc => cc.startTime < time && time < cc.endTime)
	return matchingCaptions ? matchingCaptions : null
}



function CCisNew(captions) {
	const currentCC = videoCC.getAttribute("captions-id")
	const newCC = "CC" + captions.id
	return currentCC != newCC
}



function consoleLogUpdate(matchingCC) {
	console.log("updating CC: ", [{
		"old-CC: ": videoCC.textContent
	}, {
		"new-CC": matchingCC.text
	}])
}



function updateVideoCC(captions) {
	videoCC.innerHTML = captions.text
	videoCC.setAttribute("captions-id", "CC" + captions.id)
}



function resetCC() {
	videoCC.textContent = ""
	videoCC.setAttribute("captions-id", "")

	console.log("CC was reset")
}