function sendMail() {

    var form_name = document.getElementById("name").value;
    var form_email = document.getElementById("email").value;
    var form_phone = document.getElementById("phone").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    // Check if required fields are filled
    if (!form_name || !form_email || !form_phone || !subject || !message) {
        Toastify({
            text: "Please fill in all required fields.",
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            backgroundColor: "#FF5733",
            stopOnFocus: true,
        }).showToast();
        return; // Prevent form submission if fields are missing
    }
    var template = {
        form_name: form_name,
        form_email: form_email,
        form_phone: form_phone,
        subject: subject,
        message: message
    };
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