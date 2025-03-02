// Main reason: I don't wanted to create Account in STRIPE. So, account is NOT created.

// Not integrating stripe in backend here: Because some issue with INDIAN user.
// But i learned:
// - Front-end directly doesn't communicate with stripe.
// - Front-end send amount, product list to backend. Backend validate total amount and product list.
//   Then backend ask for some secret from stripe. Stripe give some info/secret to backend. Backend then send that info/secret_key to frontend. Then frontend communicate with stripe using that info/secret_key.
