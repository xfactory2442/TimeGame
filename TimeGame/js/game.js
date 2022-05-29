var day = 0;
var failed_action = false;

function OnLoad() {
	SetFreeHours(free_hours);

	log_background = document.getElementById("log");

	OnLoadCurrencies();
	OnLoadActions();
	OnLoadShop();
	OnLoadUnlocks();
	SetDate();

	document.getElementById("default_open").click();
}

let action_number = 99;
var day_interval;
function StartDay() {
	if (action_number < actions.length + 1) {
		if (!failed_action) {
			document.getElementById('failed_action_info_text').innerHTML = "Day currently running...";
			setTimeout(FailedAction, 2000);
			failed_action = true;
		}
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
	if (action_number < actions.length) {
		actions[action_number].RunDay();
		AddToLog(actions[action_number].GetActionLogText());
		action_number++;
	}
	else {
		AddToLog("You spent " + free_hours.toString() + " doing nothing of importance at home.");
		clearInterval(day_interval);
		action_number++;
		SubtractFreeHours(-gone_to_bank);
		gone_to_bank = 0;
		CheckUnlocks();
	}
}

function PayBills() {

}

function FailedAction() {
	document.getElementById('failed_action_info_text').innerHTML = '';
	failed_action = false;
}

var free_hours = 7.0;
function SetFreeHours(value) {
	free_hours = value;
	document.getElementById("time_text").innerHTML = 'Free Hours: ' + free_hours.toString();
}

function SubtractFreeHours(value) {
	if (free_hours - value > -1) {
		free_hours -= value;
		document.getElementById("time_text").innerHTML = 'Free Hours: ' + free_hours.toString();
		return true;
	}
	return false;
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