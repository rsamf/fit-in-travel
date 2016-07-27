'use strict';

//define a schema
function MySchema(){
	MySchema.super.apply(this, arguments);
}
TextBlock.extend(MySchema);
MySchema.static.name = 'MySchema';
MySchema.static.defineSchema({
	content : 'text',
	done : {type : 'bool', default : false}
});