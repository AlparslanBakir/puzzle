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
      this.ID = value;
      this.placed = null;
      this.next = null;
      (this.north = null),
        (this.south = null),
        (this.east = null),
        (this.west = null),
        (this.northeast = null),
        (this.northwest = null),
        (this.southeast = null),
        (this.southwest = null);
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
 // sıradaki düğüm pointerı : 1,2,3,4,5....16
  let currentNode = linkedList.grid[0][0];
  for (let i = 0; i < linkedList.size - 1; i++) {
    currentNode.next = linkedList.grid[Math.floor((i + 1) / 4)][(i + 1) % 4];
    currentNode = currentNode.next;
    
  }
  

  var a = -1;
  var b = -1;
  let idNum = 1;
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
      b = -1;
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
        node.value = '<img src="' + canvas.toDataURL() + '">';
        const tile = document.createElement("button");
        tile.className = "col";
        tile.id = idNum;
        idNum++;
        tile.innerHTML = node.value;

        imgGrid.appendChild(tile);
      }
    }
    
    //tıklanan butonların yerlerini değiştir
    
      const buttons = document.querySelectorAll(".col");
      let firstbutton = null;
      let secondbutton = null;
      let firstbuttonID = null;
      let secondbuttonID = null;
      buttons.forEach((button) => {
        button.addEventListener("click", function () {
          if (firstbutton == null) {
            firstbutton = button;
            firstbuttonID = button.id;
            var firstNodeID = findNodesWithValue(linkedList.grid[0][0], firstbuttonID);
            var firstNodeValue = findNodesValueWithValue(linkedList.grid[0][0], firstbuttonID);
            
          } else {
            secondbutton = button;
            secondbuttonID = button.id;
            var secondNodeID = findNodesWithValue(linkedList.grid[0][0], secondbuttonID);
            var secondNodeValue = findNodesValueWithValue(linkedList.grid[0][0], secondbuttonID);
            
    
             // tıklanan butonlarla aynı ID'ye sahip düğümlerin ID'lerini ve görselleri değiştir
             var tempValue = firstNodeValue;
             firstNodeValue = secondNodeValue;
             secondNodeValue = tempValue;
    
            var tempID = firstNodeID;
            firstNodeID = secondNodeID;
            secondNodeID = tempID;

    
            //tıklanan HTML elementlerinin ID'lerini değiştir
    
            var tempHTMLid = firstbuttonID;
            firstbuttonID = secondbuttonID;
            secondbuttonID = tempHTMLid;
          }
        });
      });
    

  };
  img.src = imgPreview.src;


}


// ilgili düğümü bul 
function findNodesWithValue(head, reqID) {
  let currentNode = head;

  while (currentNode != null) {
    
    if (currentNode.ID == reqID) {
      
      return currentNode.ID;
    }
    currentNode = currentNode.next;
  }
}

function findNodesValueWithValue(head, reqID) {
  let currentNode = head;
  
  while (currentNode != null) {
    
    if (currentNode.ID == reqID) {
      
      return currentNode.value;
    }
    currentNode = currentNode.next;
  }
}

