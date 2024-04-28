document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Here you can add code to send the form data to your server using AJAX
    // For this example, let's just display the data in the response div
    var responseDiv = document.getElementById("response");
    responseDiv.innerHTML =
      "<p>Name: " +
      name +
      "</p>" +
      "<p>Email: " +
      email +
      "</p>" +
      "<p>Message: " +
      message +
      "</p>";
    // You can also reset the form fields after submission
    document.getElementById("contact-form").reset();
  });
