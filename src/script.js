//Dev function : remove before production
document.querySelector('video').volume = 0.1


//Variables
const video = document.querySelector("video")
let CC



//Make sure CC-data is available before using it
fetch('./media/CC/feelSomething.json')
	.then(res => res.json())
	.then(json => {
		CC = json.CC
		addVideoController()
	})


function addVideoController() {
	//Update if video is playing
	// video.addEventListener('timeupdate', e => {
	// 	const videoTime = e.target.currentTime
	// console.log("update", e.target.currentTime, CC)

	//TODO: momenteel word de update getriggerd elke keer dat de video timer update (meerdere keren per seconde)
	//TODO: het probleem hiermee is dat elke seconde de browser 4-5x de CC gaat overschrijven en je dus niet kan animeren
	//TODO: om dit te fixen moet er een soort check ingebouwd worden die kijkt of de tekst al op beeld staat. als dat zo is moet hij niet geupdate worden

	// const matchingCC = findCC(videoTime)
	// checkIfNewCC(matchingCC)
	// })
}




// function findCC(time) {
// 	return CC.filter(cc => cc.startTime < time && time < cc.endTime)
// }