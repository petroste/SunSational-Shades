# 4413-Project - Sunsational Shades

Welcome to EECS4413 - SunSational Shades Project!

The project is publicly hosted at https://sunsationalshades.shop

![Screenshot 2023-04-09 at 11 24 49 AM](https://user-images.githubusercontent.com/43624414/230785897-c2ec4b8c-2238-4114-be2d-edda60cf6299.png)

# Setting up the application locally

NOTE: Skip this section if you are accessing the website online.

Node.js is required in order to run this project, and instructions on how it can be downloaded are at the following link: https://nodejs.org/en/ . Node version can be checked by running `node -v` if already installed.

To download the project locally, run `git clone https://github.com/faiz5689/4413-Project.git` in your testing directory, assuming git is installed on the user’s machine. Alternatively, download and unpack the ZIP file from the github repository.

After the files are installed, the user should be able to see 2 directories (frontend and backend) in the `4413-Project` folder, which is the parent folder for the project.

The frontend folder is responsible for frontend related tasks. It is important to install necessary packages to run the application. First, navigate to the `4413-Project/frontend` directory in a terminal, and issue the command `npm install` to install all of the required packages and dependencies for the front-end of the application.

Similarly, after this process is complete, do the same for the server side, by navigating to `4413-Project/backend` directory and issuing `npm install`. Again, this will automatically install all required packages needed to run the back-end of the application.

After the setup is complete, the user is now ready to start the app. First, navigate to the `4413-Project/backend` directory in a terminal, and run the command `node server.js`. This should start the node.js server on the application side and connect to the database.

The server is now hosted on port `4000` on the local machine. In another terminal, navigate to the `4413-Project/frontend` directory, and run `npm start`. This will start the React app on `http://localhost:3000/`. Now, by navigating to this link, we will see the home screen of the application, and the user can now use the application.

The application can be run in 2 ways. Either by using our online application deployed on Netlify and AWS (https://sunsationalshades.shop), or by cloning the repository from github to your local machine. If the latter approach is used, two terminals need to be opened (one for frontend, one for backend). Navigate to the frontend and backend directories, respectively and run npm install in both to install all necessary dependencies. In the first terminal - cd to the frontend directory and run npm start, in the second terminal - cd to the backend directory and run node server.js. The frontend and backend should now be running and can be accessed at `localhost:3000`.

# How to use

Once the system is up and running you can start using SunSational Shades. Even though you can browse items without having a user account, we recommend that you create an account first.

Access the home page:

![Screenshot 2023-04-09 at 11 24 49 AM](https://user-images.githubusercontent.com/43624414/230795148-fda78861-7216-460a-9d00-22923d023f8d.png)

Click the SIGN UP button in the upper right corner of the screen. That will take you to the sign up page.
 ![Screenshot 2023-04-09 at 11 25 19 AM](https://user-images.githubusercontent.com/43624414/230795151-d7912e59-f5ea-462b-89d7-f48b4570ce63.png)


After signing up, you can log in by going to the LOGIN page.

![Screenshot 2023-04-09 at 11 25 37 AM](https://user-images.githubusercontent.com/43624414/230795154-357427ef-2bdb-4610-82a7-cd90a556fcf9.png)

After signing in, for example, you can view products by going to the PRODUCTS page. You can sort by name or price, and filter by category, colour and brand. You can also apply multiple filters at the same time. NOTE: JWT Authorization Tokens expire after 12 hours. Sometimes it might seem like you are logged in (in the frontend), but when you make a backend request (such as adding an item to cart, an authorization error might occur because your token is expired and your session is stale). Logout and log back in to get a new token and session.

![Screenshot 2023-04-09 at 11 26 04 AM](https://user-images.githubusercontent.com/43624414/230795161-0e3d030a-5b04-44b1-ad84-83ed0577d814.png)

If you want to view more information about a particular product or purchase it, you can click on the product which will open a product page with more information about your selected product.

![Screenshot 2023-04-09 at 11 42 32 AM](https://user-images.githubusercontent.com/43624414/230795228-0037d978-cc29-46a9-8005-302e89adb239.png)


If you want to purchase a product, add it to your cart by clicking the green ADD TO CART button


Once you are done looking and want to purchase the items in your cart, you can click the cart icon in the navigation bar, which will take you to the CART page.

![Screenshot 2023-04-09 at 11 46 52 AM](https://user-images.githubusercontent.com/43624414/230795290-c9f482cd-fca4-4302-ba6d-d0c66eacefc0.png)


On the cart page, you can increase and decrease the quantity of your products, or remove the products you don’t want in your cart anymore. In addition, you can use your loyalty points (our distinct feature) if you have any, in order to decrease your total. After you are done, click on the CHECKOUT button in the bottom which will take you to the checkout page.

![Screenshot 2023-04-09 at 11 47 53 AM](https://user-images.githubusercontent.com/43624414/230795483-6d2ad673-37c6-49cc-af28-9a03ce63a354.png)

Here you can input your credit card information and submit

![Screenshot 2023-04-09 at 11 48 33 AM](https://user-images.githubusercontent.com/43624414/230795491-75926199-1c0c-4ded-9af5-296bc8b2d645.png)

Congratulations - Your order has been placed successfully.

In addition, you can also use and communicate with the chatbot in the bottom right of the page.

![Screenshot 2023-04-09 at 11 54 37 AM](https://user-images.githubusercontent.com/43624414/230795652-7271ce62-3901-483a-a25b-e3a5a110d1bb.png)


Finally, you can also virtually try on items - make sure to enable access to your camera when the browser prompts you for it. When your face is in focus, press the MODEL to spawn the sunglasses model. Press ADJUST to adjust your system with your mouse. IMPORTANT NOTE: There are some issues with the dependencies in the virtual try on feature. When you are done with try on, press the back button on the browser then reload the page, which will bring you back to the home page. (This is the safest way to do it).

![Screenshot 2023-04-09 at 12 05 34 PM](https://user-images.githubusercontent.com/43624414/230795666-23d852ba-9f89-4a2e-9b31-639d6119e73b.png)

The admin account credentials are (username: alvine, password: Alvine1!). With that account you can access the ADMIN VIEW where you can access the sales and application reports.

# Troubleshooting

When using the application on the local machine, there is a chance that the pages will not scroll and that certain pages won't open. This is due to some issues with required dependencies and not our implementation. If this happens, please delete the contents of the `frontend/node_modules/@lastcode802/glassarview/lib/components/GlassArView/index.css` (do NOT delete the file, just its contents). Kill and restart the server using `ctrl + C` and `npm start` and the application should work as intended.

If `npm install` is giving errors, try using `npm install --peer-legacy-deps`, which should work without error and install all necessary dependencies.

If there are any other issues, don't hesitate to reach out to any of the group members.

