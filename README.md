** Versioning ** 
Node : 18.18.1
Java : 19
npm : 9.8.1

** How to Build ** 
1. Clone Repository (Make sure it was on C:/ Directory since it has issue regarding https://github.com/software-mansion/react-native-reanimated/issues/4712#issuecomment-1853457018)
2. run "npm install --force"
3. setup android studio and emulator API level 34
4. run "npx react-native start --experimental-debugger" (you can press J if u want to debug)

** Software Architecture & Design Paterns **
Feature-Based Structure - Flux / Redux - Component-Based Architecture
The Route Contains of 
- Assets: for saving some images and fonts(Poppins)
- Components: for small components that can be reusable
- Configs: for Global variable
- Container: for Main or Parent Screen
- Data: for manage the data that has been used for user table and userexpense table
- Hooks: for global function that can be used in other components or containers
- Redux: State Management (Action, Constant, Reducer)
- Router: App Navigation and Stacks

** Additional Feature **
- Register Page
- Profile Page
- Forgot Password in Profile Page

** More Information **
When the application runs for the first time, it will automatically create four users with the following credentials:

Username: admin, Password: test123, Role: admin
Username: usersatu, Password: test123, Role: user
Username: userdua, Password: test123, Role: user
Username: usertiga, Password: test123, Role: user
You can create new users during the registration process. Additionally, you can change your password after logging in through the profile menu. However, please note that if the app is destroyed, causing it to reload, any data you have added or edited will be lost, and the available data will revert to the initial setup.

The same applies to user expenses, where each user has ten entries divided into five categories: Entertainment, Food, Transport, Utilities, and Rent. You can edit or delete entries using the admin role, but once the application is reloaded, the data will revert to the initial setup.