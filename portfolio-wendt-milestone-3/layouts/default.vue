<template>
  <!-- custom cursor -->
  <div
    id="custom-cursor"
    class="mask-radial pointer-events-none fixed top-0 left-0 z-50 w-[12rem] h-[12rem] rounded-full backdrop-blur-sm"
    style="transform: translate(-9999px, -9999px)"
  ></div>
  <!-- Cubes Div -->
  <div
    class="absolute top-0 w-full h-[80rem] z-10 pointer-events-none blur-sm overflow-x-hidden"
  >
    <div class="absolute w-[100rem] h-full -right-60">
      <cubes id_canvas="cubesCanvas" objectName="Cubes" />
    </div>
  </div>
  <!-- Main Layout -->
  <div class="bg-bg text-white min-h-[80rem] z-0 scroll-auto">
    <!-- Sticky Header -->
    <header class="sticky top-0 py-6 px-48 z-20">
      <div
        class="absolute inset-0 w-full h-full -z-10 pointer-events-none bg-black/80 backdrop-blur-3xl mask-to-t"
      ></div>
      <div class="flex flex-row justify-between items-center">
        <nav class="flex flex-row gap-8 z-10">
          <p class="font-bold text-lg">Felix Wendt</p>
          <NuxtLink
            to="/"
            class="hover:text-focusorange"
            active-class="border-b-2 border-focusorange"
            exact
          >
            <p class="text-body">Start</p>
          </NuxtLink>
          <NuxtLink
            to="/projectsPage"
            class="hover:text-focusorange"
            active-class="border-b-2 border-focusorange"
          >
            <p class="text-body">Projects</p>
          </NuxtLink>
          <NuxtLink
            to="/contacts"
            class="hover:text-focusorange"
            active-class="border-b-2 border-focusorange"
          >
            <div class="flex flex-row gap-2 items-center">
              <p class="text-body">Contact Requests</p>
              <LucideLock-keyhole class="w-4 h-4" />
            </div>
          </NuxtLink>
        </nav>
      </div>
    </header>
    <main class="px-48">
      <div class="mt-16 z-10">
        <NuxtPage />
      </div>
    </main>
    <footer class="h-[400px]"></footer>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useHead } from "#imports";

export default {
  setup() {
    onMounted(() => {
      const cursor = document.getElementById("custom-cursor");
      const size = 160; // 10rem = 160px
      window.addEventListener("mousemove", (e) => {
        if (cursor) {
          cursor.style.transform = `translate(${e.clientX - size / 2}px, ${
            e.clientY - size / 2
          }px)`;
        }
      });
    });
    useHead({
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        // oder für SVG:
        // { rel: "icon", type: "image/svg+xml", href: "/images/email.svg" }
      ],
    });
  },
};
</script>
