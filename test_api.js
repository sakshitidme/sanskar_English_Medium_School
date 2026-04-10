const testRoutes = async () => {
    const routes = [
        { url: 'http://localhost:5001/test', method: 'GET' },
        { url: 'http://localhost:5001/api/auth/login', method: 'POST', body: { email: 'admin@sanskar.com', password: 'adminpassword' } }
    ];

    for (const route of routes) {
        try {
            console.log(`\nTesting ${route.method} ${route.url}...`);
            const response = await fetch(route.url, {
                method: route.method,
                headers: { 'Content-Type': 'application/json' },
                body: route.body ? JSON.stringify(route.body) : undefined
            });

            console.log('Status:', response.status);
            const text = await response.text();
            console.log('Body snippet:', text.substring(0, 100));
        } catch (error) {
            console.error(`Error testing ${route.url}:`, error.message);
        }
    }
};

testRoutes();
