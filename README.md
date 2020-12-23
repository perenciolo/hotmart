### Getting started

Run the following command on your local environment:

```
git clone --depth=1 https://github.com/perenciolo/hotmart.git my-project-name
cd my-project-name
yarn install
```

Then, you can run locally in development mode with live reload:

```
yarn run dev
```

Open http://localhost:8080 to see the project.

### Deploy to production

You can see the results locally in production mode with:

```
$ yarn run build
$ yarn run start
```

The generated HTML and CSS files are minified (built-in feature from Next js). It will also removed unused CSS from [Tailwind CSS](https://tailwindcss.com).

You can create an optimized production build with:

```
yarn run build-prod
```

Now, your blog is ready to be deployed. All generated files are located at `dist` folder, which you can deploy with any hosting service.
### License

Licensed under the MIT License, Copyright © 2020

See [LICENSE](LICENSE) for more information.

---

Made by Gustavo Perenciolo based on Nextjs Typescript boilerplate by [CreativeDesignsGuru](https://creativedesignsguru.com)
