const MAX_SPIN_TIME = 1400;
const LOC = "https://www.sweepfox.com/example";

// HELPER
// returns promise (use with async):
const wait = function (time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), Math.floor(Math.random() * time));
  });
};

//** MODEL **//
// Questions
const q0 = "Are you currently a paying member of any of the following?";
const q1 = "Do you have an unlimited monthly data plan?";
const q2 = "Do you currently have a 5g enabled device?";
const q3 = "Have you upgraded your device in the last year?";
const q4 = "How much do you pay monthly for your current plan?";
// const qInput = "Tell us why you want to win an <i><b>iPhone 12 Pro</i></b>"; //Is this illegal? lol
// TODO:: this instead of below?
const promptCont =
  'Thank you.</br>Submit your email on the next page to claim your <br class="custom-br-1" /><i><b>iPHONE 12 Pro</b></i>-- while supplies last!';
// Answers
const answersQ0 = ["Verizon", "AT&T", "T-Mobile", "Sprint", "Other"];
const answersQ1 = ["Yes", "No"];
const answersQ2 = ["Yes", "No", "Not sure"];
const answersQ3 = ["Yes", "No"];
const answersQ4 = [
  "$80 or More",
  "$60-79",
  "$35-59",
  "Under $35",
  "Prefer not to say",
];
// const btnForm = ["Submit"]; //connected to qInput
const btnRd = ["Get my iPhone 12 Pro"]; //redirect button
const state = {
  questions: [q0, q1, q2, q3, q4, promptCont],
  answers: [answersQ0, answersQ1, answersQ2, answersQ3, answersQ4, btnRd],
  nextIndex: 0,
};

const setNextIndex = (newIndex) => (state.nextIndex = newIndex);
const incrementState = () => {
  state.nextIndex++;
  return state.nextIndex;
};

//** VIEW **//
const images = document.querySelector(".img-container");
const question = document.querySelector(".question-container");
// const form = document.querySelector(".form-container");
const answers = document.querySelector(".answer-container");
const shortCut = document.querySelector(".short-cut-container");
const disclaimer = document.querySelector(".disclaimer-container");
const recaptcha = document.querySelector(".bot-check-container");

const hideElement = function (el) {
  el.classList.add("hidden");
};
const showElement = function (el) {
  el.classList.remove("hidden");
};

// TODO:: Refactor this function to take a STRING -- then make the array ref (state.questions[qNum]) outside this func (in the caller)
const changeQuestion = function (qNum, qText) {
  question.innerHTML = "";

  question.insertAdjacentHTML(
    "afterbegin",
    `<span class="q-number">${qNum}</span>
        <span class="q-text">${qText}</span>`
  );
  // `<span class="q-number">${
  //   qNum === state.questions.length - 1 ? "" : qNum + 1 + ". "
  // }</span>
  //     <span class="q-text">${state.questions[qNum]}</span>`;
};

// const generateForm = function () {
//     form.insertAdjacentHTML('afterbegin', `<div class="form-container">
//     <input type="text" class="form-text-input" maxlength="20" />
//   </div>
//     `)
// };

// Renders answer buttons from array of strings (strings are the button text)
const changeAnswers = function (ansArr) {
  //   const answers = Array.from(document.querySelectorAll(".answer"));
  answers.innerHTML = "";
  ansArr.forEach((ans, i) => {
    answers.insertAdjacentHTML(
      "beforeend",
      `<div class="a-box w3-animate-opacity">
          <button class="button answer" id="answer-${i + 1}">${ans}</button>
        </div>`
    );
  });
  //   state.answers[qNum].forEach((ans, i) => {
  //     answers.insertAdjacentHTML(
  //       "beforeend",
  //       `<div class="a-box w3-animate-opacity">
  //           <button class="button answer" id="answer-${i + 1}">${ans}</button>
  //         </div>`
  //     );
  //   });
};
//time is in milliseconds
const renderSpinner = async function (el, time) {
  const markup = `
      <div class="loader" id="quiz-loader"></div>
    `;
  el.innerHTML = "";
  el.insertAdjacentHTML("afterbegin", markup);

  await wait(time);
  el.innerHTML = "";
};

function confirmRecaptcha(res) {
  console.log(res);
  hideElement(recaptcha);

  const redirectButton = document.querySelector("#answer-1");
  // enable submit button
  if (redirectButton) redirectButton.classList.remove("button-disabled");
}

const redirect = function (LOC) {
  window.location.replace(LOC);
};

answers.addEventListener("click", (e) => {
  const btn = e.target.closest(".button");
  if (!btn) return;
  controller();
});

shortCut.addEventListener("click", () => {
  setNextIndex(state.questions.length - 1);
  controller();
});

//** CONTROLLER **//
const controller = async function () {
  const curr = state.nextIndex;
  // last question -- complete recaptcha, redirect to offer
  if (curr === state.questions.length) {
    return redirect(LOC);
  }
  hideElement(images);
  showElement(shortCut);

  // second to last question
  if (curr === state.questions.length - 1) {
    //render spinner
    await renderSpinner(answers, MAX_SPIN_TIME);
    showElement(images);
    showElement(recaptcha);
    showElement(disclaimer);

    hideElement(shortCut);
  }
  const qNum = curr === state.questions.length - 1 ? "" : curr + 1 + ". ";
  const qText = state.questions[curr];
  changeQuestion(qNum, qText);
  //   if (curr === state.questions.length - 2) {
  // generateForm();
  //   }
  const ansArr = state.answers[curr];
  changeAnswers(ansArr);

  // disable button for second to last question
  // cleaner way to do this than two if-statements with the same condition?? 🤷‍♂️
  if (curr === state.questions.length - 1) {
    const btnRd = document.querySelector("#answer-1");
    btnRd.classList.add("button-disabled", "button-long");
    // btnRd.closest(".a-box").classList.add("a-box-long");
  }

  incrementState();
};

const init = () => {
  //hide recaptcha
  hideElement(recaptcha);

  //TODO:: turn the strings into variables at the top;
  changeQuestion(
    "",
    `Answer this short survey about your cellular carrier to
    <br class="custom-br-1" />win a brand new: <br />
    <i><b>iPhone 12 Pro</b></i
    ><sup class="limited"><b>*Limited Supply</b></sup>`
  );
  changeAnswers([`Begin`]);
};

//saves state for back button
window.history.pushState({}, "", window.location.href);
init();
