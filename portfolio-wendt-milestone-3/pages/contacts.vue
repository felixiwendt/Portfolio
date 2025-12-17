<template>
  <div class="body-div z-10">
    <h1 class="text-h2">Contact Requests</h1>
    <div class="bg-lightblack rounded-3xl min-h-[50vh] min-w-[70%] z-10 p-8">
      <!-- new div so absolute button is easier -->
      <div class="relative flex flex-col gap-8">
        <h2 class="text-h4">List of all Requests:</h2>
        <!-- Request div -->
        <div
          class="bg-darkgrey rounded-2xl p-4 flex flex-col justify-center gap-4"
          v-for="request in contactRequests"
          :key="request.id"
        >
          <div>
            <p class="text-body underline">Email:</p>
            <p class="text-body">{{ request.email }}</p>
          </div>

          <div>
            <p class="text-body underline">Subject:</p>
            <p class="text-body">{{ request.subject }}</p>
          </div>
          <div>
            <p class="text-body underline">Message:</p>
            <p class="text-body">{{ request.message }}</p>
          </div>
          <div class="flex flex-col gap-2 absolute right-5">
            <a
              :aria-label="`Send Email to ${request.email}`"
              :href="`mailto:${request.email}`"
              class="bg-focusblue/45 hover:bg-focusblue rounded-full p-3 cursor-pointer transition-all duration-200 ease-in-out"
            >
              <LucideMail />
            </a>

            <div
              class="bg-red-500/45 hover:bg-red-500 rounded-full p-3 cursor-pointer transition-all duration-200 ease-in-out"
              @click="deleteRequest(request.id)"
            >
              <LucideTrash />
            </div>
          </div>
        </div>
        <button
          class="absolute top-0 right-0 border-2 border-focusorange rounded-xl px-4 py-2 hover:bg-focusorange hover:scale-105 flex flex-row gap-2 items-center justify-center transition-all duration-200 ease-in z-10"
          @click="fetchRequests"
        >
          <p>get all requests</p>
          <LucideRotate-cw class="w-[1.3rem] h-[1.3rem]" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from "#imports";
let contactRequests = ref([]);

useHead({
  title: "Contact Requests | Felix Wendt Portfolio",
});

onMounted(() => {
  fetchRequests();
});

async function fetchRequests() {
  try {
    const response = await fetch("/api/contacts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    contactRequests.value = data.contacts;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function deleteRequest(id) {
  try {
    const response = await fetch(`/api/contacts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Refresh the list after deletion
    fetchRequests();
  } catch (error) {
    console.error(
      "There has been a problem with your delete operation:",
      error
    );
  }
}
</script>

<style scoped></style>
