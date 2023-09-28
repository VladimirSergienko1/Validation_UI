To start with mock data 

npm install -g json-server

json-server --watch .\users.json --port 3002

json-server --watch .\db.json --port 3000

To change user (user/admin)
IN LoginPage chane login & pass (user => admin)
 
const handleSubmit = () => {
        const mockData = {
            login: 'admin',
            password: 'admin',
        };

npm run dev


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
