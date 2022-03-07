
const { ApolloServer, gql } = require('apollo-server');
const _ = require("lodash");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # TYPES
  type Book {
    id: ID!
    name: String!
    authorId: Int!
    author: [Author]
  }
  type Author {
      id: ID!
      name: String!
  }

  # QUERY
  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
    author(id: ID!): Author
  }
`;

const authorList = [
    { id: 1, name: 'J.K. Rowling' },
    { id: 2, name: 'J.R.R. Tolkien' },
    { id: 3, name: 'Brent Weeks' }
];

const bookList = [
    { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
    { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
    { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
    { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
    { id: 5, name: 'The Two Towers', authorId: 2 },
    { id: 6, name: 'The Return of the King', authorId: 2 },
    { id: 7, name: 'The Way of Shadows', authorId: 3 },
    { id: 8, name: 'Beyond the Shadows', authorId: 3 },
];

// Resolvers define the technique for fetching the types defined in the schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => bookList,
        authors: () => authorList,
        book(parent, args) {
            const id = args.id;
            const book = _.find(bookList, { id: Number(id)});
            return book;
        },
        author(parent, args) {
            const id = args.id;
            const author = _.find(authorList, { id: Number(id)});
            return author;
        },
    }
};

// The ApolloServer constructor requires two parameters: your schema definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
