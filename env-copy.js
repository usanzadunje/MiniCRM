//Enter credentials that are required from you down below

module.exports = {
    mysql: {
        host: 'YOUR DATABASE HOST',
        user: 'YOUR DATABASE USERNAME',
        password: 'YOUR DATABASE PASSWORD',
        database: 'YOUR DATABASE NAME',
        port: //DATABASE PORT
    },

    email: {
        user: 'YOUR GMAIL EMAIL',
        pass: 'YOUR GMAIL PASSWORD'
    },

    passportFacebook: {
        clientID: "",
        clientSecret: "",
        callbackURL: "",
        profileFields: []
    }
}