import laspy
import json
import numpy as np
from laspy.compression import LazBackend
from pyproj import Transformer
import argparse

# Set up argument parsing
parser = argparse.ArgumentParser(description="Process a LAS/LAZ file.")
parser.add_argument("input_las", type=str, help="Path to the LAS/LAZ file")


# Parse the arguments
args = parser.parse_args()

# Load the LAS/LAZ file
input_las = args.input_las

if LazBackend.Lazrs.is_available():
    laz_backend = LazBackend.Lazrs
elif LazBackend.Laszip.is_available():
    laz_backend = LazBackend.Laszip
else:
    raise RuntimeError("No LAZ backend is available. Install lazrs or laszip.")

las = laspy.read(input_las, laz_backend=laz_backend)

original_crs = "EPSG:25832"
target_crs = "EPSG:4326"  # WGS84

# Set up transformer for coordinate system conversion to WGS84
transformer = Transformer.from_crs(original_crs, target_crs, always_xy=True)

# Extract x, y, z coordinates and transform to WGS84
x, y, z = transformer.transform(las.x, las.y, las.z)

# Check for RGB color information
dimension_names = las.point_format.dimension_names
has_rgb = 'red' in dimension_names and 'green' in dimension_names and 'blue' in dimension_names
# Extract color values and normalize them to 8-bit range
if has_rgb:
    r = (las.red / 256).astype(np.uint8)
    g = (las.green / 256).astype(np.uint8)
    b = (las.blue / 256).astype(np.uint8)
else:
    # Default grey color if RGB is missing
    r = np.full_like(x, 128, dtype=np.uint8)
    g = np.full_like(x, 128, dtype=np.uint8)
    b = np.full_like(x, 128, dtype=np.uint8)

# Prepare the data for JSON export
positions: list = []
normals: list = []
colors: list = []

for i in range(len(x)):
    position = [float(x[i]), float(y[i]), float(z[i])]
    normal = [0, 0, -1]  # Normal placeholder; replace with actual data if available
    color = [int(r[i]), int(g[i]), int(b[i])]  # Use the scaled 8-bit values
    
    positions.append(position)
    normals.append(normal)
    colors.append(color)

points = {
    "positions": positions,
    "normals": normals,
    "colors": colors
}

# Export to JSON
output_json = "public/output_pointcloud.json"
with open(output_json, "w") as f:
    json.dump(points, f, indent=2)

print(f"Exported LAS/LAZ data to JSON format: {output_json}")