var currencies = [];

function OnLoadCurrencies() {
	currencies[0] = new Currency("leaf", 0.0, 0.0);
	currencies[1] = new Currency("stone", 0.0, 10.0);
	currencies[2] = new Currency("iron", 0.0, 30.0);
	currencies[3] = new Currency("gold", 0.0, 70.0);
	currencies[4] = new Currency("diamond", 0.0, 200.0);
	currencies[5] = new Currency("platinum", 0.0, 500.0);
	currencies[6] = new Currency("orentium", 0.0, 1000.0);
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

function SpendCurrenciesHourly(cost, hours_worked) {
	for (var i = 0; i < cost.length; i++) {
		if (currencies[cost[i][0]].amount < cost[i][1] * hours_worked) {
			return false;
		}
	}
	for (var i = 0; i < cost.length; i++) {
		currencies[cost[i][0]].SubtractCurrency(cost[i][1] * hours_worked);
	}
	return true;
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
		document.getElementById(this.name + "_amount").innerHTML = this.amount.toPrecision(3);
	}

	SubtractCurrency(amount) {
		this.amount -= amount;
		document.getElementById(this.name + "_amount").innerHTML = this.amount.toPrecision(3);
	}
}