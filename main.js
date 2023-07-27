import menu from "./db.js";
// 1
import { buttonsData } from "./db.js";

// htmlden gelenler
const menuContainer = document.getElementById("menu-container");
const buttonsArea = document.getElementById("buttons-area");

// menu elemanlarını yazdıracak fonks

// 4
// sayfa yüklendiği anda gösteren elemnıları listeleyen fonk izler
document.addEventListener("DOMContentLoaded", () => {
  // birden fazla fonk varsa süslü parantez
  displayMenuItems(menu);
  showButtons("all");
});

// 2
function displayMenuItems(menuItems) {
  console.log(menuItems);

  // dizideki her bir obje için
  // bir menu elemanını temsil eden html oluştur.
  // ve yeni diziye aktar.
  // yeni dizi oluşturacağım için yeni elemena verdim.

  // 5
  let displayMenu = menuItems.map(
    (item) =>
      `
<a href="/productDetail.html?id" id="card" class="d-flex gap-3 flex-column flex-md-row text-decoration-none text-dark">
<img class="rounded shadow" src=${item.img} >
<div>
    <div class="d-flex justify-content-between">
        <h5>${item.title}</h5>
        <p>${item.price}</p>
    </div>
    <p class="lead">${item.desc}
    </p>
</div>
</a>  

`
  );
  // 3
  // diziiyi virgülü silerek string yapma
  displayMenu = displayMenu.join(' ');

  // oluşan menuyu htmleye gönderme
  menuContainer.innerHTML = displayMenu;
}

// butonları htmlden geitrme
buttonsArea.addEventListener("click", searchCategory);

// tıklanınlan butona göre ekrana o kategoriyi alan
// ve basmakla göreveli
function searchCategory(e) {
  const category = e.target.dataset.category;
  // targetdataset consolo yazdır ve ordan al.

  // tüm dizideki elemanlarda kategori değeri aynı olanları
  // bir diziye aktarma

  const filteredMenu = menu.filter(
    (menuItem) => menuItem.category === category
  );

  // ekrana basma
  // hepsi seçildiysetüm menuyu ekrana basmakiçin
  if (category === "all") {
    displayMenuItems(menu);
    return;
  }
  displayMenuItems(filteredMenu);

  // butonları güncellemek için
  showButtons(category);
}

// ekrana menu butonalarını nbasacak fon
function showButtons(active) {

    console.log(active)
  // eskileri temizle
  buttonsArea.innerHTML = "";
  // yeniler ekleme
  buttonsData.forEach((btn) => {
    // html butonu oluşturma
    const buttonElement = document.createElement("button");

    //    bilgilerini yazdırma
    buttonElement.className = "btn btn-outline-dark filter-btn";

    buttonElement.innerText = btn.text;

    //  data tanımlama
    buttonElement.dataset.category = btn.data;

    //  tıkladığında seçilmiş gibi gözükmesi için
    if (buttonElement.dataset.category === active) {
      buttonElement.classList.add("bg-dark");
      buttonElement.classList.add("text-light");
    }

    // html yönderme
    buttonsArea.appendChild(buttonElement);
  });
}
