# makefun-site speed entry

[![make.fun · site-generator-speed-01-run-20261122](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/spotlesssoul/makefun-site-generator-speed/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/spotlesssoul/makefun-site-generator-speed/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)

[Make.fun bounty](https://make.fun/bounty/site-generator-speed-01-run-20261122)

A dependency-free Node.js entry compatible with makefun-site 1.0.0. `solve.js` exports `run(input)`; `main.ts` reads `/input/cases.json` and writes `/output/answers.json`. The driver also accepts `MAKEFUN_INPUT_DIR` and `MAKEFUN_OUTPUT_DIR` for local runs.

Requires Node.js 22.18 or later. No package installation is needed.

The implementation includes the makefun-site 1.0.0 reference modules under `vendor/makefun-site/`, with local changes for a no-escape fast path, batched Markdown text escaping, and bounded slug normalization caching. The vendored code and notices are MIT-licensed; see `LICENSE`, `vendor/makefun-site/LICENSE`, and `vendor/makefun-site/NOTICE`.
