paypal
  .Buttons({
    createOrder() {
      return fetch("/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 3 },
          ],
        }),
      })
        .then((res) => res.json())
        .then((order) => order.id)
        .catch((err) => {
          console.log(err);
        });
    },

    onApprove(data, actions) {
      return actions.order.capture();
    },
  })
  .render("#paypal");
