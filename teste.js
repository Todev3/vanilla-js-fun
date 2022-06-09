let rng = new Date().getTime() % 1000;
const seeds = getSeeds();
let mobLife = 50;

function generateDamageProgression() {
    const damgeProgress = new Map();

    damgeProgress.set(0 , 0);
    damgeProgress.set(1 , 5);
    damgeProgress.set(2 , 10);
    damgeProgress.set(3 , 15);
    damgeProgress.set(4 , 20);
    damgeProgress.set(5 , 25);
    damgeProgress.set(6 , 30);
    damgeProgress.set(7 , 35);
    damgeProgress.set(8 , 40);
    damgeProgress.set(9 , 45);
    damgeProgress.set(10 , 50);
    damgeProgress.set(11 , 55);
    damgeProgress.set(12 , 60);
    damgeProgress.set(13 , 65);
    damgeProgress.set(14 , 70);
    damgeProgress.set(15 , 75);
    damgeProgress.set(16 , 80);
    damgeProgress.set(17 , 90);
    damgeProgress.set(18 , 100);
    damgeProgress.set(19 , 200);

    return damgeProgress;
}

function getDamageProgression(index = 0) {
    return generateDamageProgression().get(index);
}

function generateWeapons() {
    const weapons = new Map();
    
    weapons.set('short-w', {
        accuracy: 0,
        damage: 10,
        durability: 50,
        bonus: 0
    });

    return weapons;
}

function getWeapon(name = null) {
    return generateWeapons().get(name);
}

function generateRandom(rng) {
    return parseInt(Math.random() * (new Date().getTime() % 1000) * rng);
}

function getSeeds(init = null) {
    let numero = init || 55;
    const seeds = [];
    
    while(numero != 1) {
    
        if(numero % 2 == 0) {
            numero /= 2;
        } else {
            numero = (numero * 3) + 1;
        }

        seeds.push(numero);
    }
    
    return [...seeds];
}

function selectSeed(seeds, rng) {
    return seeds[ Math.abs(generateRandom(rng)) % seeds.length ];
}

function rngCalc(rng, seeds) {
    const seed = selectSeed(seeds, rng);
    
    rng += rng % 2 ? seed * -1 : seed;

    return rng;
}

function rollDice(rng =  null) {
    const rand = generateRandom(rng);
    
    return Math.abs(rand % 20);
}

function getBaseDamage(diceRoll, weaponDamage) {
    const baseDamage = getDamageProgression(diceRoll) / 100.0;
    return parseInt(baseDamage * weaponDamage);
}

function attck() {
    const weaponName = 'short-w';
    const dice = rollDice(rng)
    const weapon = getWeapon(weaponName);

    const damage = getBaseDamage(dice, weapon.damage);

    if (mobLife > 0) {
        mobLife -= damage;
        console.log('Dano: ', damage, '- Mob Life', mobLife);
    } 
    
    if (mobLife <= 0) {
        console.log('Monstro Derrotado');
        mobLife = 100;
    }
        
    rng = rngCalc(rng, seeds);
}

function teste (max) {
    const weaponName = 'short-w';

    for(let i = 0; i < max; i++) {
        let dice = rollDice(rng)

        const weapon = getWeapon(weaponName);

        const damage = getBaseDamage(dice, weapon.damage);

        console.log(dice + 1, '- Damage % -', getDamageProgression(dice), 'Dano: ', damage);
        
        rng = rngCalc(rng, seeds);
    }

}