# Office-Support-for-Not-for-Profit-Companies

To run the application:
Install Python and NodeJs
Install python’s packages: pip install -r .\requirements.txt
In backend/, generate the tables in the database by running python manage.py migrate
In backend/, run the backend server with: python manage.py runserver
In nfp_app/, install NodeJs packages: npm install
In nfp_app/, run the frontend server with: npm run dev
To support Microsoft accounts authentication, the application must be registered via Entra and the cliendId of the registered application and its redirectUri must be updated in nfp_app/authConfig.tsx.
The IP address of where the frontend is running must be added in CORS_ALLOWED_ORIGINS in settings.py.
For security reasons, a secret key must be generated in SECRET_KEY in settings.py.
It is possible to change the database engine in settings.py if needed.
