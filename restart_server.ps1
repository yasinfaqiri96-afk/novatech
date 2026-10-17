$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path $PSScriptRoot).Path
$nodeProcesses = @(Get-CimInstance Win32_Process -Filter "Name='node.exe'")
$serverProcesses = @($nodeProcesses | Where-Object {
    $_.CommandLine -and
    $_.CommandLine.IndexOf($projectRoot, [StringComparison]::OrdinalIgnoreCase) -ge 0 -and
    $_.CommandLine -match '(?i)(next[\\/].*\b(dev|start)\b|\.next\\dev)'
})
$parentIds = @($serverProcesses | ForEach-Object ParentProcessId | Select-Object -Unique)
$npmProcesses = @($nodeProcesses | Where-Object {
    $parentIds -contains $_.ProcessId -and $_.CommandLine -match 'npm-cli\.js.*run (dev|start)'
})

@($serverProcesses + $npmProcesses) |
    Sort-Object ProcessId -Unique |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

$devCache = Join-Path $projectRoot '.next\dev'
if (Test-Path $devCache) {
    Remove-Item -LiteralPath $devCache -Recurse -Force
}