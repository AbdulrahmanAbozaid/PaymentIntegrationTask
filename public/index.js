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
        .then((res) => {
          if (res.ok) return res.json();
          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ id }) => {
          console.log(id);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    onApprove(data, actions) {
      return actions.order.capture().then(function () {
        console.log("SUCCESSFUL");
      });
    },
  })
  .render("#paypal");
