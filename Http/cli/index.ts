import { Command } from 'commander';
const program = new Command();

const commander = (app) => program.command('start').action(() => app);

export default commander;
