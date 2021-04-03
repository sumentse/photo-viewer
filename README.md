# PhotoViewer Project

## Installation

1. `npm install`
2. Rename .env.sample to .env file
3. Get an API key from pixels and paste it for REACT_APP_PIXELS_API_KEY
4. Run the app `npm start`

## General Architecture

The general architecture of this application is going to be monolithic following a client-server pattern. We will follow the conventional folder structure for building a React application. In order to do this, we will create folders that separate business logic concerns. The structure of this will look like this.

- components
- hooks
- pages
- services
- utils
- styles

In each of these folder, we will group it by features so it can be navigated easily. For example, if we decided to add another page other than the home page we will need another folder to contain it. This applies the same way for services api. There is no redux/context api at the moment since we are not managing anything yet for global state.

## Libraries I used and reason behind it

- axios – standard way of making promise based http calls and will be needed for fetching the images at pexels
- react-photo-gallery – Showing the gallery of images and I thought it look pretty neat with the options it can give you
- react-router-dom – This will be great for scaling the application and seperating concerns. There might be a future iteration of adding video search.
- clsx – can be useful to have for conditional css and adding more classes together for styles
- material ui - Widely adapted in having aesthetic across desktop and mobile platforms. It can help build the app in a timely fashion.
