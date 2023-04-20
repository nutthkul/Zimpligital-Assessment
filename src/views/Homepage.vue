<template>
  <div>
    <Homepage />
  </div>
</template>
<script>
import Homepage from "@/components/Homepage";
import { Encode, Decode } from "@/services";
export default {
  components: {
    Homepage,
  },
  created() {
    localStorage.setItem("userZPdata", Encode.encode("donut1234"));
    if (localStorage.getItem("userZPdata") === null) {
      this.$router.push("/").catch(() => {});
    }
  },
};
</script>
