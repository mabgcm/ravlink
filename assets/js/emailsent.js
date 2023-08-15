function sendMail() {
    var template = {
        form_name: document.getElementById("name").value,
        form_email: document.getElementById("email").value,
        form_phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    }
    emailjs.send('service_plh1e6e', 'template_wf6smzg', template)
        .then(function (res) {
            console.log('SUCCESS!', res.status, res.text);
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";

            Toastify({
                text: "Your message sent successfully!",
                duration: 1500,
                close: true,
                gravity: "bottom",
                position: "left",
                backgroundColor: "#001253",
                stopOnFocus: true,
            }).showToast();
        }, function (error) {
            console.log('FAILED...', error);
        });
    // console.log(template.message)
}

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Call your sendMail() function here
    sendMail();
});