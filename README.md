# anti_popup
Chrome extension to avoid popup on chosen websites
(this is "few days project" that will be expanded)

//               added features

   - the plug-in starts working only if:

       1) we just opened Chrome and click on an already open page of anime/streaming community
       2) we open a new anime/streaming community page
       3) we use an already open page and search for anime/streaming community

    - the plug-in will be deactivated/stop working if:

      1) we have just opened the browser
      2) we close the open anime/streaming community page

    // list of additions/bugs

    X I could set the background to work only for matching animeunity/streaming community pages (or implement it in content script and make it work only on those)
    --> partial matches like www.animeunity.* cannot be specified (at least for the background)
    
    - for now, if I have both animeunity and streaming community open and close one of the two, the plug-in will stop
      working until the other open streaming page updates (not a big deal)

    - create a single function for match checking 

    - deactivate if the active tab is different (unnecessary)"
