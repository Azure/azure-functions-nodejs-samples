const { app } = require('@azure/functions');

app.storageBlob('storageBlobTrigger1', {
    path: 'samples-workitems/{name}',
    connection: 'MyStorageAccountAppSetting',
    handler: (blob, context) => {
        context.log(
            `Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`
        );
    },
});
