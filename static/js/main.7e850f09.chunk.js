(this["webpackJsonpdnd-character-creator"]=this["webpackJsonpdnd-character-creator"]||[]).push([[0],[,,,,,,,,,,,,function(e,t,a){e.exports=a(22)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),l=a(11),c=a.n(l),r=a(6),i=a(1),o=a(2),u=a(5),p=a(4),h=a(3);function m(e){for(var t in e)return e.hasOwnProperty(t),!0;return!1}s.Component;var f=a(7),d=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).addProficiency=function(e,t){for(var a=s.props.classSelected,n=s.state.proficienciesChosen,l=a.proficiency_choices,c=0;c<l[t].from.length;c++){if(!(n[t].length<l[t].choose)){var r="You can only select "+l[t].choose+" from this category.";s.props.updateAlertMessage(r);break}if(l[t].from[c].name===e&&"break"===function(){var a=l[t].from.filter((function(t){return t.name===e})),c=[].concat(Object(f.a)(s.state.proficiencies),[a[0]]),r=n;return r[t]=[].concat(Object(f.a)(r[t]),[a[0]]),s.setState((function(e){return{proficiencies:[].concat(Object(f.a)(e.proficiencies),[a[0]]),proficienciesChosen:r}}),s.props.setProficiencies(c,r)),"break"}())break}},s.removeProficiency=function(e,t){for(var a=s.state.proficiencies,n=s.state.proficienciesChosen,l=0;l<n.length;l++)for(var c=0;c<n[l].length;c++)if(n[l][c].name===e){var r=a.filter((function(t){return t.name!==e})),i=n;i[t]=n[t].filter((function(t){return t.name!==e})),s.setState({proficiencies:Object(f.a)(r),proficienciesChosen:i},s.props.setProficiencies(Object(f.a)(r),i));break}},s.state={isClassSelected:!1,proficiencies:[],proficienciesChosen:[],category:0},s.setProficiencies=s.setProficiencies.bind(Object(u.a)(s)),s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){m(this.props.classSelected)&&(this.setProficiencies(),this.setState({isClassSelected:!0}))}},{key:"setProficiencies",value:function(){var e=this.props.classSelected,t=this.props.proficiencies,a=this.props.proficienciesChosen,s=[],n=e.proficiency_choices.length;if(a.length<1){for(var l=0;l<n;l++)s[l]=[];this.setState({proficiencies:t,proficienciesChosen:s},this.props.setProficiencies(t,s))}else this.setState({proficiencies:t,proficienciesChosen:a})}},{key:"proficienciesToChooseFrom",value:function(e){var t=this,a=this.props.classSelected,s=this.state.proficiencies,l=this.state.proficienciesChosen,c=[];console.log(a);for(var r=function(){var e=i,r=a.proficiency_choices[i].from.map((function(a){for(var c=0;c<s.length;c++)for(var r=0;r<l[e].length;r++)if(a.name===l[e][r].name)return n.a.createElement("button",{className:"btn-sm col-6 btn-primary",onClick:function(){return t.removeProficiency(a.name,e)},key:a.name},a.name);return n.a.createElement("button",{className:"btn-sm col-6 btn-secondary",onClick:function(){return t.addProficiency(a.name,e)},key:a.name},a.name)}));c.push(r)},i=0;i<a.proficiency_choices.length;i++)r();return c[e]}},{key:"setNavigationCategory",value:function(e){this.setState({category:e})}},{key:"proficienciesNavigation",value:function(){for(var e=this,t=this.props.classSelected,a=this.state.category,s=this.state.proficienciesChosen,l=[],c=function(){var c=r,i=void 0;i=void 0===s[c]?0:s[c].length,a===r?l.push(n.a.createElement("button",{className:"btn-sm btn btn-primary",onClick:function(){},key:t.name+r},"Choose: ",t.proficiency_choices[c].choose-i)):l.push(n.a.createElement("button",{className:"btn-sm btn btn-secondary",onClick:function(){return e.setNavigationCategory(c)},key:t.name+r},"Choose: ",t.proficiency_choices[c].choose-i))},r=0;r<t.proficiency_choices.length;r++)c();return n.a.createElement("div",{className:"col-12"},l)}},{key:"render",value:function(){var e=this.props.classSelected,t=this.state.category;return this.state.isClassSelected?n.a.createElement("div",{className:"col-12 text-center selection"},n.a.createElement("div",{className:"col-12 selectionTitle"},n.a.createElement("h3",null,e.name," proficiencies")),n.a.createElement("div",{className:"card border-dark mb-3 "},n.a.createElement("div",{className:"card-header text-white bg-dark text-center"},this.proficienciesNavigation()),n.a.createElement("div",{className:"card-body"},this.proficienciesToChooseFrom(t)))):n.a.createElement("div",{className:"col-12 text-center selection"},n.a.createElement("h3",{className:"selectionTitle"},"You must choose a class to select your proficiencies."))}}]),a}(s.Component),v=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).spellSlots=function(){var e=s.props.classSelected,t=s.props.levelData,a=[];if("Ranger"===e.name||"Paladin"===e.name){for(var n=0;n<t.length;n++)if(t[n].class.name===e.name){a[0]=0;for(var l=1;l<6;l++)0!==t[n].spellcasting["spell_slots_level_"+l]&&(a[l]=t[n].spellcasting["spell_slots_level_"+l],console.log("SLOTS avail",a[l]))}}else for(var c=0;c<t.length;c++)if(t[c].class.name===e.name){a[0]=t[c].spellcasting.cantrips_known;for(var r=1;r<10;r++)0!==t[c].spellcasting["spell_slots_level_"+r]&&(a[r]=t[c].spellcasting["spell_slots_level_"+r])}s.setState({spellSlots:a},s.props.updateSpellSlots(a))},s.updateSpells=function(e){var t=s.props.spellsChosen,a=[].concat(Object(f.a)(t),[e]);s.setState({spellsChosen:a}),s.props.setSpells(a)},s.spellsChosenByLevel=function(){for(var e=s.props.spellsChosen,t=0,a=0,n=[],l=0;l<e.length;l++)0===e[l].level?t++:1===e[l].level&&a++;return n.push(t),n.push(a),n},s.spellSource=function(e,t){var a,n,l=s.props.classSelected,c=s.props.spellsChosen,i=s.state.spellSlots,o=0,u=0,p="You cannot add "+e.name+" to your spell book.";switch(l.name){case"Barbarian":break;case"Bard":if(0===c.length){s.updateSpells(e);break}var h=Object(r.a)(i,2);a=h[0],n=h[1];var m=s.spellsChosenByLevel(),f=Object(r.a)(m,2);if(o=f[0],u=f[1],o<a&&0===e.level){s.updateSpells(e);break}if(u<n&&1===e.level){s.updateSpells(e);break}s.props.updateAlertMessage(p);break;case"Cleric":if(0===c.length){s.updateSpells(e);break}var d=Object(r.a)(i,2);a=d[0],n=d[1];var v=s.spellsChosenByLevel(),b=Object(r.a)(v,2);if(o=b[0],u=b[1],o<a&&0===e.level){s.updateSpells(e);break}u<n&&1===e.level&&s.updateSpells(e),s.props.updateAlertMessage(p);break;case"Druid":if(0===c.length){s.updateSpells(e);break}var S=Object(r.a)(i,2);a=S[0],n=S[1];var g=s.spellsChosenByLevel(),y=Object(r.a)(g,2);if(o=y[0],u=y[1],o<a&&0===e.level){s.updateSpells(e);break}u<n&&1===e.level&&s.updateSpells(e),s.props.updateAlertMessage(p);break;case"Fighter":case"Monk":break;case"Paladin":if(0===c.length){s.updateSpells(e);break}var E=Object(r.a)(i,2);a=E[0],n=E[1];var k=s.spellsChosenByLevel(),C=Object(r.a)(k,2);if(o=C[0],u=C[1],o<a&&0===e.level){s.updateSpells(e);break}u<n&&1===e.level&&s.updateSpells(e);break;case"Ranger":if(0===c.length){s.updateSpells(e);break}var N=Object(r.a)(i,2);a=N[0],n=N[1];var j=s.spellsChosenByLevel(),O=Object(r.a)(j,2);if(o=O[0],u=O[1],o<a&&0===e.level){s.updateSpells(e);break}u<n&&1===e.level&&s.updateSpells(e);break;case"Rogue":break;case"Sorcerer":if(0===c.length){s.updateSpells(e);break}var w=s.spellsChosenByLevel(),I=Object(r.a)(w,2);if(o=I[0],u=I[1],o<4&&0===e.level){s.updateSpells(e);break}u<2&&1===e.level&&s.updateSpells(e),s.props.updateAlertMessage(p);break;case"Warlock":if(0===c.length){s.updateSpells(e);break}var x=s.spellsChosenByLevel(),A=Object(r.a)(x,2);if(o=A[0],u=A[1],o<2&&0===e.level){s.updateSpells(e);break}u<2&&1===e.level&&s.updateSpells(e),s.props.updateAlertMessage(p);break;case"Wizard":if(console.log("Wizard Spell source. "),0===c.length){s.updateSpells(e);break}var R=s.spellsChosenByLevel(),_=Object(r.a)(R,2);if(o=_[0],u=_[1],o<3&&0===e.level){s.updateSpells(e);break}if(u<6&&1===e.level){s.updateSpells(e);break}s.props.updateAlertMessage(p)}},s.setClassSpells=function(e){var t=s.props.classSelected,a=s.props.spellsInfo,n=[];switch(e){case 1:for(var l=0;l<a.length;l++)for(var c=0;c<a[l].classes.length;c++)t.name===a[l].classes[c].name&&a[l].level<=e&&n.push(a[l]);s.setState({classSpells:n}),console.log("state classSpells updated",n);break;default:alert("level of character is invalid in spells creation. ")}},s.addSpell=function(e){var t=s.props.setSelectedSpell;s.spellSource(e,1),t(e)},s.removeSpell=function(e){for(var t=s.props.spellsChosen,a=s.props.setSelectedSpell,n=[],l=0;l<t.length;l++)t[l].name!==e.name&&n.push(t[l]);s.setState({spellsChosen:n}),s.props.setSpells(n),a({})},s.displaySpells=function(){for(var e=s.props.classSelected,t=s.state.classSpells,a=s.state.spellSlots,l=s.props.spellsChosen,c=[],r=function(){var e=i,a=t.filter((function(t){return t.level===e?t:null}));c[e]=a.map((function(e){var t="btn btn-sm btn-block spell-btn ";if(void 0!==e.damage&&void 0!==e.damage.damage_type&&(t+=e.damage.damage_type.index+" "),0===l.length)return t+="btn-secondary ",n.a.createElement("button",{className:t,onClick:function(){return s.addSpell(e)},key:e.name+e.level},e.name);for(var a=0;a<l.length;a++){if(l[a].name===e.name)return t+="btn-primary ",n.a.createElement("button",{className:t,onClick:function(){return s.removeSpell(e)},key:e.name+e.level},e.name)}return t+="btn-secondary ",n.a.createElement("button",{className:t,onClick:function(){return s.addSpell(e)},key:e.name+e.level},e.name)}))},i=0;i<a.length;i++)r();for(var o=[],u=0;u<c.length;u++)if(0===u)"Paladin"===e.name||"Ranger"===e.name?o[u]=n.a.createElement("div",{className:"col-12",key:"no-known-spells"},n.a.createElement("h6",null,"You have no spells to choose from at level 1")):o[u]=n.a.createElement("div",{className:"col-6 spells",key:"cantrips"},n.a.createElement("h6",null,"Cantrips"),c[u]);else{o[u]=n.a.createElement("div",{className:"col-6 spells",key:"spellLevel"+u},n.a.createElement("h6",null,"Spell Level ",u),c[u])}return o},s.state={classSpells:[],spellSlots:[],spellsChosen:[],navigationCategory:0,spellBook:{}},s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.spellSlots(),this.setClassSpells(1)}},{key:"setNavigationCategory",value:function(e){this.setState({navigationCategory:e})}},{key:"spellsNavigation",value:function(){for(var e=this,t=(this.props.spellsChosen,this.state.navigationCategory),a=this.state.spellSlots,s=[],l=this.spellsChosenByLevel(),c=function(){var c,i=r;c=l[r],t===r?s.push(n.a.createElement("button",{className:"btn-sm btn spellsNavigationSelected",onClick:function(){},key:r}," Choose: ",a[r]-c)):s.push(n.a.createElement("button",{className:"btn-sm btn spellsNavigation",onClick:function(){return e.setNavigationCategory(i)},key:r},"Choose: ",a[r]-c))},r=0;r<a.length;r++)c();return n.a.createElement("div",{className:"col-12"},s)}},{key:"render",value:function(){var e=this.state.navigationCategory,t=this.displaySpells(),a=this.spellsNavigation();return n.a.createElement("div",{className:"col-12 text-center selection"},a,t[e])}}]),a}(s.Component);function b(e){var t=e.userValue,a=e.handleChange;return n.a.createElement("div",{className:"col-7 text-center searchBar"},n.a.createElement("label",{className:"search-label col-4",htmlFor:"searchBar"},"Search:"),n.a.createElement("input",{className:"col-8",value:t,name:"searchBar",id:"searchBar",onChange:a}))}var S=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={traits:[]},s.getTraits=s.getTraits.bind(Object(u.a)(s)),s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){console.log("did it mount?"),this.getTraits(this.props.info)}},{key:"getTraits",value:function(e){var t=this,a="https://www.dnd5eapi.co";if("human"===e.index)console.log("Got to the humans");else for(var s=0;s<e.traits.length;s++)fetch(a+e.traits[s].url).then((function(e){return e.json()})).then((function(e){t.setState((function(t){return{traits:[].concat(Object(f.a)(t.traits),[e])}}))})).catch((function(e){console.log(e+" -- getTraits() -- "+a)}))}},{key:"showTraits",value:function(){return this.state.traits.map((function(e){return n.a.createElement("div",{key:"trait-"+e.name},n.a.createElement("h5",null,e.name),n.a.createElement("p",null,e.desc[0]))}))}},{key:"render",value:function(){var e=this.state.traits,t=this.props.info.name;return n.a.createElement("div",{className:"col-1 info-modal"},n.a.createElement("div",{className:"modal fade",id:"race-"+this.props.info.index,tabIndex:"-1",role:"dialog","aria-labelledby":"raceTraits","aria-hidden":"true"},n.a.createElement("div",{className:"modal-dialog",role:"document"},n.a.createElement("div",{className:"modal-content"},n.a.createElement("div",{className:"modal-header"},n.a.createElement("h5",{className:"modal-title",id:"raceTraits"},t," Traits"),n.a.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},n.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),n.a.createElement("div",{className:"modal-body"},0!==e.length?this.showTraits():"Humans do not have racial traits"),n.a.createElement("div",{className:"modal-footer"},n.a.createElement("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal"},"Close"))))))}}]),a}(s.Component);function g(e){var t=e.champions,a=e.select,s=e.category;console.log(t);var l=[];switch(s){case"races":l=t.map((function(e){for(var t="",s=0;s<e.ability_bonuses.length;s++)t+=e.ability_bonuses[s].ability_score.name+": "+e.ability_bonuses[s].bonus+" ";for(var l=[],c="#race-"+e.index,r=0;r<e.traits.length;r++)r!==e.traits.length-1?l.push(n.a.createElement("span",{"data-toggle":"modal","data-target":c,key:e.traits[r].name},e.traits[r].name,", ")):l.push(n.a.createElement("span",{"data-toggle":"modal","data-target":c,key:e.traits[r].name},e.traits[r].name,". "));return l.push(n.a.createElement("button",{className:"btn btn-sm btn-primary","data-toggle":"modal","data-target":c,key:"raceTraitsInfoButton"},"?")),n.a.createElement("div",{className:"card border-dark mb-3 col-12 character-card",key:e.index},n.a.createElement("div",{className:"card-header text-white bg-dark text-center"},n.a.createElement("h4",null,e.name)),n.a.createElement("div",{className:"card-body"},n.a.createElement("p",{className:"card-text"},n.a.createElement("strong",null,"Description:")," ",e.size_description),n.a.createElement("p",{className:"card-text"},n.a.createElement("strong",null,"Age:")," ",e.age),n.a.createElement("p",{className:"card-text"},n.a.createElement("strong",null,"Alignment:")," ",e.alignment),n.a.createElement("p",{className:"card-text"},n.a.createElement("strong",null,"Language:")," ",e.language_desc),n.a.createElement("p",{className:"card-text"},n.a.createElement("strong",null,"Traits:")," ",l),n.a.createElement("p",{className:"card-text"},n.a.createElement("strong",null,"Ability Bonuses:")," ",t),n.a.createElement("p",{className:"card-text"},n.a.createElement("strong",null,"Speed:")," ",e.speed),n.a.createElement("button",{className:"btn btn-primary btn-block",onClick:function(){return a(e.index)}},"Choose ",e.name),n.a.createElement(S,{info:e})))}));break;case"classes":l=t.map((function(e){var t,s=0;t=e.proficiencies.map((function(t){return s===e.proficiencies.length-1?t.name+". ":(s++,t.name+", ")}));var l;return l=e.saving_throws.map((function(e){return e.name+" "})),n.a.createElement("div",{className:"card border-dark mb-3 col-12 character-card",key:e.index},n.a.createElement("div",{className:"card-header text-white bg-dark text-center"},n.a.createElement("h4",null,e.name)),n.a.createElement("div",{className:"card-body"},n.a.createElement("p",{className:"card-text"},n.a.createElement("strong",null,"Hit die:")," ",e.hit_die),n.a.createElement("p",{className:"card-text"},n.a.createElement("strong",null,"Starting proficiencies:")," ",t," "),n.a.createElement("p",{className:"card-text"},n.a.createElement("strong",null,"Saving Throws:")," ",l),n.a.createElement("p",{className:"card-text"}),n.a.createElement("p",{className:"card-text"}),n.a.createElement("p",{className:"card-text"}),n.a.createElement("button",{className:"btn btn-primary btn-block",onClick:function(){return a(e.index)}},"Choose ",e.name)))}))}return l}var y=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).searchRaces=function(e){var t=s.state.racesInfo;s.setState({word:e});var a=t.map((function(e){return e})),n=[];""!==e?(n=a.filter((function(t){return t.index.includes(e.toLowerCase())})),s.setState({searchResults:n})):(console.log(n),s.setState({searchResults:a}))},s.state={races:{},racesInfo:[],raceSelected:{},searchResults:[],word:""},s.selectRace=s.selectRace.bind(Object(u.a)(s)),s.getRaces=s.getRaces.bind(Object(u.a)(s)),s.getInfo=s.getInfo.bind(Object(u.a)(s)),s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){m(this.props.raceSelected)&&this.setState({raceSelected:this.props.raceSelected}),m(this.props.races)&&9===this.props.racesInfo.length?this.setState({races:this.props.races,racesInfo:this.props.racesInfo}):this.getRaces(),console.log(this.props)}},{key:"componentWillUnmount",value:function(){console.log("Unmounting <Races />, races: ",this.state.races," racesInfo: ",this.state.racesInfo),this.props.setRaces(this.state.races),this.props.setRacesInfo(this.state.racesInfo)}},{key:"getRaces",value:function(){var e=this;console.log("Getting Races");var t="https://www.dnd5eapi.co/api/";fetch(t+"races").then((function(e){return e.json()})).then((function(t){e.setState({races:t},e.getInfo(t))})).catch((function(e){console.log(e+" -- getRaces() -- "+t)}))}},{key:"getInfo",value:function(e){var t=this;console.log(e);for(var a=0;a<e.results.length;a++)fetch("https://www.dnd5eapi.co"+e.results[a].url).then((function(e){return e.json()})).then((function(e){t.setState((function(t){return{racesInfo:[].concat(Object(f.a)(t.racesInfo),[e])}}))}))}},{key:"selectRace",value:function(e){for(var t=this,a=this.state.racesInfo,s=this.props.setRace,n=this.props.navigate,l=function(l){if(a[l].index===e){var c=a.filter((function(e){return e.name===a[l].name}));return t.setState({raceSelected:c[0]}),s(c[0]),n("Classes"),"break"}},c=0;c<a.length;c++){if("break"===l(c))break}}},{key:"render",value:function(){var e=this,t=this.state.word,a=this.state.searchResults,s=this.state.racesInfo;return n.a.createElement("div",{className:"col-12 selection "},n.a.createElement("div",{className:"row selectionTitle"},n.a.createElement("h5",{className:"col-5 text-center choose"},"Choose a Race"),n.a.createElement(b,{value:t,handleChange:function(t){return e.searchRaces(t.target.value)}})),n.a.createElement("div",{className:"row"},n.a.createElement(g,{champions:""!==t?a:s,category:"races",select:this.selectRace})))}}]),a}(s.Component),E=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).searchClasses=function(e){var t=s.state.classesInfo;s.setState({word:e});var a=t.map((function(e){return e})),n=[];""!==e?(n=a.filter((function(t){return t.index.includes(e.toLowerCase())})),s.setState({searchResults:n})):(console.log(n),s.setState({searchResults:a}))},s.state={classes:{},classesInfo:[],classSelected:{},searchResults:[],word:""},s.selectClass=s.selectClass.bind(Object(u.a)(s)),s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){m(this.props.classSelected)&&this.setState({classSelected:this.props.classSelected}),m(this.props.classes)&&12===this.props.classesInfo.length?this.setState({classes:this.props.classes,classesInfo:this.props.classesInfo}):this.getClasses()}},{key:"componentWillUnmount",value:function(){12===this.state.classesInfo.length&&(this.props.setClasses(this.state.classes),this.props.setClassesInfo(this.state.classesInfo))}},{key:"getClasses",value:function(){var e=this;console.log("Getting Classes");var t="https://www.dnd5eapi.co/api/";fetch(t+"classes").then((function(e){return e.json()})).then((function(t){e.setState({classes:t},e.getInfo(t))})).catch((function(e){console.log(e+" -- getClasses() -- "+t)}))}},{key:"getInfo",value:function(e){var t=this;console.log(e);for(var a=0;a<e.results.length;a++)fetch("https://www.dnd5eapi.co"+e.results[a].url).then((function(e){return e.json()})).then((function(e){t.setState((function(t){return{classesInfo:[].concat(Object(f.a)(t.classesInfo),[e])}}))}))}},{key:"selectClass",value:function(e){var t=this,a=this.state.classesInfo,s=this.props.setClass,n=this.props.navigate;console.log("hello",a);for(var l=function(l){if(a[l].index===e){var c=a.filter((function(e){return e.name===a[l].name}));return t.setState({classSelected:c[0]}),s(c[0]),n("Ability-Scores"),"break"}},c=0;c<a.length;c++){if("break"===l(c))break}}},{key:"render",value:function(){var e=this,t=this.state.word,a=this.state.searchResults,s=this.state.classesInfo;return n.a.createElement("div",{className:"col-12 selection"},n.a.createElement("div",{className:"row selectionTitle"},n.a.createElement("h5",{className:"col-5 text-center choose"},"Choose a Class"),n.a.createElement(b,{value:t,handleChange:function(t){return e.searchClasses(t.target.value)}})),n.a.createElement("div",{className:"row"},n.a.createElement(g,{champions:""!==t?a:s,category:"classes",select:this.selectClass})))}}]),a}(s.Component),k=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).handleFocus=function(e){return e.target.select()},s.handleChange=function(e){for(var t=e.target,a=t.name,n=t.value,l=s.state.scores,c=JSON.parse(JSON.stringify(l)),r=0;r<c.length;r++)c[r].name===a&&(c[r].value=""===n?0:parseInt(n,10));s.setState({scores:c})},s.submitForm=function(){s.props.handleSubmitAbilityScores(s.state.scores)},s.initialState={scores:[{name:"cha",value:0},{name:"con",value:0},{name:"dex",value:0},{name:"int",value:0},{name:"str",value:0},{name:"wis",value:0}]},s.state=s.initialState,s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){console.log("AbilityScoresForm ",this.props),this.setState({scores:[{name:"cha",value:this.props.abilityScoresSelected.cha},{name:"con",value:this.props.abilityScoresSelected.con},{name:"dex",value:this.props.abilityScoresSelected.dex},{name:"int",value:this.props.abilityScoresSelected.int},{name:"str",value:this.props.abilityScoresSelected.str},{name:"wis",value:this.props.abilityScoresSelected.wis}]})}},{key:"render",value:function(){var e=this.state.scores;return n.a.createElement("form",null,n.a.createElement("label",{className:e[0].value>18||e[0].value<3?"col-4 invalidScore ":"col-4 validScore ",htmlFor:"cha"},"Charisma"),n.a.createElement("input",{className:"col-2",type:"number",name:"cha",id:"cha",value:e[0].value,onChange:this.handleChange,onFocus:this.handleFocus}),n.a.createElement("label",{className:e[1].value>18||e[1].value<3?"col-4 invalidScore ":"col-4 validScore ",htmlFor:"con"},"Constitution"),n.a.createElement("input",{className:"col-2",type:"number",name:"con",id:"con",value:e[1].value,onChange:this.handleChange,onFocus:this.handleFocus}),n.a.createElement("label",{className:e[2].value>18||e[2].value<3?"col-4 invalidScore ":"col-4 validScore ",htmlFor:"dex"},"Dexterity"),n.a.createElement("input",{className:"col-2",type:"number",name:"dex",id:"dex",value:e[2].value,onChange:this.handleChange,onFocus:this.handleFocus}),n.a.createElement("label",{className:e[3].value>18||e[3].value<3?"col-4 invalidScore ":"col-4 validScore ",htmlFor:"int"},"Intelligence"),n.a.createElement("input",{className:"col-2",type:"number",name:"int",id:"int",value:e[3].value,onChange:this.handleChange,onFocus:this.handleFocus}),n.a.createElement("label",{className:e[4].value>18||e[4].value<3?"col-4 invalidScore ":"col-4 validScore ",htmlFor:"str"},"Strength"),n.a.createElement("input",{className:"col-2",type:"number",name:"str",id:"str",value:e[4].value,onChange:this.handleChange,onFocus:this.handleFocus}),n.a.createElement("label",{className:e[5].value>18||e[5].value<3?"col-4 invalidScore ":"col-4 validScore ",htmlFor:"wis"},"Wisdom"),n.a.createElement("input",{className:"col-2",type:"number",name:"wis",id:"wis",value:e[5].value,onChange:this.handleChange,onFocus:this.handleFocus}),n.a.createElement("input",{type:"button",value:"Submit",onClick:this.submitForm}))}}]),a}(s.Component);function C(e){for(var t=0,a=0,s=[],n=0;n<5;n++)t=Math.floor(Math.random()*e+1),s.push(t);s.sort(),s.splice(0,2);for(var l=0;l<s.length;l++)a+=s[l];return a}var N=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).abilityScoresSetup=function(){console.log("scores set up",s.state.abilityScores);for(var e=s.state.abilityScores.count,t=s.state.abilityScores.results,a={},n=0;n<e;n++){a[t[n].index]=0}s.setState({abilityScoresSelected:a})},s.handleSubmitAbilityScores=function(e){for(var t=s.state.abilityScoresSelected,a=[],n=0;n<e.length;n++)e[n].value<3||e[n].value>18?a.push(e[n].name):(t[e[n].name]=parseInt(e[n].value,10),s.setState({abilityScoresSelected:t}));if(a.length>0){for(var l="Ability Scores must not be 0, you currently have 0 in: ",c=0;c<a.length;c++)c<a.length-1?l+=a[c]+", ":l+=a[c];l+=".",s.props.updateAlertMessage(l)}},s.state={abilityScores:{},abilityScoresInfo:[],abilityScoresSelected:{},abilityScoresSwitch:!1},s.getScore=s.getScore.bind(Object(u.a)(s)),s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){m(this.props.abilityScores)?(console.log("this should happen any time after the first"),this.setState({abilityScores:this.props.abilityScores,abilityScoresInfo:this.props.abilityScoresInfo,abilityScoresSelected:this.props.abilityScoresSelected},this.abilityScoresSetup())):(console.log("this should happen second"),this.getAbilityScores()),console.log(this.props)}},{key:"componentWillUnmount",value:function(){this.props.setAbilityScores(this.state.abilityScores),this.props.setAbilityScoresInfo(this.state.abilityScoresInfo),this.props.setAbilityScoresSelected(this.state.abilityScoresSelected)}},{key:"getAbilityScores",value:function(){var e=this,t="https://www.dnd5eapi.co/api/";fetch(t+"ability-scores").then((function(e){return e.json()})).then((function(t){e.setState({abilityScores:t},e.getInfo(t))})).catch((function(e){console.log(e+" -- getAbilityScores() -- "+t)}))}},{key:"getInfo",value:function(e){var t=this;console.log(e);for(var a=0;a<e.results.length;a++)fetch("https://www.dnd5eapi.co"+e.results[a].url).then((function(e){return e.json()})).then((function(e){t.setState((function(t){return{abilityScoresInfo:[].concat(Object(f.a)(t.abilityScoresInfo),[e])}}),t.abilityScoresSetup())}))}},{key:"scoreDisplay",value:function(){var e,t=this,a=this.state.abilityScoresInfo,s=this.props,l=s.raceSelected,c=s.classSelected,r=a.map((function(e){var a="abilityScore";if(m(c))for(var s=0;s<c.saving_throws.length;s++)e.index===c.saving_throws[s].index&&(a+="abilityScore savingThrow ",console.log("saving throw set: ",c.saving_throws[s].index));return n.a.createElement("div",{className:"col-2 text-center ability",key:e.index},n.a.createElement("p",null,e.full_name),n.a.createElement("p",{className:a},t.state.abilityScoresSelected[e.index]))}));return m(l)&&(e=l.ability_bonuses.map((function(e){return e})),r=a.map((function(a){var s="abilityScore ";if(m(c))for(var l=0;l<c.saving_throws.length;l++)a.index===c.saving_throws[l].index&&(s="abilityScore savingThrow ");for(var r=0;r<e.length;r++)if(e[r].ability_score.name.toLowerCase()===a.index){s+="bonus ";var i=t.state.abilityScoresSelected[a.index]+e[r].bonus;return n.a.createElement("div",{className:"col-2 text-center ability",key:a.index},n.a.createElement("p",null,a.full_name),n.a.createElement("p",{className:s},i))}return n.a.createElement("div",{className:"col-2 text-center ability",key:a.index},n.a.createElement("p",null,a.full_name),n.a.createElement("p",{className:s},t.state.abilityScoresSelected[a.index]))}))),r}},{key:"getScore",value:function(e){console.log("progress? ",e);for(var t=this.state.abilityScores,a=this.state.abilityScoresSelected,s=0;s<t.count;s++)if(t.results[s].index===e){a[e]=C(6),this.setState({abilityScoresSelected:a});break}}},{key:"abilityScoreSwitchy",value:function(){this.setState((function(e){return{abilityScoresSwitch:!e.abilityScoresSwitch}}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.abilityScoresInfo,s=t.abilityScoresSwitch,l=a.map((function(t,a){return n.a.createElement("button",{onClick:function(){return e.getScore(t.index)},className:"col-4 selectionButtons",key:a},t.full_name)})),c=this.scoreDisplay();return n.a.createElement("div",{className:"selection col-12"},n.a.createElement("div",{className:"col-12 selectionTitle"},n.a.createElement("h3",{className:"selectionTitle text-center"},"Set ability scores.")),n.a.createElement("div",{className:"row"},c),n.a.createElement("div",{className:"col-12 text-center"},s?n.a.createElement(k,{handleSubmitAbilityScores:this.handleSubmitAbilityScores,abilityScoresSelected:this.state.abilityScoresSelected}):l,n.a.createElement("button",{onClick:function(){return e.abilityScoreSwitchy()},className:"btn btn-primary col-6 align-text-bottom"},s?"Auto fill ":"Manual fill "),n.a.createElement("br",null)))}}]),a}(s.Component),j=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={},s}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.classSelected;switch(this.props.navigation){case"Races":return n.a.createElement(y,this.props);case"Classes":return n.a.createElement(E,this.props);case"Proficiencies":return n.a.createElement(d,this.props);case"Spells":return m(e)&&void 0!==e.spellcasting?n.a.createElement(v,this.props):n.a.createElement("div",{className:"col-12 text-center selection"},e.name," is not a spell caster.");case"Ability-Scores":return n.a.createElement(N,this.props);default:return n.a.createElement("div",{className:"col-12 text-center selection"},"DEFAULT: It's a broke!")}}}]),a}(s.Component),O=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={},s}return Object(o.a)(a,[{key:"navigationButtons",value:function(){var e=this.props.navigation,t=this.props.navigationCategories,a=this.props.navigate;this.props.classSelected;return t.map((function(t,s){return e===t?n.a.createElement("button",{type:"button",className:"btn btn-sm btn-success btn-nav",tabIndex:"-1","aria-disabled":"true",key:s},t):n.a.createElement("button",{type:"button",onClick:function(){a(t)},className:"btn btn-sm  btn-dark btn-nav",key:s},t)}))}},{key:"render",value:function(){return n.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light col-12",id:"navigation-bottom-container"},n.a.createElement("button",{className:"btn btn-sm navbar-toggler bg-light col-2",type:"button","data-toggle":"collapse","data-target":"#navigation-bottom","aria-controls":"navigation-bottom","aria-expanded":"false","aria-label":"Toggle navigation"},n.a.createElement("span",{className:"navbar-toggler-icon"})),n.a.createElement("div",{className:"collapse navbar-collapse col-10",id:"navigation-bottom"},this.navigationButtons()))}}]),a}(s.Component),w=function(e){var t=n.a.createElement("div",{className:"row",id:"alert"});return e.alertMessage.length>0&&(t=n.a.createElement("div",{className:"row",id:"alert"},n.a.createElement("div",{className:"col text-center"},e.alertMessage))),t},I=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).updateAlertMessage=function(e){s.setState({alertMessage:e},s.fadeMessage())},s.fadeMessage=function(){var e=document.getElementById("alert");setTimeout((function(){var t=setInterval((function(){e.style.opacity||(e.style.opacity=1),e.style.opacity>0?e.style.opacity-=.01:clearInterval(t)}),10)}),1700),s.setState({alertMessage:""}),e.style.opacity=1},s.setSelectedSpell=function(e){s.setState({selectedSpell:e})},s.setSpells=function(e){s.setState({spellsChosen:e})},s.updateSpellSlots=function(e){s.setState({spellSlots:e})},s.navigate=function(e){s.setState({navigation:e})},s.randomDiceRoll=function(e){for(var t=0,a=0,s=[],n=0;n<5;n++)t=Math.floor(Math.random()*e+1),s.push(t);s.sort(),s.splice(0,2);for(var l=0;l<s.length;l++)a+=s[l];return a},s.startingProficiencies=function(e){s.setState({proficiencies:e})},s.setProficiencies=function(e,t){s.setState({proficiencies:e,proficienciesChosen:t})},s.updateProficiencies=function(e,t){s.setState({proficiencies:e,proficienciesChoices:t})},s.setAbilityScoresSelected=function(e){s.setState({abilityScoresSelected:e})},s.setAbilityScores=function(e){s.setState({abilityScores:e})},s.setAbilityScoresInfo=function(e){s.setState({abilityScoresInfo:e})},s.state={champion:"Champion",abilityScoresSelected:{},abilityScores:{},abilityScoresInfo:[],navigationCategories:["Races","Classes","Ability-Scores","Proficiencies","Spells"],navigation:"Races",classSelected:{},raceSelected:{},proficiencies:[],proficienciesChoices:[],proficienciesChosen:[],spellsChosen:[],spellSlots:[],selectedSpell:{},alertMessage:"",updateSpellSlots:s.updateSpellSlots,updateAlertMessage:s.updateAlertMessage,setSelectedSpell:s.setSelectedSpell,setProficiencies:s.setProficiencies,setAbilityScoresSelected:s.setAbilityScoresSelected,startingProficiencies:s.startingProficiencies,updateProficiencies:s.updateProficiencies,setSpells:s.setSpells,setAbilityScores:s.setAbilityScores,setAbilityScoresInfo:s.setAbilityScoresInfo},s.setRace=s.setRace.bind(Object(u.a)(s)),s.setClass=s.setClass.bind(Object(u.a)(s)),s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"setRace",value:function(e){console.log("and here????"),this.setState({raceSelected:e})}},{key:"setClass",value:function(e){this.setState({classSelected:e,spellsChosen:[],selectedSpell:{},proficiencies:e.proficiencies,proficienciesChosen:[]})}},{key:"render",value:function(){var e=this.state,t=e.raceSelected,a=e.classSelected;return n.a.createElement("div",{id:"creation",className:"container-fluid"},n.a.createElement(w,{alertMessage:this.state.alertMessage}),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12 text-center",id:"characterType"},n.a.createElement("h5",{className:"col"},m(t)?t.name:null,n.a.createElement("span",null," "),m(a)?a.name:null))),n.a.createElement("div",{className:"row"},n.a.createElement(j,Object.assign({},this.state,this.props,{setRace:this.setRace,navigate:this.navigate,setClass:this.setClass,handleSubmitAbilityScores:this.handleSubmitAbilityScores,getScore:this.getScore}))),n.a.createElement("div",{className:"row"},n.a.createElement(O,Object.assign({},this.state,this.props,{navigate:this.navigate}))))}}]),a}(s.Component),x=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).chooseYourChampion=function(){s.setState((function(e){return{ready:!e.ready}}))},s.setRaces=function(e){s.setState({races:e})},s.setRacesInfo=function(e){s.setState({racesInfo:e})},s.setClasses=function(e){s.setState({classes:e})},s.setClassesInfo=function(e){s.setState({classesInfo:e})},s.state={races:{},racesInfo:[],classes:{},classesInfo:[],spells:{},spellsInfo:[],features:{},featuresInfo:[],levelData:[],ready:!1,enter:!1,setRaces:s.setRaces,setRacesInfo:s.setRacesInfo,setClasses:s.setClasses,setClassesInfo:s.setClassesInfo},s.getInfo=s.getInfo.bind(Object(u.a)(s)),s.getLevelData=s.getLevelData.bind(Object(u.a)(s)),s.chooseYourChampion=s.chooseYourChampion.bind(Object(u.a)(s)),s}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.setState({enter:!0})}},{key:"getCharacterInformation",value:function(e){return Promise.all([this.getClasses(e),this.getAbilityScores(e),this.getSpells(e),this.getFeatures(e)]).then((function(e){var t=Object(r.a)(e,3);return{abilityScores:t[0],spells:t[1],features:t[2]}}))}},{key:"getCharacterData",value:function(e,t,a,s){var n=this;Promise.all([this.getLevelData(e,1),this.getInfo(t,"ability-scores"),this.getInfo(a,"spells"),this.getInfo(s,"features")]).then((function(){n.setState({enter:!0})}))}},{key:"getAbilityScores",value:function(e){var t=this;return fetch(e+"ability-scores").then((function(e){return e.json()})).then((function(e){return t.setState({abilityScores:e}),e})).catch((function(t){console.log(t+" -- getAbilityScores() -- "+e)}))}},{key:"getSpells",value:function(e){var t=this;return fetch(e+"spells").then((function(e){return e.json()})).then((function(e){return t.setState({spells:e}),e})).catch((function(t){console.log(t+" -- getSpells() -- "+e)}))}},{key:"getFeatures",value:function(e){var t=this;return fetch(e+"features").then((function(e){return e.json()})).then((function(e){return t.setState({features:e}),e})).catch((function(t){console.log(t+" -- getFeatures() -- "+e)}))}},{key:"getLevelData",value:function(e,t){for(var a=[],s=0;s<e.results.length;s++)Promise.resolve(fetch("https://www.dnd5eapi.co/api/classes/"+e.results[s].index+"/levels/"+t)).then((function(e){return e.json()})).then((function(e){a.push(e)}));this.setState({levelData:a})}},{key:"getInfo",value:function(e,t){for(var a=[],s=0;s<e.results.length;s++)Promise.resolve(fetch("https://www.dnd5eapi.co"+e.results[s].url)).then((function(e){return e.json()})).then((function(e){a.push(e)}));switch(t){case"classes":this.setState({classesInfo:a});break;case"ability-scores":this.setState({abilityScoresInfo:a});break;case"spells":this.setState({spellsInfo:a});break;case"features":this.setState({featuresInfo:a})}}},{key:"render",value:function(){return this.state.ready?n.a.createElement(I,this.state):n.a.createElement("div",{className:"container-fluid"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12 text-center"},n.a.createElement("h1",null,"Welcome"),this.state.enter?n.a.createElement("button",{onClick:this.chooseYourChampion,className:"btn btn-lg btn-primary"},"Begin your journey!"):n.a.createElement("p",null,"...Loading API"))))}}]),a}(s.Component);a(17),a(18),a(19),a(20),a(21);c.a.render(n.a.createElement(x,null),document.getElementById("root"))}],[[12,1,2]]]);
//# sourceMappingURL=main.7e850f09.chunk.js.map