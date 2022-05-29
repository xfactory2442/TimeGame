var action_template;
let actions = [];
var sleep = 0;
var exercise = 1;
var work = 2;
var creative = 3;

function OnLoadActions() {
	action_template = document.getElementById("action_template");
	actions[sleep] = new Action("sleep", 8, 'sleep_amount_text', 300, 2);
	actions[sleep].AddSubAction(new SubAction("Sleep", [[0, 0]],
		'You spent time_spent hours snoring in your bed.'));
	actions[sleep].ChangeSubAction(0);

	actions[exercise] = new Action("exercise", 1, 'exercise_amount_text', 200, 1.5);
	actions[exercise].AddSubAction(new SubAction("Exercise", [[0, 0]],
		'You lifted some weights in your back garden for time_spent hours.'));
	actions[exercise].ChangeSubAction(0);

	actions[work] = new Action("work", 8, 'work_amount_text', 400, 2.5);
	actions[work].AddSubAction(new SubAction("Work", [[1, -2]],
		'Time dragged on as you spent time_spent hours working.'));
	actions[work].ChangeSubAction(0);
}

function UpdateSliders(name, value) {
	var slider = GetActionByName(name.replace("_slider", ""));
	value -= slider.hours_worked;
	value = free_hours < value ? free_hours : value;
	SubtractFreeHours(value);
	slider.AddValue(value);
}

class Action {
	constructor(name, hours, slider_value_text, upgrade_threshold, upgrade_multiplier) {
		this.name = name;
		this.slider_value_text = slider_value_text;
		this.progress = 0;
		this.upgrade_threshold = upgrade_threshold;
		this.upgrade_multiplier = upgrade_multiplier;
		this.upgrade_level = 0;

		this.CreateActionHTML();

		this.SetProgress(0);
		this.SetHours(hours);
		this.SetLevelText();

		this.sub_actions = [];
		this.current_sub_action = null;
	}

	CreateActionHTML() {
		this.div = action_template.content.cloneNode(true);
		this.div.getElementById("action").id = this.name + "_action";
		this.div.getElementById("name_text").id = this.name + "_name_text";
		this.div.getElementById("slider").onchange = function () { UpdateSliders(this.id, this.value); };
		this.div.getElementById("slider").id = this.name + "_slider";
		this.div.getElementById("amount_text").id = this.name + "_amount_text";
		this.div.getElementById("progress_text").id = this.name + "_progress_text";
		this.div.getElementById("upgrade_level_text").id = this.name + "_upgrade_level_text";
		document.getElementById("actions").appendChild(this.div);
	}

	AddSubAction(sub_action) {
		this.sub_actions.push(sub_action);
	}

	ChangeSubAction(num) {
		this.current_sub_action = this.sub_actions[num];
		document.getElementById(this.name + "_name_text").innerHTML = this.current_sub_action.name + ":";
		
	}

	SetHours(hours) {
		this.hours_worked = hours;
		this.SetSliderAndText();
	}

	AddValue(value) {
		this.hours_worked += value;
		this.SetSliderAndText();
	}

	SetProgress(value) {
		this.progress = value;
		this.SetProgressText()
	}


	RunDay() {
		this.progress += this.hours_worked;
		this.CheckProgress();
		SpendMoneyHourly(this.current_sub_action.cost_per_hour, this.hours_worked);
	}

	CheckProgress() {
		while (this.progress >= this.upgrade_threshold) {
			this.upgrade_level += 1;
			this.progress -= this.upgrade_threshold;
			this.upgrade_threshold *= this.upgrade_multiplier;
		}
		this.SetProgressText();
		this.SetLevelText();
	}

	SetSliderAndText() {
		document.getElementById(this.slider_value_text).innerHTML = 'Time Spent: ' + this.hours_worked.toString();
		document.getElementById(this.name + '_slider').value = this.hours_worked;
	}

	GetActionLogText() {
		return this.current_sub_action.action_log_text.replace('time_spent', this.hours_worked.toString());
	}

	SetProgressText() {
		document.getElementById(this.name + '_progress_text').innerHTML = 'Progress: ' + this.progress.toString() + '/' +  this.upgrade_threshold.toString();
	}

	SetLevelText() {
		document.getElementById(this.name + '_upgrade_level_text').innerHTML =
			"Level: " + this.upgrade_level.toString();
	}
}

class SubAction {
	constructor(name, cost_per_hour, action_log_text) {
		this.name = name;
		this.cost_per_hour = cost_per_hour;
		this.action_log_text = action_log_text;
	}
}

function GetActionByName(name) {
	switch (name) {
		case "sleep":
			return actions[sleep];
			break;
		case "exercise":
			return actions[exercise];
			break;
		case "work":
			return actions[work];
			break;
	}
	return null;
}