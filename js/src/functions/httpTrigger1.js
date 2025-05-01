const { app } = require('@azure/functions');

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const nameFromQueryParam = request.query.get('name');

        const nameFromJsonBody = request.headers.get('content-type')?.includes('application/json') 
            ? (await request.json())?.name 
            : undefined;

        return { body: `Hello, ${nameFromQueryParam || nameFromJsonBody || `world`}!` };
    },
});
