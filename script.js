let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Ржавый нож"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'Ржавый нож', power: 5 },
  { name: ' Кинжал', power: 30 },
  { name: ' Боевой молот', power: 50 },
  { name: ' Меч героя', power: 100 }
];
const monsters = [
  {
    name: "Крыса",
    level: 2,
    health: 15
  },
  {
    name: "Упырь",
    level: 8,
    health: 60
  },
  {
    name: "Дракон",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Заглянуть в лавку", "Спуститься в катакомбы", "Сразиться с драконом"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Вы на городской площади, вы видите здание с вывеской \"Лавка\"."
  },
  {
    name: "store",
    "button text": ["Отдохнуть (10 золотых)", "Купить оружие (30 золотых)", "Вернуться на городскую площадь"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: 'Вы вошли в лавку. На прилавке мирно посапывает кот. \n Продавец приветливо улыбается вам: "Что, решил обновить снаряжение, или хочешь отдохнуть?"'
  },
  {
    name: "cave",
    "button text": ["Сразиться с гигантской крысой", "Сразиться с упырем", "Вернуться в город"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Вы в катакомбах, куда вас привела городская канализация, вокруг вас лишь запах гнили и куча озлобленных глаз"
  },
  {
    name: "fight",
    "button text": ["Атаковать", "Уклониться", "Выйти из боя"],
    "button functions": [attack, dodge, goTown],
    text: "Вы вступили в битву с монстром"
  },
  {
    name: "kill monster",
    "button text": ["Остаться в катакомбах", "Вернуться в лавку", "Вернуться в город"],
    "button functions": [goCave, goStore, goTown],
    text: '"Аргххх!" Последнее что издает из себя поверженный противник. Вернуться в город?'
  },
  {
    name: "lose",
    "button text": ["Начать заново", "Начать заново", "Начать заново"],
    "button functions": [restart, restart, restart],
    text: "Вы погибли. Хотите начать приключение заново?"
  },
  { 
    name: "win", 
    "button text": ["Начать заново", "Начать заново", "Начать заново"], 
    "button functions": [restart, easterEgg, restart], 
    text: "🎉Вы победили дракона! Хотите начать приключение заново?🎉" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = '"Пошел прочь, оборванец, возвращайся когда у тебя будет хотя бы 10 золотых монет!"';
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Вы приобрели: " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " В вашем инвентаре сейчас: " + inventory;
    } else {
      text.innerText = '"Эге-е, не, эта штука тебе не по карману, герой."';
    }
  } else {
    text.innerText = '"Мне больше нечего тебе предложить, герой."';
    button2.innerText = "Продать старое оружие";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Вы продали: " + currentWeapon + ".";
    text.innerText += " В вашем инвентаре сейчас: " + inventory;
  } else {
    text.innerText = '"И что ты, голыми руками собрался дракона валить?"';
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = monsters[fighting].name + " атакует!";
  text.innerText += " Вы атакуете, используя " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Вы промахнулись.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Ваш " + inventory.pop() + " сломался.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Вы уклоняетесь, когда " + monsters[fighting].name + " атакует.";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Ржавый нож"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

// for commit