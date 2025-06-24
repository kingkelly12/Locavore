API_URL="http://localhost:5000"

echo "\nRegistering user..."
curl -s -X POST "$API_URL/register" -H "Content-Type: application/json" \
    -d '{"username":"testuser","email":"test@example.com","password":"test123"}'

echo "\nLogging in..."
TOKEN=$(curl -s -X POST "$API_URL/login" -H "Content-Type: application/json" \
    -d '{"username":"testuser","password":"test123"}' | jq -r .access_token)

echo "\nToken: $TOKEN"

AUTH_HEADER="Authorization: Bearer $TOKEN"


echo "\nCreating vendor..."
curl -s -X POST "$API_URL/vendors" -H "Content-Type: application/json" -H "$AUTH_HEADER" \
    -d '{"name":"Market 1","location":"Downtown","description":"Fresh fruit"}'

echo "\nGetting all vendors..."
curl -s -X GET "$API_URL/vendors" -H "$AUTH_HEADER"

echo "\nAdding a review..."
curl -s -X POST "$API_URL/reviews" -H "Content-Type: application/json" -H "$AUTH_HEADER" \
    -d '{"content":"Great apples!","rating":5,"vendor_id":1}'

echo "\nDone."
