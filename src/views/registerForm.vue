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
                    REGISTER FORM
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
                      :item-text="EngLang ? 'textEN' : 'textTH'"
                      item-value="value"
                      solo
                      dense
                      :rules="rules.title"
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
                      :item-text="EngLang ? 'textEN' : 'textTH'"
                      item-value="id"
                      solo
                      dense
                      :rules="rules.status"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" md="4">
                    <div>{{ $t("register.student-staff-id") }}</div>
                  </v-col>
                  <v-col cols="3" md="3" class="mt-n5 ml-n10">
                    <v-radio-group v-model="isStudent" row solo dense>
                      <v-radio :value="1" label="Yes"></v-radio>
                      <v-radio :value="0" label="No"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="3" md="4" class="mt-n2 ml-n10">
                    <v-text-field
                      v-model="form.student_id_or_staff_id"
                      :placeholder="
                        isStudent == 1
                          ? 'Please enter (Student ID / Staff ID)'
                          : ' - '
                      "
                      solo
                      type="number"
                      dense
                      :disabled="isStudent == '0' ? true : false"
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
                      :rules="rules.affiliation"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" md="4">
                    <div>{{ $t("register.department") }}</div>
                  </v-col>
                  <v-col cols="3" md="3" class="mt-n5 ml-n10">
                    <v-radio-group v-model="isDepartment" row solo dense>
                      <v-radio :value="1" label="Yes"></v-radio>
                      <v-radio :value="0" label="No"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="3" md="4" class="mt-n2 ml-n10">
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
                      :disabled="isDepartment == '0' ? true : false"
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
                      solo
                      dense
                      required
                      type="email"
                    ></v-text-field>
                  </v-col>
                  <span style="color: red" class="mt-2"
                    >* กรณีที่เป็นนักศึกษา/บุคลากร ให้กรอกอีเมล ...@chula.ac.th
                  </span>
                </v-row>
                <v-row>
                  <v-col col="2" md="2">
                    <div>{{ $t("register.password") }}</div>
                  </v-col>
                  <v-col col="4" md="4" class="mt-n2">
                    <v-text-field
                      v-model="form.password"
                      :rules="rules.passward"
                      solo
                      dense
                      required
                      type="password"
                    ></v-text-field>
                  </v-col>
                  <span style="color: red" class="mt-2"
                    >* กรณีที่เป็นนักศึกษา/บุคลากร
                    ให้กรอกรหัสสําหรับล็อกอินเข้าใช้อีเมลจุฬา
                  </span>
                </v-row>
                <v-row>
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
                    <!-- :error-messages="
                      passwordConfirm !== password
                        ? 'Passwords did not match'
                        : ''
                    " -->
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      color="success"
                      style="color: white"
                      class="font-weight-light"
                      @click="submit()"
                      block
                      >{{ EngLang === true ? "SUBMIT" : "ตกลง" }}</v-btn
                    >
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      color="error"
                      style="color: white"
                      class="font-weight-light"
                      @click="cancel()"
                      block
                      >{{ EngLang === true ? "CANCEL" : "ยกเลิก" }}</v-btn
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
export default {
  data: () => ({
    checkChulaEmail: false,
    isTypeOfUser: 0,
    itemChangeLang: "",
    EngLang: true,
    nationalityItems: [],
    isStudent: 0,
    isDepartment: 0,
    passwordConfirm: "",
    checkEmail: false,
    checkPasswordConfirm: false,
    isEmailChula: false,
    valid: false,
    itemsaffiliation_faculty: [],
    itemDepartments: [],
    form: {
      mAffiliationFacultyId: null,
      title: "",
      give_name: "",
      middle_name: "",
      family_name: "",
      status_as_chula: "",
      passport_number: "",
      student_id_or_staff_id: "",
      mDepartmentId: "",
      username: "",
      password: "",
      user_type: "",
    },
    itemsTitle: [
      {
        textTH: "นาย",
        textEN: "Mr.",
        value: "Mr",
      },
      {
        textTH: "นางสาว",
        textEN: "Ms.",
        value: "Ms",
      },
      {
        textTH: "นาง",
        textEN: "Mrs.",
        value: "Mrs",
      },
    ],
    itemStatusAtChula: [
      {
        id: 1,
        textTH: "นิสิต",
        textEN: "Student",
      },
      {
        id: 2,
        textTH: "อาจารย์",
        textEN: "Professor/Lecturer",
      },
      {
        id: 3,
        textTH: "นักวิจัย",
        textEN: "Researcher",
      },
      {
        id: 4,
        textTH: "เจ้าหน้าที่ปฏิบัติการ",
        textEN: "Operation staff",
      },
    ],

    rules: {
      status: [(v) => !!v || "กรุณาระบุสถานะของนิสิต/บุคลากร"],
      email: [(v) => !!v || "กรุณากรอกฮีเมล"],
      passward: [(v) => !!v || "กรุณาใส่รหัสผ่าน"],
      passwardConfirm: [(v) => !!v || "กรุณายืนยันรหัสผ่าน"],
      title: [(v) => !!v || "กรุณากรอกข้อมูลส่วนบุคคล"],
      affiliation: [(v) => !!v || "กรุณาเลือกข้อมูลคณะ"],
      passport: [
        (v) => /[a-zA-Z]{2}[0-9]{7}/.test(v) || "เลขพาสปอร์ตไม่ถูกต้อง",
      ],
    },
  }),
  watch: {
    "form.status_as_chula"(val) {
      if (val == 1) {
        this.form.user_type = "STUDENT";
      } else {
        this.form.user_type = "TEACHER";
      }
      console.log("user_type", this.form.user_type);
    },
    isStudent(val) {
      if (val == 0) {
        this.form.student_id_or_staff_id = "";
      }
    },
    isDepartment(val) {
      if (val == 0) {
        this.form.mDepartmentId = null;
      }
      if (this.isDepartment == 1) {
        this.getOneDepartments(this.form.mAffiliationFacultyId);
      }
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
    this.getAffiliationFaculty();
  },
  methods: {
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
        if (this.form.student_id_or_staff_id.length) {
          this.checkChulaEmail = this.form.username.includes("@chula.ac.th");
          if (this.checkChulaEmail == true) {
            this.submitResgister();
          } else {
            this.$swal.fire({
              icon: "error",
              text: "กรณีเป็นนักศึกษา/บุคลากร กรุณาใช้อีเมล @chula.ac.th",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } else {
          this.submitResgister();
        }
      }
    },
    async submitResgister() {
      this.validEmail();
      if (this.checkPasswordConfirm === true && this.checkEmail === true) {
        const response = await this.axios.post(
          `${process.env.VUE_APP_API}/user`,
          // data,
          this.form
        );
        if (response.data.response_status == "SUCCESS") {
          console.log("1");
          this.$swal.fire({
            icon: "success",
            text: this.$t("status.submitRegister"),
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push("/");
        } else {
          this.$swal.fire({
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: "error",
            text: response.data.error_msg,
          });
        }
      } else {
        console.log(this.valid, "valid");
      }
    },
    cancel() {
      this.$router.push("/");
    },
    validPasswordConfirm() {
      if (this.passwordConfirm !== this.form.password) {
        this.checkPasswordConfirm = false;
        this.$swal.fire({
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          icon: "error",
          text: this.$t("register.passwordNotMatch"),
        });
      } else {
        this.checkPasswordConfirm = true;
      }
    },
    validEmail() {
      const mailformat =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (mailformat.test(this.form.username)) {
        this.checkEmail = true;
      } else if (this.form.username == "") {
        this.checkEmail = false;
        this.$swal.fire({
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          icon: "error",
          text: this.$t("register.validEmail"),
        });
      } else {
        this.checkEmail = false;
        this.$swal.fire({
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          icon: "error",
          text: this.$t("register.validEmail"),
        });
      }
    },
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
