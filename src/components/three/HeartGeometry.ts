import * as THREE from "three";

export function createHeartGeometry(depth = 0.3, bevelThickness = 0.15, bevelSize = 0.12): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const x = 0;
  const y = 0;

  // Romantic symmetrical heart curve
  shape.moveTo(x, y + 0.35);
  shape.bezierCurveTo(x, y + 0.7, x - 0.6, y + 0.9, x - 0.9, y + 0.6);
  shape.bezierCurveTo(x - 1.2, y + 0.3, x - 1.2, y - 0.2, x - 0.7, y - 0.6);
  shape.bezierCurveTo(x - 0.4, y - 0.9, x, y - 1.2, x, y - 1.4);
  shape.bezierCurveTo(x, y - 1.2, x + 0.4, y - 0.9, x + 0.7, y - 0.6);
  shape.bezierCurveTo(x + 1.2, y - 0.2, x + 1.2, y + 0.3, x + 0.9, y + 0.6);
  shape.bezierCurveTo(x + 0.6, y + 0.9, x, y + 0.7, x, y + 0.35);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth,
    bevelEnabled: true,
    bevelSegments: 12,
    steps: 2,
    bevelSize,
    bevelThickness,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  return geometry;
}
