import {
  getExchangeRate,
  getShippingQuote,
  trackPageView,
  charge,
  isValidEmail,
  sendEmail,
} from "./dependencies";

export function max(a, b) {
  return a > b ? a : b;
}

export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

export function getPriceInCurrency(price, currency) {
  const rate = getExchangeRate("USD", currency);
  return price * rate;
}

export function getShippingInfo(destination) {
  const quote = getShippingQuote(destination);
  if (!quote) return "Shipping Unavailable";
  return `Shipping Cost: $${quote.cost} (${quote.estimatedDays} Days)`;
}

export async function renderPage() {
  trackPageView("/home");

  return "<div>content</div>";
}

export async function submitOrder(order, creditCard) {
  const paymentResult = await charge(creditCard, order.totalAmount);

  if (paymentResult.status === "failed")
    return { success: false, error: "payment_error" };

  return { success: true };
}

export async function signUp(email) {
  if (!isValidEmail(email)) return false;

  await sendEmail(email, "Welcome aboard!");

  return true;
}

export async function login(email) {
  const code = security.generateCode();

  await sendEmail(email, code.toString());
}

export function isOnline() {
  const availableHours = [8, 20];
  const [open, close] = availableHours;
  const currentHour = new Date().getHours();

  return currentHour >= open && currentHour <= close;
}

export function getDiscount() {
  const today = new Date();
  const isChristmasDay = today.getMonth() === 11 && today.getDate() === 25;
  return isChristmasDay ? 0.2 : 0;
}
