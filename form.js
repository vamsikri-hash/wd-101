let userEntries = localStorage.getItem("user-entries");

if (userEntries) {
  userEntries = JSON.parse(userEntries);
} else {
  userEntries = [];
}

const displayEntries = () => {
  const savedUserEntries = localStorage.getItem("user-entries");
  let entries = "";
  if (savedUserEntries) {
    const parsedUserEntries = JSON.parse(savedUserEntries);
    entries = parsedUserEntries
      .map((entry) => {
        const name = `<td class="py-4 px-6">${entry.name}</td>`;
        const email = `<td class="py-4 px-6">${entry.email}</td>`;
        const password = `<td class="py-4 px-6">${entry.password}</td>`;
        const dob = `<td class="py-4 px-6">${entry.dob}</td>`;
        const acceptTerms = `<td class="py-4 px-6">${entry.acceptTermsAndConditions}</td>`;
        const row = `<tr class="border border-gray-400">
                       ${name} ${email} ${password} ${dob} ${acceptTerms}
                     </tr>`;
        return row;
      })
      .join("\n");
  }
  var table = `<table border='1' width='100%' class="border border-slate-400 w-full text-sm text-left">
      <thead class="text-sm text-gray-700 uppercase bg-gray-100">
      <tr>
      <th class="py-3 px-6">Name</th>
      <th class="py-3 px-6">Email</th>
      <th class="py-3 px-6">Password</th>
      <th class="py-3 px-6">dob</th>
      <th class="py-3 px-6">accepted terms?</th>
    </tr></thead> ${entries} </table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions =
    document.getElementById("acceptTerms").checked;
  const userDetails = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };

  userEntries.push(userDetails);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  displayEntries();

  document.getElementById("user-form").reset();
};

let form = document.getElementById("user-form");
form.addEventListener("submit", saveUserForm, true);

displayEntries();

const calculateAge = (dob) => {
  const today = new Date();
  const dateOfBirth = new Date(dob);
  let age = today.getFullYear() - dateOfBirth.getFullYear() - 1;
  const differenceInMonth = today.getMonth() - dateOfBirth.getMonth();
  const differenceInDate = today.getDate() - dateOfBirth.getDate();

  if (differenceInMonth > 0) {
    age = age + 1;
  } else if (differenceInMonth === 0) {
    if (differenceInDate > 0) age = age + 1;
  }
  return age;
};

const datePicker = document.getElementById("dob");
datePicker.max = new Date().toISOString().split("T")[0];

datePicker.addEventListener("change", () => {
  const age = calculateAge(datePicker.value);
  if (age < 18 || age > 55) {
    datePicker.setCustomValidity("Age should be between 18 and 55 only!");
  } else {
    datePicker.setCustomValidity("");
  }
  datePicker.reportValidity();
});
