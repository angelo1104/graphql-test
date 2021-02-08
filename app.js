import gql from "graphql-tag";
import { ApolloServer } from "apollo-server";

const typeDefs = gql`
  type User {
    email: String!
    avatar: String!
    friendsNumber: Int!
    friends: [User]
  }

  type Product {
    name: String
    price: Float
    chinese: Boolean!
  }

  interface Shoe {
    brand: ShoeType
    size: Int!
  }

  type Sneaker implements Shoe {
    brand: ShoeType
    size: Int!
    sport: String!
  }

  type Boot implements Shoe {
    brand: ShoeType
    size: Int!
    hasGrip: Boolean!
  }

  input ProductInput {
    price: Float!
  }

  input ShoeInput {
    brand: String
  }

  enum ShoeType {
    NIKE
    ADIDDAS
    JORDAN
  }

  type Query {
    me: User!
    product(chinese: Boolean!, input: ProductInput): Product!
    shoe(input: ShoeInput): [Shoe]!
  }

  input NewShoeInput {
    brand: ShoeType
    size: Int!
  }

  type Mutation {
    newShoe(input: NewShoeInput): Shoe!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        email: "sab@carp.com",
        avatar: "https://www.apple.com",
        friendsNumber: 2,
        friends: [],
      };
    },
    product(_, { chinese, input }, ctx) {
      console.log("input", input);

      return {
        name: "MacBook Pro.",
        price: 1299.99,
        chinese,
      };
    },
    shoe(_, { input }) {
      return [
        {
          brand: "NIKE",
          size: 9,
          sport: "Football",
        },
        {
          brand: "JORDAN",
          size: 7,
          hasGrip: true,
        },
      ];
      //.filter((shoe) => shoe.brand === input.brand && shoe);
    },
  },
  Mutation: {
    newShoe(_, { input }) {
      return input;
    },
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.hasGrip) return "Boot";
      return "Sneaker";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
