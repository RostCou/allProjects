import { el, setChildren } from "redom";
import valid from "card-validator";
import iMask from "imask";
import emailValid from "email-validator-rfc-5322";
import "./bootstrap.min.css";

document.body.classList.add("bg-light");

const date = new Date();
const userCard = {
  cardNumberValid: false,
  cardDateValid: false,
  cardCodeValid: false,
  correctEmail: false,
};

const container = el(".container.text-center", { style: "max-width: 500px" });
const form = el(
  "form.p-3.d-flex.flex-wrap.justify-content-between.gap-3.rounded.bg-info-subtle.text-start",
  {
    onsubmit(e) {
      e.preventDefault();
    },
  }
);
const formCardIcon = el("img.rounded", { style: "height: 25px" });
const inputCardNumber = el("input.form-control", validationCard("card-number"));
const inputCardDate = el("input.form-control", validationCard("card-date"));
const inputCardCode = el("input.form-control", validationCard("card-code"));
const formButton = el(
  "button.btn.btn-success.align-self-end",
  {
    disabled: true,
    style: "width: 25%",
  },
  "Pay"
);

settingMask(inputCardNumber, inputCardDate, inputCardCode);

setChildren(document.body, container);
setChildren(container, [el("h1", "Payment system"), form]);
setChildren(form, [
  el(
    ".w-100.d-flex.flex-wrap.justify-content-between",
    el("label.form-label", "Card number"),
    formCardIcon,
    inputCardNumber
  ),
  el("", el("label.form-label", "Card expiration date"), inputCardDate),
  el("", el("label.form-label", "CVC/CVV"), inputCardCode),
  el(
    "",
    el("label.form-label", "Email address for sending an online receipt"),
    el("input.form-control", {
      onkeydown(e) {
        this.classList.remove("bg-danger");
      },
      onblur(e) {
        userCard.correctEmail = false;
        if (emailValid.validate(this.value)) userCard.correctEmail = true;
        else this.classList.add("bg-danger");
        swapActivateButton();
      },
      placeholder: "name@company.domain",
    })
  ),
  formButton,
]);

function validationCard(id) {
  const obj = {
    oninput() {
      this.classList.remove("bg-danger");
    },
  };
  switch (id) {
    case "card-number":
      return {
        oninput() {
          this.classList.remove("bg-danger");
          const numberValid = valid.number(this.value);
          if (numberValid.card) {
            switch (numberValid.card.type) {
              case "visa":
                formCardIcon.src = require("./assets/images/visa.png");
                break;
              case "mastercard":
                formCardIcon.src = require("./assets/images/mastercard.png");
                break;
              case "american-express":
                formCardIcon.src = require("./assets/images/american-express.png");
                break;
              case "diners-club":
                formCardIcon.src = require("./assets/images/diners-club.png");
                break;
              case "discover":
                formCardIcon.src = require("./assets/images/discover.png");
                break;
              case "jcb":
                formCardIcon.src = require("./assets/images/jcb.png");
                break;
              case "unionpay":
                formCardIcon.src = require("./assets/images/unionpay.png");
                break;
              case "maestro":
                formCardIcon.src = require("./assets/images/maestro.png");
                break;
              case "elo":
                formCardIcon.src = require("./assets/images/elo.png");
                break;
              case "mir":
                formCardIcon.src = require("./assets/images/mir.png");
                break;
              case "hiper":
                formCardIcon.src = require("./assets/images/hiper.png");
                break;
              case "hipercard":
                formCardIcon.src = require("./assets/images/hipercard.png");
                break;
              default:
                formCardIcon.src = require("./assets/images/other.png");
                break;
            }
          } else formCardIcon.src = "";
        },
        onblur() {
          const numberValid = valid.number(this.value);
          if (!numberValid.isValid) this.classList.add("bg-danger");
          else userCard.cardNumberValid = true;
          swapActivateButton();
        },
        placeholder: "0000 0000 0000 0000",
      };
    case "card-date":
      return {
        ...obj,
        ...{
          onblur() {
            if (valid.expirationDate(this.value).isValid)
              userCard.cardDateValid = true;
            else {
              this.classList.add("bg-danger");
              userCard.cardDateValid = false;
            }
            swapActivateButton();
          },
          placeholder: "00 / 00",
        },
      };
    case "card-code":
      return {
        ...obj,
        ...{
          onblur() {
            if (valid.cvv(this.value).isValid && this.value.length === 3)
              userCard.cardCodeValid = true;
            else {
              this.classList.add("bg-danger");
              userCard.cardCodeValid = false;
            }
            swapActivateButton();
          },
          placeholder: "000",
        },
      };
    default:
      break;
  }
}

function settingMask(formCardNumber, formCardDate, formCardCode) {
  iMask(formCardNumber, { mask: "0000 0000 0000 0000" });
  iMask(formCardDate, {
    mask: "MM / YY",
    blocks: {
      MM: {
        mask: iMask.MaskedRange,
        from: 1,
        to: 12,
      },
      YY: {
        mask: iMask.MaskedRange,
        from: Number(date.getFullYear().toString().slice(2)),
        to: Number(date.getFullYear().toString().slice(2)) + 30,
      },
    },
  });
  iMask(formCardCode, { mask: "000" });
}

function swapActivateButton() {
  if (
    userCard.cardCodeValid &&
    userCard.cardDateValid &&
    userCard.cardNumberValid &&
    userCard.correctEmail
  )
    formButton.disabled = false;
  else formButton.disabled = true;
}
