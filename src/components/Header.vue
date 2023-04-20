<template>
  <v-row>
    <v-col cols="6">
      <v-toolbar>
        <v-autocomplete
          v-model="showtext"
          @change="handlehange($event)"
          :items="['en', 'th']"
        ></v-autocomplete>
      </v-toolbar>
    </v-col>
    <v-col cols="12">
      {{ showtext }}
      <v-row justify="center">
        <v-col cols="6">
          <h1>{{ $t("test") }}</h1>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { Decode } from "@/services";
export default {
  data() {
    return {
      userData: [],
      showtext: "",
    };
  },
  methods: {
    handlehange(event) {
      localStorage.setItem("lang", event);
      window.location.reload();
    },
  },
  created() {
    this.showtext = localStorage.getItem("lang");
  },
};
</script>