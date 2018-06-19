# myAmason

1) The application will start running once the node command is pushed, and it will display all the items in "stock" and their respective informations (ID, name, department, price, quantity).

2) The user will then be prompted for an item ID, and may only proceed if the item exists in the database. If it does, a confirmation prompt will pop up, confirming that the ID is correct, if not the user may input a new ID.

3) After confirmation, the application will ask for how many copies of the item you wish to purchase, the user will only be able to proceed if the amount does not exceed the current stock. Before proceeding there is another confimation prompt, if the amount wants to be changed then the user can simply confirm "No" and input a new value.

4) After confirmation the user will be given the total cost of their purchase, and asked if they wish to buy another item. If prompted yes, they will repeat the previous steps and the total balance will adjust to accomodate all the items in the users purchase list. If the user confirms "No" then the final cost is logged and the application will shut down.