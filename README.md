# Application Setup Guide

## **Prerequisites**
- **Python**  
- **Node.js**  

---

## **Backend Setup**
1. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt

2. **Generate database tables**
   ```bash
   cd backend/
   python manage.py migrate
   
3. **Run the backend server**
   ```bash
   python manage.py runserver

## Frontend Setup 
1. **Install Node.js dependencies**
   ```bash
   cd nfp_app/
   npm install
2. **Run the frontend server**
   ```bash
   npm run dev
   
## Microsoft Account Authentication
1. Register the application in [Microsoft Entra](https://entra.microsoft.com/).
2. Update the following in `nfp_app/authConfig.tsx`:
   - `clientId` – ID of your registered application.
   - `redirectUri` – The redirect URI configured in Entra.
3. Add the frontend’s IP address to `CORS_ALLOWED_ORIGINS` in `backend/settings.py`.

## Security
 - Generate a **secret key** and set it in `SECRET_KEY` in `backend/settings.py`.

## Database Configuration
- The database engine can be changed in `backend/settings.py` if required.



   
   


