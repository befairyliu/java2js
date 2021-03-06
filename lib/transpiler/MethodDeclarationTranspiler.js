// Generated from grammars/java/Java.g4 by ANTLR 4.5
// jshint ignore: start
var BaseTranspiler = require('./BaseTranspiler.js');
var FormalParametersTranspiler = require('./FormalParametersTranspiler.js');
var BlockTranspiler = require('./BlockTranspiler.js');
var util = require('util');

function MethodDeclarationTranspiler(parent) {
	BaseTranspiler.call(this, parent);
	return this;
}

util.inherits(MethodDeclarationTranspiler, BaseTranspiler);

MethodDeclarationTranspiler.prototype.visitMethodDeclaration = function(ctx) {
	var method = {
		"type": "AssignmentExpression",
		"operator": "=",
		"left": {
			"type": "MemberExpression",
			"computed": false,
			"object": {
				"type": "MemberExpression",
				"computed": false,
				"object": {
					"type": "Identifier",
					"name": this.parent.parent.name
				},
				"property": {
					"type": "Identifier",
					"name": "prototype"
				}
			},
			"property": {
				"type": "Identifier",
				"name": ctx.Identifier().getText()
			}
		},
		"right": {
			"type": "FunctionExpression",
			"id": {
				"type": "Identifier",
				"name": ctx.Identifier().getText()
			},
			"params": this.visitWith(FormalParametersTranspiler, ctx.formalParameters()),
			"defaults": [],
			"body": this.visitWith(BlockTranspiler, ctx.methodBody().block()),
			"generator": false,
			"expression": false
		}
	};
	// add static call;
	var modifier = ctx.parentCtx.parentCtx.modifier();
	for(var i = 0; i < modifier.length; i++) {
		if(modifier[i].getText() === 'static') {
			method = {
				"type": "AssignmentExpression",
				"operator": "=",
				"left": {
					"type": "MemberExpression",
					"computed": false,
					"object": {
						"type": "Identifier",
						"name": this.parent.parent.name
					},
					"property": {
						"type": "Identifier",
						"name": ctx.Identifier().getText()
					}
				},
				"right": method
			};
		}
	}
	return {
		"type": "ExpressionStatement",
		"expression":method
	}
}

module.exports = MethodDeclarationTranspiler;
