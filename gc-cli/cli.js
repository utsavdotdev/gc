#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();

program.name("gc").description("Git commit Suggestion CLI").version("1.0.0");

program.parse(process.argv);
