/**
 * Base
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Object
 */

const fontLoader = new THREE.FontLoader();

const renderObjects = ({ geo, mat, count }) => {
  for (let i = 0; i < count; i++) {
    const item = new THREE.Mesh(geo, mat);

    item.position.x = (Math.random() - 0.5) * 13;
    item.position.y = (Math.random() - 0.5) * 13;
    item.position.z = (Math.random() - 0.5) * 13;

    item.rotation.x = Math.random() * Math.PI;
    item.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();

    item.scale.set(scale, scale, scale);

    scene.add(item);
  }
};

const font = fontLoader.load(
  "./helvetiker_regular.typeface.json",
  (font) => {
    const material = new THREE.MeshNormalMaterial();

    const textGeometry = new THREE.TextBufferGeometry("Hello Twitter!", {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4
    });
    textGeometry.center();

    const text = new THREE.Mesh(textGeometry, material);
    text.position.y = 0.5;
    scene.add(text);

    const textTest = new THREE.TextBufferGeometry("Testing Three.JS", {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4
    });
    textTest.center();

    const TestingThreeJSText = new THREE.Mesh(textTest, material);
    TestingThreeJSText.position.y = -0.5;
    scene.add(TestingThreeJSText);

    const donutGeo = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
    const sphereGeo = new THREE.SphereGeometry(0.4, 8, 8);
    const coneGeo = new THREE.ConeGeometry(0.3, 1, 2);

    renderObjects({ geo: donutGeo, mat: material, count: 100 });
    renderObjects({ geo: sphereGeo, mat: material, count: 80 });
    renderObjects({ geo: coneGeo, mat: material, count: 40 });
  }
);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
