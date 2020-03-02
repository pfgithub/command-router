#  Command Router
(useless and no longer maintained)

## old description
It's a router that routes commands

```javascript
const Router = require("");
let router = new Router;
router.add("help", [], (cmd, info) => {
	// simple!
});
router.handle("help me please", {error: err  => console.log(err)})
```

## Why Command Router?
|                  |CommandRouter|Other Choices|
|--                |--|--|
|good              |❌|✔️|
|useful            |❌|✔️|
|easy to use       |❌|✔️|
|updated frequently|❌|✔️|
|does what I want  |❌|❌|
