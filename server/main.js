import { Meteor } from 'meteor/meteor';
import ConnectRoute from 'connect-route';
//import meteor methods for use with server
import { Links } from '../imports/collections/links';

Meteor.startup(() => {
  // code to run on server at startup

  //publish links collection
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

//----------NODE JS MIDDLEWARE ---------------
//executed when a user visits a route like localhost:3000/h23ca
function onRoute(req, res, next) {
  //get token from params
  const link = Links.findOne({ token: req.params.token });

  if (link) {
    //when link object is found , redirect to the original link
    Links.update(
      {
        token: link.token
      },
      {
        $inc: {
          clicks: 1
        }
      }
    );
    res.writeHead(307, { Location: link.url }); //get original url from the Link object we found and send it as location to redirect to in header
    res.end(); //signal response end to send the header
  } else {
    //else take user to our app
    next(); //go to next middleware, will fall into our react app by default
  }
}
//localhost:3000/singlestring - only time the url will match our route router.get('/:token') is when we have a singlestring after the forward slash

//Add middleware - with routes
const middleware = ConnectRoute(router => {
  router.get('/:token', onRoute);
});
//whenever a request comes in, this handler will execute with middleware object
WebApp.connectHandlers.use(middleware);
//----------MIDDLEWARE ---------------
