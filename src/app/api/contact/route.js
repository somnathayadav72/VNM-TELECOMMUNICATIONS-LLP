import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/validation";
import { site } from "@/config/site";

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const company = String(payload.company || "").trim();
  const email = String(payload.email || "").trim();
  const state = String(payload.state || "").trim();
  const category = String(payload.category || "").trim();
  const quantity = String(payload.quantity || "").trim();
  const requirements = String(payload.requirements || "").trim();

  const errors = {};
  if (!company) errors.company = "Add your company name.";
  if (!isValidEmail(email)) errors.email = "Enter a valid business email.";
  if (!state) errors.state = "Add your state.";
  if (!category) errors.category = "Choose a product category.";
  if (!quantity) errors.quantity = "Add an estimated quantity.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Ready for SMTP / CRM wiring via env when available.
  // For now the client also opens a mailto fallback so the enquiry reaches sales.
  console.info("[contact]", {
    to: site.email,
    company,
    email,
    state,
    category,
    quantity,
    requirements,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message: "Your stock request has been received. Our team will respond within one business day.",
  });
}
