import os
import sys
import uvicorn

BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)

# Ensure both backend and project root are in python path
for d in [BACKEND_DIR, PROJECT_ROOT]:
    if d not in sys.path:
        sys.path.insert(0, d)

from app.main import app

if __name__ == "__main__":
    print("=" * 60)
    print(" Starting AI Food Wastage Platform Backend")
    print(" Local API URL: http://127.0.0.1:8000")
    print(" Interactive Swagger Docs: http://127.0.0.1:8000/docs")
    print("=" * 60)
    # Using 127.0.0.1 with port 8000
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
