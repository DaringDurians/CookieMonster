# Code Review II


## Walkthrough (Deployed, Tier I)

* Remove all console.logs + Logging Middleware from deployed
* Utilize Environment Vars
```
const store = Process.ENV.test ? applyMiddleware(loggingMiddleware) : applyMiddleware()

```
* Either pass ENV vars to front-end via Webpack, or scoop out Redux Logger on production/master branches
* Tier 1 Walkthrough
 	* Order (both authenticated, and unauthenticated) not completing.
 	* Remove item from cart requires refresh
* Grabbing cart from API?
```Order.findOne({where : {id : req.params.id, active : true}})```
```javascript
//express
router.post(`/newCart`, async (req, res, next) => {
	let user = await user.findOne({where: {id}})
	let potentiallyNewCart = Order.findOrCreate({where : user})
	let isNew = potentiallyNewCart.lineItems.length
	if(!isNew){
		let updated = await potentiallyNewCart.update(items : item++)
		res.json(updated)
	} else {
		res.json(potentiallNewCart)
	}


})

//redux
newCartThunk = () => dispatch => axios.post(`/newCart)
```

* TLDR; Lump db operations into express routes, keep thunks thin

## Auth

### Authentication 
* Who am I?
* Sessions
* Heartbeat function `api/auth/me` => sends user Object
* `let me = axios.get('api/auth/me')` => `this.setState({user:me})`
* `this.state.isloggedIn ? <Checkout /> : <Products />`


### Authorization

* Am I allowed to do this?
* Admin gates
* ```javascript
 const isAdmin = (req, res, next) => req.user.isAdmin ? next() : res.send('Not allowed')```
 * 
```javascript

 router.delete('/:id', isAdmin, (req,res,next) => {
 	Product.delete()
 });```


