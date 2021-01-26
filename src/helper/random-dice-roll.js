export default function randomDiceRoll(maxNum) { // may need to extend this to accept two additional arguments: total rolls to roll, and total rolls to keep 
    let totalDiceRolls = 5;
    let totalRollsToKeep = 3;
    let abilityPoint = 0;
    let abilityPoints = 0;
    let abilityPointsArray = [];
    for (var i = 0; i < totalDiceRolls; i++) {
        abilityPoint = Math.floor((Math.random() * maxNum) + 1);
        abilityPointsArray.push(abilityPoint);
    }
    abilityPointsArray.sort()
    abilityPointsArray.splice(0, totalDiceRolls - totalRollsToKeep)
    for (var j = 0; j < abilityPointsArray.length; j++) {
        abilityPoints += abilityPointsArray[j];
    }
    return abilityPoints;
}    