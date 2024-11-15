# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
import stripe
stripe.api_key = "sk_test_51QK0WPICuSimdpsxn0dmRRfOzIYcXerjpIlE3YMCk7l6ix0tCRF951WChpXRC0tp1oy79oCxP0B8IpAefSmsCL1W00cOMFSY1Y""sk_test_51QK0WPICuSimdpsxn0...efSmsCL1W00cOMFSY1Y"

stripe.checkout.Session.create(
  line_items=[{"price": '{{PRICE_ID}}', "quantity": 1}],
  mode="payment",
  success_url="https://example.com/after-checkout?session_id={CHECKOUT_SESSION_ID}",
)