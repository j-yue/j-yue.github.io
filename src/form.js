// Add event listener to form submissions
(function () {
  // endpoint for formspark service
  const ENDPT = "https://submit-form.com/ylFjWaig";
  const ERROR_MSG = "Unable to send";
  const SUCCESS_MSG = "Message sent";

  // global form elements
  const form = document.querySelector(".contact__form");
  const toast = form.querySelector(".form__toast-wrapper");
  const msg = toast.querySelector(".form__toast");

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
      .then((res) => handleFormToast(res.status === 200))
      .catch(() => handleFormToast(false));
  }

  // get field data from form and return it in structure of post body
  function getFormData(form) {
    const email = form.querySelector("#email");
    const msg = form.querySelector("#message");
    return { email: email.value, msg: msg.value };
  }

  function toggleToast() {
    toast.classList.toggle("form__toast-wrapper--visible");
  }

  //show message depending on success of posting to formspark
  function handleFormToast(status) {
    const _msg = status ? SUCCESS_MSG : ERROR_MSG;
    msg.innerText = _msg;
    toggleToast();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // send message to endpoint and display and alert user of success or fail
    await postData(getFormData(form));
    // hide toast after 3 seconds and clear form
    setTimeout(() => {
      toggleToast();
      form.reset();
    }, 3000);
  });
})();
