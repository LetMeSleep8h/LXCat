// SPDX-FileCopyrightText: LXCat team
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Checks that the native converter is available in the app image, and that it
// works. It has to run from the directory of the server chunks of the app,
// because Bun resolves a bare import from the directory of the importing file,
// which is how the app itself imports the converter, see
// `app/src/shared/native-converter.ts`.
//
// The fixture directory holds `in.json` and `out.txt` of a converter test, and
// is mounted into the container by the caller.

import assert from "node:assert";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const fixture = process.env.FIXTURE_DIR ?? "/fixture";

const { convertDocument, convertMixture } = await import("@lxcat/converter");

assert.strictEqual(typeof convertDocument, "function", "convertDocument");
assert.strictEqual(typeof convertMixture, "function", "convertMixture");

// The same comparison as `packages/converter/tests/utils.ts`.
const document = JSON.parse(readFileSync(join(fixture, "in.json"), "utf8"));
const truth = readFileSync(join(fixture, "out.txt"), "utf8");
assert.strictEqual(convertDocument(document), truth.slice(0, -1));

console.log("The native converter is available and converts the fixture.");
