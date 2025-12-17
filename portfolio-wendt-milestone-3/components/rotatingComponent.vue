<template>
  <div id="splineContent" class="flex w-fit h-fit">
    <canvas id="canvas3d" width="60" height="60"></canvas>
  </div>
</template>

<script>
import * as THREE from "three";
import SplineLoader from "@splinetool/loader";

export default {
  name: "rotatingComponent",
  mounted() {
    // camera
    const camera = new THREE.PerspectiveCamera(20, 1, 1, 10000);
    camera.position.set(10000, 2700, -2650.75);
    camera.quaternion.setFromEuler(new THREE.Euler(-0.52, -0.73, -0.36));

    const scene = new THREE.Scene();

    const loader = new SplineLoader();
    loader.load(
      "https://prod.spline.design/QbLJiYEJvuoJWZyl/scene.splinecode",
      (splineScene) => {
        scene.add(splineScene);

        const objectToAnimate = splineScene.getObjectByName("rainbow");
        console.log(objectToAnimate);
        if (objectToAnimate) {
          this.objectToAnimate = objectToAnimate; // Speichere das Objekt in der Vue-Instanz
          camera.lookAt(objectToAnimate.getWorldPosition(new THREE.Vector3()));
        }
      }
    );

    const canvas = document.getElementById("canvas3d");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setAnimationLoop((time) =>
      this.animate(time, renderer, scene, camera)
    );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearAlpha(0);

    window.addEventListener("resize", () =>
      this.onWindowResize(canvas, camera, renderer)
    );

    // Scroll-Event hinzufügen
    window.addEventListener("scroll", this.onScroll);
  },

  methods: {
    animate(time, renderer, scene, camera) {
      if (this.objectToAnimate) {
        // Standardrotation (z. B. kontinuierliche Drehung)
        //this.objectToAnimate.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    },

    onScroll() {
      if (this.objectToAnimate) {
        // Rotation basierend auf der Scroll-Position
        const scrollY = window.scrollY; // Aktuelle Scroll-Position
        this.objectToAnimate.rotation.y = scrollY * 0.01; // Passe den Faktor an
      }
    },

    onWindowResize(canvas, camera, renderer) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    },
  },

  beforeUnmount() {
    // Event-Listener entfernen, um Speicherlecks zu vermeiden
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onWindowResize);
  },
};
</script>

<style scoped></style>
