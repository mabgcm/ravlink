function sendMail() {

    var full_name = document.getElementById("fname").value;
    var company_name = document.getElementById("cname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var website = document.getElementById("website-text").value;
    var linkedin = document.getElementById("linkedin-text").value;
    var facebook = document.getElementById("facebook-text").value;
    var instagram = document.getElementById("instagram-text").value;
    var twitter = document.getElementById("twitter-text").value;
    var youtube = document.getElementById("youtube-text").value;


    // Check if required fields are filled
    if (!full_name || !company_name || !email || !phone) {
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
        full_name: full_name,
        company_name: company_name,
        email: email,
        phone: phone,
        website: website,
        linkedin: linkedin,
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
        youtube: youtube
    };
    emailjs.send('service_8j95bn4', 'template_dqap9ev', template)
        .then(function (res) {
            console.log('SUCCESS!', res.status, res.text);
            document.getElementById("fname").value = "";
            document.getElementById("cname").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("website-text").value = "";
            document.getElementById("linkedin-text").value = "";
            document.getElementById("facebook-text").value = "";
            document.getElementById("instagram-text").value = "";
            document.getElementById("twitter-text").value = "";
            document.getElementById("youtube-text").value = "";
            document.getElementById("website").checked = false;
            document.getElementById("linkedin").checked = false;
            document.getElementById("facebook-business").checked = false;
            document.getElementById("instagram-business").checked = false;
            document.getElementById("twitter").checked = false;
            document.getElementById("youtube").checked = false;

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