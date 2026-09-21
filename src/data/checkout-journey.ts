/**
 * The RabbitPay checkout journey, as the homepage walkthrough describes it and
 * the hero's checkout simulation runs it: five steps, from the mobile number to
 * the order confirmation.
 *
 * Shared by the homepage walkthrough and the Features pages so the journey is
 * described once. Each step is something the simulation actually does — see
 * `components/home/mock-checkout-ui.tsx`.
 */
export const CHECKOUT_JOURNEY = [
  {
    title: "Customer details",
    body: "The shopper enters their mobile number on the first screen — no long form to start with.",
  },
  {
    title: "Mobile verification",
    body: "A one-time code confirms the number, which is what lets the saved details come back.",
  },
  {
    title: "Delivery details prefilled",
    body: "Name, address, phone and email appear already filled in and editable, next to the order summary.",
  },
  {
    title: "Payment",
    body: "UPI sits first, with cards, netbanking, wallets and cash on delivery alongside it.",
  },
  {
    title: "Order confirmed",
    body: "The shopper places the order and lands on the confirmation — the end of the journey.",
  },
];
