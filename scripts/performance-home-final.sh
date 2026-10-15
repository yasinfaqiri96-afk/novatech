#!/usr/bin/env bash
set -euo pipefail
export CHROME_PATH=/root/.cache/puppeteer/chrome/linux-154.0.8037.57/chrome-linux64/chrome
export LD_LIBRARY_PATH=/tmp/novatech-browser-libs/root/usr/lib/x86_64-linux-gnu
for task_pair in before:4180 after:4198; do
 task_label=${task_pair%:*}; task_port=${task_pair#*:}
 node /tmp/novatech-lighthouse/node_modules/lighthouse/cli/index.js "http://127.0.0.1:${task_port}/" --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path="qa-artifacts/performance/final-${task_label}-home-mobile.json" --quiet
 echo "Final home mobile ${task_label} completed"
done
