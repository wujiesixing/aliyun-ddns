import minimist from 'minimist';
import Client from '../src/index';

Client.main(minimist(process.argv.slice(2)));
