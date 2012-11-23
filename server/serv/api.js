
console.log('mongoDB setup');
var async = require('async');
var mongo = require('mongodb'),
		Server = mongo.Server,
		Db = mongo.Db;
var server  = new Server('localhost', 27017, {auto_reconnect: true});
var db      = new Db('GiantEagle', server);// Routes

db.open(function(err, db) {
	if(!err) console.log("=> success");
	else return;

	async.waterfall([
		
			// get turn collection
			function(cb) { 
				db.collection('turns', function(err, turns) {
					if( err ) {
						console.log('no collections : turns')
						return cb(err);
					}
					else {
						Turns = turns;
						console.log('turnscollection');
						return cb(null);
					}
				});
			}, 
		
			// get article collection
			function(cb) {

				db.collection('articles', function(err, collection) {
					if( err ) {
						console.log('no collections : articles')
						return cb(err);
					}
					else {
						Articles = collection;
						console.log('Article collection');
						return cb(null);
					}
				});
			},

			// get article collection
			function(cb) {

				db.collection('visits', function(err, collection) {
					if( err ) {
						console.log('no collections : ')
						return cb(err);
					}
					else {
						Visits = collection;
						console.log('Visits collection');
						return cb(null);
					}
				});
			}

		], function(err, result) {
		if( err ) {
			console.log( err.message );
		}
	});
});

function parseUA( ua ) {
	console.log( ua ) ;
	if( -1 != ua.toLowerCase().indexOf('android') ) {
		return true;
	}
	return false;
}


var api = {};


api.channels = function(req, res) {

	console.log("request : /v1/channels/" + req.params.category);

	// get user agent
	var mobile = parseUA( req.headers['user-agent'] );

	async.waterfall([
		function(cb) {
			var c = req.params.category;
			var channels = [];

			var nate_prefx; 
			if( mobile )
				nate_prefix = 'm_nate_';
			else 
				nate_prefix = 'nate_';

			if( c == 'polsoc' ) {
				channels.push({ 'channel' : 'daum_pol' });
				channels.push({ 'channel' : 'daum_soc' });
				channels.push({ 'channel' : nate_prefix + 'pol' });
				channels.push({ 'channel' : nate_prefix + 'soc' });
			} else {
				channels.push({ 'channel' : 'daum_' + c });
				channels.push({ 'channel' : nate_prefix + c });
			}


			console.log(channels);

			return Turns.findOne( function(err, row) {
				if( err ) {
					console.log('no available turn');
					return cb(err);
				} else {

					var turnId = row.turn;
					console.log('current turn : ' + turnId );

					Articles.find({
							turnId: turnId, 
							$or : channels  
						}).toArray( function(err, docs) {
							if( err ) return cb(err);
							console.log('=> success');
							cb(null, docs);
					});
				}
			});

		}
	
	], function(err, docs) {


		if( err ) {
			console.log(err.message);
			return res.send(500);
		} else {
			console.log('all collections are prepared');
/*
			if( mobile ) {
				for( var i in docs ) {
					if( -1 != docs[i].channel.indexOf('daum') ) {
						docs[i].url = docs[i].url.replace('media', 'm.media');
					}
				}
			}
*/
			res.send(docs);
			db.close();
			return;
		}
	});
}


api.visits = function(req, res) {

	return Visits.findOne( function(err, row) {
		if( err ) {
			console.log('no available turn');
			return cb(err);
		} else {
			res.send({count: row.count});
		}
	});
}

api.visit = function() {

	console.log('increment visits');
	Visits.update({}, {$inc : {'count': 1}}, {'safe' : false}, function(err, result) {
		if( !err ) {
			console.log('success');
		
			console.log( result );

			if( 0 /* affectedRows == 0 */ ) {
				console.log('no count. create new one');
				Visits.insert({'count':1}); 
			}

		}
	});
}

exports = module.exports = api; 
