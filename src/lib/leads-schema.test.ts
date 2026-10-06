import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { LEAD_SOURCES, LEAD_SOURCE_LABELS, validateLead } from "./leads-schema.ts";

const valid = {
  email: "owner@mystore.com",
  phone: "+91 98765 43210",
  storeUrl: "mystore.com",
};

describe("validateLead sources", () => {
  test("accepts the pricing page as a source", () => {
    const result = validateLead({ ...valid, source: "pricing_page" });
    assert.ok(result.ok);
    assert.equal(result.value.source, "pricing_page");
  });

  test("still accepts the original sources", () => {
    for (const source of ["hero_inline", "demo_cta", "contact_page"]) {
      assert.ok(validateLead({ ...valid, source }).ok, source);
    }
  });

  test("rejects an unknown source", () => {
    const result = validateLead({ ...valid, source: "somewhere_else" });
    assert.equal(result.ok, false);
  });

  test("labels every source", () => {
    for (const source of LEAD_SOURCES) {
      assert.ok(LEAD_SOURCE_LABELS[source].length > 0, source);
    }
  });
});
