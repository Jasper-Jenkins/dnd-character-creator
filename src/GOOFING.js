spellChoices[slotLevel] = classSpells.map((spell) => {
    if (spellsChosen.length === 0) {
        return (<button className={classNames} onClick={() => this.addSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
    }
    for (var c = 0; c < spellsChosen.length; c++) {
        const chosen = c;
        if (spellsChosen[chosen].name === spell.name) {
            return (<button className={classNames} onClick={() => this.removeSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
        } 
        return (<button className={classNames} onClick={() => this.addSpell(spell)} key={spell.name + spell.level}>{spell.name}</button>);
    }
    return (<button className={classNames} onClick={() => alert("broke")} key={spell.name + spell.level}>{spell.name} broken</button>);
});              