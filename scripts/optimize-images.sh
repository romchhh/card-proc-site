#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGES="$ROOT/public/images"

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp is required. Install with: brew install webp"
  exit 1
fi

convert_png() {
  local file="$1"
  local base="${file%.png}"
  cwebp -q 82 -m 6 "$file" -o "${base}.webp"
  echo "✓ ${base}.webp"
}

convert_jpg() {
  local file="$1"
  local base="${file%.jpg}"
  cwebp -q 82 -m 6 "$file" -o "${base}.webp"
  echo "✓ ${base}.webp"
}

for file in "$IMAGES"/hero-stripe.png "$IMAGES"/service-*.png "$IMAGES"/stripe-card-dark.png; do
  [ -f "$file" ] && convert_png "$file"
done

for file in "$IMAGES"/accounts/account-*.jpg; do
  [ -f "$file" ] && convert_jpg "$file"
done

[ -f "$IMAGES/contact-section.jpg" ] && convert_jpg "$IMAGES/contact-section.jpg"

echo "Done. Site uses .webp sources in code."
