import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
//for variable validation we use check library
import { check, Match } from 'meteor/check';

//meteor methods to be called from client - protected way to save data
Meteor.methods({
  'links.insert': url => {
    check(
      url,
      Match.Where(
        url => validUrl.isUri(url) //Match.Where is used for custom validation with check method. in this case we are using valid-url validation.
      )
    );
    //if URL passes check then method continues else it exits and throws an err
    //ready to save URL
    const token = Math.random()
      .toString(36) //base 36
      .slice(-5); //get last 5 chars
    //insert into db collection
    Links.insert({
      url,
      token,
      clicks: 0
    });
    console.log('link inserted');
  }
});

export const Links = new Mongo.Collection('links');
