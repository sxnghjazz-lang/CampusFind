
const form = document.getElementById("itemForm");
const list = document.getElementById("itemList");
const search = document.getElementById("search");

let items = JSON.parse(
  localStorage.getItem("campusItems") || "[]"
);

function displayItems() {
  const query = search.value.toLowerCase();

  list.replaceChildren();

  items.filter(item =>
    [item.name, item.category, item.location]
      .some(value =>
        value.toLowerCase().includes(query)
      )
  ).forEach(item => {
    const card = document.createElement("article");
    card.className = "item-card";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const details = document.createElement("p");
    details.textContent =
      `${item.type} | ${item.category} | ${item.location}`;

    const date = document.createElement("p");
    date.textContent = `Date: ${item.date}`;

    const description = document.createElement("p");
    description.textContent = item.description;

    card.append(title, details, date, description);
    list.appendChild(card);
  });
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const item = {
    name: document.getElementById("name").value.trim(),
    type: document.getElementById("type").value,
    category: document.getElementById("category").value.trim(),
    location: document.getElementById("location").value.trim(),
    date: document.getElementById("date").value,
    description: document.getElementById("description").value.trim()
  };

  if (!item.name || !item.category ||
      !item.location || !item.date || !item.description) {
    return;
  }

  items.unshift(item);

  localStorage.setItem("campusItems", JSON.stringify(items));

  form.reset();
  document.getElementById("message").textContent =
    "Item reported successfully!";

  displayItems();
});

search.addEventListener("input", displayItems);

displayItems();
