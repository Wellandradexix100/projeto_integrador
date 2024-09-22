document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.querySelector(".card-grid");
  const addCardForm = document.getElementById("addCardForm");
  const cardTextInput = document.getElementById("cardText");
  const cardImageInput = document.getElementById("cardImage");

  function createCard(text, imageUrl) {
    const card = document.createElement("div");
    card.className =
      "card-box bg-red-500 text-white p-4 flex flex-col items-center rounded-lg shadow-md card-animation";

    card.innerHTML = `
        <img src="${imageUrl}" alt="${text}" class="w-full h-40 object-cover mb-2 rounded-lg">
        <p class="text-center font-semibold text-lg text-white">${text}</p>
        <div class="flex justify-end w-full mt-2">
          <button class="edit-button text-blue-200 mr-2"><i class="fas fa-edit"></i></button>
          <button class="delete-button text-red-200"><i class="fas fa-times"></i></button>
        </div>
    `;

    card.onclick = () => speakText(text);

    const deleteButton = card.querySelector(".delete-button");
    deleteButton.onclick = (e) => {
      e.stopPropagation();
      card.remove();
    };

    const editButton = card.querySelector(".edit-button");
    editButton.onclick = (e) => {
      e.stopPropagation();
      const newText = prompt("Editar texto do cartão:", text);
      if (newText) {
        card.querySelector("p").textContent = newText;
      }
    };

    cardContainer.appendChild(card);
  }

  function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }

  addCardForm.onsubmit = (e) => {
    e.preventDefault();
    const text = cardTextInput.value;
    const imageFile = cardImageInput.files[0];

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        createCard(text, event.target.result);
      };
      reader.readAsDataURL(imageFile);
    }

    cardTextInput.value = "";
    cardImageInput.value = "";
  };
  document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    document
      .getElementById("toggleSidebar")
      .addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        mainContent.classList.toggle("collapsed");
      });
  });
});
