# HaploTeam Website — Contributor Manual

This manual explains how to maintain the HaploTeam website.
The site is built with **Jekyll** (a static site generator). There is no database and no backend; everything is plain text files. Changes take effect after the site is rebuilt and deployed.

---

## Table of Contents

1. [Overview of the folder structure](#1-overview-of-the-folder-structure)
2. [Adding a new member](#2-adding-a-new-member)
3. [Moving a member to alumni](#3-moving-a-member-to-alumni)
4. [Adding a new paper](#4-adding-a-new-paper)
5. [Updating the homepage photo](#5-updating-the-homepage-photo)
6. [Updating the gallery (Members page)](#6-updating-the-gallery-members-page)
7. [Image conversion reference](#7-image-conversion-reference)
8. [Building and deploying the site](#8-building-and-deploying-the-site)

---

## 1. Overview of the folder structure

```
haploteam_website/
├── _members/ <- one .md file per person
├── _papers/ <- one .md file per paper
├── _includes/ <- reusable HTML fragments (header, footer, ...)
├── _layouts/ <- page templates
├── _sass/ <- CSS styles (do not edit unless you know SCSS)
├── assets/
│   ├── haploteam_pictures/
│   │   ├── members/ <- member profile photos  <- PUT PHOTOS HERE
│   │   └── gallery/ <- gallery photos on the Members page
│   ├── images/ <- site logos and misc images
│   └── papers_thumbnails/ <- paper figure thumbnails <- PUT THUMBNAILS HERE
├── _config.yml <- site-wide settings (title, email, URL)
├── index.html <- homepage
└── MANUAL.md <- this file
```

---

## 2. Adding a new member

Adding a member requires two things: a **photo file** and a **text file**.

### Step 1 — Prepare the photo

| Property | Requirement |
|----------|-------------|
| Format   | **WebP** (strongly preferred) |
| Width    | **700 px** (the site will display it smaller, but 700 px is the right source size) |
| Height   | **700 px** |
| File size | Should ideally be **under 100 KB** after conversion (see [Section 7](#7-image-conversion-reference)) |
| Filename | `lastname.webp` — all lowercase, no spaces, no accents |

Place the file in:
```
assets/haploteam_pictures/members/lastname.webp
```

If two members share the same last name, deal with it... `lastname2.webp`.

---

### Step 2 — Create the member file

Create a new file in `_members/` named `lastname.md`.
Use the template below and fill in the fields:

```yaml
---
layout: members
status: current
rank: 4
title: Firstname Lastname
picture: /assets/haploteam_pictures/members/lastname.webp
position: PhD candidate
email: firstname.lastname@unistra.fr
github: githubusername
orcid: 0000-0000-0000-0000
twitter: twitterhandle
google_scholar: https://scholar.google.fr/citations?user=XXXXXXXX
website: https://personalwebsite.com
thesis: https://theses.fr/XXXXXXXXX
---

Short bio or welcome message. Supports **Markdown** formatting.

You can include links like this: [My favourite tool](https://example.com)
```

**Field reference:**

| Field | Required | Notes |
|-------|----------|-------|
| `layout` | Yes | Always `members` |
| `status` | Yes | `current` or `alumni` |
| `rank` | Yes | Controls display order in the grid; see table below |
| `title` | Yes | Full name as it should appear on the site |
| `picture` | Yes | Path to the photo file (see Step 1) |
| `position` | Yes | Job title: `Principal Investigator`, `Postdoctoral researcher`, `PhD candidate`, `Master student`, `Engineer`, etc. |
| `email` |  Optional | Will be obfuscated automatically against spam bots |
| `github` |  Optional | GitHub username only (not the full URL) |
| `orcid` |  Optional | ORCID number only (e.g. `0000-0000-0000-0000`) |
| `twitter` |  Optional | Twitter/X handle without `@` |
| `google_scholar` |  Optional | Full URL to the Google Scholar profile |
| `website` |  Optional | Full URL including `https://` |
| `thesis` |  Optional | Full URL to the thesis (e.g. on theses.fr). Only relevant for alumni. |

**Rank values (controls grid order):**

| Rank | Role |
|------|------|
| 1 | Joseph (PI) |
| 2 | Permanent staff / Engineers |
| 3 | Postdoctoral researchers |
| 4 | PhD candidates |
| 5 | Master students |
| 6 | Other |

Lower numbers appear first. Within the same rank, order is alphabetical by filename.

**Linking a member to papers:**
The member will automatically appear on papers once you add their slug to the paper's `members:` field (see [Section 4](#4-adding-a-new-paper)). The slug is the **filename without `.md`** (e.g. `lastname`).

---

## 3. Moving a member to alumni

Open `_members/lastname.md` and change:

```yaml
status: current
```
to:
```yaml
status: alumni
```

Optionally add a `thesis:` field if they defended.
You do **not** need to move or rename any file. The member will automatically appear in the "Former members" section, or, as of March 2026, not be displayed. Maybe this is going to be changed.

---

## 4. Adding a new paper

Adding a paper requires two things: a **thumbnail image** and a **text file**.

### Step 1 — Prepare the thumbnail

The thumbnail is the key figure from the paper.

| Property | Requirement |
|----------|-------------|
| Format | **WebP** strongly preferred. PNG or JPG tolerated. |
| File size | ideally small |
| Filename | `YEAR_firstauthorlastname.webp` — all lowercase |

Place the file in:
```
assets/papers_thumbnails/YEAR_firstauthorlastname.webp
```

**Examples:** `2025_loegler.webp`, `2026_becerra.webp`, `2018_peter.webp`

If a first author has two papers in the same year, append a number: `2024_dutta.webp` and `2024_dutta2.webp`.

To extract a figure from a PDF at the right size, you can screenshot the figure and resize it (see [Section 7](#7-image-conversion-reference)).

---

### Step 2 — Create the paper file

Create a new file in `_papers/` named `YEAR_firstauthorlastname.md`.

```yaml
---
title: "Full Paper Title, can use <i>italics</i> for species names"
year: 2025
pub_date: 2025-06-15
members: [ lastname1, lastname2, schacherer ]
authors: Firstname1 Lastname1, Firstname2 Lastname2, ...
journal: Nature (hopefully :) )
doi: 10.1038/s41467-000-00000-0
PMID: 12345678
bioRxiv: https://doi.org/10.1101/2024.01.01.000000
thumbnail: ../assets/papers_thumbnails/2025_firstauthor.webp
mainpage: true
---
```

**Field reference:**

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | Use `<i>...</i>` for italics (species names). Wrap in quotes if the title contains a colon. |
| `year` | Yes | Publication year as an integer (e.g. `2025`) |
| `pub_date` | Yes | Full date `YYYY-MM-DD`. Used to sort papers within the same year — most recent appears first. |
| `members` | Yes | Array of member slugs (= filenames in `_members/` without `.md`). These create the link between a paper and a member's profile page. |
| `authors` | Yes | Full author list as a single string, comma-separated. The member whose last name matches the current profile page will be **bolded automatically**. |
| `journal` |  Optional | Journal name. If absent, the paper is shown as a **Preprint**. |
| `doi` |  Optional | DOI only, without `https://doi.org/` (e.g. `10.1038/s41586-018-0030-5`) |
| `PMID` |  Optional | PubMed ID number only |
| `bioRxiv` |  Optional | Full URL to the bioRxiv preprint |
| `google_scholar` |  Optional | Full URL to the Google Scholar entry |
| `thumbnail` | Yes | Path to the thumbnail. Always starts with `../assets/papers_thumbnails/` |
| `mainpage` |  Optional | Set to `true` to make the paper eligible to appear on the homepage. The two most recent `mainpage: true` papers from the current or previous year are shown. Omit or set to `false` to hide from the homepage. |
| `github` |  Optional | GitHub repo in `username/reponame` format (not a full URL) |
| `zenodo` |  Optional | List of Zenodo repositories — see example below |
| `ftp_link` |  Optional | List of FTP/data links — see example below |
| `overarching_project` |  Optional | Links the paper to a project on the "Our Data" page. Must match exactly one of the project names defined in `_ourdata/index.md`. |

**Multi-item fields (zenodo, ftp_link):**

```yaml
zenodo:
  - name: "Dataset name shown on site"
    link: "https://zenodo.org/record/XXXXXXXX"
  - name: "Second dataset"
    link: "https://zenodo.org/record/YYYYYYYY"

ftp_link:
  - name: "Genome Data FTP"
    link: "ftp://example.org/path/"
```

---

## 5. Updating the homepage photo

The large photo at the top of the homepage is set in `index.html`:

```html
<img src="assets/haploteam_pictures/gallery/FILENAME.webp" ...
     alt="Description of the photo">
```

Replace `FILENAME.webp` with your new photo's filename, and update the `alt` text.
Place the photo file in `assets/haploteam_pictures/gallery/`.

Recommended specs for the homepage photo:

| Property | Recommendation |
|----------|----------------|
| Format | WebP |
| Width | 900–1200 px (the site max-width is 1000 px) |
| File size | Under 300 KB after compression |

---

## 6. Updating the gallery (Members page)

The gallery is hardcoded in `_members/index.md`. Scroll to the `<!-- Gallery layout -->` section and add a new `<div class="col-xs-3">` block following the same pattern as the existing ones:

```html
<div class="col-xs-3">
  <div class="image-container">
    <img class="gallery-image"
         src="../assets/haploteam_pictures/gallery/FILENAME.webp"
         alt="Short description"
         loading="lazy">
    <span class="image-date">Month YEAR</span>
  </div>
</div>
```

Place the photo file in `assets/haploteam_pictures/gallery/`.

The gallery is organized in rows of 3 images. Add a new `<div class="row">...</div>` block if starting a new row.

---

## 7. Image conversion reference

All image resizing and conversion can be done with **ImageMagick** (`convert` command).

**Convert a member photo (resize to 600 px wide, export as WebP):**
```bash
convert input.jpg -resize 600x600\> -quality 85 lastname.webp
```
The `\>` means "only shrink, never enlarge".

**Convert a paper thumbnail (resize to 400 px tall, export as WebP):**
```bash
convert input.png -resize x400 -quality 85 2025_firstauthor.webp
```

**Batch convert all JPGs in a folder:**
```bash
for f in *.jpg; do
  convert "$f" -resize 600x600\> -quality 85 "${f%.jpg}.webp"
done
```

**Check an image's dimensions:**
```bash
identify filename.webp
```

---

## 8. Building and deploying the site

The site is hosted via GitHub Pages and rebuilds automatically when changes are pushed to the `main` branch. You do **not** need to run Jekyll locally to publish changes.

**Typical workflow:**

```bash
# 1. Make your changes (add files, edit .md files, ...)

# 2. Stage and commit
git add _members/newmember.md assets/haploteam_pictures/members/newmember.webp
git commit -m "add new member: Firstname Lastname"

# 3. Push — the site rebuilds automatically within ~1 minute
git push
```

**To preview locally before pushing** (optional, requires Ruby + Jekyll):
```bash
bundle exec jekyll serve
# Then open http://localhost:4000 in your browser
```