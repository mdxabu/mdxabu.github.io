---
date : '2025-11-06T13:42:21+05:30'
draft : false
title : 'Why SDKMAN?'
toc : true
tags: ["Open source","Java"]
image: "https://motionarray.imgix.net/motion-array-3131563-wIrwqJkNp6-high_0012.jpg?w=660&q=60&fit=max&auto=format"
---

If you’ve ever tried contributing to multiple open-source Java projects, you’ve probably run into this:
Project A needs Java 8, Project B screams for Java 17, and Project C? It says, “Java 21 or I won’t even compile.”

At this point, you’ve got two options:

1. Cry softly into your coffee mug, or
2. Use SDKMAN!, the magical version manager for the JVM world.

Let’s go with option two. It’s less soggy.

![](https://sdkman.io/assets/img/bubble-logo-sdkman-groovy-color.png)

# What is SDKMAN!?

SDKMAN! stands for Software Development Kit Manager. It’s a command-line tool that lets you easily install, switch, and manage multiple versions of Java, Maven, Gradle, and a bunch of other developer tools.

If you’ve ever used `nvm` for Node.js or `pyenv` for Python, SDKMAN! is like that—except it’s for Java tools and doesn’t make you question your life choices every time you switch versions.

![](/images/sdkmanmeme.png "Me looking SDKMAN! over my manual Java SDK")



# Why Open Source Contributors Love It

When you contribute to open source, you jump across repositories faster than your Wi-Fi disconnects on a Zoom call. Every project may need a different setup—different Java, different Maven, maybe even different Gradle.

SDKMAN! lets you switch environments instantly:

```bash
sdk use java 17.0.10-tem
sdk use maven 3.9.9
```

and you’re done.

No more messing with `.bashrc` or `/usr/libexec/java_home`. No more “works on my machine” nightmares. SDKMAN! keeps your setup clean and your sanity intact.

![](https://media.npr.org/assets/img/2023/01/14/this-is-fine_custom-b7c50c845a78f5d7716475a92016d52655ba3115.jpg "This is fine")

# Installing SDKMAN! (Mac & Linux)

## For macOS and Linux users:

You just need `curl` and `bash`, no wizardry required.

```bash
curl -s "https://get.sdkman.io" | bash
```

Then restart your terminal or run:

```bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
```

To verify the installation:

```bash
sdk version
```

You should see something like `SDKMAN 5.x.x` smiling back at you.

## Installing Java with SDKMAN!

You can see all available Java versions with:

```bash
sdk list java
```

To install one, for example Java 17 (Temurin distribution):

```bash
sdk install java 17.0.10-tem
```

To switch to it:

```bash
sdk use java 17.0.10-tem
```

Want it as default every time your terminal opens?

```bash
sdk default java 17.0.10-tem
```

Boom. Your environment is clean, consistent, and smells like freshly brewed coffee.

**Pro tip:**
If you work on multiple projects, you can add a `.sdkmanrc` file inside each project folder specifying which Java and Maven version to use:

```bash
java=17.0.10-tem
maven=3.9.9
```
Then simply run:

```bash
sdk env init
```
and SDKMAN! switches everything automatically.


## Installing Maven with SDKMAN!

SDKMAN! doesn’t stop at Java. It’s also your friend for Maven.

To see what’s available:

```bash
sdk list maven
```

Install your favorite version:

```bash
sdk install maven 3.9.9
```

Switch between versions easily:

```bash
sdk use maven 3.8.8
```

Set a default:

```bash
sdk default maven 3.9.9
```


# Why This Rocks for Open Source

Let’s be real, open source is messy.
Every project has its quirks. But SDKMAN! lets you hop between projects without breaking your entire dev setup.

You can:

- Reproduce build environments exactly as maintainers intended
-Test your contributions across multiple JDKs
- Avoid the “works on my machine” curse
- Impress your fellow contributors with your wizard-like version switching skills

It’s a tiny tool that makes you a huge amount more productive.


# Quick Troubleshooting Tips

Command not found? Make sure your shell rc file sources SDKMAN:

```bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
```

- Version switching not working? Check your `.sdkmanrc` file and rerun `sdk env`.
- Still broken? Try restarting your terminal. Works 80% of the time, every time.


# Final Thoughts

SDKMAN! is the kind of tool that makes you wonder why you didn’t use it earlier.
It saves time, keeps your system clean, and lets you focus on the fun part writing code and contributing to open source instead of fighting environment setups.

Now go forth, install SDKMAN!, and bring harmony to your Java universe.




