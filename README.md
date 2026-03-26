# HaploTeam website
The website for the HaploTeam research group at the University of Strasbourg.
It is designed to be easy to maintain, update (adding/modifying a file in the repository will automatically update the whole website) with simple markdown files. Also fully customizable.

## To add a member
Use the `member_template.md` file, duplicate and rename it, fill in the blanks and put it in the `_members` folder. Thumbnail goes into `assets/haploteam_pictures`, should be 700x700px.

## To add a paper
Use the `paper_template.md` file, duplicate and rename it, fill in the blanks and put it in the `_papers` folder. Thumbnail goes into `assets/papers_thumbnails`, any size is fine but rectangular is better.

but i dont want he sa
## Local development
Just install a recent Ruby version (3.3.0 right now):
```
# if not done previously
brew install ruby-install chruby
ruby-install ruby

eval "$(/opt/homebrew/bin/brew shellenv)"
source /opt/homebrew/opt/chruby/share/chruby/chruby.sh
source /opt/homebrew/opt/chruby/share/chruby/auto.sh
chruby ruby-3.3.0
>> ~/.zshrc 

source ~/.zshrc # to override the default ruby
bundle exec jekyll serve --livereload
```

## Deployment notes
The site is built and deployed via GitHub Actions (`.github/workflows/jekyll.yml`). Any push to `main` triggers a rebuild and redeploy automatically.