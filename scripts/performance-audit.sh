#!/usr/bin/env bash
set -euo pipefail
export CHROME_PATH=/root/.cache/puppeteer/chrome/linux-154.0.8037.57/chrome-linux64/chrome
export LD_LIBRARY_PATH=/tmp/novatech-browser-libs/root/usr/lib/x86_64-linux-gnu
mkdir -p qa-artifacts/performance
task_stage="${1:-before}"
task_port="${2:-4180}"
for task_page in home accounting; do
  task_route=/
  if [ "$task_page" = accounting ]; then task_route=/accounting-software; fi
  for task_device in mobile desktop; do
    task_extra=()
    if [ "$task_device" = desktop ]; then task_extra+=(--preset=desktop); fi
    node /tmp/novatech-lighthouse/node_modules/lighthouse/cli/index.js \
      "http://127.0.0.1:${task_port}${task_route}" \
      --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
      --only-categories=performance,accessibility,best-practices,seo \
      --output=json --output-path="qa-artifacts/performance/${task_stage}-${task_page}-${task_device}.json" \
      --quiet "${task_extra[@]}"
    echo "${task_stage} ${task_page} ${task_device} completed"
  done
done
