const payments = [
  {
    name: "City of Phoenix",
    dueDay: 6,
    link: "https://phxadb2c.b2clogin.com/phxadb2c.onmicrosoft.com/b2c_1_eportal_signupsignin/oauth2/v2.0/authorize?client_id=a0cd6935-9960-4fb3-b4f4-7a06e6aea8cb&scope=openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Fpayonline.phoenix.gov%2Feportal&client-request-id=61947b90-d6ec-41cf-a8ae-dce7a3e70e42&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=2.39.0&client_info=1&code_challenge=AyIAiOnYVY1aHyago5ou4Xfvh2xbxVNOainyGWJN99c&code_challenge_method=S256&nonce=ebc7bc2d-41da-4d18-92ed-82897f193301&state=eyJpZCI6Ijg5NWI5YzI0LWVmYjctNDgzYy1hMmVkLWMwMWIyZmNhNGI2OCIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D"
  },
  {
    name: "House Payment",
    dueDay: 1,
    link: "https://loansphereservicingdigital.bkiconnect.com/newamericanfunding/#/login"
  },
  {
    name: "Progressive Payment",
    dueDay: 15,
    link: "https://www.progressive.com/"
  }
];

function getStatusColor(dueDay) {
  const today = new Date().getDate();
  const diff = dueDay - today;

  if (diff > 3) return "green";
  if (diff >= 0) return "yellow";
  return "red";
}

function renderPayments() {
  const list = document.getElementById("payment-list");

  payments.forEach(payment => {
    const color = getStatusColor(payment.dueDay);

    const card = document.createElement("div");
    card.className = `payment-card ${color}`;
    card.innerHTML = `
      <h2>${payment.name}</h2>
      <p><strong>Due:</strong> ${payment.dueDay} of each month</p>
      <p><a href="${payment.link}" target="_blank">Go to Payment</a></p>
    `;

    // Highlight payments due on the 15th
    if (payment.dueDay === 15) {
      card.style.border = "2px solid #ff0000"; // Red border for 15th
    }

    list.appendChild(card);
  });
}

renderPayments();
