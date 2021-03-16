# BREEDERS <!-- omit from toc -->

<small>A totally random name...</small>

> Time to choose your favourite breed 🐶

## What

This is a dashboard listing all the breeds from [dog.ceo](https://dog.ceo/) where you can get random images based on the selected breed.

Tech stack used, starting from [@lasalefamine/create-app](https://github.com/lasalefamine/create-app):

- Next.js (React + Typescript)
- PostCSS (w/ CSSModules)
- [native-elements.dev](https://native-elements.dev)
- [swr](https://github.com/vercel/swr) for data fetching
- [Vercel](https://vercel.com) for deploy

## Develop

### Clone

Firstly clone the repository and install the dependencies:

```bash
git clone git@github.com:LasaleFamine/breeders.git && cd $_ && yarn
```

### Start

Run the development command to run the server and the watchers to file changes:

```bash
yarn dev
```

And open the browser at: http://localhost:3000 (or if you want https://localhost:3000/husky 🐶)

### Test

Tests are written with `jest`. Run:

```bash
yarn test # or with --coverage
```

### Get base images

A script is available to run for downloading the base images from the dog.ceo API directly into the `public` directory. These are used as preview images for the breeds list. For downloading new **random** images just run:

```bash
yarn get-base-images
```

## Docker

`Dockerfile` is provided to run the application in a production fashion way, exposing the project on the port `3000` of the host. Just run:

```bash
yarn docker
```

## Release

An handy command is provided using [`standard-version`](https://github.com/conventional-changelog/standard-version) for bumping the version and push to GitHub. The CI will take care of the rest.
