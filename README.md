# Apex-Pets Front End

Apex-pets is an Ecommerce webapp shop built with dotnet backend and angular frontend. This repository holds the angular front end. 

## Concept
This is a demo app created to showcase my abilities with dotnet and angular. In order to make the idea of creating an ecommerce app more amusing to me,
I decided to create a shop for a (fictional) store nobody in their right mind would want to buy from. The basic idea is a company that sells exotic extremely dangerous
animals as pets, which are acquired in morally ambiguous ways. However, the content isn't really relevant, and at the end of the day it's just a functional webshop. 

## Features
### user management
For customers the app contains basic registration, login, and profile editing capabilities. They can manage their shopping carts, checkout items and view their 
past orders. All changes are consistently tracked in the database.

### Shop management
Upon signing in using an "admin" level user profile, a new layer of capabilites becomes available. Admins can alter the shop data and all the changes will be saved and dynamically applied to the shop display. 
The data management tables implement sorting and filtering capabilites.
Admins can also upload/edit the photo gallery for each product using a dedicated UI.

Admins have access to the order manager, where they can view all the pending orders and alter the order status (pending/shipping/delivered etc.)

- Currently, any admin level user can create new admin users. additionally, usernames and passwords are currently immutable. 

### partial features
- checking out (=purchasing items) currently only requires any string as "payment information". There are currently no _real_ transaction capabilities to the app. All purchase data is registered in the database, 
but I didn't want to make anyone enter real bank information. 
-  since there is no real company behind this website, the input from the "contact us" section is currently not submitted to anywhere (I also thought that was kind of fitting to the amoral character of this (fictional) company to have the complaints submitted to nowhere).  

## Behind the scenes

- The app caches the retrieved data in typescript to streamline the data pulling. 
- The database is in sqlite and managed via Entity framework. 
- The photo storage of the app is through cloudinary services. 
- The login and registration forms include various layers of validation. 
- authorization details
- authentication details. 

## angular libraries used
- the app was designed using angular-bootstrap, and using a design theme from bootswatch.
- the app includes angular-material components for tables, pagination and filtering. 
- custom bootstrap pagination, filtering and searching were also implemented in the app.
- font awesome icons are also in use in various places in the app. 

## Running the app

In it's current form, you just need to run the front-end with ng serve and naviagate to :https://localhost:4200". The backend needs to be downloaded and run separately with dotnet run. 

In order to test out "admin" mode, I added that in my CV I probably sent you. If you didn't get here through my cv, contact me and I will happily give you the password. I am not including that here becuase even though the app will
run locally, changes you make in the photo editor will permanently alter/delete the photos in the cloudinary account, and leaving that open on the internet may not be such a great idea if I want this to app to look presentable... 

yonhyman@gmail.com

