var log_background;
var log = [];

function AddToLog(text) {
	var element = document.createElement("text");
	element.innerHTML = text;
	element.style.display = 'block';
	log.push(element);
	log_background.prepend(element);

	while (log.length > 8) {
		log.shift();
		log_background.removeChild(log_background.childNodes[6]);
	}
}