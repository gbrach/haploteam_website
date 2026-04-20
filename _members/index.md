---
layout: index_page
title: HaploTeam members
description: "Meet the members of the HaploTeam, a yeast genetics research group at the University of Strasbourg and the University of the Basque Country."
---

The members of our HaploTeam are listed below. Click on their names to see their profiles!

<h3>Current members</h3>

{% if site.show_locations %}
<div class="halo-legend">
  <button class="halo-filter active" data-filter="all">All</button>
  <button class="halo-filter halo-label-sbx" data-filter="SBX">SBX</button>
  <button class="halo-filter halo-label-bio" data-filter="BIO">BIO</button>
  <button class="halo-filter halo-label-both" data-filter="both">Both</button>
</div>
{% endif %}

{% assign page_array = site.members | where:"status", "current" %}
{% include picture_grid.html pages=page_array columns=3 %}

<div class="alumni-section">
  <button class="alumni-toggle" id="alumniToggle">
    <h3 style="display: inline; cursor: pointer;">Former members <i class="fa-solid fa-chevron-down alumni-chevron"></i></h3>
  </button>
  <div class="alumni-grid" id="alumniGrid">
    {% assign page_array = site.members | where:"status", "alumni" %}
    {% include picture_grid.html pages=page_array columns=4 %}
  </div>
</div>

<style>
  /* Location filter buttons */
  .halo-filter {
    padding: 4px 14px;
    border: 2px solid currentColor;
    border-radius: 20px;
    background: transparent;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    color: var(--accent-color);
  }

  .halo-filter.halo-label-sbx { color: rgb(74, 144, 217); }
  .halo-filter.halo-label-bio { color: rgb(231, 76, 60); }
  .halo-filter.halo-label-both { color: rgb(155, 89, 182); }

  .halo-filter.active {
    color: #fff !important;
  }
  .halo-filter.active { background: var(--accent-color); border-color: var(--accent-color); }
  .halo-filter.halo-label-sbx.active { background: rgb(74, 144, 217); border-color: rgb(74, 144, 217); }
  .halo-filter.halo-label-bio.active { background: rgb(231, 76, 60); border-color: rgb(231, 76, 60); }
  .halo-filter.halo-label-both.active { background: rgb(155, 89, 182); border-color: rgb(155, 89, 182); }

  /* Alumni collapsible section */
  .alumni-toggle {
    background: none;
    border: none;
    padding: 0;
    margin-top: 30px;
    cursor: pointer;
    display: block;
  }

  .alumni-chevron {
    font-size: 20px;
    transition: transform 0.3s ease;
  }

  .alumni-chevron.open {
    transform: rotate(180deg);
  }

  .alumni-grid {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease;
  }

  .alumni-grid.expanded {
    max-height: 2000px;
  }

  .gallery {
    text-align: center;
  }

  .gallery h2 {
    font-size: 32px;
    color: var(--heading-color);
    margin-bottom: 20px;
  }

  .gallery .row {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap; /* Allows wrapping for smaller screens */
  }

  .gallery .col-xs-3 {
    flex: 1 1 calc(25% - 20px); /* Responsive columns */
    max-width: 240px;
  }

  .gallery-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .gallery-image:hover {
    transform: scale(1.05);
  }

  /* Lightbox overlay styles */
  .lightbox-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9); /* Darker background */
    z-index: 1000;
  }

  .lightbox-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 92vw;
    max-height: 92vh;
  }

  .lightbox-content img {
    max-width: 92vw;
    max-height: 92vh;
    width: auto;
    height: auto;
    border-radius: 8px;
    object-fit: contain;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.6);
  }

  .lightbox-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 36px;
    color: white;
    cursor: pointer;
  }

  /* Responsive design */
  @media (max-width: 512px) {
    .gallery .col-xs-3 {
      flex: 1 1 100%; /* Full width for mobile */
      max-width: 100%;
    }
  }
</style>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const galleryImages = document.querySelectorAll(".gallery-image");
    const overlay = document.querySelector(".lightbox-overlay");
    const lightboxImg = document.querySelector(".lightbox-content img");
    const closeBtn = document.querySelector(".lightbox-close");

    galleryImages.forEach((img) => {
      img.addEventListener("click", function () {
        lightboxImg.setAttribute("src", img.getAttribute("src")); // Display image in lightbox
        overlay.style.display = "flex"; // Show overlay
      });
    });

    closeBtn.addEventListener("click", function () {
      overlay.style.display = "none"; // Hide overlay
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.style.display = "none"; // Close when clicking outside the image
    });
  });

  // Alumni toggle
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("alumniToggle");
    var grid = document.getElementById("alumniGrid");
    var chevron = toggle.querySelector(".alumni-chevron");

    toggle.addEventListener("click", function() {
      grid.classList.toggle("expanded");
      chevron.classList.toggle("open");
    });
  });

  // Location filter
  document.addEventListener("DOMContentLoaded", function () {
    const filters = document.querySelectorAll(".halo-filter");
    const members = document.querySelectorAll(".member-grid-item");

    filters.forEach(function(btn) {
      btn.addEventListener("click", function() {
        filters.forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");

        members.forEach(function(member) {
          var loc = member.getAttribute("data-location");
          if (filter === "all") {
            member.style.display = "";
          } else if (filter === "both") {
            member.style.display = loc === "both" ? "" : "none";
          } else {
            // SBX shows SBX + both, BIO shows BIO + both
            member.style.display = (loc === filter || loc === "both") ? "" : "none";
          }
        });
      });
    });
  });
</script>

<!-- Gallery layout -->
<div class="gallery">
  <h2>Gallery</h2>
  <div class="row">
    <div class="col-xs-3">
      <div class="image-container">
        <img class="gallery-image" src="../assets/haploteam_pictures/gallery/ekiden2026.webp" alt="Ekiden 2026" loading="lazy">
        <span class="image-date">April 2026</span>
      </div>
    </div>
    <div class="col-xs-3">
      <div class="image-container">
        <img class="gallery-image" src="../assets/haploteam_pictures/gallery/IGBMC_2026.webp" alt="IGBMC 2026" loading="lazy">
        <span class="image-date">April 2026</span>
      </div>
    </div>
    <div class="col-xs-3">
      <div class="image-container">
        <img class="gallery-image" src="../assets/haploteam_pictures/gallery/ekiden2024.webp" alt="Ekiden 2024" loading="lazy">
        <span class="image-date">April 2024</span>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-3">
      <div class="image-container">
        <img class="gallery-image" src="../assets/haploteam_pictures/gallery/labretreat2023.webp" alt="Lab Retreat 2023" loading="lazy">
        <span class="image-date">June 2023</span>
      </div>
    </div>
    <div class="col-xs-3">
      <div class="image-container">
        <img class="gallery-image" src="../assets/haploteam_pictures/gallery/ekiden2023.webp" alt="Ekiden 2023" loading="lazy">
        <span class="image-date">April 2023</span>
      </div>
    </div>
    <div class="col-xs-3">
      <div class="image-container">
        <img class="gallery-image" src="../assets/haploteam_pictures/gallery/labretreat2023-2.webp" alt="Lab Retreat 2023-2" loading="lazy">
        <span class="image-date">June 2023</span>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-3">
      <div class="image-container">
        <img class="gallery-image" src="../assets/haploteam_pictures/gallery/labretreat2022.webp" alt="Lab Retreat 2022" loading="lazy">
        <span class="image-date">June 2022</span>
      </div>
    </div>
    <div class="col-xs-3">
      <div class="image-container">
        <img class="gallery-image" src="../assets/haploteam_pictures/gallery/team2021.webp" alt="Team 2021" loading="lazy">
        <span class="image-date">October 2021</span>
      </div>
    </div>
  </div>
</div>

<!-- Lightbox overlay -->
<div class="lightbox-overlay">
  <div class="lightbox-content">
    <span class="lightbox-close">&times;</span>
    <img src="" alt="Gallery image">
  </div>
</div>
