$Process = Get-Process -Name 'node'

$Process | % {Stop-Process -Name $_.Name}