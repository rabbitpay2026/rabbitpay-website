import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { validatePartnerApplication } from "./partners-schema.ts";

const valid = {
  fullName: "  Asha   Rao ",
  email: "Asha@Agency.com ",
  phone: "+91 98765 43210",
  company: "  Rao   Digital ",
  websiteUrl: "agency.com",
  partnerType: "agency",
  message: "  We run Shopify stores for D2C brands.  ",
};

describe("validatePartnerApplication", () => {
  test("accepts a complete application and normalises every field", () => {
    const result = validatePartnerApplication(valid);
    assert.ok(result.ok);
    assert.deepEqual(result.value, {
      fullName: "Asha Rao",
      email: "asha@agency.com",
      phone: "9876543210",
      company: "Rao Digital",
      websiteUrl: "https://agency.com",
      partnerType: "agency",
      message: "We run Shopify stores for D2C brands.",
    });
  });

  test("optional fields are absent when blank, never empty strings", () => {
    const result = validatePartnerApplication({ ...valid, company: "   ", message: "" });
    assert.ok(result.ok);
    assert.equal("company" in result.value, false);
    assert.equal("message" in result.value, false);

    const omitted = validatePartnerApplication({ ...valid, company: undefined, message: null });
    assert.ok(omitted.ok);
    assert.equal("company" in omitted.value, false);
    assert.equal("message" in omitted.value, false);
  });

  test("rejects a non-object body", () => {
    for (const body of [null, "x", 42, []]) {
      const result = validatePartnerApplication(body);
      assert.equal(result.ok, body instanceof Array ? false : false);
    }
  });

  test("required fields", () => {
    for (const field of ["fullName", "email", "phone", "websiteUrl", "partnerType"] as const) {
      const result = validatePartnerApplication({ ...valid, [field]: "" });
      assert.equal(result.ok, false, `${field} should be required`);
      assert.ok(!result.ok && result.field === field, `${field} should be the reported field`);
    }
  });

  test("full name must be at least two characters", () => {
    const result = validatePartnerApplication({ ...valid, fullName: " A " });
    assert.ok(!result.ok && result.field === "fullName");
  });

  test("invalid email", () => {
    for (const email of ["asha", "asha@", "@agency.com", "asha agency.com"]) {
      const result = validatePartnerApplication({ ...valid, email });
      assert.ok(!result.ok && result.field === "email", `"${email}" should be rejected`);
    }
  });

  test("phone accepts Indian mobile formats and rejects the rest", () => {
    for (const phone of ["9876543210", "+91 98765 43210", "09876543210", "(+91) 9876543210"]) {
      const result = validatePartnerApplication({ ...valid, phone });
      assert.ok(result.ok, `"${phone}" should be accepted`);
      assert.equal(result.value.phone, "9876543210");
    }
    for (const phone of ["12345", "1234567890", "+1 555 123 4567", "98765 4321"]) {
      const result = validatePartnerApplication({ ...valid, phone });
      assert.ok(!result.ok && result.field === "phone", `"${phone}" should be rejected`);
    }
  });

  test("website URL accepts bare hosts and full URLs, rejects non-hosts", () => {
    for (const [websiteUrl, expected] of [
      ["mystore.com", "https://mystore.com"],
      ["www.mystore.com", "https://www.mystore.com"],
      ["https://mystore.myshopify.com/collections/all", "https://mystore.myshopify.com/collections/all"],
      ["http://agency.in", "http://agency.in"],
    ]) {
      const result = validatePartnerApplication({ ...valid, websiteUrl });
      assert.ok(result.ok, `"${websiteUrl}" should be accepted`);
      assert.equal(result.value.websiteUrl, expected);
    }
    for (const websiteUrl of ["my store", "mystore", "http://", "ftp://x.com"]) {
      const result = validatePartnerApplication({ ...valid, websiteUrl });
      assert.ok(!result.ok && result.field === "websiteUrl", `"${websiteUrl}" should be rejected`);
    }
  });

  test("partner type must be one of the offered options", () => {
    for (const partnerType of ["agency", "technology", "affiliate", "other"]) {
      assert.ok(validatePartnerApplication({ ...valid, partnerType }).ok);
    }
    for (const partnerType of ["reseller", "AGENCY", 1, null]) {
      const result = validatePartnerApplication({ ...valid, partnerType });
      assert.ok(!result.ok && result.field === "partnerType");
    }
  });

  test("length caps on optional fields", () => {
    const company = validatePartnerApplication({ ...valid, company: "x".repeat(121) });
    assert.ok(!company.ok && company.field === "company");
    const message = validatePartnerApplication({ ...valid, message: "x".repeat(1001) });
    assert.ok(!message.ok && message.field === "message");
  });

  test("ignores fields that are not part of the schema", () => {
    const result = validatePartnerApplication({ ...valid, status: "APPROVED", id: "abc" });
    assert.ok(result.ok);
    assert.equal("status" in result.value, false);
    assert.equal("id" in result.value, false);
  });
});
