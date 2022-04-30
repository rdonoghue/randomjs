var dice = {
  sides: 6,
  roll: function () {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    return randomNumber;
  }
}

var twodice = {
  sides: 6,
  roll: function () {
    var randomNumber1 = Math.floor(Math.random() * this.sides) + 1;
    var randomNumber2 = Math.floor(Math.random() * this.sides) + 1;
    var dicesum = randomNumber1 + randomNumber2;
    return dicesum;
  }
}

//Prints dice roll to the page

function printNumber(number) {
  var placeholder = document.getElementById('placeholder');
  placeholder.innerHTML = number;

}

var button = document.getElementById('button');

button.onclick = function () {
  var result = twodice.roll();
  printNumber(result);
};


