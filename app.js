(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('ToBuyController', ToBuyController)
.controller('BoughtController', BoughtController)
.factory('ShoppingListFactory', ShoppingListFactory);

// LIST #1 - controller
ToBuyController.$inject = ['ShoppingListFactory'];
function ToBuyController(ShoppingListFactory) {
  var BuyList = this;
    BuyList.title = "to Buy";
  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();//shoppingList is the function so you can cll metods

    BuyList.items = shoppingList.getItemsToBuy();

    if (BuyList.items.length == 0) {
        BuyList.nothingleft = true;
    } else {
        BuyList.nothingleft = false;
    }

    console.log('buylistnothingleft', BuyList.nothingleft);










    BuyList.BoughtItems = shoppingList.getBoughtItems();
    if (BuyList.BoughtItems.length == 0) {
        BuyList.nopurchase = true;
    } else {
        BuyList.nopurchase = false;
    }
   
   

  BuyList.itemName = "";
  BuyList.itemQuantity = "";

  BuyList.addItem = function () {
    shoppingList.addItem(BuyList.itemName, BuyList.itemQuantity);
  }

    BuyList.removeItem = function (itemIndex) {
      
      shoppingList.removeItem(itemIndex);
      console.log('itemsToBuy', BuyList.items);
     
    };

    BuyList.moveItem = function (itemIndex) {
        BuyList.BoughtItems = shoppingList.moveItem(itemIndex);
        //BuyList.BuyListBoughtItems = BuyListBoughtItems;
        console.log('astermove', BuyList.BoughtItems);
        if (BuyList.BoughtItems.length == 0) {
            BuyList.nopurchase = true;
        } else {
            BuyList.nopurchase = false;
        }
        if (BuyList.items.length == 0) {
            BuyList.nothingleft = true;
        } else {
            BuyList.nothingleft = false;
        }
        console.log('buylistnothingleft', BuyList.nothingleft);

    };

}


// LIST #2 - controller
BoughtController.$inject = ['ShoppingListFactory'];
function BoughtController(ShoppingListFactory,ToBuyController) {
    var BoughtList = this;
    console.log('boughlist-this', BoughtList);
    BoughtList.title = "already bought";
  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory(3);

    BoughtList.items = shoppingList.getBoughtItems();
    console.log("boughtlistitems", BoughtList.items);

  BoughtList.itemName = "";
  BoughtList.itemQuantity = "";

  BoughtList.addItem = function () {
    try {
      shoppingList.addItem(BoughtList.itemName, BoughtList.itemQuantity);
    } catch (error) {
      shoppingList.errorMessage = error.message;
    }

  }

  BoughtList.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
    };
    BoughtList.moveItem = function (itemIndex) {
        shoppingList.moveItem(itemIndex);
    };



}


// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
    var items = [];
    var itemsToBuy = [];
    var ItemsBought = [];
    var BuyListBoughtItems = [];
    

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

    service.removeItem = function (itemIndex) {
        console.log('itemstobuyin serviceremoveitem', items);
       

    items.splice(itemIndex, 1);
    };
    service.moveItem = function (itemIndex,itemname,itemquantity) {
        console.log('moveitem', items);
       
        console.log("thisname", itemname);
        var movedItem = { name: itemname, quantity: itemquantity }
        var itemMoved = items.splice(itemIndex, 1);
        var item = {
            name: itemMoved[0].name,
            quantity: itemMoved[0].quantity
        };




        ItemsBought.push(item);
        console.log('itemmoved', item.name);
        console.log('iemsBought', item.quantity);
        return ItemsBought;
    };















  service.getItems = function () {
    return items;
    };
    service.getBoughtItems = function () {
        return ItemsBought;
    }
    service.getItemsToBuy = function () {
        var itemsToBuy = [
            { name: 'cat food', quantity: 12 },
            { name: 'kitty litter', quantity: 4 },
            { name: 'toilet paper', quantity: 12 },
            { name: '7up', quantity: 12 },
            {name: 'cookies', quantity:'lots'}



        ]
        items = itemsToBuy;
        return items;
    };
}


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
