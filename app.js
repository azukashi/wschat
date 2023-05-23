const { LiveChat } = require('youtube-chat');
const express = require('express');
const expressWs = require('express-ws');

/**
 * @type {expressWs.Application}
 */
const app = express();
const port = 8080 || process.env.PORT;
expressWs(app);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome!' });
});

app.get('/api/livechat', (req, res) => {
    res.status(400).json({ message: 'Please connect with WebSocket protocol to use this endpoint.' });
});

app.ws('/api/livechat', async (ws, req) => {
    // ws.on('open', () => {
    //     console.log('A new connection is made!');
    //     ws.send('Hello from WebSocket!!!');
    // });
    const id = req.query.channelId || req.query.liveId;
    if (!id) {
        await ws.send('[ERR] channelId or liveId parameter is missing!');
        return ws.close();
    }

    try {
        const simple = req.query.simple;
        const liveChat = new LiveChat({ liveId: id });
        const ok = await liveChat.start();

        if (!ok) {
            await ws.send('[ERR] Failed to start LiveChat instance.');
            return ws.close();
        }

        liveChat.on('chat', chatItems => {
            if (simple) return ws.send(JSON.stringify(chatItems.message[0].text));
            ws.send(JSON.stringify(chatItems));
        });
        liveChat.on('error', err => {
            ws.send(JSON.stringify(err));
        });
    } catch (err) {
        console.log(err);
        await ws.send(`[ERR] ${err}`);
        return ws.close();
    }
});

app.listen(port, () => console.log('App listening at port', port));
