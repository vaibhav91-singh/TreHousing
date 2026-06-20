import os
import glob

# Path to the src directory
src_dir = r"c:\Users\vaibh\trehousingpublications-main\trehousingpublications-main\frontend-react\src"

# Pattern to search for
old_url = "https://cms.trehousingpublication.com"

# Recursively find all jsx files
for filepath in glob.glob(os.path.join(src_dir, '**', '*.jsx'), recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_url in content:
        # Special handling for the path.startsWith line if needed, but it should be fine.
        new_content = content.replace(old_url, "")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
