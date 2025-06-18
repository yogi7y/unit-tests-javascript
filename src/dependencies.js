import delay from "delay";

export async function trackPageView(pagePath) {
  console.log(`Sending analytics...`);
  console.log(`Path: ${pagePath}`);
  await delay(3000);
}
export const getExchangeRate = (from, to) => {
  console.log(`Getting the exchange rate ${from}-${to}...`);
  return Math.random();
};
export function isValidEmail(email) {
  const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  return emailPattern.test(email);
}

export async function sendEmail(to, message) {
  console.log(`Sending email to ${to}...`);
  console.log(`Message: ${message}`);
  await delay(3000);
}
export async function charge(creditCardInfo, amount) {
  console.log(`Charging Credit Card: ${creditCardInfo.creditCardNumber}`);
  console.log(`Amount: ${amount}`);
  await delay(3000);
  return { status: "success" };
}
export function generateCode() {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

export default {
  generateCode,
};
export function getShippingQuote(destination) {
  console.log(`Getting a shipping quote for ${destination}...`);
  return { cost: 10 * Math.random(), estimatedDays: 2 };
}
