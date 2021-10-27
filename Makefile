all:
	@echo "Task not defined"

export PATH := ./node_modules/.bin:$(PATH)

acceptance:
	@nyc cucumber-js --parallel 3 --retry 3 ./features/*.feature --require-module ts-node/register --require './src/actions/*.ts' --require './src/support/*.ts' --require './src/stepdefinitions/*.ts' --format 'json:./reports/json/cucumber_report.json'

canaries:
	@webpack 

report:
	@ts-node ./utils/reporter.ts

test-coverage:
	@npm run test
	@nyc report --reporter=html


.PHONY: canaries
