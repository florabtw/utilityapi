# Instructions

At UtilityAPI, oftentimes users need to select a utility. A solar installer may know the utility they want the data for or they might ask the homeowner to select their utility themselves. In addition, prospective UtilityAPI users might want to search for and select a utility to see what type of data we have for it.

We want you to:
* Create a component for a generic utility search dropdown
  * This does not have to be featureful, just working in its most basic form, e.g.:
    * An input that searches
    * A very basic rendering of search results
    * A simple render on search result selection
  * This should use the endpoint https://utilityapi.com/api/experimental/utility-lookup with a `q` query parameter for the search
    * You should not hit this endpoint more than 3x a second
* A button on the page that toggles the search to include unsupported utilities as well
    * This should behave the same but the endpoint should be called with the query parameter `include_unsupported=true`
    * You should be able to toggle back

Feel free to make as many changes to this repo as you would like.

You should spend roughly an hour on this. If you don't finish within an hour, that is fine! We will use this exercise as a jumping off point for further discussion, not as an assignment to grade.

## Set Up

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can use `npm start` to run the code.

This works with npm version `8.5.1` and node version `12.22.9` but should work on newer versions just fine. If package versioning is an issue, create a barebones React project of your own; this one is deliberately empty.
