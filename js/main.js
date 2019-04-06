// Initialize Firebase
var config = {
  apiKey: "AIzaSyCDNeXk---IM1__T--nSzfwXDulDJrCRvw",
  authDomain: "contactform-89656.firebaseapp.com",
  databaseURL: "https://contactform-89656.firebaseio.com",
  projectId: "contactform-89656",
  storageBucket: "contactform-89656.appspot.com",
  messagingSenderId: "1051674367590"
};
firebase.initializeApp(config);


// Responsive nav
$(function () {
  menu = $('nav ul');

  $('#openup').on('click', function (e) {
    e.preventDefault();
    menu.slideToggle();
  });

  $(window).resize(function () {
    var w = $(this).width();
    if (w > 480 && menu.is(':hidden')) {
      menu.removeAttr('style');
    }
  });

  $('nav li').on('click', function (e) {
    var w = $(window).width();
    if (w < 480) {
      menu.slideToggle();
    }
  });
  $('.open-menu').height($(window).height());
});

// smooth scrolling
$('.cf a').on('click', function (event) {
  if (this.hash !== '') {
    event.preventDefault();
    const hash = this.hash;

    $('html, body').animate({
        scrollTop: $(hash).offset().top
      },
      800,
      function () {
        window.location.hash = hash;
      }
    )
  }
});

// References 
var messagesRef = firebase.database().ref('messages');

// listen for form submit

document.getElementById('contactForm').addEventListener('submit', submitForm);

// the SUBMIT Button 
function submitForm(e) {
  e.preventDefault();

  // get the value passed into the form input 
  var name = getInputValue('name');
  var company = getInputValue('company');
  var email = getInputValue('email');
  var phone = getInputValue('phone');
  var message = getInputValue('message');


  //save message here by calling the function that handles the values and instantiate it with the input values 
  saveMessages(name, company, email, phone, message);

  // show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide aler message 
  setTimeout(() => {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

  document.getElementById('contactForm').reset();
}

// create a function that collects the form value

function getInputValue(id) {
  return document.getElementById(id).value;
}

// save messages to firebase
function saveMessages(name, company, email, phone, message) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company: company,
    email: email,
    phone: phone,
    message: message
  });
}

// Accordion 
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}
