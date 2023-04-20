<template>
  <v-form v-model="valid" ref="form">
    <v-app id="inspire">
      <v-main>
        <v-container fluid class="backgroundBi">
          <v-layout justify-center>
            <v-flex xs12 sm8 md10>
              <v-row justify="center" align="center">
                <v-img
                  src="https://careers.chula.ac.th/assets/img/logo.png"
                  max-width="400px"
                  max-height="200px"
                />

                <br />
              </v-row>
              <v-card
                class="elevation-12 mt-0 pa-10 my-6"
                width="auto"
                ref="form"
              >
                <v-row justify="center" class="px-10">
                  <v-card-title
                    class="font-weight-light pb-6"
                    style="font-size: 32px"
                  >
                    Profile
                  </v-card-title>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <toggle-button
                      v-model="EngLang"
                      :labels="{ checked: 'ENG', unchecked: 'TH' }"
                      :color="{ checked: '#79aeff', unchecked: '#ff7474' }"
                      :switch-color="{
                        checked: '#1976d2',
                        unchecked: '#ff3a3a',
                      }"
                      class="mr-2"
                      @change="handlechangelanguage(EngLang)"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col col="2" md="2">
                    <div>{{ $t("register.title") }}</div>
                  </v-col>
                  <v-col col="4" md="4" class="mt-n2">
                    <v-autocomplete
                      v-model="form.title"
                      :items="itemsTitle"
                      :item-text="itemChangeLang"
                      item-value="value"
                      solo
                      dense
                      :disabled="isEdit == false"
                    ></v-autocomplete>
                  </v-col>
                  <v-col col="2" md="2">
                    <div>{{ $t("register.gname") }}</div>
                  </v-col>
                  <v-col col="4" md="4" class="mt-n2">
                    <v-text-field
                      v-model="form.give_name"
                      solo
                      dense
                      :disabled="isEdit == false"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col col="2" md="2">
                    <div>{{ $t("register.mname") }}</div>
                  </v-col>
                  <v-col col="4" md="4" class="mt-n2">
                    <v-text-field
                      v-model="form.middle_name"
                      solo
                      dense
                      :disabled="isEdit == false"
                    ></v-text-field>
                  </v-col>
                  <v-col col="2" md="2">
                    <div>{{ $t("register.fname") }}</div>
                  </v-col>
                  <v-col col="4" md="4" class="mt-n2">
                    <v-text-field
                      v-model="form.family_name"
                      solo
                      dense
                      :disabled="isEdit == false"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col col="2" md="2">
                    <div>{{ $t("register.status") }}</div>
                  </v-col>
                  <v-col col="4" md="4" class="mt-n2">
                    <v-autocomplete
                      v-model="form.status_as_chula"
                      :items="itemStatusAtChula"
                      :item-text="itemChangeLang"
                      item-value="id"
                      solo
                      dense
                      :disabled="isEdit == false"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2" md="2">
                    <div>{{ $t("profile.student-staff-id") }}</div>
                  </v-col>
                  <!-- <v-col cols="2" md="2" class="mt-n5 ml-n10">
                    <v-radio-group v-model="isStudent" row solo dense disabled>
                      <v-radio :value="1" label="Yes"></v-radio>
                      <v-radio :value="0" label="No"></v-radio>
                    </v-radio-group>
                  </v-col> -->
                  <v-col cols="4" md="4">
                    <v-text-field
                      v-model="form.student_id_or_staff_id"
                      :placeholder="
                        isStudent == 1
                          ? 'Please enter (Student ID / Staff ID)'
                          : ' - '
                      "
                      solo
                      dense
                      :disabled="isEdit == false"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col col="2" md="2">
                    <div>{{ $t("register.passportnum") }}</div>
                  </v-col>
                  <v-col col="4" md="4" class="mt-n2">
                    <v-text-field
                      v-model="form.passport_number"
                      solo
                      dense
                      :disabled="isEdit == false"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col col="2" md="2">
                    <div>{{ $t("register.affiliation") }}</div>
                  </v-col>
                  <v-col col="4" md="4" class="mt-n2">
                    <!-- :item-text="itemChangeLang" -->
                    <v-autocomplete
                      v-model="form.mAffiliationFacultyId"
                      :items="itemsaffiliation_faculty"
                      item-value="id"
                      :item-text="itemChangeLang"
                      solo
                      dense
                      @change="getOneDepartments(form.mAffiliationFacultyId)"
                      :disabled="isEdit == false"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" md="2">
                    <div>{{ $t("profile.department") }}</div>
                  </v-col>
                  <v-col cols="2" md="2" class="mt-n5">
                    <v-radio-group
                      v-model="isDepartment"
                      row
                      solo
                      dense
                      @change="clearDepartment()"
                      :disabled="isEdit == false"
                    >
                      <v-radio :value="1" label="Yes"></v-radio>
                      <v-radio :value="0" label="No"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="4" md="4" class="mt-n2 ml-n10">
                    <v-autocomplete
                      v-model="form.mDepartmentId"
                      :items="itemDepartments"
                      item-value="id"
                      :item-text="itemChangeLang"
                      :placeholder="
                        isDepartment == 1 ? 'Please enter department' : ' - '
                      "
                      solo
                      dense
                      :disabled="
                        isDepartment == '0' ? true : false || isEdit == false
                      "
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col col="2" md="2">
                    <div>{{ $t("register.email") }}</div>
                  </v-col>
                  <v-col col="4" md="4" class="mt-n2">
                    <v-text-field
                      v-model="form.username"
                      :rules="rules.email"
                      @blur="emailChange(email)"
                      solo
                      dense
                      required
                      type="email"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="isEdit == true">
                  <v-col>
                    <v-btn @click="isChangePassword = !isChangePassword">{{
                      EngLang == true ? "Change password" : "เปลี่ยนรหัสผ่าน"
                    }}</v-btn>
                  </v-col>
                </v-row>
                <v-row v-if="isChangePassword == true">
                  <v-col col="2" md="2">
                    <div>{{ $t("profile.NewPassword") }}</div>
                  </v-col>
                  <v-col col="4" md="4" class="mt-n2">
                    <v-text-field
                      v-model="password"
                      :rules="rules.passward"
                      solo
                      dense
                      required
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="isChangePassword == true">
                  <v-col col="2" md="2">
                    <div>{{ $t("register.cmpassword") }}</div>
                  </v-col>
                  <v-col col="4" md="4" class="mt-n2">
                    <v-text-field
                      v-model="passwordConfirm"
                      :rules="rules.passwardConfirm"
                      solo
                      dense
                      required
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6" v-if="isEdit">
                    <v-btn
                      color="success"
                      style="color: white"
                      class="font-weight-light"
                      @click="submit()"
                      block
                      >{{ EngLang === true ? "SUBMIT" : "ตกลง" }}</v-btn
                    >
                  </v-col>
                  <v-col cols="6" v-if="!isEdit">
                    <v-btn
                      color="success"
                      style="color: white"
                      class="font-weight-light"
                      @click="isEdit = true"
                      block
                      >{{ EngLang === true ? "EDIT" : "แก้ไข" }}</v-btn
                    >
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      color="error"
                      style="color: white"
                      class="font-weight-light"
                      @click="cancel()"
                      block
                      >{{ EngLang === true ? "BACK" : "กลับ" }}</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </v-form>
</template>
<script>
import { Decode } from "@/services";
export default {
  data: () => ({
    isEdit: false,
    isChangePassword: false,
    isTypeOfUser: 0,
    itemChangeLang: "",
    EngLang: true,
    nationalityItems: [],
    isStudent: 0,
    isDepartment: 0,
    password: "",
    passwordEdit: "",
    passwordConfirm: "",
    checkEmail: false,
    checkPasswordConfirm: false,
    isEmailChula: false,
    valid: false,
    itemsaffiliation_faculty: [],
    itemDepartments: [],
    userData: {},
    form: {},
    itemsTitle: [
      {
        name_th: "นาย",
        name_en: "Mr.",
        value: "Mr",
      },
      {
        name_th: "นางสาว",
        name_en: "Ms.",
        value: "Ms",
      },
      {
        name_th: "นาง",
        name_en: "Mrs.",
        value: "Mrs",
      },
    ],
    itemStatusAtChula: [
      {
        id: 1,
        name_th: "นักศึกษา",
        name_en: "Student",
      },
      {
        id: 2,
        name_th: "บุคลากร",
        name_en: "Personnel",
      },
    ],

    rules: {
      email: [(v) => !!v || "Please enter your email"],
      passward: [(v) => !!v || "Please enter your password"],
      passwardConfirm: [(v) => !!v || "Please enter password confirm"],
    },
  }),
  watch: {
    "form.mAffiliationFacultyId"(val) {
      if (val) {
        this.getDepartments(val);
      }
    },
    "form.mDepartmentId"(val) {
      if (val) {
        this.isDepartment = 1;
      } else {
        this.isDepartment = 0;
      }
    },
    "form.status_as_chula"(val) {
      if (val == "1") {
        this.form.user_type = "STUDENT";
      } else if (val == 2) {
        this.form.user_type = "TEACHER";
      }
      console.log("user_type", this.form.user_type);
    },
  },
  mounted() {
    console.log(this.valid, "valid");
  },
  created() {
    const lang = localStorage.getItem("lang");
    if (lang == "en") {
      this.EngLang = true;
      this.itemChangeLang = "name_en";
    } else if (lang == "th") {
      this.EngLang = false;
      this.itemChangeLang = "name_th";
    }
    this.checkSubmitEdit();
    this.getUserData();
    this.getAffiliationFaculty();
  },
  methods: {
    async getUserData() {
      this.userData = JSON.parse(
        Decode.decode(localStorage.getItem("userZPdata"))
      );
      const auth = {
        headers: {
          Authorization: `Bearer ${this.userData.token}`,
        },
      };
      const response = await this.axios.get(
        `${process.env.VUE_APP_API}/user/${this.userData.id}`,
        auth
      );
      this.form = response.data.data;
      this.form.status_as_chula = parseInt(this.form.status_as_chula);
      console.log("this.form", this.form);
    },
    checkSubmitEdit() {
      if (this.isEdit === true) {
        if (this.EngLang === true) {
          this.submitEdit = "SUBMIT";
        } else {
          this.submitEdit = "ตกลง";
        }
      } else if (this.isEdit === false) {
        if (this.EngLang === true) {
          this.submitEdit = "EDIT";
        } else {
          this.submitEdit = "แก้ไข";
        }
      }
    },
    clearDepartment() {
      if (this.isDepartment == "0") {
        this.form.mDepartmentId = null;
      } else {
      }
      console.log(this.form.mDepartmentId, "this.form.mDepartmentId");
    },
    async getDepartments(val) {
      this.itemDepartments = [];
      const response = await this.axios.get(
        `${process.env.VUE_APP_API}/department?mAffiliationFacultyId=${val}`
      );
      this.itemDepartments = response.data.data;
    },
    async getOneDepartments(val) {
      this.form.mDepartmentId = null;
      this.itemDepartments = [];
      const response = await this.axios.get(
        `${process.env.VUE_APP_API}/department?mAffiliationFacultyId=${val}`
      );
      console.log("itemDepartments", response.data.data);
      this.itemDepartments = response.data.data;
    },
    async getAffiliationFaculty() {
      const response = await this.axios.get(
        `${process.env.VUE_APP_API}/affiliation_faculty`
      );
      console.log("response affiliation_faculty", response.data.data);
      this.itemsaffiliation_faculty = response.data.data;
    },
    // async getOneDepartments(val) {
    //   const response = await this.axios.get(
    //     `${process.env.VUE_APP_API}/department?mAffiliationFacultyId=${val}`
    //   );
    //   console.log("response", response.data.data);
    //   this.itemDepartments = response.data.data;
    // },

    async submit() {
      this.$refs.form.validate();
      if (this.valid) {
        console.log(this.valid, "valid");
        this.validPasswordConfirm();
        // this.validEmail();
        const auth = {
          headers: {
            Authorization: `Bearer ${this.userData.token}`,
          },
        };
        const data = {
          ...this.form,
          password: this.password,
        };
        const data1 = {
          family_name: this.form.family_name,
          give_name: this.form.give_name,
          id: this.form.id,
          mAffiliationFacultyId: this.form.mAffiliationFacultyId,
          mDepartmentId: this.form.mDepartmentId,
          middle_name: this.form.middle_name,
          passport_number: this.form.passport_number,
          status_as_chula: this.form.status_as_chula,
          student_id_or_staff_id: this.form.student_id_or_staff_id,
          title: this.form.title,
          updatedAt: this.form.updatedAt,
          user_type: this.form.user_type,
          username: this.form.username,
        };
        if (this.isChangePassword == true) {
          console.log(this.isChangePassword, "isChangePassword true");
          if (this.checkPasswordConfirm === true) {
            const response = await this.axios.put(
              `${process.env.VUE_APP_API}/user/${this.form.id}`,
              data,
              // this.form,
              auth
            );
            if (response.data.response_status == "SUCCESS") {
              console.log("1");
              this.$swal.fire({
                icon: "success",
                text: this.$t("profile.editSuccess"),
                showConfirmButton: false,
                timer: 1500,
              });
              this.isEdit = false;
              this.$router.go(-1);
            } else {
              console.log("2");
              this.$swal.fire({
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                icon: "error",
                text: this.$t("profile.error"),
              });
            }
          } else {
            console.log(this.valid, "valid");
          }
        } else if (this.isChangePassword == false) {
          console.log(this.isChangePassword, "isChangePassword false");
          console.log(data1, "data1 ผ่าน");
          const response = await this.axios.put(
            `${process.env.VUE_APP_API}/user/${this.form.id}`,
            data1,
            // this.form,
            auth
          );
          if (response.data.response_status == "SUCCESS") {
            console.log("1");
            this.$swal.fire({
              icon: "success",
              text: this.$t("profile.editSuccess"),
              showConfirmButton: false,
              timer: 1500,
            });
            this.isEdit = false;
            this.$router.go(-1);
          } else {
            console.log("2");
            this.$swal.fire({
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              icon: "error",
              text: this.$t("profile.error"),
            });
          }
        }
      }
    },
    cancel() {
      this.$router.push("/");
    },
    validPasswordConfirm() {
      if (this.passwordConfirm !== this.password) {
        this.checkPasswordConfirm = false;
        this.$swal.fire({
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          icon: "error",
          text: "Passwords did not match",
        });
      } else {
        this.checkPasswordConfirm = true;
      }
    },
    // validEmail() {
    //   const mailformat =
    //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   if (mailformat.test(this.form.username)) {
    //     this.checkEmail = true;
    //   } else if (this.form.username == "") {
    //     this.checkEmail = false;
    //     this.$swal.fire({
    //       showConfirmButton: false,
    //       timer: 2500,
    //       timerProgressBar: true,
    //       icon: "error",
    //       text: "Please enter a valid email address",
    //     });
    //   } else {
    //     this.checkEmail = false;
    //     this.$swal.fire({
    //       showConfirmButton: false,
    //       timer: 2500,
    //       timerProgressBar: true,
    //       icon: "error",
    //       text: "Please enter a valid email address",
    //     });
    //   }
    // },
    // emailChange(val) {
    //   let substringEmail = "";
    //   if (val.length > 11) {
    //     substringEmail = val.substring(val.length - 12, val.length);
    //   }
    //   if (substringEmail !== "@chula.ac.th") {
    //     console.log("กรุณากรอกอีเมล @chula.ac.th เท่านั้น");
    //     this.isEmailChula = false;
    //     this.$swal.fire({
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //       icon: "error",
    //       text: "Please enter e-mail only @chula.ac.th",
    //     });
    //   } else {
    //     this.isEmailChula = true;
    //     console.log("success input email");
    //   }
    // },
    handlechangelanguage(event) {
      if (event == true) {
        this.EngLang = "en";
      } else if (event == false) {
        this.EngLang = "th";
      }
      localStorage.setItem("lang", this.EngLang);
      console.log("event", this.EngLang);
      window.location.reload();
    },
  },
};
</script>
<style scoped>
.backgroundBi {
  background-color: #ffa0c4;
  background-image: url(`@/assets/backgroundBi.png`);
  position: absolute;
}
</style>
