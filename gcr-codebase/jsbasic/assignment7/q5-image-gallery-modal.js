"use strict";

function initializeImageGallery() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Image Gallery</h1>
    <div id="image-grid" aria-label="Image gallery"></div>
    <div id="image-modal" role="dialog" aria-modal="true" aria-label="Image preview" hidden>
      <div id="modal-content"><button id="close-modal" type="button" aria-label="Close preview">Close</button><img id="large-image" alt="Selected gallery image"></div>
    </div>
  `;
  document.body.append(host);

  const style = document.createElement("style");
  style.textContent = `
    #image-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
    #image-grid img { width: 100%; cursor: pointer; }
    #image-modal { position: fixed; inset: 0; display: grid; place-items: center; background: rgb(0 0 0 / 75%); }
    #image-modal[hidden] { display: none; }
    #modal-content { max-width: 90vw; max-height: 90vh; }
    #large-image { display: block; max-width: 90vw; max-height: 80vh; }
  `;
  document.head.append(style);

  const grid = host.querySelector("#image-grid");
  const modal = host.querySelector("#image-modal");
  const largeImage = host.querySelector("#large-image");

  function createGalleryImage(index, width, height) {
    const colors = [["#f3a683", "#786fa6"], ["#63cdda", "#596275"], ["#cf6a87", "#f7d794"],
      ["#778beb", "#e77f67"], ["#e15f41", "#f8a5c2"], ["#3dc1d3", "#c44569"]][index];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="g"><stop stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g)"/><text x="50%" y="52%" fill="white" font-size="${Math.round(height / 9)}" text-anchor="middle" font-family="sans-serif">Gallery ${index + 1}</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  for (let index = 0; index < 6; index += 1) {
    const image = document.createElement("img");
    image.src = createGalleryImage(index, 320, 220);
    image.alt = `Gallery image ${index + 1}`;
    image.dataset.largeSrc = createGalleryImage(index, 960, 660);
    grid.append(image);
  }

  function closeModal() {
    modal.hidden = true;
  }

  grid.addEventListener("click", (event) => {
    const image = event.target.closest("img");
    if (!image) return;
    largeImage.src = image.dataset.largeSrc;
    largeImage.alt = image.alt;
    modal.hidden = false;
  });
  modal.addEventListener("click", closeModal);
  host.querySelector("#modal-content").addEventListener("click", (event) => event.stopPropagation());
  host.querySelector("#close-modal").addEventListener("click", closeModal);
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to try the image gallery.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeImageGallery, { once: true });
} else {
  initializeImageGallery();
}
