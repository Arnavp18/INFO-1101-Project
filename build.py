"""Build the static GitHub Pages site from data.json.

Run:
    python build.py

Optional local preview:
    python -m http.server 8000
Then visit http://localhost:8000
"""
from pathlib import Path
import json

ROOT = Path(__file__).parent
data = json.loads((ROOT / "data.json").read_text(encoding="utf-8"))

required = {"name", "company", "tracking", "categories", "source"}
for i, app in enumerate(data["apps"], start=1):
    missing = required - app.keys()
    if missing:
        raise ValueError(f"App #{i} is missing: {sorted(missing)}")

print(f"Validated {len(data['apps'])} app records.")
print("This project is already static and ready for GitHub Pages.")
print("Preview with: python -m http.server 8000")
