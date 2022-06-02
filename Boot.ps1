param(
    [switch] $Restart
)

$RootPath = $PSScriptRoot
if(!$RootPath)
{
    $RootPath = Split-Path -Path $psISE.CurrentFile.FullPath
}

$Locations = @(
    $RootPath,
    "$RootPath\api\data",
    "$RootPath\api\raw_file"
)

if($Restart)
{
    & "$RootPath\Close.ps1";
}

#$Locations | ForEach-Object {Set-Location $_; npm install}

## APIs
Start-Process -FilePath "powershell" -ArgumentList  "node $RootPath\api\data\index.js"

# Site
Start-Process -FilePath "powershell" -ArgumentList  "node $RootPath\index.js"
Set-Location $RootPath

$WebPort = "8010";

[system.Diagnostics.Process]::Start("chrome","http://localhost:$WebPort")