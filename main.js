'use strict';

var actors = [];

var worldId;
var worldSpeed = 1000;
var tick = 0;

function simulate() {
	// Increment our total sim world tick
	tick = tick + 1;

	console.log('WORLD TICK ' + tick + ' - Actors: ' + actors.length);

	for ( var i = 0, l = actors.length; i < l; i++ ) {
		var actor = actors[i];

		if ( actor.status == 'dead' ) {
			actors.splice(i, 1);
			l = l - 1;
		}
		console.log('[' + tick + '] Actor ' + i + ': ' + actor.name);
		actor.act();
	}

	if ( actors.length == 0 ) {
		console.log('The colony has died. It lasted ' + tick + ' cycles');
		clearInterval(worldId);
	}
}

// The first crude life-form emerges.
function Alpha(name) {
	this.name = name;
	this.status = 'alive';
	this.job = 'living';
	this.age = 0;

	this.jobInterval = this.initRandom(10,20);

	this.lifeSpan = this.initRandom(1,100);
	this.duplicationInterval = this.initRandom(10, 20);

	console.log(this);
}

Alpha.prototype.act = function() {
	if ( tick % this.jobInterval == 0 ) {
		console.log(this.name + ' is performing ' + this.job + ' at ' + tick);
	}

	if ( this.age > this.duplicationInterval && this.initRandom(1,5) == 5 ) {
		console.log('Life finds a way...');
		this.procreate();
	}

	if ( this.age > this.lifeSpan && this.initRandom(1,5) == 5 ) {
		console.log('Oh no...');
		this.die();
	}

	this.age = this.age + 1;
};


Alpha.prototype.procreate = function() {
	console.log(this.name + ' has procreated at ' + tick + '!');
	actors.push(new Alpha(tick + ':' + this.name));
};
Alpha.prototype.die = function() {
	console.log(this.name + ' has died at ' + tick + '. RIP. :(');
	this.status = 'dead';
};

Alpha.prototype.initRandom = function(min,max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

// RUN THE SIMULATION
actors.push(new Alpha('A0'));

worldId = setInterval(simulate, 1000);
