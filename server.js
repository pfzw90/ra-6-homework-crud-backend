const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({json: true}));

const notes = [
    {id:"123", text:"Praesent mollis vulputate semper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae porttitor metus. Mauris euismod sapien id nunc rutrum ullamcorper. Sed imperdiet, enim et suscipit faucibus, ipsum."},
    {id:"456", text:"Nunc malesuada nulla ac massa euismod, vitae sagittis nulla pretium."},
    {id:"456", text:"Вызывайте экзорциста, пацаны."}
            ];

const router = new Router();

router.get('/notes', async (ctx, next) => {
    ctx.response.body = notes;
});

router.post('/notes', async(ctx, next) => {
    notes.push(JSON.parse(ctx.request.body));
    ctx.response.status = 204;
});

router.delete('/notes/:id', async(ctx, next) => {
    const id = ctx.params.id;
    notes.splice(notes.indexOf(n => n.id == id), 1);
    ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started'));