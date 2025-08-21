import bpy
from math import radians

# Reset scene (non-destructive if run in new file)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Units to METERS
bpy.context.scene.unit_settings.system = 'METRIC'
bpy.context.scene.unit_settings.scale_length = 1.0

# Collection
coll = bpy.data.collections.new("Crossfire_1v1")
bpy.context.scene.collection.children.link(coll)

def link_last_to_collection():
	obj = bpy.context.active_object
	for c in obj.users_collection:
		c.objects.unlink(obj)
	coll.objects.link(obj)

	# Floor

# Floor
bpy.ops.mesh.primitive_cube_add(size=1, location=(20.0, 20.0, -0.1))
ob = bpy.context.active_object
ob.name = "Floor"
ob.scale = (20.0, 20.0, 0.1)
ob.rotation_euler = (0, 0, 0)

	link_last_to_collection()

	# Perimeter walls (as thin long boxes around edge)

# Wall_N
bpy.ops.mesh.primitive_cube_add(size=1, location=(20.0, 40.0, 3.0))
ob = bpy.context.active_object
ob.name = "Wall_N"
ob.scale = (20.0, 0.1, 3.0)
ob.rotation_euler = (0, 0, 0)

	link_last_to_collection()

# Wall_S
bpy.ops.mesh.primitive_cube_add(size=1, location=(20.0, 0, 3.0))
ob = bpy.context.active_object
ob.name = "Wall_S"
ob.scale = (20.0, 0.1, 3.0)
ob.rotation_euler = (0, 0, 0)

	link_last_to_collection()

# Wall_W
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 20.0, 3.0))
ob = bpy.context.active_object
ob.name = "Wall_W"
ob.scale = (0.1, 20.0, 3.0)
ob.rotation_euler = (0, 0, 0)

	link_last_to_collection()

# Wall_E
bpy.ops.mesh.primitive_cube_add(size=1, location=(40.0, 20.0, 3.0))
ob = bpy.context.active_object
ob.name = "Wall_E"
ob.scale = (0.1, 20.0, 3.0)
ob.rotation_euler = (0, 0, 0)

	link_last_to_collection()

	# High platforms (north/south)

# High_North
bpy.ops.mesh.primitive_cube_add(size=1, location=(20.0, 33.0, 5.0))
ob = bpy.context.active_object
ob.name = "High_North"
ob.scale = (4.0, 3.0, 0.2)
ob.rotation_euler = (0, 0, 0)

	link_last_to_collection()

# High_South
bpy.ops.mesh.primitive_cube_add(size=1, location=(20.0, 7.0, 5.0))
ob = bpy.context.active_object
ob.name = "High_South"
ob.scale = (4.0, 3.0, 0.2)
ob.rotation_euler = (0, 0, 0)

	link_last_to_collection()

	# Courtyard cover blocks (H pattern)

# Cover_Left
bpy.ops.mesh.primitive_cube_add(size=1, location=(15.0, 20.0, 0.6))
ob = bpy.context.active_object
ob.name = "Cover_Left"
ob.scale = (1.0, 0.75, 0.6)
ob.rotation_euler = (0, 0, 0)

	link_last_to_collection()

# Cover_Mid
bpy.ops.mesh.primitive_cube_add(size=1, location=(20.0, 20.0, 0.6))
ob = bpy.context.active_object
ob.name = "Cover_Mid"
ob.scale = (1.0, 0.75, 0.6)
ob.rotation_euler = (0, 0, 0)

	link_last_to_collection()

# Cover_Right
bpy.ops.mesh.primitive_cube_add(size=1, location=(25.0, 20.0, 0.6))
ob = bpy.context.active_object
ob.name = "Cover_Right"
ob.scale = (1.0, 0.75, 0.6)
ob.rotation_euler = (0, 0, 0)

	link_last_to_collection()

	# Spawn rooms (simple boxes)

# Spawn_A
bpy.ops.mesh.primitive_cube_add(size=1, location=(4, 20.0, 1.5))
ob = bpy.context.active_object
ob.name = "Spawn_A"
ob.scale = (2.0, 2.0, 1.5)
ob.rotation_euler = (0, 0, 0)

	link_last_to_collection()

# Spawn_B
bpy.ops.mesh.primitive_cube_add(size=1, location=(36.0, 20.0, 1.5))
ob = bpy.context.active_object
ob.name = "Spawn_B"
ob.scale = (2.0, 2.0, 1.5)
ob.rotation_euler = (0, 0, 0)

	link_last_to_collection()

	# Ramps (wedge approximations)
	# Ramp NW: roughly at (12, 11), size 4x6, height up to PLAT_Z

# Ramp_NW (triangular wedge ramp)
import bmesh
bpy.ops.mesh.primitive_cube_add(size=1, location=(12, 11, 2.5))
wedge = bpy.context.active_object
wedge.name = "Ramp_NW"
wedge.scale = (2.0, 3.0, 2.5)
wedge.rotation_euler[2] = 0.0
# Shear the cube into a wedge by moving top-front verts down
me = wedge.data
bm = bmesh.new()
bm.from_mesh(me)
# Identify top face verts along +Y after rotation; approximate by Z > 0 and Y local > 0
# Simpler: move one top long edge down to create a slope
top_z = max(v.co.z for v in bm.verts)
min_y = min(v.co.y for v in bm.verts)
max_y = max(v.co.y for v in bm.verts)
for v in bm.verts:
	if abs(v.co.z - top_z) < 1e-6 and v.co.y > 0:
		v.co.z -= 5.0
bm.to_mesh(me)
bm.free()

	link_last_to_collection()
	# Ramp SE: at (28, 29), flipped

# Ramp_SE (triangular wedge ramp)
import bmesh
bpy.ops.mesh.primitive_cube_add(size=1, location=(28, 29, 2.5))
wedge = bpy.context.active_object
wedge.name = "Ramp_SE"
wedge.scale = (2.0, 3.0, 2.5)
wedge.rotation_euler[2] = 3.141592653589793
# Shear the cube into a wedge by moving top-front verts down
me = wedge.data
bm = bmesh.new()
bm.from_mesh(me)
# Identify top face verts along +Y after rotation; approximate by Z > 0 and Y local > 0
# Simpler: move one top long edge down to create a slope
top_z = max(v.co.z for v in bm.verts)
min_y = min(v.co.y for v in bm.verts)
max_y = max(v.co.y for v in bm.verts)
for v in bm.verts:
	if abs(v.co.z - top_z) < 1e-6 and v.co.y > 0:
		v.co.z -= 5.0
bm.to_mesh(me)
bm.free()

	link_last_to_collection()

	# Jump pads (thin cylinders)

# Jump_N
bpy.ops.mesh.primitive_cylinder_add(radius=0.5, depth=0.2, location=(20.0, {24.0}, 0.1))
bpy.context.active_object.name = "Jump_N"

	link_last_to_collection()

# Jump_S
bpy.ops.mesh.primitive_cylinder_add(radius=0.5, depth=0.2, location=(20.0, {15.0}, 0.1))
bpy.context.active_object.name = "Jump_S"

	link_last_to_collection()

	# Markers for weapons/equipment (tall thin cylinders)

# Pad_Sniper
bpy.ops.mesh.primitive_cylinder_add(radius=0.25, depth=0.6, location=(20.0, 35.25, 5.3))
bpy.context.active_object.name = "Pad_Sniper"

	link_last_to_collection()

# Pad_BR
bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=0.4, location=(4, 20.0, 0.2))
bpy.context.active_object.name = "Pad_BR"

	link_last_to_collection()

# Pad_Commando
bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=0.4, location=(36.0, 20.0, 0.2))
bpy.context.active_object.name = "Pad_Commando"

	link_last_to_collection()

# Pad_Grapple
bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=0.4, location=(14.0, 32.0, 0.2))
bpy.context.active_object.name = "Pad_Grapple"

	link_last_to_collection()

# Pad_Thruster
bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=0.4, location=(26.0, 8, 0.2))
bpy.context.active_object.name = "Pad_Thruster"

	link_last_to_collection()

	# Camera and light for quick look
	if "CrossfireCam" not in bpy.data.objects:
		bpy.ops.object.camera_add(location=(cx-25, cy-25, 18), rotation=(radians(65), 0, radians(45)))
		bpy.context.active_object.name = "CrossfireCam"
		coll.objects.link(bpy.context.active_object)
		bpy.context.scene.camera = bpy.data.objects["CrossfireCam"]
	if "KeyLight" not in bpy.data.objects:
		bpy.ops.object.light_add(type='AREA', location=(cx, cy, 15))
		l = bpy.context.active_object
		l.name = "KeyLight"
		l.data.energy = 3000
		coll.objects.link(l)
