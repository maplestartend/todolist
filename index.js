const btnAdd = document.querySelector(".btn_add");
const txt = document.querySelector(".txt");
const list = document.querySelector(".list");
const listFooter = document.querySelector(".list_footer");
const listCount = document.querySelector(".list_footer p");
const checkbox = document.querySelector(".checkbox");
const tab = document.querySelector(".tab");

let data = [];
let tabID = "0";

function renderData() {
  let str = "";
  let countNum = 0;
  data.forEach((item, index) => {
    const listStr = `<li>
    <label class="checkbox" for="">
      <input type="checkbox" data-num=${index} ${item.status}>
      <span>${item.content}</span>
    </label>
    <a href="#" class="delete" data-num=${index}></a>
  </li>`;
    switch (tabID) {
      case "0":
        str += listStr;
        break;
      case "1":
        if (item.status === "") {
          str += listStr;
        }
        break;
      case "2":
        if (item.status === "checked") {
          str += listStr;
        }
        break;
    }
    if (item.status === "") countNum++;
  });
  list.innerHTML = str;
  listCount.textContent = `${countNum} 個待完成項目`;
  txt.value = "";
}

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  if (txt.value === "") {
    alert("請輸入待辦事項");
    return;
  }
  let obj = {};
  obj.content = txt.value;
  obj.status = "";
  data.push(obj);
  renderData();
});

list.addEventListener("click", (e) => {
  let num = e.target.getAttribute("data-num");
  if (e.target.getAttribute("class") === "delete") {
    e.preventDefault();
    data.splice(num, 1);
    renderData();
  }

  if (e.target.nodeName === "INPUT") {
    data[num].status === "checked"
      ? (data[num].status = "")
      : (data[num].status = "checked");
    renderData();
  }
});

listFooter.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.nodeName === "A") {
    data = data.filter(function (item) {
      return item.status === "";
    });
  }
  renderData();
});

tab.addEventListener("click", (e) => {
  const active = document.querySelector(".active");
  if (e.target.getAttribute("class") !== "active") {
    active.setAttribute("class", "");
    e.target.setAttribute("class", "active");
    tabID = e.target.getAttribute("id");
  }
  renderData();
});
