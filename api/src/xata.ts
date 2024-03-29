// Generated by Xata Codegen 0.28.3. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

import dotenv from "dotenv";
dotenv.config();

const tables = [
  {
    name: "sets",
    columns: [
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "private", type: "bool", defaultValue: "true" },
      { name: "image", type: "file", file: { defaultPublicAccess: true } },
      { name: "creator", type: "link", link: { table: "users" } },
      { name: "cards", type: "int" },
    ],
    revLinks: [
      { column: "set", table: "cards" },
      { column: "set", table: "user_sets" },
      { column: "set", table: "progress" },
    ],
  },
  {
    name: "cards",
    columns: [
      { name: "question", type: "string" },
      { name: "answer", type: "string" },
      { name: "image", type: "file", file: { defaultPublicAccess: true } },
      { name: "set", type: "link", link: { table: "sets" } },
    ],
  },
  {
    name: "user_sets",
    columns: [
      { name: "set", type: "link", link: { table: "sets" } },
      { name: "user", type: "link", link: { table: "users" } },
    ],
  },
  {
    name: "users",
    columns: [
      { name: "name", type: "string" },
      { name: "email", type: "string" },
      { name: "password", type: "string" },
    ],
    revLinks: [
      { column: "user", table: "user_sets" },
      { column: "creator", table: "sets" },
      { column: "user", table: "progress" },
    ],
  },
  {
    name: "progress",
    columns: [
      { name: "user", type: "link", link: { table: "users" } },
      { name: "set", type: "link", link: { table: "sets" } },
      { name: "cards_total", type: "int", defaultValue: "0" },
      { name: "cards_wrong", type: "float" },
      { name: "cards_correct", type: "float" },
      { name: "score", type: "float" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Sets = InferredTypes["sets"];
export type SetsRecord = Sets & XataRecord;

export type Cards = InferredTypes["cards"];
export type CardsRecord = Cards & XataRecord;

export type UserSets = InferredTypes["user_sets"];
export type UserSetsRecord = UserSets & XataRecord;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type Progress = InferredTypes["progress"];
export type ProgressRecord = Progress & XataRecord;

export type DatabaseSchema = {
  sets: SetsRecord;
  cards: CardsRecord;
  user_sets: UserSetsRecord;
  users: UsersRecord;
  progress: ProgressRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://aweSAM-s-workspace-kmm9g7.us-east-1.xata.sh/db/ankili",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
