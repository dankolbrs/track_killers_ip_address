# GUI Interface in Electronjs to track an IP Address

Grow and tell talk inspired by [CSI:NY](https://www.youtube.com/watch?v=hkDD03yeLnU)

## Transcript

Transcript:

```text
"For weeks I've been investigating the cabbie killer murders with a certain morbid fascination"

"This is in real time"

"I'll create a GUI interface using Visual Basic, see if I can track an IP Address"
```


## Breaking it down

So this got me thinking, why don't we do that to track killers?

`Visual Basic` - Event driven programming language from Microsoft

`Visual Basic` runs on Windows, so we don't want to use that anyway. We're a modern managed cloud host, so lets use something modern. Enter, Electronjs.

`Electronjs` is a method for building cross-platform desktop applications using Javascript, HTML, and CSS. It combines Chromium and Nodejs into a single runtime. Effectively, it runs applications in a webbrowser.

You may know Electron from it's origin of being the framework Atom was written on, or Visual Studio Code, Github Desktop, Slack, Skype, or any number of Electron apps out there.

We can start with Electron very easily.
Create a new directory
Run `npm init`
Change the `start` from `node .` to `electron .`
Install electron with
`npm install --save-dev electron`

We'll have 5 files in our directory

* `index.html` (html of our application's main page)
* `renderer.js` (file for our javascript code)
* `styles.css` (CSS stylesheet for formatting our html)
* `main.js` (javascript entry file)
* `package.json` (package definition/requirements)

Microsoft's Visual Studio code is excellent for managing our Nodejs application.

## First our main.js file

This is the file that is run when we start the application
This declares we're using electron, opens a windows, and loads our HTML File

## Next our HTML file

Enter a title
Write out our html body

* Input for IP Address to be tracked
* Button to start the tracking
* id for our Status/IP Address
* Row to output our IP information and Map

Requires a link to our CSS file, and to load our javascript file

## IP Location Information

To actually determine the location of the IP address, we need some side information of how an IP address actually maps to a location.

### GeoIP

Linux has many hooks into GEOIP information for applications such as webservers. This allows to view the **approximate** location of an IP address based on GeoIP Legacy information released by MaxMind. 

Per [MaxMind](https://dev.maxmind.com/geoip/legacy/downloadable/):

```text
Latitude and longitude are not precise and should not be used to identify a particular street address or household. To better represent a level of accuracy, please include the accuracy_radius when displaying latitude and longitude and make it clear that the coordinates refer to a larger geographical area instead of a precise location.
```

### Whois information

Started in 1982, a registry of information of ARPANET users. `whois` allows looking at ICANN information for domains/IP addresses. This provides an address, however it is the *owner* of that IP space according to ICANN, and does not reflect the actual "location" of the IP address.

```bash
$ whois rackspace.com | grep Registrant
Registry Registrant ID: 
Registrant Name: Domain Admin
Registrant Organization: Rackspace US, Inc.
Registrant Street: 1 Fanatical Place
Registrant City: San Antonio
Registrant State/Province: TX
Registrant Postal Code: 78218
Registrant Country: US
Registrant Phone: +1.2103124000
Registrant Phone Ext: 
Registrant Fax: +1.2103124848
Registrant Fax Ext: 
Registrant Email: domains@rackspace.com
```

This will not be used to track our killer due to the lack of accuracy of location.

### Google

Google seems to have the best location information from IP. This is due to collecting WIFI SSIDs along with location information. This has occured via the street view vehicles, as well as data collection via the Android operating system.

[TheGuardian report](https://www.theguardian.com/technology/2010/may/15/google-admits-storing-private-data)

[Control point inclusion](https://support.google.com/maps/answer/1725632?hl=en)

[WIFI Scan Requires Location Permissions](https://developer.android.com/reference/android/net/wifi/WifiManager.html#getScanResults())

This information cannot be used to track our killer due to the collection not being publically accessible.

## Renderer.js

Contains the "meat and potatos" of our application. We need to have a method to get information about an IP address, so we use `geoip-lite`.

First we collect our button that will be pressed to create a listener that acts on click.

Our listener does everything we need each time the button is pressed.

* Read entered IP address
* Look up IP address information in GeoIP database
* Create a table for GeoIP Information
* Construct and Query a map from our Map Provider, and display that map within the application

## Limitations

Location information from GeoIP not down to the address

Location information may be obfuscated

* VPN
* Tor

Having network information may be enough to get owner of that network block to provide further information (device assigned that interface at that time)

Network Address Translation

* More than one device can be behind a single public IP address
* IP Address is not definitive proof of user
