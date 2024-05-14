# Pokedex

A web/native app for displaying pokemon and their basic data like base stats, evolution chain, etc.

Implemented using the [Tamagui](https://tamagui.dev/) free template and uses [PokeAPI](https://pokeapi.co/docs/v2) for retrieving the data.

> **_Things to Note:_**
>
> - As of 05/15/2024, only the web app version is fully functional.
> - Native app currently only being developed for Android OS.

## Table of Contents

1. [Development](#development)
   - [Requirements](#requirements)
     - [Android Development Requirements](#requirements-for-android-development)
   - [Setup](#setup)
1. [Code Structure](#code-structure)
   - [Directory Structure](#directory-structure)
1. [Design](#design)
   - [PokeList](#pokelist)
   - [Search Function](#search-function)
   - [Pokemon Details Page](#pokemon-details-page)
   - [Evolution Tab](#evolution-tab)
1. [Live Deployment](#live-deployment)
   - [Vercel](#vercel)
   - [Mobile App](#mobile-app)

## Development

### Requirements

- Yarn
- Node

#### (Requirements for Android development)

- JDK 11
  - REQUIRED setup environment variable JAVA_HOME
- Android Studio
  - REQUIRED set environment variable ANDROID_HOME
  - https://docs.expo.dev/workflow/android-studio-emulator/#set-up-android-studios-tools
  - https://docs.expo.dev/workflow/android-studio-emulator/#set-up-a-virtual-device

### Setup

1. Install all dependencies
   ```
     yarn
     yarn install:all
   ```
2. Run the app
   - On web:
     ```
       yarn web
     ```
   - On virtual android device:
     - Open a virtual device first
     - Run app:
       ```
         yarn android
       ```

## Code Structure

```
pokedex/
├── apps/
│   ├── expo/
│   │   ├── app/
│   │   ├── assets/
│   │   └── ...
│   │
│   ├── next/
│   │   ├── pages/
│   │   ├── public/
│   │   └── ...
│   └── ...
│
├── packages/
│   ├── app/
│   ├── config/
│   ├── ui/
│   └── ...
│
└── ...
```

`apps/expo`: Contains the source code for the expo/react native version of the app.

`apps/next`: Contains the source code for the web version of the app.

`packages/app`: Contains the shared components, assets, utilities, etc common between the web and mobile app.

`packages/config`: Contains Tamagui configuration files.

`packages/ui`: Contains files and configuration files specific to `@my/ui` dependency.

## Design

#### PokeList

The PokeList loads in the first 20 pokemon fetched from PokeAPI.
When scrolling further down the list (specifically when approaching within 10 pokemon from the end), the app then loads the next 20 pokemon.

---

#### Search function

Search function only searches by name of pokemon. It searches by substring matching i.e. it searches for the search value as a substring in the pokemon's name.

---

#### Pokemon Details Page

The header section (Back Button + Pokemon Name), is stickied to the top. This is so that the user will always be able to know which pokemon's details they're viewing and also to make it easier to go back to the PokeList.

The page will display a loading screen first if the pokemon's data is not loaded in yet.

---

#### About Tab

The Pokemon Species data will only start being retrieved once the base Pokemon data is done loading.

While the species data is not available yet, a Spinner is displayed inside the tab under `Height`.

---

#### Base Stats Tab

The numerical value of each stat is used to set the length of the green bars of each stat (i.e. 20 HP results in a green bar with `20px` width).

Except for when the value surpasses the length of it's container (example: high HP pokemon like `Blissey`). In that case, the green bar is limited to the max width of the parent container.

---

#### Evolution Tab

Reuses the Pokemon List Item component to display the evolution chain in a mini PokeList. Clicking on a pokemon in the chain then redirects to that pokemon's details screen.

## Live Deployment

#### Vercel

- https://pokedex-next-seven-orcin.vercel.app/

#### Mobile App

- // TODO: Setup live app
