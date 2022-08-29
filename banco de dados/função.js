const fs = require ('fs')
const Pino = require ('pino')
const cfonts = require ('cfonts') 

const logoTermux = cfonts.render(('LIGHT|LITE'), {
font : "block",
align: "center",
colors: ["red","white"]
})

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}

module.exports = { getGroupAdmins, logoTermux  }