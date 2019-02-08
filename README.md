
# Provisio
![Provisio logo](https://raw.githubusercontent.com/leinadpb/provisio/master/src/assets/imgs/logo.png=100x100 "Provisio App")

### Please READ this file before start making changes to this project.

#### Conventions
* Pages are stored in `src > pages`. Please, separate each page by folder.
* Page container folder is named: `my-page-folder`.
* Pages are named: `pageName.html`, `pageName.scss`, `pageName.ts`.
* Services are stored in `src > services`.
* As for pages, each service sould be stored within its containing folder. Same convention.

#### How to run it?
1. Clone this project into your computer.
2. cd into the project folder.
3. Run: `npm install`
4. Run: `npm start` or `ionic serve` to run it in a browser.
4. Run: `ionic cordova run android`.
*_You can pass `--livereload` options after any of the "run" commands to better debugging experience._*

#### Good practices
* **DON'T** use inline styles, always classes.
* **ALWAYS** validate your data before doing an operation.

#### Notes
* When adding a new component (a page, a service, etc), **add it to** `app.module.ts`, ubicated in: `src > app > app.module.ts`. This is the only way to tell angular that your page belongs to this project. In this file (if this is a page), you need to do three things:
- 1. import the component
- 2. Add it to the **declarations** array
- 3. Add it to the **entryComponents** array

***Happy coding! :D***
___
