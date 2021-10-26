all:
	@echo "Task not defined"

acceptance:
	@nyc cucumber-js --parallel 3 ./features/*.feature --require-module ts-node/register --require './src/*/*.ts' --format 'json:./reports/json/cucumber_report.json'

canaries:
	@echo WIP

report:
	@ts-node ./utils/reporter.ts

test-coverage:
	@npm run test
	nyc report --reporter=html


.PHONY: canaries
