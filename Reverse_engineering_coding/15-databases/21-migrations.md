# 21 — Migrations: Evolving the Schema

<img src="https://media.giphy.com/media/KGhpQ5NMoWKQurlHwI/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Why Migrations

```sql
-- Without migrations: manually run SQL
ALTER TABLE users ADD COLUMN phone TEXT;
-- Did this run on production? On staging? On Bob's laptop?
-- No one knows. Disaster.
```

## Migration Files

```javascript
// migrations/20240101_add_phone_to_users.js
exports.up = async (db) => {
    await db.query(`
        ALTER TABLE users ADD COLUMN phone TEXT;
    `);
};

exports.down = async (db) => {
    await db.query(`
        ALTER TABLE users DROP COLUMN phone;
    `);
};
```

## Prisma Migrations

```bash
# After changing schema.prisma:
npx prisma migrate dev --name add-phone-to-users

# Generated SQL file:
-- migrations/20240101_add_phone_to_users/migration.sql
ALTER TABLE "users" ADD COLUMN "phone" TEXT;
```

## Migration Flow

```
Development:
1. Edit schema/model
2. Generate migration
3. Apply locally
4. Test
5. Commit migration file

Production:
6. Run migration (deploy step)
   npm run migrate
```

## Safe Migration Practices

| Practice | Why |
|----------|-----|
| **Backward-compatible changes** | Add columns (don't remove during deploy) |
| **Deploy migrations before code** | Old code runs against new schema safely |
| **Test rollback** | `down` function restores previous state |
| **No long-running locks** | `ADD COLUMN` is instant. `ALTER COLUMN TYPE` may lock table |
| **Run during low traffic** | Heavy migrations can lock tables |

```sql
-- Safe: Add nullable column (instant)
ALTER TABLE users ADD COLUMN phone TEXT;

-- Generally safe: Add column with default (may lock in some DBs)
ALTER TABLE users ADD COLUMN subscription_status TEXT DEFAULT 'free';

-- Risky: Change column type (rewrites entire table)
ALTER TABLE users ALTER COLUMN id TYPE BIGINT;
-- Use: CREATE TABLE new, migrate data, swap
```

## Migration Anti-Patterns

| Anti-Pattern | Problem | Solution |
|-------------|---------|----------|
| No rollback plan | Can't undo mistakes | Always write `down` migration |
| Long-running migrations | Table locked, downtime | Use `CREATE INDEX CONCURRENTLY`, batch updates |
| Mixing schema + data changes | Migration fails at midpoint | Split into separate migrations |
| Skipping version control | Unknown state across environments | Track with `_migrations` table |
| Renaming columns directly | Old code references old name | Add new column → deploy code → drop old column |

## Example: Zero-Downtime Column Rename

```sql
-- Step 1: Add new column (safe, instant)
ALTER TABLE users ADD COLUMN display_name TEXT;

-- Step 2: Deploy code that writes to both columns
-- (code now reads from display_name, falls back to name)

-- Step 3: Backfill old data
UPDATE users SET display_name = name WHERE display_name IS NULL;

-- Step 4: Deploy code that only uses display_name

-- Step 5: Drop old column (safe now)
ALTER TABLE users DROP COLUMN name;
```

## Migration Tools Comparison

| Tool | Type | Features |
|------|------|----------|
| **Prisma Migrate** | Declarative | Auto-generates SQL from schema, CLI |
| **Sequelize Migrations** | Imperative | JavaScript-based up/down functions |
| **Knex Migrations** | Imperative | Raw SQL or chainable query builder |
| **node-pg-migrate** | Imperative | PostgreSQL-specific, pure SQL |
| **Flyway** | SQL-based | Java tool, works with any JVM app |
| **Alembic** | Declarative | Python/SQLAlchemy, auto-generation |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Are migrations used? | Check `migrations/` directory |
| Is schema in sync? | Run migration status command |
| Migration safe? | Additive changes are safe. Destructive changes risk data loss |
## Next Steps

[Back to Chapter 20](20-connection-pool.md): 20 — Connection Pooling
[Proceed to Chapter 22](22-code-review-checklist.md): 22 — Database-Focused Code Review Checklist to learn about 22 — database-focused code review checklist.
