const fs = require('fs');
const file = '/Users/het/Desktop/INVENTORY-MANAGEMENT/Inventory/Inventory-management-system-frontend/src/lib/api.ts';
let code = fs.readFileSync(file, 'utf8');

const authHelper = `
const getAuthHeaders = (): HeadersInit => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) return { 'Authorization': \`Bearer \${token}\` };
  }
  return {};
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const headers = { ...options.headers, ...getAuthHeaders() } as HeadersInit;
  return fetch(url, { ...options, headers });
};
`;

if (!code.includes('fetchWithAuth')) {
    code = code.replace("const API_BASE_URL = 'http://127.0.0.1:8000'", "const API_BASE_URL = 'http://127.0.0.1:8000'\n" + authHelper);
    code = code.replace(/await fetch\(/g, "await fetchWithAuth(");
    fs.writeFileSync(file, code);
    console.log("Patched successfully");
} else {
    console.log("Already patched");
}
