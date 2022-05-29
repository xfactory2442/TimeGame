var shop_item_template;
var shop;
let shop_items = [];

function OnLoadShop() {
	shop_item_template = document.getElementById("shop_item_template");
	shop = document.getElementById("shop");
	shop_items[0] = new ShopItems('thing', [[1, 10]], 'a thing', function () { print("lol"); });
	shop_items[0].ShowShopItem();
	shop_items[1] = new ShopItems('thing2', [[2, 2]], 'a thing 2', function () { print("lol"); });
	shop_items[1].ShowShopItem();
}

function BuyItem(button) {
	item = button.parentNode;
	for (var i = 0; i < shop_items.length; i++) {
		var name = shop_items[i].name + "_item";
		if (item.id == name) {
			if (SpendMoney(shop_items[i].cost)) {
				console.log("removing");
				shop_items[i].RemoveShopItem();
			}
			return;
		}
	}
}

class ShopItems {
	constructor(name, cost, description, unlock_function) {
		this.name = name;
		this.cost = cost;
		this.description = description;
		this.unlock_function = unlock_function;
	}

	ShowShopItem() {
		this.div = shop_item_template.content.cloneNode(true);
		this.shop = this.div.getElementById("item");
		this.shop.id = this.name + "_item";
		this.div.getElementById("name").innerHTML = this.name;
		this.div.getElementById("name").id = this.name + "_name";
		this.div.getElementById("cost").innerHTML = GetCurrencyText(this.cost);
		this.div.getElementById("cost").id = this.name + "_cost";
		this.div.getElementById("description").innerHTML = this.description;
		this.div.getElementById("description").id = this.name + "_description";
		this.div.getElementById("button").id = this.name + "_button";
		shop.appendChild(this.div);
	}

	RemoveShopItem() {
		console.log("deleting");
		this.shop.parentNode.removeChild(this.shop);
	}
}
