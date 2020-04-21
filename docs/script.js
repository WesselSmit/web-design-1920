//TODO: remove 
// * development code: (1 line)
document.querySelector("video").currentTime = 51


//Variables
const video = document.querySelector("video")
const videoCC = document.getElementById("captions")



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
	.then(json => { //Add id's to all json CC
		return json.CC.map((cc, i) => {
			return Object.assign(cc, {
				id: i + 1
			})
		})
	})
	.then(json => addVideoController(json))





//Update the video
function addVideoController(CC) {
	video.addEventListener('timeupdate', e => {
		const videoTime = e.target.currentTime //This triggers approx. 4x every second

		const matchingCC = findCC(CC, videoTime)

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





//Video skipping
window.addEventListener("keydown", e => {
	const pressedKey = e.code
	const back = "ArrowLeft"
	const forwards = "ArrowRight"
	const timeJump = 10

	if (pressedKey === back) {
		video.currentTime -= timeJump
	} else if (pressedKey === forwards) {
		video.currentTime += timeJump
	}
})







//Helper functions

//Find CC matching the video runtime
function findCC(CC, time) {
	const matchingCaptions = CC.find(cc => cc.startTime < time && time < cc.endTime)
	return matchingCaptions ? matchingCaptions : null
}



//Check if CC is new or if CC is already being shown
function CCisNew(captions) {
	const currentCC = videoCC.getAttribute("captions-id")
	const newCC = "CC" + captions.id
	return currentCC != newCC
}



//Log the CC changes
function consoleLogUpdate(matchingCC) {
	console.log("updating CC: ", [{
		"old-CC: ": videoCC.textContent
	}, {
		"new-CC": matchingCC.text
	}])
}



//Update video CC
function updateVideoCC(captions) {
	videoCC.innerHTML = captions.text
	videoCC.setAttribute("captions-id", "CC" + captions.id)
}



//Reset the CC to "blank"
function resetCC() {
	videoCC.textContent = ""
	videoCC.setAttribute("captions-id", "")

	console.log("CC was reset")
}