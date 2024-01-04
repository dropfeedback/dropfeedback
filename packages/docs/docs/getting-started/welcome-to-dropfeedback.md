---
title: Welcome to Dropfeedback
slug: /
---

# Welcome to the documentation

Rimas qui natus populusque ruunt. Non aere amittere nomen tutaque ferumque,
caelestes Delphis _vates in_ supplex virilia. Fert illi, hesternos in sedit.
Inter sidus, contorto Cecropidae de careat atras atavosque retro, pabula inritus
non Pandrose temptatos.

## Redit Apollinis et da illa Phoebeia

Petebat frenato incursant quem vim stringebat da exstantibus arida et
virginitate Aeneae **Hyperborea** puer cetera, noctisque sibi quaecumque. Gemit
et committitur quicquam territa.

Contendisse viridis, hederae Ergo vir Fama infirmis **tangit**. Quem torum
praevertunt tremens lunae pro.

1. Prohibere habet viri tantum quidem caudaque
2. Videri sui parentes nefas
3. Admovit eripiunt una quodvis

Rimas qui natus populusque ruunt. Non aere amittere nomen tutaque ferumque,
caelestes Delphis _vates in_ supplex virilia. Fert illi, hesternos in sedit.
Inter sidus, contorto Cecropidae de careat atras atavosque retro, pabula inritus
non Pandrose temptatos.

## Create a Document

There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of mod

Documents are **groups of pages** connected through:

- a **sidebar**
- **previous/next navigation**
- **versioning**

## H2

t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

### H3

There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of mod

#### H4

## Create your first Doc

Create a Markdown file at `docs/hello.md`:

```md title="docs/hello.md"
# Hello

This is my **first Docusaurus document**!
```

A new document is now available at [http://localhost:3000/docs/hello](http://localhost:3000/docs/hello).

## Configure the Sidebar

Docusaurus automatically **creates a sidebar** from the `docs` folder.

Add metadata to customize the sidebar label and position:

```md title="docs/hello.md" {1-4}
---
sidebar_label: "Hi!"
sidebar_position: 3
---

# Hello

This is my **first Docusaurus document**!
```

It is also possible to create your sidebar explicitly in `sidebars.js`:

```js title="sidebars.js"
export default {
  tutorialSidebar: [
    "intro",
    // highlight-next-line
    "hello",
    {
      type: "category",
      label: "Tutorial",
      items: ["tutorial-basics/create-a-document"],
    },
  ],
};
```
