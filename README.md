# Atlaskitchen

This repo contains
* a POC merchant app [kitchenhand](kitchenhand)
* a mock API service [cookhouse](cookhouse)

for modifying stock information on menu items for a restaurant.

##Running the project

### dependencies
* yarn 1.22 or later
* node 17 or later

install dependencies using yarn in both app and API.

You're recommended to run two terminals; one for the app, the other for the API.

`$ cd kitchenhand && yarn`

`$ cd cookhouse && yarn`

then you can start the app using the commands

`kitchenhand\ $ yarn start`

`cookhouse\ $ yarn start`


##App behaviour
1. The app is only made to update stock for existing menu items
2. It is *not* capable of adding new menu items
3. It is able to view/edit/create stock information for the menu item
4. There is no DB - data is loaded from a series of mocks, stored in mock API memory.
5. when mock api is terminated, data will reset.
