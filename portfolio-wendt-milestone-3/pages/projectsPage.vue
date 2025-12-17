<template>
  <!-- body div -->
  <div class="body-div z-10">
    <div class="text-div w-2/3 pt-20">
      <h1 class="text-h2">Projects</h1>
      <p class="text-body z-10">
        Here are some of my recent projects that showcase my skills and
        experience in web development. Each project highlights different
        technologies and approaches I have used to create modern and
        user-friendly applications.
      </p>
    </div>
    <!-- card div -->
    <div class="item-div z-10">
      <ContentList path="/projects" v-slot="{ list }">
        <div v-for="(project, index) in list" :key="project._path">
          <projectCard
            :header="project.header"
            :image="project.image"
            :shortDescription="project.shortDescription"
            :longDescription="project.longDescription"
            :date="project.date"
            :icons="project.icons"
            :id="project.id"
            :slug="project._path"
          />
        </div>
      </ContentList>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Projects | Felix Wendt Portfolio",
});
</script>

<style scoped></style>
