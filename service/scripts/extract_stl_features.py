import sys
import json
import os
import matplotlib.pyplot as plt
import trimesh


if len(sys.argv) < 2:
    print(json.dumps({"error": "No STL file provided"}))
    sys.exit(1)

stl_path = sys.argv[1]

if not os.path.exists(stl_path):
    print(json.dumps({"error": f"STL file does not exist: {stl_path}"}))
    sys.exit(1)


mesh = trimesh.load_mesh(stl_path, file_type="stl")

bbox = mesh.bounding_box.extents
result = {
    "volume": float(mesh.volume),
    "surface_area": float(mesh.area),
    "bbox_x": float(bbox[0]),
    "bbox_y": float(bbox[1]),
    "bbox_z": float(bbox[2]),
    "euler_number": int(getattr(mesh, "euler_number", 0)),
}


def print_form(mesh):
    points = mesh.points.reshape(-1, 3)
    fig = plt.figure(figsize=(5, 5))

    plt.scatter(points[:, 0], points[:, 1], s=1)
    plt.show()


def print_form(mesh):
    if hasattr(mesh, "points"):
        points = mesh.points.reshape(-1, 3)
    else:
        points = mesh.vertices.reshape(-1, 3)

    fig = plt.figure(figsize=(5, 5))
    plt.scatter(points[:, 0], points[:, 1], s=1)
    plt.title("Projection XY")
    plt.xlabel("X")
    plt.ylabel("Y")
    plt.show()


print(json.dumps(result))
