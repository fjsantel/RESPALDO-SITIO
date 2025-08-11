#!/bin/bash

# Directory for photography
PHOTO_DIR="assets/photography"

# Create photography directory if it doesn't exist
mkdir -p "$PHOTO_DIR"

# Array of photo names
photos=("A" "B" "C" "D" "E" "F" "G" "H" "I" "J" "K" "L" "M" "N" "Ñ" "O" "P" "Q" "R" "S" "T" "U" "W" "X" "Y" "Z" "cuadros")

# Colors for variety
colors=("#2c3e50" "#34495e" "#7f8c8d" "#95a5a6" "#bdc3c7" "#ecf0f1" "#f39c12" "#e67e22" "#d35400" "#e74c3c" "#c0392b" "#9b59b6" "#8e44ad" "#3498db" "#2980b9" "#1abc9c" "#16a085" "#27ae60" "#2ecc71")

# Function to create SVG placeholder
create_placeholder() {
    local name="$1"
    local filename="$2" 
    local color="${colors[$((RANDOM % ${#colors[@]}))]}"
    
    cat > "$PHOTO_DIR/$filename" << EOF
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="$color"/>
  <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" 
        font-family="Montserrat, Arial, sans-serif" font-size="120" font-weight="bold" fill="white">
    $name
  </text>
  <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" 
        font-family="Montserrat, Arial, sans-serif" font-size="36" font-weight="300" fill="rgba(255,255,255,0.8)">
    Francisco Santelices Ariztía
  </text>
</svg>
EOF
}

# Create placeholder for each photo
for i in "${!photos[@]}"; do
    name="${photos[i]}"
    if [ "$name" = "cuadros" ]; then
        filename="cuadros.png"
    elif [ "$name" = "H" ] || [ "$name" = "I" ] || [ "$name" = "O" ]; then
        filename="${name}.JPG"
    else
        filename="${name}.jpg"
    fi
    
    echo "Creating placeholder for $name -> $filename"
    create_placeholder "$name" "$filename"
done

echo "✅ Created ${#photos[@]} placeholder images in $PHOTO_DIR"