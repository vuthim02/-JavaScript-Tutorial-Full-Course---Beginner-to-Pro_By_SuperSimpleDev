function encodeCursor(id, createdAt) {
  return Buffer.from(`${id}:${createdAt}`).toString('base64');
}

function decodeCursor(cursor) {
  try {
    const [id, createdAt] = Buffer.from(cursor, 'base64').toString('utf-8').split(':');
    return { id, createdAt };
  } catch {
    return null;
  }
}

function paginate(rows, { first, after }) {
  let result = [...rows];
  if (after) {
    const cursor = decodeCursor(after);
    if (cursor) {
      const idx = result.findIndex((r) => r.id === cursor.id);
      if (idx !== -1) result = result.slice(idx + 1);
    }
  }
  if (first) result = result.slice(0, first);
  return result;
}

function buildConnection(nodes, totalCount, { first, after }) {
  const edges = nodes.map((n) => ({
    node: n,
    cursor: encodeCursor(n.id, n.created_at),
  }));
  const pageInfo = {
    hasNextPage: nodes.length === (first || nodes.length) && totalCount > nodes.length,
    hasPreviousPage: !!after,
    startCursor: edges[0]?.cursor || null,
    endCursor: edges[edges.length - 1]?.cursor || null,
  };
  return { edges, pageInfo, totalCount };
}

module.exports = { encodeCursor, decodeCursor, paginate, buildConnection };
