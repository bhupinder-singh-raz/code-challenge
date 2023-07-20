# BACK END INSTRUCTIONS

The basic functionality of this API is to render a list of specified data, along with the ability to display the details of any one of these row items, create an item, remove an item, and update an item.

Each list item can have the following properties:

            name: string (Required and Unique)
            description: string (Optional)
            status: string (Required) 
                        Allowed values: New, Complete, In Progress

Build a REST API with Node.js and Express to handle the following endpoints:

            GET /list – return a list of all the item names and their status

            GET /item/:name – return all fields for a specific item

            POST /item – create an item

            PUT /item – update an item

            DELETE /item/:name – remove an item

You can store the data any way you want, it does not need to persist if you restart the server. The unique name is the id that distinguishes one item from another.

You can use Typescript if you wish.

All code should be published to any publicly available repository like Github. There should be readme file in the root directory with instructions on how to clone and run the project locally.

Because there is no front end, you can use Postman to test and view your endpoints.
Don’t spend too much time doing this exercise, we just want to see what your level of coding experience is in creating API’s so we can determine a best fit for you.
