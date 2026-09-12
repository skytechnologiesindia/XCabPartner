Add-Type -AssemblyName System.Drawing

$p = "e:\xcab\XCabPartner\src\assets\icons"

# 1. Flag Icon (flag_icon.png) 128x128
$bmpFlag = New-Object System.Drawing.Bitmap(128, 128)
$g = [System.Drawing.Graphics]::FromImage($bmpFlag)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

$charcoal = [System.Drawing.Color]::FromArgb(255, 17, 19, 21)
$pen = New-Object System.Drawing.Pen($charcoal, 7)
$pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

# Flag pole
$g.DrawLine($pen, 32, 22, 32, 106)

# Flag cloth (waving flag outline)
$flagPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$flagPath.AddLine(32, 26, 84, 26)
$flagPath.AddBezier(84, 26, 94, 42, 82, 50, 90, 64)
$flagPath.AddLine(90, 64, 32, 64)
$g.DrawPath($pen, $flagPath)

$g.Dispose()
$bmpFlag.Save((Join-Path $p "flag_icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Green check circle (check_circle.png) 128x128
$bmpCheck = New-Object System.Drawing.Bitmap(128, 128)
$gCheck = [System.Drawing.Graphics]::FromImage($bmpCheck)
$gCheck.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gCheck.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gCheck.Clear([System.Drawing.Color]::Transparent)

$green = [System.Drawing.Color]::FromArgb(255, 24, 166, 106)
$greenBrush = New-Object System.Drawing.SolidBrush($green)
$gCheck.FillEllipse($greenBrush, 14, 14, 100, 100)

$whitePen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 10)
$whitePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$whitePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$whitePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

$checkPoints = @(
    (New-Object System.Drawing.PointF(38, 64)),
    (New-Object System.Drawing.PointF(54, 82)),
    (New-Object System.Drawing.PointF(90, 46))
)
$gCheck.DrawLines($whitePen, $checkPoints)

$gCheck.Dispose()
$bmpCheck.Save((Join-Path $p "check_circle.png"), [System.Drawing.Imaging.ImageFormat]::Png)

Write-Output "Generated flag_icon.png and check_circle.png successfully"
