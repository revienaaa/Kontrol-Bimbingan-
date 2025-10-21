
let data = JSON.parse(localStorage.getItem("mahasiswaData")) || [];

function renderTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  data.forEach((row, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td contenteditable="true" oninput="updateData(${i}, 'nim', this.innerText)">${row.nim}</td>
      <td contenteditable="true" oninput="updateData(${i}, 'nama', this.innerText)">${row.nama}</td>
      <td contenteditable="true" oninput="updateData(${i}, 'tahap', this.innerText)">${row.tahap}</td>
      <td contenteditable="true" oninput="updateData(${i}, 'promotor', this.innerText)">${row.promotor}</td>
      <td contenteditable="true" oninput="updateData(${i}, 'co', this.innerText)">${row.co}</td>
    `;
    tableBody.appendChild(tr);
  });
  updateDosenList();
}

function addRow() {
  data.push({ nim: "", nama: "", tahap: "", promotor: "", co: "" });
  saveData();
  renderTable();
}

function updateData(index, field, value) {
  data[index][field] = value;
  saveData();
  updateDosenList();
}

function saveData() {
  localStorage.setItem("mahasiswaData", JSON.stringify(data));
}

function updateDosenList() {
  const dosenSet = new Set();
  data.forEach(row => {
    if (row.promotor) dosenSet.add(row.promotor);
    if (row.co) dosenSet.add(row.co);
  });

  const select = document.getElementById("dosenSelect");
  const selectedValue = select.value;
  select.innerHTML = `<option value="">-- Pilih Dosen --</option>`;
  dosenSet.forEach(dosen => {
    const opt = document.createElement("option");
    opt.value = dosen;
    opt.textContent = dosen;
    if (dosen === selectedValue) opt.selected = true;
    select.appendChild(opt);
  });
}

function filterByDosen() {
  const selected = document.getElementById("dosenSelect").value;
  const tbody = document.getElementById("kontrolBody");
  tbody.innerHTML = "";

  const filtered = data.filter(
    row => row.promotor === selected || row.co === selected
  );

  filtered.forEach((row, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${row.nama}</td>
      <td>${row.tahap}</td>
    `;
    tbody.appendChild(tr);
  });
}

function openTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  event.target.classList.add("active");
}

renderTable();
