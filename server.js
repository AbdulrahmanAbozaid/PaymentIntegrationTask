require("dotenv").config();
const express = require("express");
const app = express();
const paypal = require("@paypal/checkout-server-sdk");
const Environment =
  process.env.NODE_ENV === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);
const connection = require("./db.connection");
const path = require("path");
const itemRepo = require("./Model/Item/item.repo");

connection();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "./public/")));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.ejs", {
    clientID: process.env.PAYPAL_CLIENT_ID,
  });
});

app.post("/create-order", async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  const total = req.body.items.reduce(async (sum, item) => {
    const allItems = await itemRepo.getAllItems();
    console.log(allItems);
    return (
      sum + allItems.find((one) => one._id == item.id).price * item.quantity
    );
  }, 0);
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: total,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: total,
            },
          },
        },
        items: req.body.items.map(async (item) => {
          const foundItem = await itemRepo.getItem(item.id);
          return {
            name: foundItem.name,
            unit_amount: {
              currency_code: "USD",
              value: foundItem.price,
            },
            quantity: item.quantity,
          };
        }),
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    console.log(order);
    // res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.listen(process.env.PORT, "localhost", (err) => {
  console.log(err || "Server is up and running on port " + process.env.PORT);
});
