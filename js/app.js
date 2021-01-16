
'use strict';
var OpenHour = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', 'Daily Location Total'];
var Location = [];
var sumNumOfCOOkies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var mainid = document.getElementById('location');
var table = document.createElement('table');
mainid.appendChild(table);
var DataRow = document.createElement('tr');
table.appendChild(DataRow);
var headCell = document.createElement('th');
headCell.textContent = ' ';
DataRow.appendChild(headCell);

function Locations(name, max, min, average_cookies_per_customer) {
    this.name = name;
    this.max = max;
    this.min = min;
    this.average_cookies_per_customer = average_cookies_per_customer;
    this.random_customers_per_hour1 = [];
    this.cookies_purchased_Hour = [];
    Location.push(this);
}
Locations.prototype.getRandomCustomerPerHours = function () {
    for (var i = 0; i < OpenHour.length; i++) {
        this.random_customers_per_hour1[i] = generateRandomNumber(this.min, this.max);
    }
};
Locations.prototype.getcookies_purchased_Hour = function () {
    var iteration =0 ;
    var sum = 0 ;
    for (var i = 0; i < OpenHour.length - 1; i++) {
        iteration = Math.floor(this.random_customers_per_hour1[i] * this.average_cookies_per_customer);
        this.cookies_purchased_Hour[i] = iteration;
        sum += iteration;
        // sumNumOfCOOkies[i] += iteration;
        sumNumOfCOOkies.push(+ iteration)
    }
    this.cookies_purchased_Hour.push(sum);
    sumNumOfCOOkies[sumNumOfCOOkies.length - 1] += sum;
};
var Seattle = new Locations('Seattle', 65, 23, 6.3, [], []);
var Tokyo = new Locations('Tokyo', 24, 3, 1.2, [], []);
var Dubai = new Locations('Dubai', 38, 11, 3.7, [], []);
var Paris = new Locations('Paris', 38, 20, 2.3, [], []);
var Lima = new Locations('Lima', 16, 2, 4.6, [], []);
for (var i = 0; i < Location.length; i++) {
    Location[i].getRandomCustomerPerHours();
    Location[i].getcookies_purchased_Hour();

}
function addHeader() {
    for (var out = 0; out < OpenHour.length; out++) {
        var ListItemLocation = document.createElement('th');
        ListItemLocation.textContent = OpenHour[out];
        DataRow.appendChild(ListItemLocation);
    }
}
addHeader();

Locations.prototype.render = function () {
    DataRow = document.createElement('tr');
    table.appendChild(DataRow);
    var ListItemLocation = document.createElement('td');
    ListItemLocation.textContent = this.name;
    DataRow.appendChild(ListItemLocation);
    for (var j = 0; j < OpenHour.length - 1; j++) {
        ListItemLocation = document.createElement('td');
        ListItemLocation.textContent = this.cookies_purchased_Hour[j];
        DataRow.appendChild(ListItemLocation);
    }
    ListItemLocation = document.createElement('td');
    ListItemLocation.textContent = this.cookies_purchased_Hour[this.cookies_purchased_Hour.length - 1];
    DataRow.appendChild(ListItemLocation);
};

for (var i = 0; i < Location.length; i++) {
    console.log(Location[i]);
    Location[i].render();
}


function addFooter() {
    DataRow = document.createElement('tr');
    table.appendChild(DataRow);
    headCell = document.createElement('td');
    headCell.textContent = 'Total';
    DataRow.appendChild(headCell);
    for (var a = 0; a < sumNumOfCOOkies.length; a++) {
        var TotalRow = document.createElement('td');
        TotalRow.textContent = sumNumOfCOOkies[a];
        DataRow.appendChild(TotalRow);
    }
}
addFooter();

function generateRandomNumber(min, max) {
    var random = Math.random();
    random = (random * (max - min + 1)) + min;
    random = Math.floor(random);
    return random;
}

var myform = document.getElementById('locationForm');
console.log(typeof myform);
console.log(myform);
myform.addEventListener('submit',function(event){
    event.preventDefault();
    var name =event.target.name.value;
    var min =event.target.min.value;
    var max =event.target.max.value;
    var average_cookies_per_customer =event.target.average_cookies_per_customer.value
    var branch = new Locations(name,max,min,average_cookies_per_customer);
    branch.getRandomCustomerPerHours();
    branch.getcookies_purchased_Hour();
    var rowTable=table.rows.length;
    table.deleteRow(rowTable-1);
    branch.render();
    addFooter();

})





