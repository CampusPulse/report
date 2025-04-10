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

async function populateData(ev) {
  const buildingSelect = document.getElementById("building");

  const searchParams = new URL(document.location.toString()).searchParams;

  if (searchParams.has("room")) {
    document.getElementById("room").value = searchParams.get("room");
  }

  if (buildingSelect) {
    let response;

    try {
      response = await fetch("https://access.campusepulse.app/buildings.json");
    } catch (e) {
      response = await fetch("/buildings.json");
    }

    const data = await response.json();

    const buildings = data.buildings;
    // Alphabetically sort the building selection options by name
    buildings.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    buildings.forEach((building) => {
      const option = document.createElement("option");
      option.value = `${building.id}:${building.name}`;
      option.textContent = `${building.name}`;
      buildingSelect.appendChild(option);
    });

    if (searchParams.has("building")) {
      buildingSelect.value = searchParams.get("building");
    }
  }
}

document.addEventListener("DOMContentLoaded", populateData);
