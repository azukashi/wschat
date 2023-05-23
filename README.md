# WSChat

An `ws://`-based API to fetch YouTube livestream chat in real-time.

## Usage

Base URL is located on ws://localhost:8080.

### Endpoints

| Path            | Protocol - Method | Body or Query                    |
| --------------- | ----------------- | -------------------------------- |
| `/`             | HTTP - GET        | -                                |
| `/`             | WebSocket         | -                                |
| `/api/livechat` | WebSocket         | `?channelId` `?liveId` `?simple` |

### Query usage

| Query        | Required? | Description                                                                   |
| ------------ | --------- | ----------------------------------------------------------------------------- |
| `?channelId` | **yes**   | **[Recommended]** YouTube Channel ID.                                         |
| `?liveId`    | **yes**   | YouTube Live ID. You can gather this from YouTube URL by copying `?v=` value. |
| `?simple`    | optional  | Simplify the returned data. Only returns the `message` object.                |

> **Note**
> Choose one. If `?channelId` is specified, `?liveId` in the current stream is automatically acquired, you don't need to specify `?liveId`.
> But if you are using `?liveId`, you don't need to specify `?channelId` because it works without Channel ID.

## License

Source code is distributed under MIT License. See [LICENSE](./LICENSE) for more information.
