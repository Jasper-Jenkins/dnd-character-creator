(this["webpackJsonpdnd-character-creator"]=this["webpackJsonpdnd-character-creator"]||[]).push([[0],{12:function(e,t,a){e.exports=a(18)},17:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(11),c=a.n(l),r=a(1),i=a(2),o=a(4),u=a(3),p=a(6);function m(e){for(var t in e)return e.hasOwnProperty(t),!0;return!1}function f(e,t,a,n,l,c,r){return s.a.createElement("div",{className:"col-12 info"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-12 characterTitle"},s.a.createElement("h3",null,e," ",t)),s.a.createElement("div",{className:"col-6"},s.a.createElement("strong",null,"Ability bonuses"),s.a.createElement("br",null),s.a.createElement("ul",null,n),s.a.createElement("strong",null,"Ability Scores: "),s.a.createElement("div",{className:"row"},l)),s.a.createElement("div",{className:"col-6"},s.a.createElement("strong",null,"Hit die: "),a,s.a.createElement("br",null),s.a.createElement("strong",null,"Saving throws"),s.a.createElement("br",null),s.a.createElement("ul",null,c),s.a.createElement("strong",null,"Proficiencies"),s.a.createElement("ul",null,r))))}var d=function(e){var t=e.raceSelected,a=e.classSelected,n=e.abilityScoresInfo,l=e.proficiencies,c=e.spellsChosen,r=e.selectedSpell,i=e.setSelectedSpell,o="",u="",p="",d=[],h=[],v=[],S=[],b=[],g=Object.keys(e.abilityScoresSelected),y=g.map((function(t){return console.log("HERE"),s.a.createElement("div",{className:"col text-center abilityScores",key:t},s.a.createElement("h6",null,t),s.a.createElement("p",null,e.abilityScoresSelected[t]))}));switch(m(t)&&(o=t.name,d=t.ability_bonuses.map((function(e,t){for(var a=0;a<n.length;a++)if(n[a].name===e.name)return s.a.createElement("li",{key:t},n[a].full_name,": +",e.bonus);return s.a.createElement("li",{key:t},"Ability: +BONUS")})),b=t.ability_bonuses.map((function(e){return e})),y=g.map((function(t){for(var a=0;a<b.length;a++)if(b[a].name.toLowerCase()===t)return s.a.createElement("div",{className:"col text-center abilityScores",key:t},s.a.createElement("h6",null,t),s.a.createElement("p",null,e.abilityScoresSelected[t],"+",b[a].bonus));return s.a.createElement("div",{className:"col text-center abilityScores",key:t},s.a.createElement("h6",null,t),s.a.createElement("p",null,e.abilityScoresSelected[t]))}))),m(a)&&(u=a.name,p=e.classSelected.hit_die,h=e.classSelected.saving_throws.map((function(e,t){for(var a=0;a<n.length;a++)if(n[a].name===e.name)return s.a.createElement("li",{key:e.name.toLowerCase()},n[a].full_name);return s.a.createElement("li",{key:t},"Ability: +BONUS")})),v=l.map((function(e){return s.a.createElement("li",{key:e.name},e.name)})),c.length>0&&(S=c.map((function(e){return e===r?s.a.createElement("li",{key:e.name},e.name):s.a.createElement("li",{onClick:function(){return i(e)},key:e.name},e.name)})))),e.navigation){case"Ability-Scores":case"Proficiencies":return f(o,u,p,d,y,h,v);case"Spells":var E;return m(a)?(void 0===r.name||(E=s.a.createElement("p",null,r.desc)),s.a.createElement("div",{className:"col-12 info"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-12"},s.a.createElement("h3",null,e.raceSelected.name," ",e.classSelected.name)),s.a.createElement("div",{className:"col-3"},s.a.createElement("p",null,"Spells"),s.a.createElement("ul",null,S)),s.a.createElement("div",{className:"col-9"},s.a.createElement("h4",null,r.name," ",r.level),E)))):s.a.createElement("div",{className:"col-12 info"},s.a.createElement("p",{className:"text-center"},"..Choose your class to select spells "));default:return f(o,u,p,d,y,h,v)}},h=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleFocus=function(e){return e.target.select()},n.handleChange=function(e){for(var t=e.target,a=t.name,s=t.value,l=n.state.scores,c=JSON.parse(JSON.stringify(l)),r=0;r<c.length;r++)c[r].name===a&&(c[r].value=""===s?0:parseInt(s,10));n.setState({scores:c})},n.submitForm=function(){n.props.handleSubmit(n.state.scores)},n.initialState={scores:[{name:"cha",value:0},{name:"con",value:0},{name:"dex",value:0},{name:"int",value:0},{name:"str",value:0},{name:"wis",value:0}]},n.state=n.initialState,n}return Object(i.a)(a,[{key:"render",value:function(){var e=this.state.scores;return s.a.createElement("form",{className:"col-12"},s.a.createElement("label",{className:"col-3",htmlFor:"cha"},"Charisma"),s.a.createElement("input",{className:"col-1",type:"number",name:"cha",id:"cha",value:e[0].value,onChange:this.handleChange,onFocus:this.handleFocus}),s.a.createElement("label",{className:"col-3",htmlFor:"con"},"Constitution"),s.a.createElement("input",{className:"col-1",type:"number",name:"con",id:"con",value:e[1].value,onChange:this.handleChange,onFocus:this.handleFocus}),s.a.createElement("label",{className:"col-3",htmlFor:"dex"},"Dexterity"),s.a.createElement("input",{className:"col-1",type:"number",name:"dex",id:"dex",value:e[2].value,onChange:this.handleChange,onFocus:this.handleFocus}),s.a.createElement("label",{className:"col-3",htmlFor:"int"},"Intelligence"),s.a.createElement("input",{className:"col-1",type:"number",name:"int",id:"int",value:e[3].value,onChange:this.handleChange,onFocus:this.handleFocus}),s.a.createElement("label",{className:"col-3",htmlFor:"str"},"Strength"),s.a.createElement("input",{className:"col-1",type:"number",name:"str",id:"str",value:e[4].value,onChange:this.handleChange,onFocus:this.handleFocus}),s.a.createElement("label",{className:"col-3",htmlFor:"wis"},"Wisdom"),s.a.createElement("input",{className:"col-1",type:"number",name:"wis",id:"wis",value:e[5].value,onChange:this.handleChange,onFocus:this.handleFocus}),s.a.createElement("input",{type:"button",value:"Submit",onClick:this.submitForm}))}}]),a}(n.Component),v=a(7),S=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).addProficiency=function(e,t){for(var a=n.props.classSelected,s=n.state.proficienciesChosen,l=a.proficiency_choices,c=0;c<l[t].from.length;c++){if(!(s[t].length<l[t].choose)){n.props.updateAlertMessage("You have selected the maximum number of proficiencies from this category");break}if(l[t].from[c].name===e&&"break"===function(){var a=l[t].from.filter((function(t){return t.name===e})),c=[].concat(Object(v.a)(n.state.proficiencies),[a[0]]),r=s;return r[t]=[].concat(Object(v.a)(r[t]),[a[0]]),n.setState((function(e){return{proficiencies:[].concat(Object(v.a)(e.proficiencies),[a[0]]),proficienciesChosen:r}}),n.props.setProficiencies(c,r)),"break"}())break}},n.removeProficiency=function(e,t){for(var a=n.state.proficiencies,s=n.state.proficienciesChosen,l=0;l<s.length;l++)for(var c=0;c<s[l].length;c++)if(s[l][c].name===e){var r=a.filter((function(t){return t.name!==e})),i=s;i[t]=s[t].filter((function(t){return t.name!==e})),n.setState({proficiencies:Object(v.a)(r),proficienciesChosen:i},n.props.setProficiencies(r,i));break}},console.log("ClassProficiencies: ",e),n.state={proficiencies:[],proficienciesChosen:[]},n.setProficiencies=n.setProficiencies.bind(Object(p.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){m(this.props.classSelected)&&this.setProficiencies()}},{key:"setProficiencies",value:function(){var e=this.props.classSelected,t=this.props.proficienciesChosen;console.log("SET PROFICIENCIES ",t);for(var a=e.proficiencies,n=[],s=e.proficiency_choices.length,l=0;l<s;l++){if(t.length>0){n=t,console.log("DID IT");break}n[l]=[]}this.setState({proficiencies:a,proficienciesChosen:n})}},{key:"classProficienciesToChooseFrom",value:function(){for(var e=this,t=this.props.classSelected,a=this.state.proficiencies,n=this.state.proficienciesChosen,l=[],c=function(){var c=r,i=t.proficiency_choices[r].from.map((function(t){for(var l=0;l<a.length;l++)for(var r=0;r<n[c].length;r++)if(t.name===n[c][r].name)return s.a.createElement("button",{className:"btn-md btn-secondary",onClick:function(){return e.removeProficiency(t.name,c)},key:t.name},t.name);return s.a.createElement("button",{className:"btn-md btn-primary",onClick:function(){return e.addProficiency(t.name,c)},key:t.name},t.name)}));l.push(s.a.createElement("div",{className:"col-12 chooseProficiency",key:"catetory"+c},i))},r=0;r<t.proficiency_choices.length;r++)c();return l}},{key:"render",value:function(){return s.a.createElement("div",{className:"row"},this.classProficienciesToChooseFrom())}}]),a}(n.Component),b=a(5),g=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).spellSlots=function(){var e=n.props.classSelected,t=n.props.levelData,a=[];if("Ranger"===e.name||"Paladin"===e.name){for(var s=0;s<t.length;s++)if(t[s].class.name===e.name){a[0]=0;for(var l=1;l<6;l++)0!==t[s].spellcasting["spell_slots_level_"+l]&&(a[l]=t[s].spellcasting["spell_slots_level_"+l],console.log("SLOTS avail",a[l]))}}else for(var c=0;c<t.length;c++)if(t[c].class.name===e.name){a[0]=t[c].spellcasting.cantrips_known;for(var r=1;r<10;r++)0!==t[c].spellcasting["spell_slots_level_"+r]&&(a[r]=t[c].spellcasting["spell_slots_level_"+r])}console.log("slots available ",a),n.setState({spellSlots:a},n.props.updateSpellSlots(a))},n.updateSpells=function(e){var t=n.props.spellsChosen,a=[].concat(Object(v.a)(t),[e]);n.setState({spellsChosen:a}),n.props.setSpells(a)},n.spellsChosenByLevel=function(){for(var e=n.props.spellsChosen,t=0,a=0,s=[],l=0;l<e.length;l++)0===e[l].level?t++:1===e[l].level&&a++;return s.push(t),s.push(a),s},n.spellSource=function(e,t){var a,s,l=n.props.classSelected,c=n.props.spellsChosen,r=n.state.spellSlots,i=0,o=0;switch(l.name){case"Barbarian":break;case"Bard":if(0===c.length){n.updateSpells(e);break}var u=Object(b.a)(r,2);a=u[0],s=u[1];var p=n.spellsChosenByLevel(),m=Object(b.a)(p,2);if(i=m[0],o=m[1],i<a&&0===e.level){n.updateSpells(e);break}if(o<s&&1===e.level){n.updateSpells(e);break}break;case"Cleric":if(0===c.length){n.updateSpells(e);break}var f=Object(b.a)(r,2);a=f[0],s=f[1];var d=n.spellsChosenByLevel(),h=Object(b.a)(d,2);if(i=h[0],o=h[1],i<a&&0===e.level){n.updateSpells(e);break}o<s&&1===e.level&&n.updateSpells(e);break;case"Druid":if(0===c.length){n.updateSpells(e);break}var v=Object(b.a)(r,2);a=v[0],s=v[1];var S=n.spellsChosenByLevel(),g=Object(b.a)(S,2);if(i=g[0],o=g[1],i<a&&0===e.level){n.updateSpells(e);break}o<s&&1===e.level&&n.updateSpells(e);break;case"Fighter":case"Monk":break;case"Paladin":if(0===c.length){n.updateSpells(e);break}var y=Object(b.a)(r,2);a=y[0],s=y[1];var E=n.spellsChosenByLevel(),k=Object(b.a)(E,2);if(i=k[0],o=k[1],i<a&&0===e.level){n.updateSpells(e);break}o<s&&1===e.level&&n.updateSpells(e);break;case"Ranger":if(0===c.length){n.updateSpells(e);break}var C=Object(b.a)(r,2);a=C[0],s=C[1];var N=n.spellsChosenByLevel(),O=Object(b.a)(N,2);if(i=O[0],o=O[1],i<a&&0===e.level){n.updateSpells(e);break}o<s&&1===e.level&&n.updateSpells(e);break;case"Rogue":break;case"Sorcerer":if(0===c.length){n.updateSpells(e);break}var j=n.spellsChosenByLevel(),w=Object(b.a)(j,2);if(i=w[0],o=w[1],i<4&&0===e.level){n.updateSpells(e);break}o<2&&1===e.level&&n.updateSpells(e);break;case"Warlock":if(0===c.length){n.updateSpells(e);break}var I=n.spellsChosenByLevel(),x=Object(b.a)(I,2);if(i=x[0],o=x[1],i<2&&0===e.level){n.updateSpells(e);break}o<2&&1===e.level&&n.updateSpells(e);break;case"Wizard":if(console.log("Wizard Spell source. "),0===c.length){n.updateSpells(e);break}var P=n.spellsChosenByLevel(),F=Object(b.a)(P,2);if(i=F[0],o=F[1],i<3&&0===e.level){n.updateSpells(e);break}if(o<6&&1===e.level){n.updateSpells(e);break}var B="You cannot add "+e.name+" to your spell book.";n.props.updateAlertMessage(B)}},n.setClassSpells=function(e){var t=n.props.classSelected,a=n.props.spellsInfo,s=[];switch(console.log("setClassSpells() fired"),e){case 1:for(var l=0;l<a.length;l++)for(var c=0;c<a[l].classes.length;c++)t.name===a[l].classes[c].name&&a[l].level<=e&&s.push(a[l]);n.setState({classSpells:s}),console.log("state classSpells updated",s);break;default:alert("level of character is invalid in spells creation. ")}},n.addSpell=function(e){console.log("Add Spell: ",e.name);var t=n.props.setSelectedSpell;n.spellSource(e,1),t(e)},n.removeSpell=function(e){for(var t=n.props.spellsChosen,a=n.props.setSelectedSpell,s=[],l=0;l<t.length;l++)t[l].name!==e.name&&s.push(t[l]);console.log("Spells that wont be removed, ",s),n.setState({spellsChosen:s}),n.props.setSpells(s),a({})},n.displaySpells=function(){for(var e=n.props.classSelected,t=n.state.classSpells,a=n.state.spellSlots,l=n.props.spellsChosen,c=[],r=function(){var e=i,a=t.filter((function(t){return t.level===e?t:null}));console.log("Slots Spells",a),c[e]=a.map((function(e){var t="btn-md spell-btn ";if(void 0!==e.damage&&void 0!==e.damage.damage_type&&(t+=e.damage.damage_type.index),0===l.length)return s.a.createElement("button",{className:t,onClick:function(){return n.addSpell(e)},key:e.name+e.level},e.name);for(var a=0;a<l.length;a++){if(l[a].name===e.name)return s.a.createElement("button",{className:t,onClick:function(){return n.removeSpell(e)},key:e.name+e.level},e.name)}return s.a.createElement("button",{className:t,onClick:function(){return n.addSpell(e)},key:e.name+e.level},e.name)}))},i=0;i<a.length;i++)r();for(var o=[],u=0;u<c.length;u++)if(0===u)"Paladin"===e.name||"Ranger"===e.name?o[u]=s.a.createElement("div",{className:"row",key:"cantrips"},s.a.createElement("div",{className:"col-12"},s.a.createElement("h6",null,"You have no spells to choose from at level 1"))):o[u]=s.a.createElement("div",{className:"row",key:"cantrips"},s.a.createElement("div",{className:"col-12"},s.a.createElement("h6",null,"Cantrips"),c[u]));else{o[u]=s.a.createElement("div",{className:"row",key:"spellLevel"+u},s.a.createElement("div",{className:"col-12"},s.a.createElement("h6",null,"Spell Level ",u),c[u]))}return o},n.state={classSpells:[],spellSlots:[],spellsChosen:[]},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){console.log("ClassSpells mounted:",this.props),this.spellSlots(),this.setClassSpells(1)}},{key:"componentDidUpdate",value:function(){console.log("ClassSpells updated: ",this.props)}},{key:"render",value:function(){return s.a.createElement("div",{className:"col-12"},this.displaySpells())}}]),a}(n.Component),y=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={raceSelected:{}},n.buttons=n.buttons.bind(Object(p.a)(n)),n.selectRace=n.selectRace.bind(Object(p.a)(n)),console.log("Race Constructor",e),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){m(this.props.raceSelected)&&this.setState({raceSelected:this.props.raceSelected})}},{key:"selectRace",value:function(e){for(var t=this,a=this.props.racesInfo,n=this.props.setRace,s=function(s){if(a[s].index===e){var l=a.filter((function(e){return e.name===a[s].name}));return t.setState({raceSelected:l[0]}),n(l[0]),"break"}},l=0;l<a.length;l++){if("break"===s(l))break}}},{key:"buttons",value:function(){var e=this,t=this.props.races,a=this.state.raceSelected;return t.results.map((function(t){return m(a)&&a.index===t.index?s.a.createElement("button",{className:"selectionButtons buttonSelected col-4 {race.index}","aria-disabled":"true",key:t.index},t.name):s.a.createElement("button",{onClick:function(){return e.selectRace(t.index)},className:"selectionButtons col-4",key:t.index},t.name)}))}},{key:"render",value:function(){return s.a.createElement("div",{className:"col-12"},this.buttons())}}]),a}(n.Component),E=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={classSelected:{}},n.buttons=n.buttons.bind(Object(p.a)(n)),n.selectClass=n.selectClass.bind(Object(p.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){m(this.props.classSelected)&&this.setState({classSelected:this.props.classSelected})}},{key:"selectClass",value:function(e){for(var t=this,a=this.props.classesInfo,n=this.props.setClass,s=function(s){if(a[s].index===e){var l=a.filter((function(e){return e.name===a[s].name}));return t.setState({classSelected:l[0]}),n(l[0]),"break"}},l=0;l<a.length;l++){if("break"===s(l))break}}},{key:"buttons",value:function(){var e=this,t=this.props.classes,a=this.state.classSelected;return t.results.map((function(t){return m(a)&&a.index===t.index?s.a.createElement("button",{className:"selectionButtons buttonSelected col-4",key:t.index},t.name):s.a.createElement("button",{onClick:function(){return e.selectClass(t.index)},className:"selectionButtons col-4",key:t.index},t.name)}))}},{key:"render",value:function(){return s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-12 text-center selection"},this.buttons()))}}]),a}(n.Component),k=function(e){console.log("Selection() props",e);var t=e.abilityScores,a=e.classSelected,n=e.navigation,l=e.getScore;switch(n){case"Races":return s.a.createElement(y,e);case"Classes":return s.a.createElement("div",{className:"col-12 text-center selection"},s.a.createElement(E,e));case"Proficiencies":return m(a)?s.a.createElement("div",{className:"col-12 text-center selection"},s.a.createElement(S,e)):s.a.createElement("div",{className:"col-12 text-center selection"},"You must first choose a class, before you can select your proficiencies.");case"Spells":return m(a)&&void 0!==a.spellcasting?s.a.createElement("div",{className:"col-12 text-center selection"},s.a.createElement(g,e)):s.a.createElement("div",{className:"col-12 text-center selection"},a.name," is not a spell caster.");case"Ability-Scores":var c=t.results.map((function(e,t){return s.a.createElement("button",{onClick:function(){return l(e.index)},className:"col-2 abilityScoresSelection",key:t},e.name)}));return s.a.createElement("div",{className:"col-12 text-center selection"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-12"},c),s.a.createElement(h,{handleSubmit:e.handleSubmit})));default:return s.a.createElement("div",{className:"col-12 text-center selection"},"DEFAULT: It's a broke!")}},C=function(e){var t=e.navigation,a=e.navigationCategories,n=e.navigate,l=e.classSelected,c=a.map((function(e,a){if(m(l))return t===e?s.a.createElement("button",{className:"navigationButtons buttonSelected disabled",tabIndex:"-1","aria-disabled":"true",key:a},e):s.a.createElement("button",{onClick:function(){return n(e)},className:"navigationButtons",key:a},e);if(t===e)return s.a.createElement("button",{className:"navigationButtons buttonSelected disabled",tabIndex:"-1","aria-disabled":"true",key:a},e);if("Classes"!==e||"Proficiencies"!==t&&"Spells"!==t)return s.a.createElement("button",{onClick:function(){return n(e)},className:"navigationButtons",key:a},e);switch(t){case"Proficiencies":return s.a.createElement("button",{onClick:function(){return n(e)},className:"navigationButtons shiny",key:a},e);default:return s.a.createElement("button",{onClick:function(){return n(e)},className:"navigationButtons shinyBlue",key:a},e)}}));return s.a.createElement("div",{className:"col-12 text-center navigation"},c)},N=function(e){console.log("userAlert props",e);var t=s.a.createElement("div",{className:"row",id:"alert"});return e.alertMessage.length>0&&(t=s.a.createElement("div",{className:"row",id:"alert"},s.a.createElement("div",{className:"col text-center"},e.alertMessage))),t},O=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).abilityScoresSetup=function(e){for(var t=e.count,a=e.results,s={},l=0;l<t;l++){s[a[l].index]=0}n.setState({abilityScoresSelected:s})},n.updateAlertMessage=function(e){n.setState({alertMessage:e},n.fadeMessage())},n.fadeMessage=function(){var e=document.getElementById("alert");setTimeout((function(){var t=setInterval((function(){e.style.opacity||(e.style.opacity=1),e.style.opacity>0?e.style.opacity-=.01:clearInterval(t)}),10)}),1700),n.setState({alertMessage:""}),e.style.opacity=1},n.setSelectedSpell=function(e){n.setState({selectedSpell:e})},n.setSpells=function(e){n.setState({spellsChosen:e})},n.updateSpellSlots=function(e){n.setState({spellSlots:e})},n.navigate=function(e){n.setState({navigation:e})},n.getScore=function(e){for(var t=n.props.abilityScores,a=n.state.abilityScoresSelected,s=0;s<t.count;s++)if(t.results[s].index===e){a[e]=n.randomDiceRoll(6),n.setState({abilityScoresSelected:a});break}},n.randomDiceRoll=function(e){for(var t=0,a=0,n=[],s=0;s<5;s++)t=Math.floor(Math.random()*e+1),n.push(t);n.sort(),n.splice(0,2);for(var l=0;l<n.length;l++)a+=n[l];return a},n.startingProficiencies=function(e){n.setState({proficiencies:e})},n.setProficiencies=function(e,t){console.log("SET PROFICIENCIES",e),n.setState({proficiencies:e,proficienciesChosen:t})},n.updateProficiencies=function(e,t){n.setState({proficiencies:e,proficienciesChoices:t})},n.handleSubmit=function(e){for(var t=n.state.abilityScoresSelected,a=[],s=0;s<e.length;s++)e[s].value<3||e[s].value>18?a.push(e[s].name):(t[e[s].name]=parseInt(e[s].value,10),n.setState({abilityScoresSelected:t}));if(a.length>0){for(var l="Ability Scores must not be 0, you currently have 0 in: ",c=0;c<a.length;c++)c<a.length-1?l+=a[c]+", ":l+=a[c];l+=".",n.updateAlertMessage(l)}},n.state={abilityScoresSelected:{},navigationCategories:["Races","Classes","Ability-Scores","Proficiencies","Spells"],navigation:"Races",classSelected:{},raceSelected:{},proficiencies:[],proficienciesChoices:[],proficienciesChosen:[],spellsChosen:[],spellSlots:[],selectedSpell:{},alertMessage:"",updateSpellSlots:n.updateSpellSlots,updateAlertMessage:n.updateAlertMessage,setSelectedSpell:n.setSelectedSpell,setProficiencies:n.setProficiencies,startingProficiencies:n.startingProficiencies,updateProficiencies:n.updateProficiencies,setSpells:n.setSpells},n.setRace=n.setRace.bind(Object(p.a)(n)),n.setClass=n.setClass.bind(Object(p.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.abilityScores;this.abilityScoresSetup(e),console.log("CreateCharacter mounted")}},{key:"componentDidUpdate",value:function(){console.log("CreateCharacter updated")}},{key:"setRace",value:function(e){this.setState({raceSelected:e})}},{key:"setClass",value:function(e){this.setState({classSelected:e,spellsChosen:[],selectedSpell:{},proficiencies:e.proficiencies,proficienciesChosen:[]})}},{key:"render",value:function(){return s.a.createElement("div",{id:"creator",className:"container-fluid creation"},s.a.createElement(N,{alertMessage:this.state.alertMessage}),s.a.createElement("div",{className:"row"},s.a.createElement(d,Object.assign({},this.state,this.props))),s.a.createElement("div",{className:"row"},s.a.createElement(k,Object.assign({},this.state,this.props,{setRace:this.setRace,setClass:this.setClass,handleSubmit:this.handleSubmit,getScore:this.getScore}))),s.a.createElement("div",{className:"row"},s.a.createElement(C,Object.assign({},this.state,this.props,{navigate:this.navigate}))))}}]),a}(n.Component),j=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).readyToCreate=function(){var e=n.state;for(var t in e)Object.getPrototypeOf(e[t]).constructor},n.initialState={races:{},racesInfo:[],classes:{},classesInfo:[],abilityScores:{},abilityScoresInfo:[],spells:{},spellsInfo:[],features:{},featuresInfo:[],levelData:[]},n.state=n.initialState,n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this,t="http://www.dnd5eapi.co/api/";fetch(t+"races").then((function(e){return e.json()})).then((function(t){e.setState({races:t},e.getInfo(t,"races"))})).catch((function(e){console.log(e+" -- "+t)})),fetch(t+"classes").then((function(e){return e.json()})).then((function(t){e.setState({classes:t},e.getInfo(t,"classes"))})).catch((function(e){console.log("API Request Error: ",e)})),fetch(t+"ability-scores").then((function(e){return e.json()})).then((function(t){e.setState({abilityScores:t},e.getInfo(t,"ability-scores"))})).catch((function(e){console.log("API Request Error: ",e)})),fetch(t+"spells").then((function(e){return e.json()})).then((function(t){e.setState({spells:t},e.getInfo(t,"spells"))})).catch((function(e){console.log("API Request Error: ",e)})),fetch(t+"features").then((function(e){return e.json()})).then((function(t){e.setState({features:t},e.getInfo(t,"features"))}))}},{key:"componentDidUpdate",value:function(){}},{key:"getLevelData",value:function(e,t){for(var a=[],n=0;n<e.results.length;n++)fetch("http://www.dnd5eapi.co/api/classes/"+e.results[n].index+"/levels/"+t).then((function(e){return e.json()})).then((function(e){return a.push(e)}));this.setState({levelData:a})}},{key:"getInfo",value:function(e,t){for(var a=[],n=0;n<e.results.length;n++)fetch("http://www.dnd5eapi.co"+e.results[n].url).then((function(e){return e.json()})).then((function(e){return a.push(e)}));switch(t){case"races":this.setState({racesInfo:a});break;case"classes":this.setState({classesInfo:a},this.getLevelData(e,1));break;case"ability-scores":this.setState({abilityScoresInfo:a});break;case"spells":this.setState({spellsInfo:a});break;case"features":this.setState({featuresInfo:a})}}},{key:"render",value:function(){var e=this.state.races,t=this.state.classes,a=this.state.abilityScores,n=this.state.spells,l=this.state.spellsInfo,c=this.state.features,r=this.state.levelData;return void 0===e.results||void 0===t.results||void 0===a.results||void 0===n.results||l.length===n.count||12===r.length||void 0===c.results?s.a.createElement("div",{className:"container-fluid"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-12 text-center"},s.a.createElement("p",null,"...Loading API")))):s.a.createElement(O,this.state)}}]),a}(n.Component);a(17);c.a.render(s.a.createElement(j,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.42d02e57.chunk.js.map