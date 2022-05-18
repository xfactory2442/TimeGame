let resources = [];
var nothing = 0;

class Resource {
	constructor(name, starting_value) {
		this.name = name;
		this.SetValue(starting_value);
	}

	AddValue(value) {
		this.value += value;
		this.SetInventoryText();
	}

	SetValue(value) {
		this.value = value;
		this.SetInventoryText();
	}

	SetInventoryText() {
		if (this.name != "nothing") {
			document.getElementById(this.name + "_inventory_text").innerHTML = CapitalizeFirstLetter(this.name) + ": " + this.value;
		}
	}
}