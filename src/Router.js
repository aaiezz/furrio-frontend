// everything below has been taken from the weekly exercises - template used: va-service.js
// any additional adjustments have been pointed out via comments

// import views
import homeView from './views/pages/home'
import fourOFourView from './views/pages/404'
import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import profileView from './views/pages/profile'
import editProfileView from './views/pages/editProfile'
import guideView from './views/pages/guide'
import serviceprovidersView from './views/pages/serviceproviders' // added for the assignment
import servicesView from './views/pages/services'
import favouriteServicesView from './views/pages/favouriteServices' 
import newServiceView from './views/pages/newService'
import bookingsView from './views/pages/bookings' // added for the assignment
import myServicesView from './views/pages/myServices' // added for the assignment


// define routes
const routes = {
	'/': homeView,
	'/guide': guideView,
	'/serviceproviders': serviceprovidersView,
	'/services': servicesView,
	'/favouriteServices': favouriteServicesView,
	'404' : fourOFourView,
	'/signin': signinView,
	'/signup': signupView,
	'/profile': profileView,
	'/editProfile': editProfileView,
	'/newService': newServiceView,
	'/bookings': bookingsView,
	'/myServices': myServicesView
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		const route = this.routes[pathname]
		
		if(route){
			// if route exists, run init() of the view
			this.routes[window.location.pathname].init()
			
		}else{			
			// show 404 view instead
			this.routes['404'].init()			
		}
	}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}



// allows anchor <a> links to load routes
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
