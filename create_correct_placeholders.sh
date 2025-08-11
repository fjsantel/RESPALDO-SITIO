#!/bin/bash

# Directory for photography
PHOTO_DIR="assets/photography"

# Create photography directory if it doesn't exist
mkdir -p "$PHOTO_DIR"

# Array of exact photo names as specified in the HTML
photos=(
    "A.jpg" "B.jpg" "C.jpg" "cuadros.png" "D.jpg" "E.jpg" "F.jpg" "G.jpg" 
    "H.JPG" "I.JPG" "J.jpg" "K.jpg" "L.jpg" "M.jpg" "N.jpg" "Ñ.jpg" 
    "O.JPG" "P.jpg" "Q.jpg" "R.jpg" "S.jpg" "T.jpg" "U.jpg" "W.jpg" 
    "X.jpg" "Y.jpg" "Z.jpg"
)

# Colors for variety
colors=("#2c3e50" "#34495e" "#7f8c8d" "#95a5a6" "#bdc3c7" "#f39c12" "#e67e22" "#d35400" "#e74c3c" "#c0392b" "#9b59b6" "#8e44ad" "#3498db" "#2980b9" "#1abc9c" "#16a085" "#27ae60" "#2ecc71" "#e8c547" "#af7ac5" "#85c1e9" "#7dcea0" "#f8c471" "#ec7063" "#bb8fce" "#85c1e9")

# Function to create SVG placeholder
create_placeholder() {
    local filename="$1"
    local display_name="${filename%.*}"  # Remove extension for display
    local color="${colors[$((RANDOM % ${#colors[@]}))]}"
    
    cat > "$PHOTO_DIR/$filename" << EOF
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="$color"/>
  <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" 
        font-family="Montserrat, Arial, sans-serif" font-size="140" font-weight="900" fill="white" opacity="0.9">
    $display_name
  </text>
  <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" 
        font-family="Montserrat, Arial, sans-serif" font-size="28" font-weight="300" fill="rgba(255,255,255,0.7)" letter-spacing="2px">
    FRANCISCO SANTELICES ARIZTÍA
  </text>
</svg>
EOF
}

# Create placeholder for each photo
for filename in "${photos[@]}"; do
    echo "Creating placeholder: $filename"
    create_placeholder "$filename"
done

echo "✅ Created ${#photos[@]} placeholder images in $PHOTO_DIR"
ls -la "$PHOTO_DIR/"