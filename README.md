# Azure Functions Node.js Samples

[![Build Status](https://img.shields.io/azure-devops/build/azfunc/public/505/main)](https://azfunc.visualstudio.com/public/_build/latest?definitionId=505&branchName=main)

This repo is used to hold the samples for the "Triggers and bindings" docs. For example, this [storage queue trigger doc](https://learn.microsoft.com/azure/azure-functions/functions-bindings-storage-queue-trigger?pivots=programming-language-javascript). This repo currently supports programming model v4, for both JavaScript and TypeScript.

## Repositories

These are the most important GitHub repositories that make up the Node.js experience on Azure Functions:

- [azure-functions-nodejs-library](https://github.com/Azure/azure-functions-nodejs-library): The `@azure/functions` [npm package](https://www.npmjs.com/package/@azure/functions) that you include in your app.
- [azure-functions-nodejs-worker](https://github.com/Azure/azure-functions-nodejs-worker): The other half of the Node.js experience that ships directly in Azure.
- [azure-functions-nodejs-e2e-tests](https://github.com/Azure/azure-functions-e2e-tests): A set of automated end-to-end tests designed to run against prerelease versions of all Node.js components.
- [azure-functions-nodejs-samples](https://github.com/Azure/azure-functions-samples): Samples displayed in the official Microsoft docs.
- [azure-functions-host](https://github.com/Azure/azure-functions-host): The runtime shared by all languages in Azure Functions.
- [azure-functions-core-tools](https://github.com/Azure/azure-functions-core-tools): The CLI used to test Azure Functions locally.

## Contributing

- Clone the repository locally and open the `js` or `ts` folder in VS Code
- Run "Extensions: Show Recommended Extensions" from the [command palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) and install all extensions listed under "Workspace Recommendations"
- Run `npm install`
- If using TypeScript, run `npm run build`

The apps in this repository are not setup to be run directly. You should validate your code in a separate app.

### Adding a new file

If you're adding a brand new file, you'll have to add a reference to it in the Microsoft docs repos. Here are the repos:

- Public: <https://github.com/MicrosoftDocs/azure-docs>
- Internal-only: <https://github.com/MicrosoftDocs/azure-docs-pr>

Here is an example of how to reference a whole file:

```markdown
:::code language="typescript" source="~/azure-functions-nodejs-v4/ts/src/functions/serviceBusOutput1.ts" :::
```

Here is an example of how to reference part of a file:

```markdown
:::code language="typescript" source="~/azure-functions-nodejs-v4/ts/src/functions/serviceBusOutput2.ts" id="displayInDocs" :::
```

> NOTE: The relevant file must define the region to display with comments like `// <displayInDocs>` and `// </displayInDocs>`

### Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
