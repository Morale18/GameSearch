import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

/*
  SUGGESTED TABLES (not created yet — add these yourself when ready)

  -- One row per user. Level is stored so it doesn't need recomputing every load.
  CREATE TABLE players (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    level       INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
  );

  -- Current XP for each stat. One row per player per stat.
  CREATE TABLE player_stats (
    player_id   INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    stat        TEXT NOT NULL CHECK (stat IN ('discipline','knowledge','strength','body','happiness')),
    xp          INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (player_id, stat)
  );

  -- History of everything that earned XP (workout, mile time, grade, something learned...).
  -- Lets you see where XP came from and rebuild player_stats if needed.
  CREATE TABLE activities (
    id          SERIAL PRIMARY KEY,
    player_id   INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    type        TEXT NOT NULL,           -- e.g. 'workout', 'mile_time', 'grade', 'learned'
    title       TEXT NOT NULL,           -- e.g. 'Ran a 6:45 mile'
    stat        TEXT NOT NULL CHECK (stat IN ('discipline','knowledge','strength','body','happiness')),
    xp_earned   INTEGER NOT NULL,
    value       NUMERIC,                 -- optional raw number (mile seconds, grade %, weight lifted)
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
  );

  -- Sub-stats that feed a main stat (right now only discipline has them).
  -- A main stat with sub-stats gets its XP from SUM(xp) here instead of player_stats:
  --   SELECT SUM(xp), SUM(max_xp) FROM player_sub_stats WHERE player_id = 1 AND stat = 'discipline';
  CREATE TABLE player_sub_stats (
    player_id   INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    stat        TEXT NOT NULL,           -- parent stat, e.g. 'discipline'
    sub_stat    TEXT NOT NULL,           -- 'selfControl', 'consistency', 'accountability', 'cleanliness'
    xp          INTEGER NOT NULL DEFAULT 0,
    max_xp      INTEGER NOT NULL DEFAULT 25,
    PRIMARY KEY (player_id, stat, sub_stat)
  );

  -- And add to activities so each logged activity can credit a specific sub-stat:
  --   ALTER TABLE activities ADD COLUMN sub_stat TEXT;   -- NULL when the stat has no sub-stats
*/

export const todos = pgTable("todos", {
  id: serial().primaryKey(),
  title: text().notNull(),
  completed: boolean().default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
