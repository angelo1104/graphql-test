import gql from "graphql-tag";
import { ApolloServer } from "apollo-server";
import products from "./products.js";
import orders from "./orders.js";

const typeDefs = gql`
  type Product {
    name: String!
    brand: String!
    price: Float!
    owner: String!
  }

  type Order {
    total: Float!
    products: [Product!]!
  }

  type Query {
    hello: String
    products: [Product]!
    orders: [Order]!
  }

  input CreateProductInput {
    name: String!
    brand: String!
    price: Float!
    owner: String!
  }

  input CreateOrderInput {
    total: Float!
    products: [CreateProductInput!]!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    createOrder(input: CreateOrderInput!): Order!
  }
`;

const resolvers = {
  Query: {
    hello() {
      return "Hello universe.";
    },
    products(_, __, ctx) {
      return products;
    },
    orders() {
      return orders;
    },
  },
  Mutation: {
    createProduct(_, { input }, ctx) {
      return input;
    },
    createOrder(_, { input }, ctx) {
      return input;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`💘 Server up and running on ${url}`));
