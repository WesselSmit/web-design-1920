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
fetch('./media/CC/feelSomething.json')
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





const captionsContainer = document.getElementById('captions-container')
captionsContainer.addEventListener('drag', () => {
	console.log('ja')
})

// Make the DIV element draggable:
dragElement(captionsContainer)

function dragElement(elmnt) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0
	if (document.getElementById(elmnt.id + "header")) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event
		e.preventDefault()
		// get the mouse cursor position at startup:
		pos3 = e.clientX
		pos4 = e.clientY
		document.onmouseup = closeDragElement
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag
	}

	function elementDrag(e) {
		e = e || window.event
		e.preventDefault()
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX
		pos2 = pos4 - e.clientY
		pos3 = e.clientX
		pos4 = e.clientY
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null
		document.onmousemove = null
	}
}






// //Video fullscreen change
// video.addEventListener('webkitfullscreenchange', e => {
// 	console.log('fullscreen change')
// })








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