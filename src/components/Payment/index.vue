<template>
  <v-form class="ma-6">
    <v-row class="mt-5">
      <v-btn text @click="goback()">Back</v-btn>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="elevation-0 cardpayment mb-4">
          <v-card-title>
            <span class="headerCard">Delivery</span>
            <v-icon class="ml-2" color="green">mdi-check-circle-outline</v-icon>
          </v-card-title>
          <v-card-title class="pt-0">
            <span style="font-weight: 800; font-size: 20px"
              >Mobile Entry - Free</span
            >
          </v-card-title>
          <v-card-text>
            <span style="font-weight: 400; font-size: 20px"
              >Ticket Available by {{ convertDate(dateSelected) }} <br />
              These mobile tickets will be transferred directly to you from a
              trusted seller. We'll email you instructions on how to accept them
              on the original ticket provider's mobile app.</span
            >
          </v-card-text>
        </v-card>
        <v-card class="elevation-0 cardpayment">
          <v-card-title>
            <span class="headerCard">Payment</span>
            <v-icon class="ml-2" color="green">mdi-check-circle-outline</v-icon>
            <v-spacer></v-spacer>
            <img
              src="https://checkout.ticketmaster.com/static/images/preferred_payments_partner_paypal.svg"
            />
          </v-card-title>
          <v-card-title class="ml-4 py-0">
            <span style="font-weight: 800; font-size: 20px"
              >Use Credit / Debit Card</span
            >
          </v-card-title>
          <v-card-text>
            <v-radio-group v-model="creditCards">
              <!-- <template v-slot:label>
                <div>Your favourite <strong>search engine</strong></div>
              </template> -->
              <!-- <v-radio value="Google">
                <template v-slot:label>
                  <div>
                    Of course it's <strong class="text-success">Google</strong>
                  </div>
                </template>
              </v-radio> -->
              <!-- {
              image: "",
              typeOfCard: "Visa",
              expireDate: "00/11",
              cvv: "123",
              numberOfCard: "9999 9999 9999 9999",
              nameOfCard: "NUTTHAPON KULKRITTAYARAT",
              }, -->

              <v-radio
                v-for="(info, index) in cardData"
                :key="index"
                :value="info.numberOfCard"
                :class="
                  info.numberOfCard == creditCards
                    ? 'cardSelected'
                    : 'cardNotSelected'
                "
              >
                <template v-slot:label>
                  <v-row>
                    <v-col cols="2" sm="1">
                      <img :src="info.image" width="50px" />
                    </v-col>
                    <v-col cols="10" sm="11">
                      <v-col cols="12" class="pa-0">
                        <b style="color: #000; font-weight: 800"
                          >{{ info.typeOfCard }} -
                          {{ info.numberOfCard.substring(0, 4) }}</b
                        >
                      </v-col>
                      <v-col cols="12" md="12" class="pa-0">
                        {{ info.nameOfCard.substring(0, 10) }} | exp.
                        {{ info.expireDate }}
                      </v-col>
                      <v-col cols="12" class="pa-0">
                        <b><a href="">Edit</a></b> |
                        <b
                          ><a href="" @click="deleteCardData(index)"
                            >Delete</a
                          ></b
                        >
                      </v-col>
                    </v-col>
                    <v-col cols="12" class="pa-0">
                      <b>Security Code</b>
                      <v-row>
                        <v-col cols="4" sm="3">
                          <v-text-field
                            v-model="info.cvv"
                            type="password"
                            outlined
                            dense
                            maxlength="3"
                          >
                            <template v-slot:append v-if="cvv.length == 3">
                              <v-icon color="green"
                                >mdi-check-circle-outline</v-icon
                              >
                            </template>
                          </v-text-field>
                        </v-col>
                        <!-- <v-col cols="2" sm="2">
                          <v-img
                            src="@/assets/icon/cvv.png"
                            width="40px"
                          ></v-img>
                        </v-col> -->
                        <v-col cols="8" sm="9" style="display: inline-flex"
                          ><img
                            src="@/assets/icon/cvv.png"
                            width="40px"
                            height="40px"
                            class="mr-2"
                          />
                          <span class="mt-2"
                            >3-digits on back of card</span
                          ></v-col
                        >
                      </v-row>
                    </v-col>
                  </v-row>
                </template>
              </v-radio>
            </v-radio-group>
          </v-card-text>

          <v-form
            ref="createForm"
            v-model="checkValidate"
            :lazy-validation="lazy"
          >
            <v-card class="mx-4" max-width="100%" elevation="0">
              <v-card-actions v-if="!reveal">
                <span
                  @click="reveal = true"
                  style="
                    color: #026cdf;
                    font-size: 20px;
                    font-weight: 800;
                    display: inline-flex;
                  "
                >
                  <v-icon color="#026cdf">mdi-plus</v-icon>
                  <v-img
                    class="mx-4"
                    src="@/assets/icon/debit-cards.png"
                    width="40px"
                  ></v-img>
                  <span class="mt-2">Add New Card</span></span
                >
              </v-card-actions>

              <v-expand-transition>
                <v-card
                  v-if="reveal"
                  class="transition-fast-in-fast-out v-card--reveal"
                  style="height: 100%"
                  elevation="0"
                >
                  <v-card-text>
                    <v-row class="mt-0">
                      <v-col cols="6">
                        <label class="required">Name on Card</label>
                        <v-text-field
                          v-model="cardName"
                          reuired
                          dense
                          :rules="rules.selectRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <label class="required">Card Number</label>
                        <v-text-field
                          v-model="cardNumber"
                          v-mask="'#### #### #### ####'"
                          reuired
                          dense
                          :rules="rules.cardNumberrules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <label class="required">Expiration Date</label>
                        <v-text-field
                          v-model="cardExpiration"
                          v-mask="'##/##'"
                          placeholder="##/##"
                          reuired
                          dense
                          :rules="rules.exprules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <label class="required">Security Code</label>
                        <v-text-field
                          v-model="cardSecurity"
                          placeholder="###"
                          reuired
                          dense
                          :rules="rules.cvvrules"
                          type="password"
                          maxlength="3"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="pt-0">
                    <v-btn @click="reveal = false"> Close </v-btn>
                    <v-btn color="primary" @click="saveCard()"> SAVE </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </v-card>
          </v-form>

          <v-divider class="ma-4"></v-divider>
          <v-card-title class="ml-4 py-0">
            <span class="headerCard">Or Pay With</span>
          </v-card-title>
          <v-card-title class="ml-4 pt-0">
            <b style="font-weigh: 800"
              >By using a digital wallet and continuing past this page, you have
              read and are accepting the
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <a
                    target="_blank"
                    href="http://vuetifyjs.com"
                    @click.stop
                    v-on="on"
                    style="font-weight: 700"
                  >
                    Terms of Use.
                  </a>
                </template>
                <b>Opens in new window</b>
              </v-tooltip>
            </b>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="elevation-0 cardpayment">
          <v-expansion-panels v-model="panel" multiple flat>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-col cols="6">
                      <span class="headerCard">Total</span>
                    </v-col>
                    <v-col cols="6" style="text-align-last: right">
                      <span class="headerCard text-right"
                        >${{ totalprice }}</span
                      >
                    </v-col>
                    <v-col cols="8" class="text--secondary">
                      <v-fade-transition leave-absolute>
                        <span v-if="open" key="0">
                          <!-- Enter something -->
                        </span>
                        <span v-else key="1">
                          <!-- Enter something -->
                        </span>
                      </v-fade-transition>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row no-gutters>
                  <v-col cols="12" class="mt-4">
                    <b>Tickets</b>
                  </v-col>
                  <v-col cols="8"
                    ><span
                      >{{ title }}: ${{ ticketPrice }} x {{ quantity }}</span
                    ></v-col
                  >
                  <v-col cols="4" class="text-end">
                    ${{ totalBeforeFee }}</v-col
                  >
                  <v-col cols="12" class="mt-4">
                    <b>Notes From Seller</b>
                  </v-col>
                  <v-col cols="12">
                    xfr XFER Proof of at least one dose of COVID-19 vaccination
                    for ages 5 to 11 and guests ages 12 and up will be required
                    to show proof of two COVID-19 vaccine doses or one dose of
                    the Johnson & Johnson vaccine. Masks must be worn.
                  </v-col>
                  <v-col cols="12" class="mt-4">
                    <b>Fees</b>
                  </v-col>
                  <v-col cols="8"
                    >Service Fee: ${{ serviceFee }} x {{ quantity }}</v-col
                  >
                  <v-col cols="4" class="text-end">
                    ${{ totalServiceFee }}</v-col
                  >
                  <v-col cols="8">Order Processing Fee</v-col>
                  <v-col cols="4" class="text-end">
                    ${{ orderProcessFee }}</v-col
                  >
                  <v-col cols="12" class="mt-4">
                    <b>Delivery</b>
                  </v-col>
                  <v-col cols="8">Mobile Entry</v-col>
                  <v-col cols="4" class="text-end">
                    {{ mobileEntryFee ? "$" + mobileEntryFee : "Free" }}</v-col
                  >
                  <v-col cols="12" class="mt-6 mb-4">
                    <b style="color: #026cdf" @click="cancel()">Cancel Order</b>
                  </v-col>
                  <v-col cols="12" class="mt-4">
                    <b>*All Sales Final - No Refunds</b>
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox
                      v-model="agreement"
                      required
                      :rules="rules.selectRules"
                    >
                      <template v-slot:label>
                        <div>
                          <b>I have read and agree to the current</b>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <a
                                target="_blank"
                                href="http://vuetifyjs.com"
                                @click.stop
                                v-on="on"
                                style="font-weight: 700"
                              >
                                Terms of Use.
                              </a>
                            </template>
                            <b>Opens in new window</b>
                          </v-tooltip>
                          <!-- is awesome -->
                        </div>
                      </template></v-checkbox
                    >
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-col cols="12">
            <v-btn block color="#3b7e2a" style="color: white" @click="submit()">
              Place Order
            </v-btn>
          </v-col>
          <v-col cols="12" class="pt-0">
            <span style="font-weight: 700; font-size: 12px"
              >*Exceptions may apply, see our Terms of Use.</span
            >
          </v-col>

          <!-- <v-card-text>
            <v-text-field
              label="Name on Card"
              v-model="cardName"
            ></v-text-field>
            <v-text-field
              label="Card Number"
              v-model="cardNumber"
            ></v-text-field>
            <v-text-field
              label="Expiration Date"
              v-model="cardExpiration"
            ></v-text-field>
            <v-text-field
              label="Security Code"
              v-model="cardSecurity"
            ></v-text-field>
          </v-card-text> -->
        </v-card>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import moment from "moment";
export default {
  name: "TicketBuyingPage",

  data() {
    return {
      checkValidate: true,
      lazy: false,
      ticketPrice: 229.0,
      reveal: false,
      agreement: false,
      panel: [0],
      cvv: "123",
      numTickets: 1,
      cardName: "",
      cardNumber: "",
      cardExpiration: "",
      cardSecurity: "",
      showcardinfo: false,
      creditCards: "9999 9999 9999 9999",
      dateSelected: null,
      title: null,
      quantity: null,
      cardData: [
        {
          image:
            "https://www.t2pco.com/assets/images/home/Logo_license_Visa-min.webp",
          typeOfCard: "Visa",
          expireDate: "00/11",
          cvv: "123",
          numberOfCard: "9999 9999 9999 9999",
          nameOfCard: "NUTTHAPON KULKRITTAYARAT",
        },
      ],
      rules: {
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        selectRules: [(val) => !!val || "This field is required"],
        tel: [
          (v) =>
            (v.length <= 10 && v.length >= 9) ||
            "Phone Number must be 9-10 charactors only.",
          (v) => !!v || "Please enter your phone number.",
        ],
        cardNumberrules: [
          (v) =>
            (v.length <= 19 && v.length >= 19) ||
            "Card Number must be 16 charactors.",
          (v) => !!v || "This field is required",
        ],
        exprules: [
          (v) =>
            (v.length <= 5 && v.length >= 5) ||
            "Exipire Date Number must be 4 charactors.",
          (v) => !!v || "This field is required",
        ],
        cvvrules: [
          (v) =>
            (v.length <= 3 && v.length >= 3) ||
            "CVV Number must be 3 charactors.",
          (v) => !!v || "This field is required",
        ],
      },
      totalBeforeFee: null,
      serviceFee: null,
      totalServiceFee: null,
      orderProcessFee: 2.95,
      mobileEntryFee: 0,
      totalprice: null,
    };
  },
  created() {
    console.log("this.$route.query", this.$route.query);
    this.dateSelected = this.$route.query.dateSelected;
    this.title = this.$route.query.title;
    this.quantity = this.$route.query.quantity;
    this.summaryData();
  },
  methods: {
    summaryData() {
      this.totalBeforeFee = (this.ticketPrice * this.quantity).toFixed(2) * 1;
      this.serviceFee = (this.ticketPrice.toFixed(2) * 0.1).toFixed(2) * 1;
      this.totalServiceFee = (this.serviceFee * this.quantity).toFixed(2) * 1;
      console.log(
        this.totalBeforeFee,
        this.totalServiceFee,
        this.orderProcessFee,
        this.mobileEntryFee
      );
      this.totalprice = (
        this.totalBeforeFee * 1 +
        this.totalServiceFee * 1 +
        this.orderProcessFee +
        this.mobileEntryFee * 1
      ).toFixed(2);
    },
    goback() {
      this.$router.push("/");
    },
    cancel() {
      this.$swal
        .fire({
          icon: "question",
          title: `Do you want to cancel order ?`,
          confirmButtonText: `Yes`,
          cancelButtonText: `No`,
          showCancelButton: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.$router.push("/");
          }
        });
      // });
    },
    submit() {
      // Submit form logic goes here
      if (this.agreement) {
        this.$swal
          .fire({
            icon: "success",
            text: "Payment Success",
            showConfirmButton: false,
            timer: 1500,
          })
          .then(async (result) => {
            this.$router.push("/");
          });
      } else {
        this.$swal.fire({
          icon: "warning",
          text: "Please accept the terms of use",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    convertDate(date) {
      return moment(date).format("ddd MMM D, YYYY");
    },
    saveCard() {
      if (this.$refs.createForm.validate(true)) {
        this.cardData.push({
          image:
            "https://www.t2pco.com/assets/images/home/Logo_license_Visa-min.webp",
          typeOfCard: "Visa",
          nameOfCard: this.cardName,
          numberOfCard: this.cardNumber,
          expireDate: this.cardExpiration,
          cvv: this.cardSecurity,
        });
        this.creditCards = this.cardNumber;
        this.reveal = false;
      }
    },
    deleteCardData(index) {
      if (this.cardData.length > 1) {
        this.cardData.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.cardpayment {
  border-radius: 4px;
  border: solid 1px #bababa;
}
.mdi-check-circle-outline::before {
  content: "\F05E1";
  color: green;
}
.headerCard {
  font-weight: 800;
  font-size: 24px;
}
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

a:active {
  text-decoration: none;
}
.required:after {
  content: "*";
  position: relative;
  font-size: inherit;
  color: #ff0000; /* replace with your desired color */
  padding-left: 0.25rem;
  font-weight: bold;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  /* position: absolute; */
  width: 100%;
}
.cardSelected {
  align-items: start;
  border: solid 2px #99c7ff;
  padding: 20px;
  background-color: #f5faff;
  padding: 20px;
  border-radius: 2px;
}
.cardNotSelected {
  align-items: start;
  border: solid 2px #ffff;
  padding: 20px;
  background-color: #ffff;
  padding: 20px;
  border-radius: 2px;
}
</style>
