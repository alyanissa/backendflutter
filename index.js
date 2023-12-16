const mahasiswaNim = "2020004015";
const updateData = {
  nama: "Alyanissa",
  gander: "P",
  prodi: "TI",
  alamat: "Jl. Cikukulu Caringin",
};

fetch("http://localhost:3000/mahasiswa/${mahasiswaNim}", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(updateData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
