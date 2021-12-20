// Add event listener to form submittals
(function () {
  // endpoint for formspark service
  const ENDPT = "https://submit-form.com/ylFjWaig";
  const ERROR_MSG = "Unable to send";

  // global form elements
  const form = document.querySelector(".contact__form");
  const toast = form.querySelector(".form__toast-wrapper");

  // post form data to formspark endpoint
  async function postData(data) {
    fetch(ENDPT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => toggleToast(toast))
      .catch(() => handleError(toast));
  }

  // get field data from form and return it in structure of post body
  function getFormData(form) {
    const email = form.querySelector("#email");
    const msg = form.querySelector("#message");
    return { email: email.value, msg: msg.value };
  }

  function toggleToast(toast) {
    toast.classList.toggle("form__toast-wrapper--visible");
  }

  function handleError(toast) {
    const msg = toast.querySelector(".form__toast");
    msg.innerText = ERROR_MSG;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // send message to endpoint and display and alert user of success or fail
    await postData(getFormData(form));
    // hide toast after 2 seconds and clear form
    setTimeout(() => {
      toggleToast(toast);
      form.reset();
    }, 3000);
  });
})();
