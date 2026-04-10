
$files = @(
    "e:/gurukul-school-website/frontend/src/assets/images/cursor-ruler.png",
    "e:/gurukul-school-website/frontend/src/assets/images/cursor-paintbrush.png",
    "e:/gurukul-school-website/frontend/src/assets/images/cursor-ball.png",
    "e:/gurukul-school-website/frontend/src/assets/images/cursor-atom.png",
    "e:/gurukul-school-website/frontend/src/assets/images/cursor-book.png"
)

Add-Type -AssemblyName System.Drawing

foreach ($path in $files) {
    if (Test-Path $path) {
        Write-Host "Resizing $path ..."
        try {
            $img = [System.Drawing.Image]::FromFile($path)
            $newHeight = 32
            $newWidth = 32
            $resized = new-object System.Drawing.Bitmap($newWidth, $newHeight)
            $graph = [System.Drawing.Graphics]::FromImage($resized)
            $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)
            
            $img.Dispose()
            $graph.Dispose()
            
            $tempPath = $path + ".temp.png"
            $resized.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
            $resized.Dispose()
            
            Move-Item -Path $tempPath -Destination $path -Force
            Write-Host "Done."
        } catch {
            Write-Host "Error processing $path : $_"
        }
    } else {
        Write-Host "File not found: $path"
    }
}
