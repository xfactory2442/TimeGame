var current_unlocks = [];
var unlocks = [];

function OnLoadUnlocks() {
	LoadUnlocks();
	current_unlocks[0] = unlocks[0];
}

function CheckUnlocks() {
	for (var i = 0; i < current_unlocks.length; i++) {
		//if (current_unlocks[i].unlock_function()) {
		//	current_unlocks[i].unlocked_function();
		//}
	}
}

class Unlock {
	constructor(unlock_function, unlocked_function) {
		this.unlock_function = unlock_function;
		this.unlocked_function = unlocked_function;
	}
}

function LoadUnlocks() {
	unlocks[0] = new Unlock(
		function () {
			if (CheckIfHaveEnoughMoney([[1, 100]]))
			{
				return true;
			}
			return false;
		},
		function () {
			console.log("hi");
		}
	);
}