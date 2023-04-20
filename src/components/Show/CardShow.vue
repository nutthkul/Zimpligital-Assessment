<template>
  <v-col cols="12" md="4" sm="6">
    <v-card>
      <v-img :src="image" aspect-ratio="1.5"></v-img>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
      <v-card-text>
        {{ description }}
      </v-card-text>

      <v-col>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateSelected"
              solo
              dense
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateSelected" @input="menu = false">
            <!-- @change="firstDateChange" -->
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-chip-group v-model="selectedTime">
          <v-chip
            v-for="time in showTime"
            :key="time"
            :value="time"
            class="ma-1"
            :color="selectedTime == time ? 'primary' : ''"
            >{{ time }}</v-chip
          >
        </v-chip-group>
      </v-col>

      <v-card-actions>
        <v-row align="center">
          <v-col>
            <v-btn icon small @click="minusQuantity()">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-text-field
              v-model="quantity"
              type="number"
              min="0"
              max="10"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn icon small @click="quantity++">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-btn color="primary" @click="buyTicket()">Buy Tickets</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    showTime: {
      type: Array,
    },
  },
  data() {
    return {
      quantity: 0,
      selectedTime: "",
      menu: false,
      dateSelected: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
    };
  },
  created() {},
  methods: {
    minusQuantity() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    },
    buyTicket() {
      console.log("time", this.selectedTime);
      if (!this.selectedTime) {
        this.$swal.fire({
          icon: "error",
          text: "กรุณาเลือกเวลาฉาย",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (!this.quantity) {
        this.$swal.fire({
          icon: "error",
          text: "กรุณาเลือกจำนวนที่นั่ง",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.$router.push({
          name: "payment",
          query: {
            id: this.id,
            title: this.title,
            quantity: this.quantity,
            selectedTime: this.selectedTime,
            dateSelected: this.dateSelected,
          },
        });
      }
    },
  },
};
</script>