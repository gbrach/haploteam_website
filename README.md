# HaploTeam website
The website for the HaploTeam research group at the University of Strasbourg.
It is designed to be easy to maintain, update (adding/modifying a file in the repository will automatically update the whole website) with simple markdown files. Also fully customizable.

## To add a member
Use the `member_template.md` file, duplicate and rename it, fill in the blanks and put it in the `_members` folder. Thumbnail goes into `assets/haploteam_pictures`, should be 700x700px.

## To add a paper
Use the `paper_template.md` file, duplicate and rename it, fill in the blanks and put it in the `_papers` folder. Thumbnail goes into `assets/papers_thumbnails`, any size is fine but rectangular is better.


## Local development
```
bundle exec jekyll serve --livereload
```

## Deployment notes
The site is built and deployed via GitHub Actions (`.github/workflows/jekyll.yml`). Any push to `main` triggers a rebuild and redeploy automatically.