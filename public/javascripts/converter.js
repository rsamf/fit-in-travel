module.exports = {
	type : 'MySchema',
	tagName : 'div',
	matchElement : function(el) {
		return el.is('div') && el.hasClass('MySchema');
	},
	import : function(el, node, converter) {
		node.content = converter.annotatedText(el, [node.id, 'content']);
		node.done = el.attr('data-done') === '1';
	},
	export : function(node, el, converter) {
		el.append(converter.annotatedText([node.id, 'content']))
			.addClass('MySchema')
			.attr('done', node.done ? '1' : '0');
	}
};