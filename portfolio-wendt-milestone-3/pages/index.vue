<template>
  <!-- body div -->
  <div class="body-div z-10">
    <!-- header div -->
    <div class="pt-24 z-10">
      <div class="relative flex flex-col align-top items-end h-[60vh] w-full">
        <div class="absolute bottom-0 left-0">
          <h1 class="text-h1">
            &lt;Hi :)/&gt; <br />
            &nbsp;&nbsp;&lt;i'm Felix/&gt;
          </h1>
        </div>
      </div>
    </div>
    <!-- content div -->
    <ContentDoc path="/cv/cv" v-slot="{ doc }" :head="false">
      <div v-if="doc" class="flex flex-col gap-20">
        <div class="flex flex-row justify-between items-center relative">
          <div class="text-div w-2/3">
            <div class="flex flex-row justify-start items-center gap-4">
              <h2 class="text-h3">About me</h2>
              <LucideMessageCircle class="w-8 h-8 z-10" />
            </div>
            <p class="text-body z-10">
              {{ doc.aboutMe }}
            </p>
          </div>
          <div
            class="p-2 bg-lightblack z-10 rounded-full absolute right-0 w-[10rem] h-[10rem] flex items-center justify-center"
          >
            <img
              src="/images/felix.jpeg"
              alt="Profile Picture of me Felix Wendt"
              class="inset-0 h-full w-full object-cover rounded-full transform scale-x-[-1]"
            />
          </div>
        </div>
        <!-- Connect with me div -->
        <div class="text-div z-10">
          <div class="flex flex-row justify-start items-center gap-4">
            <h2 class="text-h3">Connect with me</h2>
            <LucideSend class="w-8 h-8 z-10" />
          </div>
          <!-- Socials -->
          <div class="flex flex-row justify-start items-center gap-4 z-10">
            <!-- Socials out of CV -->
            <div
              v-for="(logo, index) in doc.socials"
              :key="index"
              class="bg-lightblack rounded-xl h-16 w-16 overflow-visible flex items-center justify-center cursor-pointer hover:scale-105 shadow-sm-div"
            >
              <a
                :href="logo.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="
                  logo.icon === 'email'
                    ? 'Send email to Felix'
                    : 'Open social profile'
                "
              >
                <template v-if="logo.icon === 'email'">
                  <LucideMail class="stroke-white h-10 w-10 block z-10" />
                </template>
                <template v-else>
                  <img :src="logo.icon" alt="Socials Logo" class="icon-div" />
                </template>
              </a>
            </div>
            <!-- Kontaktformular Button -->
            <div
              @click="showContactForm = true"
              class="bg-lightblack rounded-xl h-16 w-16 overflow-visible flex items-center justify-center cursor-pointer hover:scale-105 shadow-sm-div"
            >
              <LucideMessage-square-plus
                class="stroke-white h-10 w-10 block z-10"
              />
            </div>
          </div>
        </div>
        <!-- Skills div -->
        <div class="text-div z-10">
          <div class="flex flex-row justify-start items-center gap-4">
            <h2 class="text-h3">Skills</h2>
            <LucidePuzzle class="w-8 h-8 z-10" />
          </div>
          <div class="flex flex-row justify-start space-x-4">
            <div
              v-for="(skill, index) in doc.skills"
              :key="index"
              class="bg-lightblack rounded-xl h-16 w-16 overflow-visible flex items-center justify-center shadow-sm-div hover:scale-105"
            >
              <img :src="skill" alt="Skill Logo" class="icon-div" />
            </div>
          </div>
          <div class="flex flex-row justify-start space-x-4">
            <div
              v-for="(ability, index) in doc.abilities"
              :key="index"
              class="bg-lightblack rounded-xl h-fit w-fit px-4 py-2 flex items-center justify-center shadow-sm-div hover:scale-105"
            >
              <p class="text-body">
                {{ ability }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContentDoc>
    <!-- project div -->
    <ContentDoc path="/projects/project0" v-slot="{ doc }" :head="false">
      <div v-if="doc" class="flex flex-row justify-between space-x-10">
        <div
          class="bg-lightblack rounded-2xl h-[40vh] min-w-[40vh] aspect-square overflow-hidden z-10"
        >
          <img
            :src="doc.image"
            alt="Das Projekt beschreibende Bild"
            class="object-cover w-full h-full"
          />
        </div>
        <div class="flex flex-col items-start space-y-8 w-full h-[40vh]">
          <h2 class="text-h3">{{ doc.header }}</h2>
          <p class="text-body">
            {{ doc.shortDescription }}
          </p>
          <NuxtLink
            to="/projects/project0"
            class="border-2 border-focusorange rounded-xl px-4 py-2 hover:bg-focusorange hover:scale-105 flex flex-row gap-2 items-center justify-center transition-all duration-200 ease-in z-10 shadow-special shadow-focusorange"
          >
            learn more
            <LucideArrowUpRight />
          </NuxtLink>
        </div>
      </div>
      <div v-else>
        <p class="text-body">Projekt konnte nicht geladen werden.</p>
      </div>
    </ContentDoc>
  </div>

  <!-- Kontaktformular Popup -->
  <div
    v-if="showContactForm"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    @click.self="showContactForm = false"
  >
    <div
      :class="[
        ' rounded-2xl p-8 pt-16 min-w-[50%] min-h-[50%] relative z-100 transition-all duration-300 ease-in-out',
        formSubmitted ? 'bg-focusorange' : ' bg-lightblack',
      ]"
    >
      <!-- Close button -->
      <button
        class="absolute -top-3 -right-3 bg-lightblack rounded-full p-2 hover:bg-focusorange hover:scale-105 hover:bg-opacity-70 transition-all duration-200 ease-in-out"
        @click="showContactForm = false"
      >
        <LucideX class="h-6 w-6" />
      </button>
      <!-- Popup Content -->
      <div
        class="flex flex-col gap-8 items-left justify-start"
        v-if="!formSubmitted"
      >
        <div class="flex flex-row justify-start items-center gap-4">
          <h2 class="text-h3">Send me a message</h2>
          <LucideMessagesSquare class="w-8 h-8 z-10" />
        </div>
        <p class="text-body">
          Get in touch with me through this contact form. I will get back to you
          as soon as possible.
        </p>
        <!-- Formular -->
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <div class="flex flex-row justify-start items-center gap-4">
              <label for="email" class="text-body">Your Email *</label>
            </div>
            <input
              type="email"
              id="email"
              v-model="email"
              class="input-div"
              :class="{ 'border-red-500': errors.email }"
            />
            <span v-if="errors.email" class="text-red-500 text-sm">{{
              errors.email
            }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <label for="name" class="text-body">Subject of message</label>
            <input type="text" id="name" v-model="subject" class="input-div" />
          </div>
          <div class="flex flex-col gap-1">
            <label for="message" class="text-body">Your message *</label>
            <textarea
              id="message"
              v-model="message"
              class="input-div h-32"
              :class="{ 'border-red-500': errors.message }"
            ></textarea>
            <span v-if="errors.message" class="text-red-500 text-sm">{{
              errors.message
            }}</span>
          </div>
        </div>
        <button
          class="w-fit border-2 border-focusorange rounded-xl px-4 py-2 hover:bg-focusorange hover:scale-105 flex flex-row gap-2 items-center justify-center transition-all duration-200 ease-in"
          @click.prevent="submitForm"
        >
          Send message
          <LucideSend-horizontal class="w-[1.3rem] h-[1.3rem]" />
        </button>
      </div>
      <div
        v-else
        class="flex flex-col h-[20rem] w-full items-center justify-center gap-12"
      >
        <LucideSend class="w-20 h-20 text-white" />
        <h2 class="text-h3">Your message has been sent</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Head, LucideContact, LucideMessagesSquare } from "#components";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const showContactForm = ref(false);
const formSubmitted = ref(false);

// Formular-States
const email = ref("");
const subject = ref("");
const message = ref("");

// Fehler-States
const errors = ref({
  email: "",
  message: "",
});

useHead({
  title: "Felix Wendt Portfolio",
});

function validateEmail(value) {
  // Einfache E-Mail-Regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateForm() {
  let valid = true;
  errors.value.email = "";
  errors.value.message = "";

  if (!validateEmail(email.value)) {
    errors.value.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    valid = false;
  }
  if (!message.value || message.value.length < 30) {
    errors.value.message =
      "Die Nachricht muss mindestens 30 Zeichen enthalten.";
    valid = false;
  }
  return valid;
}

async function submitForm() {
  if (validateForm()) {
    // Anfrage an die Server Route schicken
    await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        subject: subject.value,
        message: message.value,
      }),
    });

    // Felder zurücksetzen
    email.value = "";
    subject.value = "";
    message.value = "";

    formSubmitted.value = true; // Bestätigung anzeigen
    setTimeout(() => {
      formSubmitted.value = false;
      showContactForm.value = false;
    }, 1500); // 1,5 Sekunden anzeigen
  }
}
</script>
