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
  const img = document.createElement("img");
  img.onload = function () {
    const imgWidth = img.width;
    const imgHeight = img.height;
    const tileSize = Math.min(imgWidth, imgHeight) / 4;
    const canvas = document.createElement("canvas");
    canvas.width = tileSize;
    canvas.height = tileSize;
    const ctx = canvas.getContext("2d");
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        ctx.drawImage(
          img,
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize,
          0,
          0,
          tileSize,
          tileSize
        );
        const tile = document.createElement("div");
        tile.className = "col";
        tile.innerHTML = '<img src="' + canvas.toDataURL() + '">';
        imgGrid.appendChild(tile);
      }
    }
  };
  img.src = imgPreview.src;
  
}