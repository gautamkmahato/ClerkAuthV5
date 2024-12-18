
export default async function createUser(data){
    try {
        const response = await fetch('https://sqlite-example-vh7p.vercel.app/api/user/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }); 
  
        const result = await response.json();
        console.log('API Response:', result);
    } catch (error) {
        console.error('Error sending data to API:', error);
    }
}