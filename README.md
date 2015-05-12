# Call To Action

## About

Call to Action is a method to provide meaningful actions to people based on a
body of text. In particular, it is designed to make news more than just entertainment.

More info on the purpose can be found at http://call-to-action.skinofstars.com

## The tech jist

The project currently has two parts.

- A Chrome extension, found in `/chrome` and in the Chrome store at https://chrome.google.com/webstore/detail/call-to-action/bjppfcohnobmiopgompfghjdljgojnck
- A Rails backend to manage the actions.

The approach today is very simple. The server returns a list of JSON
ctas (call to actions) that look like this:

```
[{
  "title":"Disasters Emergency Committee - Nepal appeal",
  "url":"http://www.dec.org.uk/appeals/nepal-earthquake-appeal",
  "always":"Nepal",
  "keywords":["quake","earthquake"]
}]
```

_you can see them all at http://call-to-action.skinofstars.com/ctas.json_

The client then looks at the story content on the page (defined by a known css class/id),
checks that it has the "always" word, then that it has one of the "keywords".
If it does, it appends that cta to the end of the story content.


## Help wanted

The project is in super-alpha-releasse-mode. There are lots of things that need
to be done to make it truly useful. If you think it's a good idea, then please
get involved in helping. Some ideas include:

- [ ] Submit actions -> http://call-to-action.skinofstars.com for info
- [ ] Ask for a news site to be added
- [ ] Work out a way of extracting just the story text from a page
- [ ] Improve the text analysis
- [ ] Do server side text analysis based on submission (currently all done in client's extension)
- [ ] Do server side text analysis based on a URL
- [ ] Provide a method to hook up with charity/action group's databases to auto populate
- [ ] Improve the server side management console (you kinda have to know the routes)
- [ ] Make it easy for people to submit action ideas (anonymous user submission?)
- [ ] Make the site pretty
- [ ] Make the logo pretty
- [ ] Make the call-to-action buttons more appealing
- [ ] Create a Firefox Add-on
- [ ] Suggest other things that need doing

This is still very proof of concept, so don't consider anything in stone. If you
reckon the text analysis could be super if the server side was actually in Python,
then great. Let's look at how we can make it! Nothing is sacred :)


## Hacking

git clone ;)

To hack on the Chrome extension, load up chrome://extensions/ in your browser,
click 'Load unpacked extension...' and select the `/chrome` folder in the project
root. If you make any changes, just refresh on that extension page.

You should be able just use `vagrant up` to get the server running. There may be
a little extra tweaking needed to get the ruby puma webserver running, though that
should be little more than running `rails s` in your vagrant.


That's it really. Feel free to post any questions, concerns, quandaries and quibbles
in the issues.
