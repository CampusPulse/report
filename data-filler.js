function addToDesc(text, button = undefined) {
  const descriptionSelect = document.getElementById("description");

  console.log("addToDesc", descriptionSelect.value, text);

  if (descriptionSelect.value.includes(text)) {
    descriptionSelect.value = descriptionSelect.value.replace(text, "");
  } else {
    if (descriptionSelect.value.endsWith(" ") || !descriptionSelect.value) {
      descriptionSelect.value += text;
    } else {
      descriptionSelect.value += " " + text;
    }
  }

  if (button) {
    const buttonSelect = document.getElementById(button);
    console.log("toggling button", button, buttonSelect);
    buttonSelect.classList.toggle("active");
  }
}

function populateData(ev) {
  const buildingSelect = document.getElementById("building");

  const searchParams = new URL(document.location.toString()).searchParams;

  if (searchParams.has("room")) {
    const roomParam = searchParams.get("room");
    if (roomParam) {
      document.getElementById("room").value = roomParam;
    }
  }

  if (buildingSelect) {
    fetch("/buildings.json")
      .then((response) => response.json())
      .then((data) => {
        const buildings = data.buildings;
        // Alphabetically sort the building selection options by name
        buildings.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        data.buildings.forEach((building) => {
          const option = document.createElement("option");
          option.value = `${building.id}:${building.name}`;
          option.textContent = `${building.name}`;
          buildingSelect.appendChild(option);
        });
      });
  }
}

document.addEventListener("DOMContentLoaded", populateData);
