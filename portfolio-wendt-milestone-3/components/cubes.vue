<template>
  <div class="w-full h-full">
    <canvas :id="id_canvas" class="w-full h-full block"></canvas>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import SplineLoader from "@splinetool/loader";
import { TextureLoader, MeshMatcapMaterial } from "three";

export default {
  name: "cubes",
  props: {
    id_canvas: {
      type: String,
      default: "SplineTest",
    },
    objectName: {
      type: String,
      default: "Cubes",
    },
  },
  mounted() {
    let controls;

    const camera = new THREE.PerspectiveCamera(45, 1, 70, 50000);
    camera.position.set(1000, 1000, 1700);
    camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

    const scene = new THREE.Scene();

    const loader = new SplineLoader();
    loader.load(
      "https://prod.spline.design/Xmyt4GOK9UCPkqF4/scene.splinecode",
      (splineScene) => {
        scene.add(splineScene);

        const objectToAnimate = splineScene.getObjectByName(this.objectName);

        if (objectToAnimate) {
          const matcapTexture = new TextureLoader().load(
            "/matcaps/Diamond_Matcap.jpeg"
          ); // Pfad anpassen

          objectToAnimate.traverse((child) => {
            if (child.isMesh) {
              child.material = new MeshMatcapMaterial({
                matcap: matcapTexture,
                color: new THREE.Color(0xff8811),
              });
            }
          });
          this.objectToAnimate = objectToAnimate; // Speichere das Objekt in der Vue-Instanz
        }
      }
    );

    const canvas = document.getElementById(this.id_canvas);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    const resize = () => this.onWindowResize(canvas, camera, renderer);
    resize();
    window.addEventListener("resize", resize);

    renderer.setAnimationLoop((time) =>
      this.animate(time, renderer, scene, camera, controls, () => ({
        mouseX,
        mouseY,
      }))
    );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearAlpha(0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMappingExposure = 0.7; // Passe ggf. an (z.B. 0.8 bis 1.2)

    // orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.125;
    controls.enableZoom = false;

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (event) => {
      // Werte zwischen -1 und 1
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    });

    const ambient = new THREE.AmbientLight(0xffffff, 1.2); // Stärke ggf. anpassen
    scene.add(ambient);
  },

  methods: {
    animate(time, renderer, scene, camera, controls, getMouse) {
      controls.update();

      if (this.objectToAnimate && getMouse) {
        const { mouseX, mouseY } = getMouse();

        // Grundrotation durch Maus (sehr dezent)
        const baseRotationY = (mouseX * Math.PI) / 30;
        const baseRotationX = (mouseY * Math.PI) / 30;

        // Dauerrotation addieren
        this.objectToAnimate.rotation.y = baseRotationY + time * 0.0002;
        this.objectToAnimate.rotation.x = baseRotationX + time * 0.0001;
      }

      renderer.render(scene, camera);
    },
    onWindowResize(canvas, camera, renderer) {
      const parent = canvas.parentElement;
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;

      // Kamera-Aspect anpassen
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Renderer-Größe anpassen
      renderer.setSize(width, height, false);
    },
  },
};
</script>
