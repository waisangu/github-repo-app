# Github Repo App

<div align="center" width="100%">
            
![React][React]![TypeScript][TypeScript]![ReactRouter][ReactRouter]![Redux][Redux]![Python][Python]![FastAPI][FastAPI]![Docker][Docker]![Jest][Jest]![ChakraUI][ChakraUI]

</div>

## Table of Contents
- [About Github Repo App](#about-kafka-trace)
- [Demo](#demo)
- [Features](#features)
- [User Guide](#user-guide)
- [Roadmap](#roadmap)
- [Authors](#authors)
- [License](#license)

## About Github Repo App
Search for public Github repositories by name and save them to a favorites list. The project uses React, TypeScript, React Router, Redux, and Chakra UI for the frontend; Python and FastAPI for the backend; webpack for bundling, Jest and pytest for testing, and Docker for containerization. 

## Demo
| Vid 1                                             | Vid 2                                            | Vid 3                                             |
| ------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------- |
| ![demo-vid-1](/client/src/assets/demo-vid-1.gif)  | ![demo-vid-2](/client/src/assets/demo-vid-2.gif) | ![demo-vid-3](/client/src/assets/demo-vid-3.gif)  |

## Features
- Filter search results by sort option, order, and page.
- Save your favorite repositories or delete them from your favorites list.
- Save and quickly unsave from the home page if you changed your mind.
- Alert page if no repositories were found.

## User Guide
- **STEP 1**: In your terminal, change directory into where you want the app installed. Copy and paste the following:
    ```bash
    git clone https://github.com/waisangu/github-repo-app.git
    ```
- **STEP 2**: If you have Docker installed, run the following command and skip to Step 5:
    ```bash
    docker compose up
    ```
- **STEP 3**: If you do not have Docker on your machine, copy and paste the following:
    ```bash
    cd client
    npm install
    npm run dev
    ```
- **STEP 4**: In a separate terminal, copy and paste the following:
    ```bash
    cd server
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```
- **STEP 5**: In your browser, navigate to http://localhost:8080 and use the app!

## Roadmap
- [x] Implement a search input that allows users to search for GitHub repositories by name. Use the GitHub API to fetch search results.
- [x] Display the search results in a list. Each list item should include the repository's name, description, and the number of stars.
- [x] Allow users to save their favorite repositories by clicking on a "Save" button next to each search result.
- [x] On a separate page or section, display a list of saved favorite repositories.
- [x] Implement the ability to remove repositories from the favorites list.
- [x] Create a simple RESTful API with the following endpoints:
    - [x] GET /favorites - Returns a list of all saved favorite repositories.
    - [x] POST /favorites - Saves a repository to the favorites list.
    - [x] DELETE /favorites/:id - Removes a repository from the favorites list by its ID.
- [x] Store the favorite repositories in memory.

## Authors
Wai San Gu - waisangu@gmail.com

## License
Distributed under MIT License. See `LICENSE.txt` for more information.

[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Jest]: https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[ReactRouter]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[Redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[ChakraUI]: https://shields.io/badge/chakra--ui-black?logo=chakraui&style=for-the-badge
[FastAPI]: https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi





