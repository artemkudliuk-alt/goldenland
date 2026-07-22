import os
import glob
import subprocess
import shutil

artifacts_dir = r"C:\Users\Jaku\.gemini\antigravity\brain\2269f43d-85c3-438e-99f3-2db2bf0b8ec0"
public_cases_dir = r"f:\Golden Land\public\images\cases"
public_videos_dir = r"f:\Golden Land\public\videos"

os.makedirs(public_cases_dir, exist_ok=True)
os.makedirs(public_videos_dir, exist_ok=True)

# Helper to find latest file matching pattern in artifacts
def find_latest(pattern):
    matches = glob.glob(os.path.join(artifacts_dir, pattern))
    if not matches:
        return None
    matches.sort(key=os.path.getmtime, reverse=True)
    return matches[0]

# Copy generated images to public/images/cases/
case_images = {
    "case1_hero.png": find_latest("case1_hero_*.png"),
    "case1_photo1.png": find_latest("case1_photo1_*.png"),
    "case1_photo2.png": find_latest("case1_photo2_*.png"),
    "case1_photo3.png": find_latest("case1_photo3_*.png"),
    "case2_hero.png": find_latest("case2_hero_*.png"),
    "case2_photo1.png": find_latest("case2_photo1_*.png"),
    "case2_photo2.png": find_latest("case2_photo2_*.png"),
    "case2_photo3.png": find_latest("case2_photo3_*.png"),
    "case3_hero.png": find_latest("case3_hero_*.png"),
    "case3_photo1.png": find_latest("case3_photo1_*.png"),
    "case3_photo2.png": find_latest("case3_photo2_*.png"),
    "case3_photo3.png": find_latest("case3_photo3_*.png"),
    "case4_hero.png": find_latest("case4_hero_*.png"),
}

for target_name, source_path in case_images.items():
    if source_path and os.path.exists(source_path):
        dest = os.path.join(public_cases_dir, target_name)
        shutil.copy(source_path, dest)
        print(f"Copied {source_path} -> {dest}")

# Video generation definitions
videos_to_generate = [
    {
        "input": os.path.join(public_cases_dir, "case1_hero.png"),
        "output": os.path.join(public_videos_dir, "case_1_pechersk.mp4"),
        "pan": "zoompan=z='min(zoom+0.0012,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=150:s=1280x720:fps=30"
    },
    {
        "input": os.path.join(public_cases_dir, "case2_hero.png"),
        "output": os.path.join(public_videos_dir, "case_2_odesa_villa.mp4"),
        "pan": "zoompan=z='1.12':x='(iw-iw/zoom)*(1-on/150)':y='(ih-ih/zoom)/2':d=150:s=1280x720:fps=30"
    },
    {
        "input": os.path.join(public_cases_dir, "case3_hero.png"),
        "output": os.path.join(public_videos_dir, "case_3_lviv_hotel.mp4"),
        "pan": "zoompan=z='min(zoom+0.0012,1.15)':x='iw/2-(iw/zoom/2)':y='(ih-ih/zoom)*(on/150)':d=150:s=1280x720:fps=30"
    },
    {
        "input": os.path.join(public_cases_dir, "case4_hero.png"),
        "output": os.path.join(public_videos_dir, "case_4_kozyn.mp4"),
        "pan": "zoompan=z='1.14':x='(iw-iw/zoom)*(on/150)':y='(ih-ih/zoom)/2':d=150:s=1280x720:fps=30"
    },
    {
        "input": r"f:\Golden Land\public\images\generated\prop-odesa-black-sea-hotel-1.webp",
        "output": os.path.join(public_videos_dir, "case_5_odesa_resort.mp4"),
        "pan": "zoompan=z='min(zoom+0.0015,1.18)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=150:s=1280x720:fps=30"
    }
]

for item in videos_to_generate:
    if os.path.exists(item["input"]):
        cmd = [
            "ffmpeg", "-loop", "1", "-i", item["input"],
            "-vf", f"scale=1920x1080,{item['pan']}",
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-t", "5", "-y", item["output"]
        ]
        print(f"Generating video: {item['output']}")
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0:
            print(f"SUCCESS: {item['output']}")
        else:
            print(f"ERROR: {res.stderr}")
    else:
        print(f"Input image missing: {item['input']}")
