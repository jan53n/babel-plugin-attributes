const { types: t } = require("@babel/core");
const { declare } = require("@babel/helper-plugin-utils");

function isFunctionCall(node) {
    return t.isCallExpression(node);
}

/**
 * @param {import("@babel/core").NodePath[]} body 
 */
function selfExecutingFunction(body) {
    return t.expressionStatement(
        t.callExpression(
            t.parenthesizedExpression(
                t.functionExpression(
                    null,
                    [],
                    t.blockStatement(body)
                )
            ),
            []
        )
    )
}

/**
 * 
 * @param {import("@babel/core").NodePath} targetName
 * @param {import("@babel/core").NodePath[]} elements
 */
function generateMappedAttributeCode(targetName, elements) {
    const mapDeclaration = t.variableDeclaration(
        "const",
        [
            t.variableDeclarator(
                t.identifier('attributes'),
                t.newExpression(t.identifier('Map'), [])
            )
        ]
    );

    const attributesSetCalls = elements.map(elem => {
        const node = t.cloneNode(elem.node);

        return t.expressionStatement(
            t.callExpression(
                t.memberExpression(
                    t.identifier('attributes'),
                    t.identifier('set')
                ),
                [
                    t.identifier(node.callee.name),
                    node
                ]
            )
        )
    });

    const assignAttrsToTarget = t.expressionStatement(
        t.assignmentExpression(
            '=',
            t.memberExpression(
                t.identifier(targetName),
                t.identifier('__attributes__'),
            ),
            t.identifier('attributes')
        )
    )

    return selfExecutingFunction([
        mapDeclaration,
        ...attributesSetCalls,
        assignAttrsToTarget
    ]);
}

module.exports = declare((api, options) => {
    const attrFunctionName = options?.attrFunctionName || "$attr";

    /** @type {import("@babel/core").Visitor} */
    const AttrFuncCallVisitor = {
        CallExpression(path) {
            const calleeName = path.node.callee?.name;

            if (calleeName === attrFunctionName) {
                const resolvers = path.get('arguments');
                const hasOnlyFunctionCalls = resolvers.every(elem => isFunctionCall(elem));
                const target = path.parentPath.getNextSibling();

                if (hasOnlyFunctionCalls && target.isFunctionDeclaration()) {
                    target.insertAfter(
                        generateMappedAttributeCode(calleeName, resolvers)
                    );

                    path.remove();
                }
            }
        }
    };

    return { visitor: AttrFuncCallVisitor };
});