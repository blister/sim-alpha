'use strict';

var actors = [];

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
		}
		console.log('[' + tick + '] Actor ' + i + ': ' + actor.name);
	}
}

// The first crude life-form emerges.
function Alpha(name) {
	this.name = name;
	this.status = 'alive';
	this.job = 'living';

	this.jobInterval = this.initRandom(10,20);

	this.lifeSpan = this.initRandom(1,1000);
	this.duplicationInterval = this.initRandom(200, 600);
}

Alpha.prototype.act = function() {
	if ( tick % this.jobInterval ) {
		console.log(this.name + ' is performing ' + this.job + ' at ' + tick);
	}

	if ( tick % this.duplicationInterval ) {
		console.log('Life finds a way...');
		this.procreate();
	}

	if ( tick % this.lifeSpan ) {
		console.log('Oh no...');
		this.die();
	}
};


Alpha.prototype.procreate = function() {
	console.log(this.name + ' has procreated at ' + tick + '!');
	actors.push(new Alpha(tick + '-' + this.name));
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
actors.push(new Alpha('Biogenesis'));

setTimeout(simulate, 1000);
