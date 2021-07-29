const { response } = require("express");
const express = require("express");
const app = express();
const path = require("path");
const source = require("./public/lib/source");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cotacao", async (req, res) => {
  const { from_cur, quantity, to_cur } = { ...req.query };
  const error = false;

  if (from_cur === to_cur) {
    res.render("result", {
      error:
        "Não é possível pesquisar utilizando a mesma moeda nos dois parâmetros",
    });
  }
  if (!from_cur || !to_cur) {
    res.render("result", {
      error: "É preciso informar as duas moedas para a pesquisa",
    });
  }

  const resp = await source.getQuotation(from_cur, to_cur);
  const quotation = source.avarage(parseFloat(resp[0]), parseFloat(resp[1]));
  res.render("result", {
    error,
    from_cur,
    to_cur,
    quantity,
    quotation,
    converted: source.Convertion(quotation, quantity),
  });
});
app.listen(3000, () => console.log("Listening on: http://localhost:3000"));
