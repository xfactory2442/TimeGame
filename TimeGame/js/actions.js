let sliders = [];
var sleep = 0;
var exercise = 1;
var work = 2;

function OnLoadActions() {
	sliders[sleep] = new Action("sleep", 8, 'sleep_amount_text', 300, 2);
	sliders[sleep].AddSubAction(new SubAction("sleep", [[0, 0]],
		'You spent time_spent hours snoring in your bed'));
	sliders[sleep].ChangeSubAction(0);

	sliders[exercise] = new Action("exercise", 1, 'exercise_amount_text', 200, 1.5);
	sliders[exercise].AddSubAction(new SubAction("exercise", [[0, 0]],
		'You lifted some weights in your back garden for time_spent hours'));
	sliders[exercise].ChangeSubAction(0);

	sliders[work] = new Action("work", 8, 'work_amount_text', 400, 2.5);
	sliders[work].AddSubAction(new SubAction("work", [[0, 0]],
		'Time dragged on as you spent time_spent hours working at your computer'));
	sliders[work].ChangeSubAction(0);

}

function UpdateSliders(name, value) {
	var slider = GetActionByName(name);
	value -= slider.hours_worked;
	value = free_hours < value ? free_hours : value;
	AddFreeHours(-value);
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

		this.SetProgress(0);
		this.SetHours(hours);
		this.SetLevelText();

		this.sub_actions = [];
		this.current_sub_action = null;
	}

	AddSubAction(sub_action) {
		this.sub_actions.push(sub_action);
	}

	ChangeSubAction(num) {
		this.current_sub_action = this.sub_actions[num];
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
		SpendCurrenciesHourly(this.current_sub_action.cost_per_hour, this.hours_worked);
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
			return sliders[sleep];
			break;
		case "exercise":
			return sliders[exercise];
			break;
		case "work":
			return sliders[work];
			break;
	}
	return null;
}