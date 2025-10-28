var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  deputies: () => deputies,
  insertUserSchema: () => insertUserSchema,
  insertUserVoteSchema: () => insertUserVoteSchema,
  userVotes: () => userVotes,
  users: () => users2
});
import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users2 = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var deputies = pgTable("deputies", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  faction: text("faction").notNull(),
  votes: integer("votes").notNull().default(0)
});
var userVotes = pgTable("user_votes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  hasVoted: boolean("has_voted").notNull().default(false),
  votedDeputies: text("voted_deputies").array().notNull().default([])
});
var insertUserSchema = createInsertSchema(users2).pick({
  username: true,
  password: true
});
var insertUserVoteSchema = createInsertSchema(userVotes).pick({
  userId: true,
  hasVoted: true,
  votedDeputies: true
});

// server/storage.ts
import session from "express-session";
import createMemoryStore from "memorystore";

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db2 = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var MemoryStore = createMemoryStore(session);
var DbStorage = class {
  sessionStore;
  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 864e5
    });
    this.initializeDeputies();
  }
  async initializeDeputies() {
    const existingDeputies = await db2.select().from(deputies);
    if (existingDeputies.length === 0) {
      const deputyData = [
        { id: "1", name: "Skaidr\u012Bte \u0100brama", faction: "Frakcija PROGRES\u012AVIE", votes: 0 },
        { id: "2", name: "\u010Ceslavs Bat\u0146a", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "3", name: "Raimonds Bergmanis", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "4", name: "Andris B\u0113rzi\u0146\u0161", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "5", name: "Anita Brakovska", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "6", name: "Augusts Brigmanis", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "7", name: "O\u013Cegs Burovs", faction: "Pie frakcij\u0101m nepiedero\u0161ie deput\u0101ti", votes: 0 },
        { id: "8", name: "Art\u016Brs But\u0101ns", faction: 'Frakcija "Nacion\u0101l\u0101 apvien\u012Bba"', votes: 0 },
        { id: "9", name: "Andrejs Ce\u013Cap\u012Bters", faction: "Pie frakcij\u0101m nepiedero\u0161ie deput\u0101ti", votes: 0 },
        { id: "10", name: "Edmunds Cepur\u012Btis", faction: "Frakcija PROGRES\u012AVIE", votes: 0 },
        { id: "11", name: "Ingr\u012Bda Circene", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "12", name: "Raimonds \u010Cudars", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "13", name: "Svetlana \u010Culkova", faction: 'Frakcija "Stabilit\u0101tei!"', votes: 0 },
        { id: "14", name: "M\u0101rti\u0146\u0161 Da\u0123is", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "15", name: "Gundars Daudze", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "16", name: "D\u0101vis M\u0101rti\u0146\u0161 Daugavietis", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "17", name: "J\u0101nis Dombrava", faction: 'Frakcija "Nacion\u0101l\u0101 apvien\u012Bba"', votes: 0 },
        { id: "18", name: "Jekaterina Drelinga", faction: 'Frakcija "Stabilit\u0101tei!"', votes: 0 },
        { id: "19", name: "Raivis Dzintars", faction: 'Frakcija "Nacion\u0101l\u0101 apvien\u012Bba"', votes: 0 },
        { id: "20", name: "M\u0101rti\u0146\u0161 Felss", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "21", name: "Al\u012Bna Gendele", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "22", name: "Ligita Gintere", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "23", name: "J\u0101nis Grasbergs", faction: 'Frakcija "Nacion\u0101l\u0101 apvien\u012Bba"', votes: 0 },
        { id: "24", name: "Ilze Indriksone", faction: 'Frakcija "Nacion\u0101l\u0101 apvien\u012Bba"', votes: 0 },
        { id: "25", name: "I\u013Cja Ivanovs", faction: 'Frakcija "Stabilit\u0101tei!"', votes: 0 },
        { id: "26", name: "Juris Jakovins", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "27", name: "M\u0101rcis Jenc\u012Btis", faction: "Frakcija LATVIJA PIRMAJ\u0100 VIET\u0100", votes: 0 },
        { id: "28", name: "Andrejs Judins", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "29", name: "Igors Judins", faction: 'Frakcija "Stabilit\u0101tei!"', votes: 0 },
        { id: "30", name: "Edmunds Jur\u0113vics", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "31", name: "Zanda Kalni\u0146a-Luka\u0161evica", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "32", name: "Inese Kalni\u0146a", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "33", name: "Irma Kalni\u0146a", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "34", name: "Aleksandrs Kir\u0161teins", faction: "Pie frakcij\u0101m nepiedero\u0161ie deput\u0101ti", votes: 0 },
        { id: "35", name: "Jefimijs Klementjevs", faction: 'Frakcija "Stabilit\u0101tei!"', votes: 0 },
        { id: "36", name: "Jur\u0123is Kloti\u0146\u0161", faction: 'Frakcija "Nacion\u0101l\u0101 apvien\u012Bba"', votes: 0 },
        { id: "37", name: "L\u012Bga K\u013Cavi\u0146a", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "38", name: "Dmitrijs Kova\u013Cenko", faction: 'Frakcija "Stabilit\u0101tei!"', votes: 0 },
        { id: "39", name: "L\u012Bga Kozlovska", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "40", name: "Agnese Krasta", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "41", name: "\u0122irts Valdis Kristovskis", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "42", name: "Kristaps Kri\u0161topans", faction: "Frakcija LATVIJA PIRMAJ\u0100 VIET\u0100", votes: 0 },
        { id: "43", name: "M\u0101ris Ku\u010Dinskis", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "44", name: "Andris Kulbergs", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "45", name: "Gun\u0101rs K\u016Btris", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "46", name: "Ervins Labanovskis", faction: "Frakcija PROGRES\u012AVIE", votes: 0 },
        { id: "47", name: "Atis Labucis", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "48", name: "Ainars Latkovskis", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "49", name: "Ingm\u0101rs L\u012Bdaka", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "50", name: "Linda Liepi\u0146a", faction: "Frakcija LATVIJA PIRMAJ\u0100 VIET\u0100", votes: 0 },
        { id: "51", name: "Gatis Liepi\u0146\u0161", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "52", name: "Lauris Lizbovskis", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "53", name: "Mairita L\u016Bse", faction: "Frakcija PROGRES\u012AVIE", votes: 0 },
        { id: "54", name: "Nata\u013Cja Mar\u010Denko-Jodko", faction: 'Frakcija "Stabilit\u0101tei!"', votes: 0 },
        { id: "55", name: "Valdis Maslovskis", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "56", name: "Linda Matisone", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "57", name: "Daiga Mieri\u0146a", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "58", name: "U\u0123is Mitrevics", faction: 'Frakcija "Nacion\u0101l\u0101 apvien\u012Bba"', votes: 0 },
        { id: "59", name: "In\u0101ra M\u016Brniece", faction: 'Frakcija "Nacion\u0101l\u0101 apvien\u012Bba"', votes: 0 },
        { id: "60", name: "Anto\u0146ina \u0145ena\u0161eva", faction: "Frakcija PROGRES\u012AVIE", votes: 0 },
        { id: "61", name: "J\u0101nis Patmalnieks", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "62", name: "Ramona Petravi\u010Da", faction: "Frakcija LATVIJA PIRMAJ\u0100 VIET\u0100", votes: 0 },
        { id: "63", name: "Viktorija Ple\u0161k\u0101ne", faction: "Pie frakcij\u0101m nepiedero\u0161ie deput\u0101ti", votes: 0 },
        { id: "64", name: "Viktors Pu\u010Dka", faction: 'Frakcija "Stabilit\u0101tei!"', votes: 0 },
        { id: "65", name: "Nauris Puntulis", faction: 'Frakcija "Nacion\u0101l\u0101 apvien\u012Bba"', votes: 0 },
        { id: "66", name: "Edgars Putra", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "67", name: "Igors Rajevs", faction: "Pie frakcij\u0101m nepiedero\u0161ie deput\u0101ti", votes: 0 },
        { id: "68", name: "Anna Ranc\u0101ne", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "69", name: "Leila Rasima", faction: "Frakcija PROGRES\u012AVIE", votes: 0 },
        { id: "70", name: "J\u0101nis Reirs", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "71", name: "Harijs Rokpelnis", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "72", name: "Aleksejs Ros\u013Cikovs", faction: 'Frakcija "Stabilit\u0101tei!"', votes: 0 },
        { id: "73", name: "U\u0123is Rotbergs", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "74", name: "Amils Sa\u013Cimovs", faction: 'Frakcija "Stabilit\u0101tei!"', votes: 0 },
        { id: "75", name: "Jana Simanovska", faction: "Frakcija PROGRES\u012AVIE", votes: 0 },
        { id: "76", name: "J\u0101nis Skrasti\u0146\u0161", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "77", name: "Zane Skuji\u0146a-Rubene", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "78", name: "Edvards Smilt\u0113ns", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "79", name: "M\u0101ris Sprind\u017Euks", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "80", name: "Ilze Stobova", faction: "Frakcija LATVIJA PIRMAJ\u0100 VIET\u0100", votes: 0 },
        { id: "81", name: "Ain\u0101rs \u0160lesers", faction: "Frakcija LATVIJA PIRMAJ\u0100 VIET\u0100", votes: 0 },
        { id: "82", name: "Ri\u010Dards \u0160lesers", faction: "Frakcija LATVIJA PIRMAJ\u0100 VIET\u0100", votes: 0 },
        { id: "83", name: "Didzis \u0160mits", faction: "Pie frakcij\u0101m nepiedero\u0161ie deput\u0101ti", votes: 0 },
        { id: "84", name: "Edv\u012Bns \u0160nore", faction: 'Frakcija "Nacion\u0101l\u0101 apvien\u012Bba"', votes: 0 },
        { id: "85", name: "\u0122irts \u0160tekerhofs", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "86", name: "Andris \u0160uvajevs", faction: "Frakcija PROGRES\u012AVIE", votes: 0 },
        { id: "87", name: "Atis \u0160vinka", faction: "Frakcija PROGRES\u012AVIE", votes: 0 },
        { id: "88", name: "Edgars Tavars", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "89", name: "Edmunds Teirumnieks", faction: 'Frakcija "Nacion\u0101l\u0101 apvien\u012Bba"', votes: 0 },
        { id: "90", name: "Ilze Vergina", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "91", name: "Aiva V\u012Bksna", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "92", name: "Andrejs Vilks", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "93", name: "Juris Vi\u013Cums", faction: 'Frakcija "APVIENOTAIS SARAKSTS"', votes: 0 },
        { id: "94", name: "J\u0101nis Vitenbergs", faction: 'Frakcija "Nacion\u0101l\u0101 apvien\u012Bba"', votes: 0 },
        { id: "95", name: "J\u0101nis Vuc\u0101ns", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "96", name: "Agita Zari\u0146a-St\u016Bre", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "97", name: "Viesturs Zari\u0146\u0161", faction: "Frakcija JAUN\u0100 VIENOT\u012ABA", votes: 0 },
        { id: "98", name: "Edgars Zelderis", faction: "Pie frakcij\u0101m nepiedero\u0161ie deput\u0101ti", votes: 0 },
        { id: "99", name: "Didzis Zemmers", faction: "Za\u013Co un Zemnieku savien\u012Bbas frakcija", votes: 0 },
        { id: "100", name: "Edmunds Zivti\u0146\u0161", faction: "Frakcija LATVIJA PIRMAJ\u0100 VIET\u0100", votes: 0 }
      ];
      for (const deputy of deputyData) {
        await db2.insert(deputies).values(deputy);
      }
    }
  }
  async getUser(id) {
    const result = await db2.select().from(users2).where(eq(users2.id, id));
    return result[0];
  }
  async getUserByUsername(username) {
    const result = await db2.select().from(users2).where(eq(users2.username, username.toLowerCase()));
    return result[0];
  }
  async createUser(user) {
    const result = await db2.insert(users2).values({
      ...user,
      username: user.username.toLowerCase()
    }).returning();
    return result[0];
  }
  async getDeputies() {
    return db2.select().from(deputies);
  }
  async getUserVotes(userId) {
    const result = await db2.select().from(userVotes).where(eq(userVotes.userId, userId));
    return result[0];
  }
  async createUserVotes(userId) {
    const result = await db2.insert(userVotes).values({
      userId,
      hasVoted: false,
      votedDeputies: []
    }).returning();
    return result[0];
  }
  async voteForDeputy(userId, deputyId) {
    let votes = await this.getUserVotes(userId);
    if (!votes) {
      votes = await this.createUserVotes(userId);
    }
    if (votes.votedDeputies.length >= 5 || votes.votedDeputies.includes(deputyId)) {
      return false;
    }
    const deputyResult = await db2.select().from(deputies).where(eq(deputies.id, deputyId));
    if (deputyResult.length === 0) {
      return false;
    }
    await db2.update(deputies).set({ votes: deputyResult[0].votes + 1 }).where(eq(deputies.id, deputyId));
    const newVotedDeputies = [...votes.votedDeputies, deputyId];
    const hasVoted = newVotedDeputies.length === 5;
    await db2.update(userVotes).set({
      votedDeputies: newVotedDeputies,
      hasVoted
    }).where(eq(userVotes.userId, userId));
    return true;
  }
};
var storage = new DbStorage();

// server/routes.ts
async function registerRoutes(app2) {
  const httpServer = createServer(app2);
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });
  app2.get("/api/deputies", async (_req, res) => {
    try {
      const deputies2 = await storage.getDeputies();
      console.log(`Sending ${deputies2.length} deputies to client`);
      res.json(deputies2);
    } catch (error) {
      console.error("Error fetching deputies:", error);
      res.status(500).json({ error: "Failed to fetch deputies" });
    }
  });
  app2.get("/api/votes", async (req, res) => {
    try {
      if (!req.user?.id) {
        return res.json({ votedDeputies: [], hasVoted: false });
      }
      const votes = await storage.getUserVotes(req.user.id);
      res.json(votes || { votedDeputies: [], hasVoted: false });
    } catch (error) {
      console.error("Error fetching votes:", error);
      res.status(500).json({ error: "Failed to fetch votes" });
    }
  });
  app2.post("/api/vote/:deputyId", async (req, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Nav autoriz\u0113ts" });
      }
      const { deputyId } = req.params;
      let votes = await storage.getUserVotes(req.user.id);
      if (!votes) {
        votes = await storage.createUserVotes(req.user.id);
      }
      if (votes.votedDeputies.length >= 5) {
        return res.status(400).json({ message: "J\u016Bs jau esat izmantojis visas savas balsis" });
      }
      if (votes.votedDeputies.includes(deputyId)) {
        return res.status(400).json({ message: "J\u016Bs jau esat nobalsojis par \u0161o deput\u0101tu" });
      }
      const success = await storage.voteForDeputy(req.user.id, deputyId);
      if (!success) {
        return res.status(400).json({ message: "Neizdev\u0101s nobalsot" });
      }
      const updatedDeputies = await storage.getDeputies();
      const updatedVotes = await storage.getUserVotes(req.user.id);
      const updateMessage = JSON.stringify({
        type: "VOTE_UPDATE",
        deputies: updatedDeputies,
        userVotes: updatedVotes
      });
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(updateMessage);
        }
      });
      res.json({ message: "Balss veiksm\u012Bgi re\u0123istr\u0113ta" });
    } catch (error) {
      console.error("Error voting:", error);
      res.status(500).json({ message: "Neizdev\u0101s re\u0123istr\u0113t balsi" });
    }
  });
  app2.get("/api/data-export", async (req, res) => {
    try {
      const { key } = req.query;
      if (key !== "your-secret-key") {
        return res.status(401).send("Unauthorized");
      }
      const allUsers = await db.select().from(users);
      const allDeputies = await storage.getDeputies();
      const sortedDeputies = [...allDeputies].sort((a, b) => b.votes - a.votes);
      res.json({
        users: allUsers.map((user) => ({
          id: user.id,
          username: user.username
          // This contains the email address
        })),
        deputies: sortedDeputies.map((deputy) => ({
          id: deputy.id,
          name: deputy.name,
          faction: deputy.faction,
          votes: deputy.votes
        }))
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  });
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  base: "/saeima/",
  root: path.resolve(__dirname, "client"),
  build: { outDir: path.resolve(__dirname, "docs"), emptyOutDir: true },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@components": path.resolve(__dirname, "client", "src", "components"),
      "@pages": path.resolve(__dirname, "client", "src", "pages")
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import rateLimit from "express-rate-limit";
import cors from "cors";

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session2 from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { z } from "zod";
var scryptAsync = promisify(scrypt);
var registerSchema = z.object({
  username: z.string().min(1, "L\u016Bdzu ievadiet lietot\u0101jv\u0101rdu"),
  password: z.string().min(1, "Parolei j\u0101b\u016Bt vismaz 1 simbolam garam")
});
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
function setupAuth(app2) {
  const sessionSettings = {
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore
  };
  app2.set("trust proxy", 1);
  app2.use(session2(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !await comparePasswords(password, user.password)) {
          return done(null, false, { message: "Nepareizs e-pasts vai parole" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  app2.post("/api/register", async (req, res) => {
    try {
      const data = registerSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.json({
          message: "L\u016Bdzu ievadiet e-pasta adresi ar @gmail.com"
        });
      }
      const user = await storage.createUser({
        ...data,
        password: await hashPassword(data.password)
      });
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({
            message: "K\u013C\u016Bda lietot\u0101ja autentifik\u0101cij\u0101"
          });
        }
        res.status(201).json(user);
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.errors[0]?.message || "Neder\u012Bgi ievades dati"
        });
      }
      console.error("Registration error:", error);
      res.status(500).json({
        message: "K\u013C\u016Bda re\u0123istr\u0101cijas proces\u0101"
      });
    }
  });
  app2.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(500).json({
          message: "K\u013C\u016Bda autentifik\u0101cijas proces\u0101"
        });
      }
      if (!user) {
        return res.status(401).json({
          message: info?.message || "Nepareizs e-pasts vai parole"
        });
      }
      req.login(user, (err2) => {
        if (err2) {
          return res.status(500).json({
            message: "K\u013C\u016Bda lietot\u0101ja autentifik\u0101cij\u0101"
          });
        }
        res.json(user);
      });
    })(req, res, next);
  });
  app2.post("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({
          message: "K\u013C\u016Bda izrakst\u012B\u0161an\u0101s proces\u0101"
        });
      }
      res.sendStatus(200);
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        message: "Nav autoriz\u0113ts"
      });
    }
    res.json(req.user);
  });
}

// server/index.ts
var app = express2();
app.use(express2.json({ limit: "10kb" }));
app.use(express2.urlencoded({ extended: false, limit: "10kb" }));
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
var limiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  max: 500,
  message: { message: "P\u0101r\u0101k daudz piepras\u012Bjumu no \u0161\u012Bs IP adreses, l\u016Bdzu m\u0113\u0123iniet v\u0113l\u0101k" },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});
(async () => {
  try {
    setupAuth(app);
    const server = await registerRoutes(app);
    app.use((err, _req, res, _next) => {
      console.error("Server error:", err);
      const statusCode = err.status || err.statusCode || 500;
      const message = err.message || "K\u013C\u016Bda server\u012B";
      res.status(statusCode).json({
        message,
        errors: err.errors
      });
    });
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }
    const port = 5e3;
    server.listen(port, "0.0.0.0", () => {
      log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
