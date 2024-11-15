// Skapa en instans av Stripe
var stripe = Stripe("DIN_PUBLIC_KEY_HÄR");
var elements = stripe.elements();

// Skapa ett kortinmatningsfält
var style = {
   base: {
       color: "#32325d",
       fontFamily: 'Arial, sans-serif',
       fontSize: "16px",
       "::placeholder": {
           color: "#aab7c4"
       }
   },
   invalid: {
       color: "#fa755a",
       iconColor: "#fa755a"
   }
};

var card = elements.create("card", { style: style });
card.mount("#card-element");

// Hantera formulärets inskick
var form = document.getElementById("payment-form");

form.addEventListener("submit", function(event) {
   event.preventDefault();

   stripe.createToken(card).then(function(result) {
       if (result.error) {
           // Visa felmeddelande i gränssnittet
           var errorElement = document.getElementById("error-message");
           errorElement.textContent = result.error.message;
       } else {
           // Skicka token till backend för att bearbeta betalningen
           fetch("/charge", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ token: result.token.id })
           }).then(response => {
               if (response.ok) {
                   alert("Payment completed!");
               } else {
                   alert("An error occurred.");
               }
           });
       }
   });
});