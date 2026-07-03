const typeDefs = `#graphql
  scalar Date
  scalar URL

  enum Genre {
    ACTION
    COMEDY
    DRAMA
    SCI_FI
    HORROR
    THRILLER
    CRIME
    ROMANCE
    MUSICAL
    ANIMATION
    DOCUMENTARY
  }

  enum Rating {
    ONE
    TWO
    THREE
    FOUR
    FIVE
  }

  enum CastRole {
    ACTOR
    DIRECTOR
  }

  interface Node {
    id: ID!
  }

  interface Person {
    id: ID!
    name: String!
    bio: String
    birthDate: Date
    photo: URL
  }

  type Actor implements Node & Person {
    id: ID!
    name: String!
    bio: String
    birthDate: Date
    photo: URL
    filmography: [Movie!]!
  }

  type Director implements Node & Person {
    id: ID!
    name: String!
    bio: String
    birthDate: Date
    photo: URL
    filmography: [Movie!]!
  }

  type CastMember {
    person: Person!
    character: String
    role: CastRole!
  }

  type Movie implements Node {
    id: ID!
    title: String!
    year: Int!
    genre: Genre!
    rating: Float!
    duration: Int
    plot: String
    poster: URL
    cast: [CastMember!]!
    directors: [Director!]!
    actors: [Actor!]!
    reviews(first: Int, after: String): ReviewConnection!
    reviewCount: Int!
    averageRating: Float!
    inMyWatchlist: Boolean!
    createdAt: Date!
  }

  type Review implements Node {
    id: ID!
    rating: Rating!
    ratingValue: Int!
    comment: String
    movie: Movie!
    author: User!
    createdAt: Date!
  }

  type User implements Node {
    id: ID!
    username: String!
    email: String!
    avatar: URL
    reviews(first: Int, after: String): ReviewConnection!
    reviewCount: Int!
    watchlist(first: Int, after: String): MovieConnection!
    watchlistCount: Int!
    createdAt: Date!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  union SearchResult = Movie | Actor | Director

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type MovieEdge {
    node: Movie!
    cursor: String!
  }

  type MovieConnection {
    edges: [MovieEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type ReviewEdge {
    node: Review!
    cursor: String!
  }

  type ReviewConnection {
    edges: [ReviewEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type Query {
    node(id: ID!): Node
    me: User
    users: [User!]!
    user(id: ID!): User

    movies(
      genre: Genre
      year: Int
      minYear: Int
      maxYear: Int
      search: String
      sort: String
      first: Int
      after: String
    ): MovieConnection!

    movie(id: ID!): Movie
    movieByTitle(title: String!): Movie

    people(search: String): [Person!]!
    person(id: ID!): Person

    search(query: String!): [SearchResult!]!
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AddReviewInput {
    movieId: ID!
    rating: Rating!
    comment: String
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    addReview(input: AddReviewInput!): Review!
    deleteReview(id: ID!): Boolean!
    toggleWatchlist(movieId: ID!): Movie!
    createMovie(
      title: String!
      year: Int!
      genre: Genre!
      duration: Int
      plot: String
    ): Movie!
  }

  type Subscription {
    reviewAdded(movieId: ID!): Review!
    movieRatingChanged(movieId: ID!): Movie!
  }
`;

module.exports = typeDefs;
