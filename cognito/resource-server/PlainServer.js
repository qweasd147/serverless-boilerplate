import app from "./app";

const port = 3000;

app.listen(port, () => {
  console.log("koa is listening on port", port);
});
