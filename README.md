# Support Desk

This is the final project from my React Front To Back 2022 course on Udemy. Check out the course [here](https://www.udemy.com/course/react-front-to-back-2022/).

---

# Usage

### Clone repo

```bash
git clone https://github.com/coltonajackson/support-desk.git
```

### Install dependencies for both root directory and 'frontend'

```bash
npm install
cd frontend
npm install
```

### Run dev from root

```bash
cd ..
npm run dev
```

This will run JSON-server on port :5000 and React on port :3000 (unless defined in .env)

# Environment Variable Setup

### Create .env in the root project folder and enter the variables below

```
NODE_ENV = YOUR NODE ENVIRONMENT (e.g. 'development')
PORT = YOUR FRONT END PORT NUMBER (e.g. 3000)
REACT_APP_BACKEND_PORT = YOUR BACK END PORT NUMBER (e.g. 5000)
MONGO_URI = YOUR MONGODB CONNECTION URL (e.g. 'mongodb+srv://hello:world@main.mongodb.net/db')
JWT_SECRET = YOUR JWT SECRET (e.g. 'this_is_a_secret')
```

---

View Live Demo on Heroku [here](http://caj-support-desk-01.herokuapp.com/).
