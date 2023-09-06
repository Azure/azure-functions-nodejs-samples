import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const category = request.params.category;
    const id = request.params.id;

    return { body: `Category: ${category}, ID: ${id}` };
}

app.http('httpTrigger1', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'products/{category:alpha}/{id:int?}',
    handler: httpTrigger1,
});
