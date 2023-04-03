const imgFile = document.getElementById("imgFile");
const imgPreview = document.getElementById("imgPreview");
const imgGrid = document.getElementById("imgGrid");


imgFile.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      imgPreview.src = reader.result;
      
      splitImage();
    };
    reader.readAsDataURL(file);
  }
});

function splitImage() {

  //bağlı liste 

  class Node {
    constructor(value) {
     
        this.value = value;
        this.north= null,
        this.south= null,
        this.east= null,
        this.west= null,
        this.northeast= null,
        this.northwest= null,
        this.southeast= null,
        this.southwest= null
      
    }
  }
  
  class LinkedList {
    constructor() {
      this.size = 0;
      this.grid = [];
    }
  
    addNode(value) {
      const node = new Node(value);
  
      // Yeni düğümü matrise ekle
      const row = Math.floor(this.size / 4);
      const col = this.size % 4;
      if (!this.grid[row]) {
        this.grid[row] = [];
      }
      this.grid[row][col] = node;
  
      // Komşu pointerları ayarla
      if (row > 0) {
        node.north = this.grid[row - 1][col];
        this.grid[row - 1][col].south = node;
      }
      if (col > 0) {
        node.west = this.grid[row][col - 1];
        this.grid[row][col - 1].east = node;
      }
      if (row > 0 && col > 0) {
        node.northwest = this.grid[row - 1][col - 1];
        this.grid[row - 1][col - 1].southeast = node;
      }
      if (row > 0 && col < 3) {
        node.northeast = this.grid[row - 1][col + 1];
        this.grid[row - 1][col + 1].southwest = node;
      }
  
      this.size++;
    }
  }
  const linkedList = new LinkedList();
  
  for (let i = 1; i <= 16; i++) {
    linkedList.addNode(i);
  }

  var a =-1;
  var b= -1;
  let idNum=1;
  const img = document.createElement("img");
  img.onload = function () {
    const imgWidth = img.width;
    const imgHeight = img.height;
    const tileSizeW = Math.min(imgWidth, imgHeight) / 4;
    const tileSizeH = Math.min(imgWidth, imgHeight) / 4;
    const canvas = document.createElement("canvas");
    canvas.width = tileSizeW;
    canvas.height = tileSizeH;
    const ctx = canvas.getContext("2d");
    for (let y = 0; y < 4; y++) {
      b=-1;
      a++;
      for (let x = 0; x < 4; x++) {
        b++;
        
        ctx.drawImage(
          img,
          x * tileSizeW,
          y * tileSizeH,
          tileSizeW,
          tileSizeH,
          0,
          0,
          tileSizeW,
          tileSizeH
        );
        const node = linkedList.grid[a][b];
        node.value='<img src="' + canvas.toDataURL() + '">';
        const tile = document.createElement("button");
        tile.className = "col";
        tile.id=idNum;
        idNum++;
        tile.innerHTML = node.value;
        
          
        imgGrid.appendChild(tile);
        
      }
    } swap();
  };
  img.src = imgPreview.src;
  
}

function swap(){
const buttons = document.querySelectorAll(".col");
let firstbutton = null;
let secondbutton =null;

buttons.forEach((button)=>{
  button.addEventListener("click", function (){
    
    if (firstbutton == null){
      firstbutton = button;
    }
    else{ 
      
      secondbutton = button;
      var temp = firstbutton.innerHTML;
      firstbutton.innerHTML = secondbutton.innerHTML;
      secondbutton.innerHTML=temp;
      firstbutton =null;
      secondbutton= null;
    }
    
  })
});}

