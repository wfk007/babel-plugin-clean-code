# README

## babel-plugin-clean-code

### usage

```shell
$ npm install babel-plugin-clean-code -D
```

in your babel config file or babel-loader

```json
{
  "plugins": [["babel-plugin-clean-code", options]]
}
```

#### options

default options are as below：

```ts
{
  clearConsole: true,
  consoleLevel: ["log", "error", "info", "warn"],
  clearDebugger: true,
}
```

#### ts

```ts
interface IBabelPluginCleanCode {
  clearConsole: boolean;
  clearDebugger: boolean;
  consoleLevel: ReadonlyArray<"log" | "error" | "info" | "warn">;
}
```

## test

```shell
$ npm run test
```

## build

```
$ npm run build
```
