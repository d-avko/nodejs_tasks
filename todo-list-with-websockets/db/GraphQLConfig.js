const graphql = require('graphql');
const {databaseConnection} = require("./config");

const TodoItem = new graphql.GraphQLObjectType({
    name: 'TodoList',
    fields: () => ({
        id: { type: graphql.GraphQLString },
        content: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        status: { type: graphql.GraphQLInt }
    })
});

TodoItem._typeConfig = {
    sqlTable: 'TodoList',
    uniqueKey: 'id',
};

const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        todolist: {
            type: new graphql.GraphQLList(TodoItem),
            resolve: (parent, args, context, resolveInfo) => {
                return databaseConnection.perform("SELECT * FROM  \`TodoList\`.\`thingstodo\` WHERE owner_id = ? ORDER BY created_at DESC", context.decodedJwt.id)
            }
        }
    })
});

const graphQLSchema = new graphql.GraphQLSchema({
    query: QueryRoot
});

module.exports.graphQLSchema = graphQLSchema;