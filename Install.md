installation instructions for IATI Studio are published to the WIKI: https://github.com/zimmerman-zimmerman/IATI-STUDIO/wiki/How-to-install-IATI-Studio

Or:

### Prerequisites
Before you can install IATI Studio, be sure to have the following installed on your machine:
* Node (5.8.0)
* NPM (3.9.3)
* MongoDB (3.0.4)

### Install dependencies
In a terminal window, clone the IATI Studio repository to your local machine, and navigate to the 'app' folder. Run:
```bash
npm install
```
### Configuration
After installing the dependencies, you have to prepare your config files. Sample config files are provided in 'app/server/config'. Make a copy of sample.oauth.js and sample.config.js, rename them to oauth.js and config.js, and edit them with your project's parameters. 

Oauth.js is used for social media logins, and can be left alone if you do not wish to use this feature.

Config.js needs a valid:
* oipa_url
* Cryptokey
* SMTP setup (if using account verifications)

You can play around with the other settings.

### Run the app
Make sure MongoDB is running, by issuing the command:
```bash
mongod
```
Then launch the app:
```bash
npm run dev
```
Once your bundle has been built, use your browser to navigate to <http://localhost:2000> and have fun.
