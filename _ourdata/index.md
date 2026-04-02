---
layout: index_page
title: " "
category: ourdata
description: "Access genome datasets and research data from the HaploTeam, including the 1011 and 3034 S. cerevisiae genome projects."
---

{% assign projects_order = "3034 <i>Saccharomyces cerevisiae</i> genomes,1011 <i>S. cerevisiae</i> genomes" | split: "," %}

<!-- Iterate through ordered projects -->
{% for project in projects_order %}
  <section class="project-section">
    <h4 class="project-title">{{ project }}</h4>
    <div class="project-section-content">
      <!-- Get all papers for this project -->
      {% assign project_papers = site.papers | where: "overarching_project", project %}
      
      {% for paper in project_papers %}
        <div class="paper-item">
          {% if paper.thumbnail %}
            <div class="paper-thumbnail">
              <img src="{{ paper.thumbnail }}" alt="{{ paper.title }} thumbnail">
            </div>
          {% endif %}
          <div class="paper-details">
            <h5 class="paper-title">{{ paper.title }}</h5>
            <div class="paper-links">
              <!-- Zenodo Repositories -->
              {% if paper.zenodo %}
                <div class="link-group">
                  {% for repo in paper.zenodo %}
                    <a href="{{ repo.link }}" target="_blank" title="{{ repo.name }}" class="paper-link">
                      <i class="ai ai-zenodo ai-2x fa-icon-color"></i>
                      <span class="link-text">{{ repo.name }}</span>
                    </a>
                  {% endfor %}
                </div>
              {% endif %}
              
              <!-- Websites Links -->
              {% if paper.websites %}
                <div class="link-group">
                  {% for website in paper.websites %}
                    <a href="{{ website.link }}" target="_blank" title="{{ website.name }}" class="paper-link">
                      <i class="fa-solid fa-globe fa-icon-color"></i>
                      <span class="link-text">{{ website.name }}</span>
                    </a>
                  {% endfor %}
                </div>
              {% endif %}
              
              <!-- GitHub Link -->
              {% if paper.github %}
                <div class="link-group">
                  <a href="https://github.com/{{ paper.github }}" target="_blank" title="GitHub Repository" class="paper-link">
                    <i class="fa-brands fa-github fa-icon-color"></i>
                    <span class="link-text">{{ paper.github }}</span>
                  </a>
                </div>
              {% endif %}
              
              <!-- FTP Links -->
              {% if paper.ftp_link %}
                <div class="link-group">
                  {% for ftp in paper.ftp_link %}
                    <a href="{{ ftp.link }}" target="_blank" title="{{ ftp.name }}" class="paper-link">
                      <i class="fa-solid fa-database fa-icon-color"></i>
                      <span class="link-text">{{ ftp.name }}</span>
                    </a>
                  {% endfor %}
                </div>
              {% endif %}
            </div>
          </div>
        </div>
      {% endfor %}
    </div>
  </section>
{% endfor %}