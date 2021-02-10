let modInfo = {
	name: "Modding Tree Tree",
	id: "infinitylayersfix",
	author: "unsoftcapped",
	pointsName: "seconds",
	discordName: "unsoftcapped#0846",
	discordLink: "",
	changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 99999,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "2.3.5",
	name: "Removed Channels",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v2.3.5</h3><br>
		- Removed channels because they were not done`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything","onReset","doReset"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	
	let gain = new Decimal(5)
	if (hasUpgrade("q", 11)) gain=new Decimal(20)
	if (hasUpgrade("m", 11))gain=gain.add(1)
	if (hasUpgrade("m", 12))gain=gain.add(1)
	if (hasUpgrade("m", 13))gain=gain.add(1)
	if (hasUpgrade("m", 21))gain=gain.add(1)
	if (hasUpgrade("m", 22))gain=gain.add(1)
	if (hasUpgrade("m", 23))gain=gain.add(1)
	if (hasUpgrade("m", 31))gain=gain.add(1)
	if (hasUpgrade("m", 32))gain=gain.add(1)
	if (hasUpgrade("m", 33))gain=gain.add(1)
	if (hasUpgrade("m", 14))gain=gain.add(1)
	if (hasUpgrade("m", 24))gain=gain.add(1)
	if (hasUpgrade("m", 34))gain=gain.add(1)
	if (hasUpgrade("m", 44))gain=gain.add(1)
	if (hasUpgrade("m", 41))gain=gain.add(1)
	if (hasUpgrade("m", 42))gain=gain.add(1)
	if (hasUpgrade("m", 43))gain=gain.add(1)
	if (hasUpgrade("m", 51))gain=gain.add(1)
	if (hasUpgrade("m", 52))gain=gain.add(1)
	if (hasUpgrade("m", 53))gain=gain.add(1)
	if (hasUpgrade("m", 15))gain=gain.add(1)
	if (hasUpgrade("m", 25))gain=gain.add(1)
	if (hasUpgrade("m", 35))gain=gain.add(1)
	if (hasUpgrade("m", 45))gain=gain.add(1)
	if (hasUpgrade("m", 61))gain=gain.add(1)
	if (hasUpgrade("m", 62))gain=gain.add(1)
	if (hasUpgrade("m", 63))gain=gain.add(1)
	if (hasUpgrade("m", 64))gain=gain.add(1)
	if (hasUpgrade("m", 65))gain=gain.add(1)
	if (hasUpgrade("m", 71))gain=gain.add(1)
	if (hasUpgrade("m", 72))gain=gain.add(1)
	if (hasUpgrade("m", 73))gain=gain.add(1)
	if (hasUpgrade("m", 74))gain=gain.add(1)
	if (hasUpgrade("m", 75))gain=gain.add(1)
	if (hasUpgrade("m", 54)){
		let boost = new Decimal(0)
		if (hasUpgrade("m", 13))boost=boost.add(2)
		if (hasUpgrade("m", 21))boost=boost.add(2)
		if (hasUpgrade("m", 22))boost=boost.add(1)
		if (hasUpgrade("m", 24))boost=boost.add(1)
		if (hasUpgrade("m", 32))boost=boost.add(2)
		if (hasUpgrade("m", 33))boost=boost.add(1)
		if (hasUpgrade("m", 44))boost=boost.add(1)
		if (hasUpgrade("m", 52))boost=boost.add(1)
		boost=boost.add(1)
		if (hasUpgrade("i",12)) boost=boost.times(player.m.upgrades.length)
		gain=gain.add(boost)
	}
	if (hasUpgrade("q", 11)) gain=gain.times(4)
	if (hasUpgrade("d",13)) gain=gain.plus(100) // last add
	if (hasUpgrade("m", 44)) gain=gain.times(2)
	if (player.t.points.gte(1) && !inChallenge("t", 11)) gain=gain.times(player.t.points.plus(1))
	    if (hasUpgrade("d", 11)) gain = gain.times(player.d.points.plus(10).log10())
	if (hasUpgrade("d", 12)) gain = gain.times(player.m.points.plus(10).log10().pow(2))
	if (hasUpgrade("m", 55)) gain=gain.times(2)
	if (hasChallenge("t",11)){gain=gain.times(player.m.points.plus(1).pow(0.25))}
	// last times
	
	if (player.i.points.gte(1)) gain=gain.pow(player.i.points.plus(1).log(10).plus(1).log(10).plus(1).times(200).round().div(100)) 
	if (hasUpgrade("f", 21)) {
		let base = new Decimal(1.2)
		if (hasChallenge("f",22)) base=base.pow(1.2)
		if (hasChallenge("f",31)) base=new Decimal(1.3184932)
		gain=gain.pow(base)}
	if (player.l.points.gte(1)) gain=gain.pow(player.l.points.plus(9).log10().sub(1).div(90).times(player.l.points).pow(3).plus(1).max(1).min(2))
	// last pow
	if (hasChallenge("t",12)) gain=gain.times(gain.log10())
	if (hasUpgrade("l",22)) gain=gain.pow(1.0003515)
	if (hasMilestone("b",1)) gain=gain.times(1e100)
if (hasUpgrade("b",11)) gain=gain.times(1e100)
if (hasUpgrade("d",21)) gain=gain.pow(1.00106456)
	if (inChallenge("t",12)) gain=gain.min(1e90)
	if (inChallenge("f",11)) gain=gain.pow(0.5)
	if (inChallenge("f",22) && gain.gte("1e300000000")) gain=gain.pow(0.5)
	if (inChallenge("f",31)) gain=gain.times(player.f.points)
	if (hasMilestone("p",1)) {
	if (player.points.lt("10^^1e10")) gain=gain.tetrate(player.p.points.plus(1))
	else gain=new Decimal(10).tetrate(player.p.points.plus(1))}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page

var displayThings = ["Endgame: ∞ points"]


// Determines when the game "ends"
function isEndgame() {
	return player.p.points.gte("10^^1e308")}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
