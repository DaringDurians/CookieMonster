# Code Review I


## README

* Title of project
* Description
* Contributors
* Directions for running app locally
* Link to deployed version
* Screenshots, gifs, etc. 

## Git

Semantic Commits

* Nature of commit (feature, bug, doc, testing)
* Area of commit coverage (models, Redux, mocha)
* Present-tense decription of what commit does


## Workflow

* Keep semantic as well
* What is nature of ticket? (Fix, feature, debug, etc)
* Documents your workflow AND is psychologically motivating


## API

### Models

#### Products
* How are cookies and toppings related?
* If they are distinct types of  cookie (choco chip, M&M, raisen) topping can be an ENUM property of the cookie product
`Enum("ChocoChip", "Mint", "Vanilla")`
* If toppings are customizable, Many-to-Many association
* Price can be a decimal OR Integer representing Pennies
* Include a default image


#### User

Bonus: Salting?

* Most apps will encrypt ("hash") user info
abc => xyz
* abc + salt => zvzzs, harder to decript!

#### Order_Products

* Super happy this is a separate model!
* Avoid Sequelize.Array /Sequelize.JSONp
* Having a boolean on Order model lets us know what the cart
* Same deal with Price, maybe better as an integer than a float


#### Guest checkout?
* Force guests to log in when they hit checkout
	* okay, so how do we merge carts?
* How can we uniquely identify guests that aren't authenticated in our DB?
	* Session Storage?
	* LocalStorage for cart
	* Cookies


### API

* Good User routes
* Product Routes could be more RESTful


REpresentational
State
Transfer
`www.netflix.com/shows/queereye/5/55min`

I can picture the entire state of the app based on the string

### Client

* Maybe keep HTML templates as functional React component
() => `<h1>Welcome</h1>`. No need for HTML templates


### Estimations
Tier I (completed + deployed): EoD Sunday
Tier II (completed + deployed): Wednesday Presentations





