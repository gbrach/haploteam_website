---
layout: index_page
category: papers
title: Publications
---

<div class="publications-page">
    <!-- new search bar -->
    <input type="text" id="searchInput" placeholder="Search publications..." />

    <!-- No Results Message -->
    <p id="noResults" style="display: none;">No publications found.</p>

    <!-- List of Publications -->
    <ul id="publicationsList">
        <!-- Getting current year -->
        {% assign this_year = site.time | date: '%Y' %} <!-- | plus: 1 if something breaks --> 
        <!-- Reversing -->
        {% for year in (2000..this_year) reversed %}
            {% assign papers_array = site.papers | where: "year", year | sort: 'pub_date' | reverse %}
            {% for paper in papers_array %}
                <!-- Keeping papers, excluding index.md -->
                {% if paper.layout != "index_page" %}
                    <!-- Last represents the last paper's year in the for loop, empty in the first iteration -->
                    {% if last != paper.year %}
                        <h3>{{ paper.year }}</h3>
                    {% endif %}
                    {% assign last = paper.year %}
                    <!-- Wrap each paper in a list item with a class for easier targeting -->
                    <li class="publication-item">
                        {% include paper_builder.html data=paper %}
                    </li>
                {% endif %}
            {% endfor %}
        {% endfor %}
    </ul>
</div>

<style>
/* search bar styling */
#searchInput {
    width: 100%;
    max-width: 400px;
    padding: 12px 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
}

#searchInput:focus {
    border-color: #66afe9;
    outline: none;
}

#noResults {
    font-style: italic;
    color: #888;
    margin-top: 20px;
}
</style>




<!-- Javascript search functionality -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const publicationsList = document.getElementById('publicationsList');
    const publications = publicationsList.getElementsByClassName('publication-item');
    const yearHeadings = publicationsList.getElementsByTagName('h3');
    const noResults = document.getElementById('noResults');

    searchInput.addEventListener('keyup', function() {
        const filter = searchInput.value.toLowerCase();
        let anyVisible = false;

        // looping through all publications
        for (let i = 0; i < publications.length; i++) {
            const publication = publications[i];
            const txtValue = publication.textContent || publication.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                publication.style.display = "";
                anyVisible = true;
            } else {
                publication.style.display = "none";
            }
        }

        // hiding or showing year headings based on visible publications
        for (let i = 0; i < yearHeadings.length; i++) {
            const yearHeading = yearHeadings[i];
            let nextElem = yearHeading.nextElementSibling;
            let hasVisible = false;
            while (nextElem && nextElem.tagName !== 'H3') {
                if (nextElem.style.display !== 'none') {
                    hasVisible = true;
                    break;
                }
                nextElem = nextElem.nextElementSibling;
            }
            if (hasVisible) {
                yearHeading.style.display = "";
            } else {
                yearHeading.style.display = "none";
            }
        }

        //no results
        if (anyVisible) {
            noResults.style.display = 'none';
        } else {
            noResults.style.display = 'block';
        }
    });
});
</script>