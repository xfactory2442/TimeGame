var day = 0;

function OnLoad() {
	SetFreeHours(free_hours);

	log_background = document.getElementById("log");

	OnLoadCurrencies();
	OnLoadActions();
	OnLoadShop();
	SetDate();

	document.getElementById("default_open").click();
}

let action_number = 99;
var day_interval;
function StartDay() {
	if (action_number < sliders.length + 1) {
		document.getElementById('can_not_start_day').innerHTML = "Day currently running...";
		setTimeout(CanNotStartDay, 2000);
		return;
	}
	AddToLog("- - - - - - ");
	action_number = 0;
	day_interval = window.setInterval(RunDay, 500);
	day++;
	SetDate();
}

function SetDate() {
	//Prints the days of the cycle (Week).
	var cycleday = day % 8;
	var text = "";
	switch (cycleday) {
		case 0:
			text = "Lunarec:";
			break;
		case 1:
			text = "Porec";
			break;
		case 2:
			text = "Valerec";
			break;
		case 3:
			text = "Kierec";
			break;
		case 4:
			text = "Everec";
			break;
		case 5:
			text = "Dorec";
			break;
		case 6:
			text = "Filarec";
			break;
		case 7:
			text = "Worrec";
			PayBills();
			break;
	}
	document.getElementById("date").innerHTML = "Rec " + day.toString() + "; " + text;
}

function RunDay() {
	if (action_number < sliders.length) {
		sliders[action_number].RunDay();
		AddToLog(sliders[action_number].GetActionLogText());
		action_number++;
	}
	else {
		AddToLog("You spent " + free_hours.toString() + " hours playing video games.");
		clearInterval(day_interval);
		action_number++;
	}
}

function PayBills() {

}

function CanNotStartDay() {
	document.getElementById('can_not_start_day').innerHTML = '';
}

var free_hours = 7.0;
function SetFreeHours(value) {
	free_hours = value;
	document.getElementById("time_text").innerHTML = 'Free Hours: ' + free_hours.toString();
}

function AddFreeHours(value) {
	free_hours += value;
	document.getElementById("time_text").innerHTML = 'Free Hours: ' + free_hours.toString();
}


function CapitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function ChangeTab(evt, tab_name) {
	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("log");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tab_name).style.display = "block";
	evt.currentTarget.className += " active";
} 