## Steps to Consume the npm Module

1. **Import the CSS Styles in the Root Component**

   To apply the styles from the npm module throughout your project, add the following import statement in your root component (e.g., `index.js` or `App.js`):

   ```javascript
   import '@shu0725/test/styles'; // Import the built CSS file
   ```

2. **Configure TypeScript for Module Resolution**

   Update your tsconfig.json file to use the bundler module resolution strategy. Your tsconfig.json should include:

   ```json
   "compilerOptions": {
     // Other options...
     "moduleResolution": "bundler"
   }
   ```

## Publishing to npm

We are finally ready to publish our component to npm. Here is our publishing checklist:

1. **Check Version Number**

   - Ensure that the version number in your `package.json` file is correct and follows semantic versioning rules. Each time you publish to npm, you must use a new version number.

2. **Run Tests**

   - Ensure all tests pass:
     ```sh
     $ npm test
     ```

3. **Create Build Files**

   - Create the build files:
     ```sh
     $ npm run build
     ```
   - Both UMD and ESM module formats are created and placed in the `/dist` folder. Note that React is not bundled alongside your component. Only your component code and any dependencies are included.

4. **Log into npm**

   - Ensure you are logged into npm. If not, type:
     ```sh
     $ npm login
     ```

5. **Publish Your Component**
   - Publish your component:
     ```sh
     $ npm publish
     ```
