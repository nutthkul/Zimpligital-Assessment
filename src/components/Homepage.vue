<template>
  <v-container>
    <v-row align="center" justify="center">
      <CardShow
        v-for="(i, index) in showData"
        :key="index"
        :id="i.id"
        :image="i.image"
        :title="i.title"
        :subtutle="i.subtutle"
        :description="i.description"
        :showTime="i.showTime"
      />
    </v-row>
  </v-container>
</template>
<script>
import CardShow from "../components/Show/CardShow.vue";
export default {
  name: "TicketBuyingPage",
  components: {
    CardShow,
  },
  data() {
    return {
      showData: [
        {
          id: 1,
          image: "https://picsum.photos/800/600/?random",
          title: "Spider-Man: No Way Home",
          suctitle: "Lorem ipsum dolor sit amet",
          showTime: ["10:00", "12:00", "13:00"],
          description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor sed
        mauris eu tincidunt. Duis gravida felis ac lorem malesuada faucibus.
        Aenean sed ullamcorper leo. Sed sit amet elit euismod, aliquam turpis
        at, laoreet tellus. Duis ac mi ut lorem ullamcorper pulvinar non et
        augue.`,
        },
        {
          id: 2,
          image: "https://picsum.photos/800/600/?random",
          title: "The Matrix Resurrections",
          suctitle: "Lorem ipsum dolor sit amet",
          showTime: ["10:00", "12:00", "13:00"],
          description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor sed
        mauris eu tincidunt. Duis gravida felis ac lorem malesuada faucibus.
        Aenean sed ullamcorper leo. Sed sit amet elit euismod, aliquam turpis
        at, laoreet tellus. Duis ac mi ut lorem ullamcorper pulvinar non et
        augue.`,
        },
        {
          id: 3,
          image: "https://picsum.photos/800/600/?random",
          title: "Don't Look Up",
          suctitle: "Lorem ipsum dolor sit amet",
          showTime: ["10:00", "12:00", "13:00"],
          description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor sed
        mauris eu tincidunt. Duis gravida felis ac lorem malesuada faucibus.
        Aenean sed ullamcorper leo. Sed sit amet elit euismod, aliquam turpis
        at, laoreet tellus. Duis ac mi ut lorem ullamcorper pulvinar non et
        augue.`,
        },
        {
          id: 4,
          image: "https://picsum.photos/800/600/?random",
          title: "West Side Story",
          suctitle: "Lorem ipsum dolor sit amet",
          showTime: ["10:00", "12:00", "13:00"],
          description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor sed
        mauris eu tincidunt. Duis gravida felis ac lorem malesuada faucibus.
        Aenean sed ullamcorper leo. Sed sit amet elit euismod, aliquam turpis
        at, laoreet tellus. Duis ac mi ut lorem ullamcorper pulvinar non et
        augue.`,
        },
        {
          id: 5,
          image: "https://picsum.photos/800/600/?random",
          title: "Encanto",
          suctitle: "Lorem ipsum dolor sit amet",
          showTime: ["10:00", "12:00", "13:00"],
          description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor sed
        mauris eu tincidunt. Duis gravida felis ac lorem malesuada faucibus.
        Aenean sed ullamcorper leo. Sed sit amet elit euismod, aliquam turpis
        at, laoreet tellus. Duis ac mi ut lorem ullamcorper pulvinar non et
        augue.`,
        },
        {
          id: 6,
          image: "https://picsum.photos/800/600/?random",
          title: "The French Dispatch",
          suctitle: "Lorem ipsum dolor sit amet",
          showTime: ["10:00", "12:00", "13:00"],
          description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor sed
        mauris eu tincidunt. Duis gravida felis ac lorem malesuada faucibus.
        Aenean sed ullamcorper leo. Sed sit amet elit euismod, aliquam turpis
        at, laoreet tellus. Duis ac mi ut lorem ullamcorper pulvinar non et
        augue.`,
        },
      ],

      numTickets: 1,
      cardName: "",
      cardNumber: "",
      cardExpiration: "",
      cardSecurity: "",
    };
  },
  methods: {
    submitForm() {
      // Submit form logic goes here
    },
  },
};
</script>
