import { Db } from "mongodb";
import { Config } from ".";

export type RequestEx = {
  attr_name: string;
  config: Config;
  db: Db;
}