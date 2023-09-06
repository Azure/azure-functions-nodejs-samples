const { app } = require('@azure/functions');

app.http('httpTrigger1', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'products/{category:alpha}/{id:int?}',
    handler: async (request, context) => {
        const category = request.params.category;
        const id = request.params.id;

        return { body: `Category: ${category}, ID: ${id}` };
    },
});
