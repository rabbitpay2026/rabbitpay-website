"""Backend API tests for RabbitPay iteration 2 (POST /api/leads)."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://rabbitpay-checkout-1.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- GET /api/ ---
def test_root_returns_rabbitpay(client):
    r = client.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    body = r.json()
    assert "RabbitPay" in str(body)


# --- POST /api/leads happy path ---
def test_create_lead_success(client):
    ts = int(time.time())
    payload = {
        "name": "PW Test",
        "email": f"pw-test-{ts}@example.com",
        "brand": "TEST_Brand",
        "phone": "+911234567890",
        "monthly_orders": "1k-5k",
        "message": "TEST message from pytest",
        "source": "backend_test",
    }
    r = client.post(f"{BASE_URL}/api/leads", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["status"] == "ok"
    assert isinstance(data["id"], str) and len(data["id"]) > 0
    assert "email_sent" in data
    assert "email_id" in data
    # We expect the Emergent-managed email proxy to succeed
    assert data["email_sent"] is True, f"Expected email_sent True; got {data}"


# --- Validation errors ---
def test_lead_invalid_email(client):
    r = client.post(f"{BASE_URL}/api/leads", json={
        "name": "X", "email": "not-an-email", "brand": "B"
    })
    assert r.status_code == 422


def test_lead_missing_name(client):
    r = client.post(f"{BASE_URL}/api/leads", json={
        "email": "a@b.com", "brand": "B"
    })
    assert r.status_code == 422


def test_lead_missing_email(client):
    r = client.post(f"{BASE_URL}/api/leads", json={
        "name": "X", "brand": "B"
    })
    assert r.status_code == 422


def test_lead_missing_brand(client):
    r = client.post(f"{BASE_URL}/api/leads", json={
        "name": "X", "email": "a@b.com"
    })
    assert r.status_code == 422


def test_lead_empty_name_rejected(client):
    r = client.post(f"{BASE_URL}/api/leads", json={
        "name": "", "email": "a@b.com", "brand": "B"
    })
    assert r.status_code == 422
