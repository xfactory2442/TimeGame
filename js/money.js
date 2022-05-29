var currencies = [];

function OnLoadCurrencies() {
	currencies[0] = new Currency("leaf", 0, 0.0);
	currencies[1] = new Currency("stone", 0, 10);
	currencies[2] = new Currency("iron", 0, 30);
	currencies[3] = new Currency("gold", 0, 70);
	currencies[4] = new Currency("diamond", 0, 200);
	currencies[5] = new Currency("platinum", 0, 500);
	currencies[6] = new Currency("orentium", 0, 1000);
}

function GetCurrencyText(currency) {
	var currency_text = "";
	for (var i = 0; i < currency.length - 1; i++) {
		currency_text += currency[i][1].toString() + " "
			+ currencies[currency[i][0]].name + " ";
	}
	if (currency.length > 1) {
		currency_text += "and ";
	}
	currency_text += currency[currency.length - 1][1].toString()
		+ " " + currencies[currency[currency.length - 1][0]].name;
	return currency_text;
}

function SpendMoneyHourly(cost, hours) {
	var temp_cost = [];
	for (var i = 0; i < cost.length; i++) {
		temp_cost[i] = [...cost[i]];
	}
	for (var i = 0; i < temp_cost.length; i++) {
		temp_cost[i][1] *= hours;
	}
	SpendMoney(temp_cost);
}

function SpendMoney(cost) {
	let new_currencies = CheckIfHaveEnoughMoney(cost);
	if (new_currencies) {
		for (var i = 0; i < currencies.length; i++) {
			currencies[i].amount = new_currencies[i];
			currencies[i].UpdateUI();
		}
		return true;
	}
	return false;
}

function CheckIfHaveEnoughMoney(cost) {
	var temp_currencies = [];
	for (var i = 0; i < currencies.length; i++) {
		temp_currencies[i] = currencies[i].amount;
	}

	for (var i = 0; i < cost.length; i++) {
		temp_currencies[cost[i][0]] -= cost[i][1];
	}

	for (var i = 0; i < temp_currencies.length - 1; i++) {
		if (temp_currencies[i] < 0) {
			var amount = Math.ceil(-temp_currencies[i] / currencies[i].exchange_rate);
			temp_currencies[i + 1] -= amount;
			temp_currencies[i] += amount * currencies[i].exchange_rate;
		}
	}

	for (var i = 0; i < temp_currencies.length; i++) {
		if (temp_currencies[i] < 0) {
			return null;
		}
	}
	return temp_currencies;
}

class Currency {
	constructor(name, amount, exchange_rate) {
		this.name = name;
		this.amount = 0.0;
		this.AddCurrency(amount);
		this.exchange_rate = exchange_rate;
	}

	AddCurrency(amount) {
		this.amount += amount;
		this.UpdateUI();
	}

	SubtractCurrency(amount) {
		this.amount -= amount;
		this.UpdateUI();
	}

	UpdateUI() {
		document.getElementById(this.name + "_amount").innerHTML = this.amount.toPrecision(3);
	}
}