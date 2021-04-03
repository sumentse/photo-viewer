import formatNumber from "./formatter";

test("should show correct comma placement", () => {
  expect(formatNumber(1000)).toBe("1,000");
});
