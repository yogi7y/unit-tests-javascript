import { max, fizzBuzz } from "../src/hello";
import { describe, expect, it } from "vitest";

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
