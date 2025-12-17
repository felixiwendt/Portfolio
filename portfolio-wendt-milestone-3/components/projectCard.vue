<template>
  <div class="relative" ref="cardRef">
    <div
      :class="[
        'w-full p-8 bg-lightblack rounded-t-3xl rounded-l-3xl hover:scale-103 shadow-focusorange/5 hover:shadow-focusorange/20 hover:shadow-2xl shadow-xl transition-all duration-600 ease-in-out focus:outline-none focus:ring-0 relative overflow-visible',
        isOpen ? 'max-w-[110rem] max-h-[60rem] z-10' : 'max-w-[100rem] ',
        id === 0 ? 'shadow-2xl shadow-focusorange/25' : '',
      ]"
      @click="isOpen ? closeCard() : openCard()"
      tabindex="0"
      role="button"
    >
      <div class="flex flex-row w-full gap-8 relative">
        <div class="flex flex-col gap-4">
          <!-- picture div -->
          <div class="w-80 h-80 rounded-2xl border-2 overflow-hidden">
            <img
              :src="image"
              alt="Projektbild"
              class="object-cover w-full h-full"
            />
          </div>
          <NuxtLink
            :to="slug"
            :class="[
              'border-2 border-focusorange rounded-xl px-4 py-2 mt-4 hover:bg-focusorange hover:scale-105 hover:shadow-focusorange flex flex-row gap-2 items-center justify-center transition-all duration-200 ease-in z-10 shadow-special shadow-focusorange/50',
              isOpen ? '' : 'hidden',
            ]"
            >learn more <LucideArrowUpRight
          /></NuxtLink>
        </div>
        <!-- card content div -->
        <div class="flex flex-col items-start gap-6 w-2/3 mb-8 h-fill relative">
          <h2 class="text-h3">{{ header }}</h2>
          <p class="text-body">
            {{ isOpen ? longDescription : shortDescription }}
          </p>
          <div class="flex flex-row justify-start space-x-4 overflow-visible">
            <div
              v-for="(icon, index) in icons"
              :key="index"
              class="rounded-full h-16 w-16 overflow-visible"
            >
              <img :src="icon" alt="Icon" class="icon-div" />
            </div>
          </div>
          <div :class="[isOpen ? 'flex flex-row items-start gap-3' : 'hidden']">
            <p class="text-body">Publication date:</p>
            <p class="text-body">{{ date }}</p>
          </div>
          <!-- Kommentare div -->
          <div :class="[isOpen ? 'flex flex-col items-start gap-6' : 'hidden']">
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
          <NuxtLink
            :to="slug"
            :class="[
              'border-2 border-focusorange rounded-xl px-4 py-2 hover:bg-focusorange hover:scale-105 hover:shadow-focusorange flex flex-row gap-2 items-center justify-center transition-all duration-200 ease-in z-10 shadow-special shadow-focusorange/50',
              isOpen ? 'hidden' : '',
            ]"
            >learn more <LucideArrowUpRight
          /></NuxtLink>
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
            aria-label="Input for your Name (optional)"
            id="name"
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
            aria-label="Input for your comment on the project"
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
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "#imports";

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  icons: {
    type: Array,
    default: () => [],
  },
  date: {
    type: String,
    default: "",
  },
  icons: {
    type: Array,
    default: () => [],
  },
  slug: {
    type: String,
    default: "",
  },
});

const isOpen = ref(false);
const cardRef = ref(null);
const liked = ref(false);
const likes = ref(0);
const comment = ref("");
const comments = ref([]);
const name = ref("");
const isCommentFocused = ref(false);

function openCard() {
  isOpen.value = true;
  cardRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeCard() {
  isOpen.value = false;
}

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
        projectId: props.id,
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
  const response = await fetch(`/api/comments/${props.id}`);
  const data = await response.json();
  comments.value = data.comments;
}

async function fetchLikes() {
  try {
    const response = await fetch(`/api/projects`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const project = data.projects.find((p) => p.projectId === props.id);
    if (project) likes.value = project.likes;
  } catch (error) {
    console.error("Fehler beim Laden der Likes:", error);
  }
}

async function updateLikes() {
  console.log("Like button clicked for project ID:", props.id);

  liked.value = true;
  setTimeout(() => {
    liked.value = false;
  }, 250);

  try {
    const response = await fetch(`/api/likes/${props.id}`, {
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

<style scoped></style>
