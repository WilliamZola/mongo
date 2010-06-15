skipIfTestingReplication();

t = db.jstests_indexh;

function debug( t ) {
    print( t );
}

// index extent freeing
t.drop();
t.save( {} );
var s1 = db.stats().dataSize;
debug( "s1: " + s1 );
t.ensureIndex( {a:1} );
var s2 = db.stats().dataSize;
debug( "s2: " + s2 );
assert.automsg( "s1 < s2" );
t.dropIndex( {a:1} );
var s3 = db.stats().dataSize;
debug( "s3: " + s3 );
assert.eq.automsg( "s1", "s3" );

// index node freeing
t.drop();
t.ensureIndex( {a:1} );
var big = new Array( 1000 ).toString();
for( i = 0; i < 1000; ++i ) {
    t.save( {a:i,b:big} );
}
var s4 = db.stats().indexSize;
debug( "s4: " + s4 );
t.remove( {} );
var s5 = db.stats().indexSize;
debug( "s5: " + s5 );
assert.automsg( "s5 < s4" );