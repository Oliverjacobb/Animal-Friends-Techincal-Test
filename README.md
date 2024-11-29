# UserApp

A simple Angular application that uses the randomuser.me API to retrieve and display a list of users with user details.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

### Running Locally

- Run npm i
- Run ng serve to start the development server

### Executing Tests

Tests are written with the out the box Angular solution of Karma and Jasmine.

You can execute them by running 'ng test'.

### Design Considerations

In user detail as I couldn't see how with the API we could get a specific user as it's random, I chose just to navigate back to users on refresh. I did consider caching the user in local storage but for the purpose of this small task it seemed like overkill. 

There are some arguments that the user detail route should be a child route of users, however due to the simplicity of this application I chose to just put it on a seperate route.

### If I had more time 

I would expand testing coverage for the user-detail component and also maybe add tests for the templats. However some argue DOM testing should be handled by e2e testing not unit tests. 

I would implement a custom directive to take the users 'na' and return a flag icon based on that. 

I would add an intergration to Google Maps to see where the user is located.

If this was built as an administration portal for admins to review users we could add the ability to update their credentials, contact information and delete the user all together. We could have a seperate component for this using a reactive form.