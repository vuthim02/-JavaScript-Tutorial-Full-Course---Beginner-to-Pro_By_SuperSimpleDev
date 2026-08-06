const { GraphQLError } = require('graphql');

function authError(msg = 'Not authenticated') {
  return new GraphQLError(msg, {
    extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
  });
}

function forbiddenError(msg = 'Not authorized') {
  return new GraphQLError(msg, {
    extensions: { code: 'FORBIDDEN', http: { status: 403 } },
  });
}

function notFoundError(resource = 'Resource') {
  return new GraphQLError(`${resource} not found`, {
    extensions: { code: 'NOT_FOUND', http: { status: 404 } },
  });
}

function validationError(msg) {
  return new GraphQLError(msg, {
    extensions: { code: 'BAD_USER_INPUT', http: { status: 400 } },
  });
}

module.exports = { authError, forbiddenError, notFoundError, validationError };
