"""One-off script to generate the OpenGraph share image for the RabbitPay landing page.

Run once (from /app/backend):
    python scripts/generate_og_image.py

Writes the result to /app/frontend/public/og-image.png (~1200x630 landscape).
"""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage


OG_OUTPUT_PATH = Path("/app/frontend/public/og-image.png")


async def main() -> None:
    load_dotenv()
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        raise RuntimeError("EMERGENT_LLM_KEY missing — cannot generate OG image.")

    chat = LlmChat(
        api_key=api_key,
        session_id="rabbitpay-og",
        system_message="You are a senior product designer generating marketing assets.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
        modalities=["image", "text"]
    )

    prompt = (
        "Design a wide 1200x630 landscape social share (OpenGraph) hero card for the fintech product 'RabbitPay'. "
        "Composition: on the left side, a modern deep indigo-violet gradient panel (#4C1D95 → #6D28D9 → #7C3AED) "
        "with subtle grain, a tiny rounded-square white rabbit logo (top-left), and clean geometric sans-serif "
        "headline (large, tight tracking) reading '1-Click Checkout, built in India.' with a smaller supporting "
        "sub-headline underneath 'Higher conversions. Lower RTO. Made for Indian D2C brands.'. "
        "On the right side, show a floating iPhone-style device mockup with a mobile RabbitPay checkout on-screen: "
        "a highlighted 'PREFILLED' delivery address (violet border), UPI payment method selected, and a green "
        "'Payment successful' banner. Warm ambient purple bloom behind the phone. Include a tiny 'MADE IN INDIA' "
        "eyebrow above the headline. Keep the composition premium, enterprise-credible, uncluttered — plenty of "
        "negative space. No random emojis, no stock icons, no watermarks, no additional text besides the specified "
        "copy. Colors: deep indigo violet primary #6D28D9, near-white foreground text, success green #16A34A for the "
        "'Payment successful' banner. Style: modern fintech marketing, subtle noise, soft shadows, tasteful."
    )

    msg = UserMessage(text=prompt)
    text, images = await chat.send_message_multimodal_response(msg)
    print(f"Text response (first 120 chars): {str(text)[:120]}")

    if not images:
        raise RuntimeError("Gemini returned no images.")
    img = images[0]
    print(f"Received image mime: {img.get('mime_type')}")
    image_bytes = base64.b64decode(img["data"])
    OG_OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OG_OUTPUT_PATH.write_bytes(image_bytes)
    print(f"Wrote {OG_OUTPUT_PATH} ({len(image_bytes)} bytes)")


if __name__ == "__main__":
    asyncio.run(main())
