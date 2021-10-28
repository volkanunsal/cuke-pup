all:
	@echo "Task not defined"

export BIN := ./node_modules/.bin

acceptance:
	@nyc cucumber-js --parallel 3 --retry 3 ./features/*.feature --require-module ts-node/register --require './src/actions/*.ts' --require './src/support/*.ts' --require './src/stepdefinitions/*.ts' --format 'json:./reports/json/cucumber_report.json'

canaries:
	@$$BIN/webpack -c ./config/webpack.config.js

report:
	@$$BIN/ts-node ./utils/reporter.ts

test-coverage:
	@npm run test
	@$$BIN/nyc report --reporter=html


.PHONY: canaries
