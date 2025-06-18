import { charge, getExchangeRate, getShippingQuote } from "../src/dependencies";
import {
  max,
  fizzBuzz,
  getPriceInCurrency,
  getShippingInfo,
  submitOrder,
} from "../src/hello";
import { describe, expect, it, vi } from "vitest";

vi.mock("../src/dependencies.js");

describe("max", () => {
  it("should  return the first argument if the first number is greater", () => {
    expect(max(2, 1)).toBe(2);
  });
  it("should  return the second argument if the second number is greater", () => {
    expect(max(5, 10)).toBe(10);
  });
  it("should return the the number if both the numbers are equal", () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe("fizzbuzz", () => {
  it("should return fizzbuzz if the number is divisible by both 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return fizz if the number is divisible by 3", () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });
  it("should return buzz if the number is divisible by 5", () => {
    expect(fizzBuzz(10)).toBe("Buzz");
  });

  it("should return the number in stringified for if it's neither divisible by 3 or 5", () => {
    expect(fizzBuzz(11)).toBe("11");
  });
});

describe("getPriceInCurrency", () => {
  it("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(2);

    const price = getPriceInCurrency(10, "INR");

    expect(price).toBe(20);
  });
});

describe("getShippingInfo", () => {
  it("should return shipping unavailable if quote cannot be fetched.", () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);

    const result = getShippingInfo("India");

    expect(result).toMatch(/unavailable/i);
  });

  it("should return shipping info if quote can be fetched", () => {
    const quote = {
      cost: 10,
      estimatedDays: 2,
    };
    vi.mocked(getShippingQuote).mockReturnValue(quote);

    const result = getShippingInfo("India");

    expect(result).toMatch("$10");
    expect(result).toMatch("2 Days");
  });
});

describe("submitOrder", () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: 1234 };
  it("should charge the customer", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it("should return success when payment is successful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: true });
  });
  it("should return success as false when payment is failed", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" });

    const result = await submitOrder(order, creditCard);

    console.log(result);

    expect(result).toEqual({ success: false, error: "payment_error" });
  });
});
