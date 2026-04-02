---
layout: index_page
category: papers
title: Publications
description: "Publications from the HaploTeam research group on yeast population genomics, genetics, and phenomics."
---

<div class="publications-page">
    <!-- Filter bar: year pills + search on same row -->
    <div class="filter-bar">
        <div id="yearFilters" class="year-filters">
            <button class="year-pill active" data-year="all">All</button>
            {% assign this_year = site.time | date: '%Y' | plus: 0 %}
            {% assign cutoff_year = this_year | minus: 4 %}
            {% for year in (2000..this_year) reversed %}
                {% assign papers_for_year = site.papers | where: "year", year %}
                {% assign real_papers = 0 %}
                {% for p in papers_for_year %}{% if p.layout != "index_page" %}{% assign real_papers = real_papers | plus: 1 %}{% endif %}{% endfor %}
                {% if real_papers > 0 and year >= cutoff_year %}
                    <button class="year-pill" data-year="{{ year }}">{{ year }}</button>
                {% endif %}
            {% endfor %}
            <button class="year-pill" data-year="older">Older</button>
        </div>
        <input type="text" id="searchInput" placeholder="Search publications..." />
        <span id="pubCount" class="pub-count"></span>
    </div>

    <!-- No Results Message -->
    <p id="noResults" style="display: none;">No publications found.</p>

    <!-- List of Publications -->
    <ul id="publicationsList">
        {% for year in (2000..this_year) reversed %}
            {% assign papers_array = site.papers | where: "year", year | sort: 'pub_date' | reverse %}
            {% for paper in papers_array %}
                {% if paper.layout != "index_page" %}
                    {% if last != paper.year %}
                        <h3 data-year="{{ paper.year }}">{{ paper.year }}</h3>
                    {% endif %}
                    {% assign last = paper.year %}
                    <li class="publication-item" data-year="{{ paper.year }}">
                        {% include paper_builder.html data=paper %}
                    </li>
                {% endif %}
            {% endfor %}
        {% endfor %}
    </ul>
</div>

<!-- Back to top button -->
<button id="backToTop" aria-label="Back to top">
    <i class="fa-solid fa-arrow-up"></i>
</button>

<style>
/* Filter bar: pills + search on same row */
.filter-bar {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.year-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.year-pill {
    padding: 4px 14px;
    border: 2px solid var(--accent-color);
    border-radius: 20px;
    background: transparent;
    color: var(--accent-color);
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
}

.year-pill:hover {
    background: rgba(66, 77, 173, 0.15);
}

.year-pill.active {
    background: var(--accent-color);
    color: #fff;
}

/* search bar styling */
#searchInput {
    width: 200px;
    max-width: 400px;
    padding: 8px 14px;
    margin-bottom: 0;
    box-sizing: border-box;
    font-size: 16px;
    border: 2px solid var(--border-color);
    border-radius: 4px;
    background: var(--bg-color);
    color: var(--text-color);
    transition: border-color 0.3s;
}

#searchInput:focus {
    border-color: var(--search-focus-border);
    outline: none;
}

#noResults {
    font-style: italic;
    color: var(--no-results-color);
    margin-top: 20px;
}

.pub-count {
    font-size: 14px;
    color: var(--no-results-color);
    white-space: nowrap;
}

/* Back to top button */
#backToTop {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: var(--accent-color);
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 100;
}

#backToTop.visible {
    opacity: 1;
    pointer-events: auto;
}

#backToTop:hover {
    filter: brightness(1.15);
}
</style>




<!-- Javascript search + year filter functionality -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const publicationsList = document.getElementById('publicationsList');
    const publications = publicationsList.getElementsByClassName('publication-item');
    const yearHeadings = publicationsList.querySelectorAll('h3[data-year]');
    const noResults = document.getElementById('noResults');
    const yearPills = document.querySelectorAll('.year-pill');
    const pubCount = document.getElementById('pubCount');
    const totalPubs = publications.length;

    let activeYear = 'all';
    const cutoffYear = new Date().getFullYear() - 4;

    // Show initial count
    pubCount.textContent = totalPubs + ' publications';

    // Year pill click handler
    yearPills.forEach(function(pill) {
        pill.addEventListener('click', function() {
            yearPills.forEach(function(p) { p.classList.remove('active'); });
            pill.classList.add('active');
            activeYear = pill.getAttribute('data-year');
            filterPublications();
        });
    });

    // Search input handler
    searchInput.addEventListener('keyup', filterPublications);

    function filterPublications() {
        const filter = searchInput.value.toLowerCase();
        let anyVisible = false;
        let visibleCount = 0;

        for (let i = 0; i < publications.length; i++) {
            const publication = publications[i];
            const pubYear = publication.getAttribute('data-year');
            const txtValue = publication.textContent || publication.innerText;
            var matchesYear;
            if (activeYear === 'all') {
                matchesYear = true;
            } else if (activeYear === 'older') {
                matchesYear = parseInt(pubYear) < cutoffYear;
            } else {
                matchesYear = pubYear === activeYear;
            }
            const matchesSearch = txtValue.toLowerCase().indexOf(filter) > -1;

            if (matchesYear && matchesSearch) {
                publication.style.display = '';
                anyVisible = true;
                visibleCount++;
            } else {
                publication.style.display = 'none';
            }
        }

        // Update count
        if (activeYear === 'all' && filter === '') {
            pubCount.textContent = totalPubs + ' publications';
        } else {
            pubCount.textContent = visibleCount + ' of ' + totalPubs + ' publications';
        }

        // Show/hide year headings
        yearHeadings.forEach(function(heading) {
            let nextElem = heading.nextElementSibling;
            let hasVisible = false;
            while (nextElem && nextElem.tagName !== 'H3') {
                if (nextElem.style.display !== 'none') {
                    hasVisible = true;
                    break;
                }
                nextElem = nextElem.nextElementSibling;
            }
            heading.style.display = hasVisible ? '' : 'none';
        });

        noResults.style.display = anyVisible ? 'none' : 'block';
    }

    // Back to top button
    var backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
</script>