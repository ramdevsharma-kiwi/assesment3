const nodemailer = require("nodemailer")

HOST_EMAIL = process.env.HOST_EMAIL
HOST_PASSWORD = process.env.HOST_PASSWORD

const transpoter = nodemailer.createTransport({
    // host: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: HOST_EMAIL,
        pass: HOST_PASSWORD
    }
});

const subscribeEmail = function (email, train, user) {
    let mailOptions = {
        from: process.env.HOST_EMAIL,
        to: email,
        subject: 'Subscribe successfully',
        html: `<h2>Hi ${user.name} <br> You have successfully subscribed  ${train.trName} train for the updates and its train number is ${train.trainNo}. </h2>`
    };

    transpoter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Subscribe email sent');
        }
    })
}


const trainUpdate = function (email, train, user) {
    let mailOptions = {
        from: process.env.HOST_EMAIL,
        to: email,
        subject: 'Train Update',
        html: `<h2>Hi ${user.name} <br> Your train ${train.trName} train number ${train.trainNo} has been reached to ${train.currentStation} station at ${train.updatedAt}.</h2>`
    };

    transpoter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(" email sent");
        }
    })
}

module.exports = {
    subscribeEmail, trainUpdate
}