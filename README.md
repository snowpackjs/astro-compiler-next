# Astro Compiler

A [Go][go]-based compiler for `.astro` files.

## Setup

### Go

[Go][go] `1.16.x` is needed to work with this repo. On Macs, installing via [Homebrew][homebrew] is recommended: `brew install go`. For Windows & Linux, you can [follow Go’s installation guide][go] if you don’t have your own preferred method of package installation.

⚠️ Because [TinyGo doesn’t yet support 1.17](https://github.com/tinygo-org/tinygo/issues/2080), you’ll have to make sure you install Go `1.16` until a new release is out.

By default, Go will set `$GOPATH` to a new `./go/` directory in your home folder. For best support with VS Code and tooling, it’s recommended to place Go projects like this one in here. So for this project, that would mean cloning it to `~/go/src/github.com/snowpackjs/astro-compiler-next`. You can change this path, but it does require some understanding. Read [Understanding the GOPATH][gopath] to learn more.

If you use VS Code as your primary editor, installing the [Go extension][go-vscode] is highly recommended.

### TinyGo

[TinyGo][tinygo] is needed to compile the WASM, and is an improvement over Go’s default WASM compiler. TinyGo has [installation guides for every OS][tinygo-install].

## Building

From the root directory, run:

```
make astro-wasm
```

This will generate `./lib/compiler/astro.wasm` which can then be loaded in any web application.

From the `lib/compiler` directory, run:

```
npm run build
```

## Testing

- Run all tests: `go test -v ./internal/...` (the `...` is basically a “glob”)
- Run a specific folder of tests: `go test -v ./internal/printer`

## JS API

WIP

```js
import fs from "fs";
import { transform } from "@astrojs/compiler";

const filePath = new URL("./pages/index.astro", import.meta.url);
const src = await fs.promises.readFile(filePath);
const result = await transform(src, {
  sourcefile: filePath.href,
  sourcemap: "both",
});

console.log(result);
// {
//   code: …
//   map: …
// }
```

[homebrew]: https://brew.sh/
[go]: https://golang.org/
[go-vscode]: https://marketplace.visualstudio.com/items?itemName=golang.go
[gopath]: https://www.digitalocean.com/community/tutorials/understanding-the-gopath
[tinygo]: https://tinygo.org/
[tinygo-install]: https://tinygo.org/getting-started/install/
