#!/usr/bin/env bash

# SPDX-FileCopyrightText: LXCat team
#
# SPDX-License-Identifier: AGPL-3.0-or-later

# Check that the native converter is available in an app image. See
# `check-converter.mjs` for why the script runs from the server chunks.
#
# Usage: check-image.sh IMAGE

set -euo pipefail

image="${1:?Usage: check-image.sh IMAGE}"
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
chunks=/home/bun/app/app/.next/server/chunks/ssr

docker run --rm --entrypoint bun \
  -v "$root/.github/scripts/check-converter.mjs:$chunks/check-converter.mjs:ro" \
  -v "$root/packages/converter/tests/valid/simple-argon:/fixture:ro" \
  -w "$chunks" \
  "$image" check-converter.mjs
