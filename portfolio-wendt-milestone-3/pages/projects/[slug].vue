<template>
  <div class="body-div z-10 pt-20">
    <ContentDoc
      :path="`/projects/${route.params.slug}`"
      :head="false"
      v-slot="{ doc }"
    >
      <div v-if="doc" class="z-10">
        <div
          class="flex flex-row w-full gap-8 p-8 bg-lightblack rounded-3xl shadow-focusorange/5 shadow-2xl transition-all duration-600 ease-in-out overflow-visable focus:outline-none focus:ring-0 max-w-[110rem] max-h-[60rem] z-10 relative"
        >
          <div class="flex flex-row w-full gap-8 relative">
            <div class="flex flex-col gap-4">
              <!-- picture div -->
              <div class="w-80 h-80 rounded-2xl border-2 overflow-hidden">
                <img
                  :src="doc.image"
                  alt="Projektbild"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
            <!-- card content div -->
            <div
              class="flex flex-col items-start gap-6 mb-8 w-2/3 h-fill relative"
            >
              <h2 class="text-h3">{{ doc.header }}</h2>
              <p class="text-body">
                {{ doc.longDescription }}
              </p>
              <div
                class="flex flex-row justify-start space-x-4 overflow-visible"
              >
                <div
                  v-for="(icon, index) in doc.icons"
                  :key="index"
                  class="rounded-full h-16 w-16 overflow-visible"
                >
                  <img :src="icon" alt="Icon" class="icon-div" />
                </div>
              </div>
              <div class="flex flex-row items-start gap-3">
                <p class="text-body">Publication date:</p>
                <p class="text-body">{{ doc.date }}</p>
              </div>
              <!-- Kommentare div -->
              <div class="flex flex-col items-start gap-6">
                <p class="text-body">Comments:</p>
                <div
                  v-for="comment in comments"
                  :key="comment.id"
                  class="border-2 border-darkgrey rounded-t-3xl rounded-r-3xl py-2 px-[1.2rem] w-fit flex flex-col gap-[0.2rem]"
                >
                  <div class="flex flex-row items-end gap-2">
                    <p class="text-small">{{ comment.author }}</p>
                    <LucideMinus class="w-4 h-4 rotate-90" />
                    <p class="font-normal text-xs text-left z-10">
                      {{ new Date(comment.created_at).toLocaleDateString() }}
                    </p>
                  </div>
                  <p class="text-body">{{ comment.content }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- absolute interactivity div -->
          <div
            class="absolute -bottom-5 right-0 w-fit rounded-full flex flex-row items-end gap-4 transition-all duration-300 ease-in-out"
            @click.stop
          >
            <div
              class="flex flex-row items-center gap-2 bg-lightblack rounded-full relative shadow-special shadow-focusorange/80 z-10"
            >
              <textarea
                v-model="name"
                placeholder="Your Name (optional)"
                :class="[
                  'py-2 px-4 bg-lightblack transition-all duration-200 focus:outline-none focus:ring focus:ring-focusorange/50 resize-none',
                  isCommentFocused
                    ? 'w-[11.5rem] h-24 rounded-2xl'
                    : 'w-[11.5rem] h-10 rounded-full',
                ]"
                @focus="isCommentFocused = true"
                @blur="isCommentFocused = false"
                style="scrollbar-width: none; -ms-overflow-style: none"
              />
              <LucideMinus class="w-4 h-4 rotate-90" />
              <textarea
                v-model="comment"
                placeholder="Add a comment"
                :class="[
                  'py-2 px-4 bg-lightblack transition-all duration-200 focus:outline-none focus:ring focus:ring-focusorange/50 resize-none',
                  isCommentFocused
                    ? 'w-[32rem] h-24 rounded-2xl'
                    : 'w-[12rem] h-10 rounded-full',
                ]"
                @focus="isCommentFocused = true"
                @blur="isCommentFocused = false"
                style="scrollbar-width: none; -ms-overflow-style: none"
              />
              <LucideSend-horizontal
                class="absolute right-3 text-focusorange bg-lightblack"
                @mousedown.prevent="submitComment"
                @click="isCommentFocused = false"
              />
            </div>
            <button
              class="bg-lightblack shadow-special shadow-focusorange rounded-full p-2 px-3 flex flex-row gap-2 items-center z-10"
              @click="updateLikes"
            >
              <span class="relative inline-block">
                <LucideHeart
                  :class="[
                    'text-focusorange transition-all duration-200 ease-in-out relative z-10',
                    liked ? 'text-focusorange fill-focusorange scale-130' : '',
                  ]"
                />
                <span
                  v-if="liked"
                  class="absolute inset-0 z-0 animate-ping rounded-full bg-focusorange opacity-60"
                ></span>
              </span>
              <p class="text-small">{{ likes }}</p>
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Projekt nicht gefunden.</p>
      </div>
    </ContentDoc>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const liked = ref(false);
const likes = ref(0);
const comment = ref("");
const comments = ref([]);
const name = ref("");
const isCommentFocused = ref(false);

const { data: doc } = await useAsyncData("projectDoc", () =>
  queryContent("/projects").where({ slug: route.params.slug }).findOne()
);

useHead({
  title: "Felix Wendt Portfolio",
});

onMounted(() => {
  fetchLikes();
  fetchComments();
});

async function submitComment() {
  if (comment.value.trim() !== "") {
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: doc.value?.id,
        name: name.value,
        comment: comment.value,
      }),
    });
    comment.value = "";
    name.value = "";
    await fetchComments(); // Kommentare neu laden
  }
}

async function fetchComments() {
  const response = await fetch(`/api/comments/${doc.value?.id}`);
  const data = await response.json();
  comments.value = data.comments;
}

async function fetchLikes() {
  try {
    const response = await fetch(`/api/projects`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const project = data.projects.find((p) => p.projectId === doc.value?.id);
    if (project) likes.value = project.likes;
  } catch (error) {
    console.error("Fehler beim Laden der Likes:", error);
  }
}

async function updateLikes() {
  console.log("Like button clicked for project ID:", doc.value?.id);

  liked.value = true;
  setTimeout(() => {
    liked.value = false;
  }, 250);

  try {
    const response = await fetch(`/api/likes/${doc.value?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    likes.value = data.likes; // Likes aktualisieren
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
</script>
