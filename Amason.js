var mysql = require("mysql");
var inquirer = require("inquirer");

var itemID;
var itemLimit;
var itemStock;
var yourAmount;
var newAmmount;
var price;
const reducer = (accumulator, currentValue) => accumulator + currentValue;
var totalCost = [];

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",

  password: "root",
  database: "myAmason_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("\nconnected as id " + connection.threadId + "\n");

  allItems();
});

function setLimit() {
    connection.query("SELECT * FROM product", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            itemLimit = res.length;
        }
        // console.log(itemLimit);
    });
}

function allItems() {
    connection.query("SELECT * FROM product", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("id: " + res[i].id + "\nname: " + res[i].name + "\ndepartment: " + res[i].department + "\nprice: $" + res[i].price + "\nstock: " + res[i].stock + "\n");
        }
        setLimit();
        askID();
    });
}

function askID() {
    inquirer.prompt([{
    name: "to_do",
    type: "input",
    message: "What item (#ID) would you like to purchase?\n",
}])
.then(function(ans) {

    itemID = ans.to_do;

    var query = "SELECT * FROM product WHERE ?";  connection.query(query, {id: ans.to_do}, function(err, res) {

        if (ans.to_do <= itemLimit) {
            
            console.log("Is this the item you wish to purchase?" + "\n\nid: " + res[0].id + "\nname: " + res[0].name + "\ndepartment: " + res[0].department + "\nprice: $" + res[0].price + "\nstock: " + res[0].stock + "\n");

            price = res[0].price;

            confirmPurchase();
        }

        else {
            console.log("Your item (#ID) doesn't seem to be in our database\n");
        
            askID();
        }

    });
    
});

};

function confirmPurchase() {
    inquirer.prompt([{
    name: "confirm",
    type: "list",
    message: "Is this the item you want?\n",
    choices: [
        "Yes",
        "No"
    ]
}]).then(function(response) {
    if(response.confirm === "Yes") {
        setAmount();
    }
    else {
        allItems();
    }
}

)};

function setAmount() {
    inquirer.prompt([{
        name: "set_amount",
        type: "input",
        message: "How many units would you like to purchase?\n"
    }]).then(function(response) {
        var query = "SELECT stock FROM product WHERE ?";
        
        connection.query(query, { id: itemID }, function(err, res) {

            itemStock = res[0].stock;
            yourAmount = response.set_amount
            newAmmount = itemStock - response.set_amount;
            var total = yourAmount*price;
            totalCost.push(total);

            if (itemStock > response.set_amount) {
            
                purchaseConfirm();

            }

            else {
                console.log("Sorry, our stocks are running a little low!\n")
                setAmount();
            }
        });
    })
}

function purchaseConfirm() {
    inquirer.prompt([{
        name: "confirm_purchase",
        type: "list",
        message: "Is this amount correct? - " + yourAmount + "\n",
        choices: [
            "Yes",
            "No"
        ]
    }]).then(function(response) {
        if (response.confirm_purchase === "Yes") {
        
            var change = "UPDATE product SET stock =" + newAmmount + " WHERE ?"; connection.query(change, { id: itemID }, function(err, res) {
                console.log("Thank you for your purchase!\n");
                purchaseAgain();
            }
        )}
        else {
            setAmount();
        }
    })
}

function purchaseAgain() {
    var balance = totalCost.reduce(reducer).toFixed(2);
    console.log("Your current total is: $" + balance + "\n");
    inquirer.prompt([{
        name: "again",
        type: "list",
        message: "Would you like to purchase another item?\n",
        choices: [
            "Yes",
            "No"
        ]
    }]).then(function(response) {
        if (response.again === "Yes") {
            allItems();
        }
        else {
            console.log("Your total was: $" + balance + "\nThank you for purchasing at Amason!\n");
            connection.end();
        }
    })
}