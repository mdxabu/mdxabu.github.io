---
date : '2025-09-26T17:42:52+05:30'
draft : false
title : 'Dodo - Say goodbye to accidental secrets and messy Git history with a smarter, simpler CLI tool.'
toc : false
tags: ["open source","project"]
image: ""
---


I got an idea when I was in the shower, and it made total sense! It has the potential to be a great open-source project. There are so many projects out there that aren’t really useful, but people still use them—like lazy commit! It's just generating commit messages based on your code modifications with AI using Groq.

Then I realized, my project idea could be even better!

Let's dive into the idea…

### Project Overview

I’m building a CLI tool that scans for API keys and security keys in your code before pushing it to a repo. It’ll be built on top of Git using `go-git`.

The project is named **"dodo"**, inspired by the dodo bird:

![Dodo Bird](https://cdn.britannica.com/13/245613-050-F2F1BA7B/Dodo-bird-Black-and-white-engraving.jpg)

### Features

- **`dodo commit`**: Automatically stages all untracked files and generates a commit message without the need for AI. (I have plans to implement GitHub Copilot integration later.) You can also use `dodo commit -m <message>` to specify your own commit message.

- **`dodo squash`**: Squash multiple commits into one. You can specify how many commits to squash by using `dodo squash <n>`. This will push the changes with the generated commit message!

  This is the most useful part of the project, I think!

- **`dodo push`**: A safeguard for when you accidentally push API or security keys to your repository. When pushing, if any keys are detected, it will stop the push and prompt you with: "Do you really want to push? (y/n)". If you decide not to push, the file will automatically be removed from the staging area and added to `.gitignore`.

- **`dodo scan`**: Scan your code before pushing to check for any sensitive keys.

### Project Status

The `dodo commit` feature has been finished, and the project is just getting started. If you're interested in contributing or checking it out, head over to the repo below.

[Check out this repo](https://github.com/mdxabu/dodo)

BTW, this blog was also pushed to GitHub using the `dodo commit` command.


<br>
<br>
<!-- Comment Section Configurations! -->
<script src="https://giscus.app/client.js"
        data-repo="mdxabu/mdxabu.github.io"
        data-repo-id="R_kgDOLs5FtQ"
        data-category="Blogs"
        data-category-id="DIC_kwDOLs5Ftc4CrYy-"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="0"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light_protanopia"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>
