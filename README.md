# tinytools

A handful of zero-dependency CLI utilities for everyday terminal chores.

No config file, no third-party packages, no network calls — just the Node.js
standard library. If you have Node 18+, you already have everything you need.

## Commands

| Command | What it does |
| --- | --- |
| `tinytools b64 enc <text>` | Base64-encode text |
| `tinytools b64 dec <text>` | Base64-decode text |
| `tinytools hash [algo] <text>` | Hash text (`md5` `sha1` `sha256` `sha512`, default `sha256`) |
| `tinytools uuid` | Print a random UUID v4 |
| `tinytools ts [value]` | Convert `now` / ms timestamp / date string between formats |
| `tinytools rand <min> <max>` | Random integer in `[min, max]` |

## Quick start

```console
$ node bin/tinytools.js b64 enc "hello tinytools"
aGVsbG8gdGlueXRvb2xz

$ node bin/tinytools.js hash "abc"
ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad

$ node bin/tinytools.js ts 1700000000000
2023-11-14T22:13:20.000Z

$ node bin/tinytools.js rand 1 100
42
```

Install globally if you like:

```console
$ npm install -g .
$ tinytools uuid
9b2f6a5e-1c3d-4e7f-a0b1-2c3d4e5f6a78
```

## Why zero-dependency?

Small CLI tools should be boring and instant: no `node_modules`, no audit
noise, no supply-chain surprises. Everything here runs on built-ins, which
also keeps CI fast (see [ci.yml](.github/workflows/ci.yml), tests run on
Node 18/20/22).

## Development

```console
$ npm test        # run the test suite (node:test, zero deps)
```

## License

[MIT](LICENSE)
