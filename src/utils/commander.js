import { Command } from "commander";

const program = new Command();

program
    .option("-p <port>", "El puerto que inicia el server", 8080)
    .option("--mode <mode>", "Modo de trabajo", "produccion")
program.parse();

export default program