import { createHash, randomUUID, randomInt } from 'node:crypto';

const HASH_ALGOS = ['md5', 'sha1', 'sha256', 'sha512'];

const USAGE = `tinytools — a handful of zero-dependency CLI utilities

Usage:
  tinytools <command> [args]

Commands:
  b64 enc <text>       Base64-encode text
  b64 dec <text>       Base64-decode text
  hash [algo] <text>   Hash text (default sha256; md5 | sha1 | sha256 | sha512)
  uuid                 Print a random UUID v4
  ts [value]           Convert "now" | <ms> | <date> between timestamp and ISO time
  rand <min> <max>     Random integer in [min, max]
  help                 Show this help
`;

export async function run(argv) {
  const [name, ...args] = argv;

  if (!name || name === 'help' || name === '--help' || name === '-h') {
    process.stdout.write(USAGE);
    return;
  }

  switch (name) {
    case 'b64': {
      const [mode, text] = args;
      if (mode === 'enc') {
        console.log(Buffer.from(text ?? '', 'utf8').toString('base64'));
      } else if (mode === 'dec') {
        console.log(Buffer.from(text ?? '', 'base64').toString('utf8'));
      } else {
        throw new Error('usage: tinytools b64 enc|dec <text>');
      }
      return;
    }

    case 'hash': {
      let algo = args[0];
      let text;
      if (HASH_ALGOS.includes(algo)) {
        text = args.slice(1).join(' ');
      } else {
        algo = 'sha256';
        text = args.join(' ');
      }
      if (!text) throw new Error('usage: tinytools hash [algo] <text>');
      console.log(createHash(algo).update(text).digest('hex'));
      return;
    }

    case 'uuid':
      console.log(randomUUID());
      return;

    case 'ts': {
      const [value] = args;
      if (!value || value === 'now') {
        const now = Date.now();
        console.log(`${now}  ${new Date(now).toISOString()}`);
      } else if (/^\d+$/.test(value)) {
        console.log(new Date(Number(value)).toISOString());
      } else {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) throw new Error(`not a valid date: ${value}`);
        console.log(date.getTime());
      }
      return;
    }

    case 'rand': {
      const [min, max] = args.map(Number);
      if (!Number.isInteger(min) || !Number.isInteger(max) || min > max) {
        throw new Error('usage: tinytools rand <min> <max>');
      }
      console.log(randomInt(min, max + 1));
      return;
    }

    default:
      throw new Error(`unknown command: ${name} (try: tinytools help)`);
  }
}
