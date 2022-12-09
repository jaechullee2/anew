#!/usr/bin/env node

const {program } = require("commander")

program.action(cmd => console.log('Runnig!!'))

program.parse(process.argv)