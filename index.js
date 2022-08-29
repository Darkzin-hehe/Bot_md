const {default: makeWASocket,DisconnectReason,useSingleFileAuthState } = require ('@adiwajshing/baileys')

const fs = require('fs')
const Pino = require('pino')
const chalk = require("chalk")
const moment = require("moment-timezone")
const speed = require('performance-now')

const { color, bgcolor } = require('./banco de dados/cores')
const { getGroupAdmins, logoTermux } = require('./banco de dados/função')

const dados = JSON.parse(fs.readFileSync('./dados.json'))

const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
const data = moment.tz('America/Sao_Paulo').format('DD/MM/YY')

numeroDono = dados.numDono
Dono = dados.nomeDono
nomeBot = dados.nomeBot
numeroBot = dados.numBot
prefix = dados.prefix

const { state, saveState } = useSingleFileAuthState('QrCode.json')

async function Base () {
console.log(logoTermux.string)
console.log('LIGHT TA ON!')
const base = makeWASocket({
logger: Pino({ level: 'silent' }),printQRInTerminal: true,auth: state})
base.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if(connection === 'close') {
const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
console.log ('conexão fechada devido a ', lastDisconnect.error)
if(shouldReconnect) {Base()}
} else if(connection === 'open') {
'Conectado..!'}})
base.ev.on('messages.upsert', async m => {

const mek = m.messages[0]
await base.sendReadReceipt(mek.key.remoteJid, mek.key.participant, [mek.key.id])
if (!mek.key.participant) mek.key.participant = mek.key.remoteJid
mek.key.participant = mek.key.participant.replace(/:[0-9]+/gi, "")
if (!mek.message) return
const fromMe = mek.key.fromMe
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const type = Object.keys(mek.message).find((key) => !["senderKeyDistributionMessage", "messageContextInfo"].includes(key))

const body = (type === "conversation" &&
mek.message.conversation.startsWith(prefix)) ?
mek.message.conversation: (type == "imageMessage") &&
mek.message[type].caption.startsWith(prefix) ?
mek.message[type].caption: (type == "videoMessage") &&
mek.message[type].caption.startsWith(prefix) ?
mek.message[type].caption: (type == "extendedTextMessage") &&
mek.message[type].text.startsWith(prefix) ?
mek.message[type].text: (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : 
(type == "listResponseMessage") &&
mek.message[type].singleSelectReply.selectedRowId ?
mek.message.listResponseMessage.singleSelectReply.selectedRowId: (type == "templateButtonReplyMessage") ?
mek.message.templateButtonReplyMessage.selectedId: (type === "messageContextInfo") ?
mek.message[type].singleSelectReply.selectedRowId: (type == "base.sendMessageButtonMessage") &&
mek.message[type].selectedButtonId ?
mek.message[type].selectedButtonId: (type == "stickerMessage") && ((mek.message[type].fileSha256.toString("base64")) !== null && (mek.message[type].fileSha256.toString("base64")) !== undefined) ? (mek.message[type].fileSha256.toString("base64")): ""
const budy = (type === "conversation") ?
mek.message.conversation: (type === "extendedTextMessage") ?
mek.message.extendedTextMessage.text: ""
var pes = (type === "conversation" && mek.message.conversation) ? mek.message.conversation : (type == "imageMessage") && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == "videoMessage") && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == "extendedTextMessage") && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ""

const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const comando = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = body.startsWith(prefix)
const resposta = {
    admin: 'Membro comum não tem autoridade para usar este comando 🤣',
    dono: '❗Somente meu criador pode usar este comando 📌',
    group: 'Este recurso só funciona em grupos 😕',
    aguarde: '⌛Aguarde enquanto isso tome um café☕',
    erro: 'acorreu um erro tente dnv🧑‍🔧',
    marquest: 'marque a figurinha'
}

const enviar = (text) => {base.sendMessage(from, {text: text}, { quoted: mek})}

const reply = (text) => {base.sendMessage(from, {text: text}, { quoted: mek})}

const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const numeroBot = base.user.id.split(":")[0]+"@s.whatsapp.net"
const isGroup = mek.key.remoteJid.endsWith("@g.us")
const tescuk = ["0@s.whatsapp.net"]
const sender = isGroup ? mek.key.participant : mek.key.remoteJid
const pushname = mek.pushName ? mek.pushName : ""
const groupMetadata = isGroup ? await base.groupMetadata(from) : ""
const groupName = isGroup ? groupMetadata.subject : ""
const groupDesc = isGroup ? groupMetadata.desc : ""
const groupMembers = isGroup ? groupMetadata.participants : ""
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ""

const quoted = mek.quoted ? mek.quoted : mek
const mime = (quoted.mek || quoted).mimetype || ""
const isBot = mek.key.fromMe ? true : false
const isBotGroupAdmins = groupAdmins.includes(numeroBot) || false
const isGroupAdmins = groupAdmins.includes(sender) || false 
const isOwner = sender.includes(numeroDono)
const isMedia = /image|video|sticker|audio/.test(mime)

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? base.sendMessage(from, {text: teks.trim(), mentions: memberr}) : base.sendMessage(from, {text: teks.trim(), mentions: memberr})
}

if(isCmd) console.log(
color('COMANDO:','red'),color(comando,'white'),color('DO:','red'),color(pushname,'white'))

try {
switch(comando) {

case 'oi':
const isBot = mek.key.fromMe ? true : false
reply('oi')
break

case 'join': case 'entrar': case 'entrargp': case 'aceitarconvite': case 'joingp': {
            	    
		    		
                if (!isOwner) return enviar(resposta.dono)
                if (!text) return enviar('Preciso do link do grupo!')
                if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return enviar('Preciso de um link que seja do whatsapp!')
                enviar(resposta.aguarde)
                let result = args[0].split('https://chat.whatsapp.com/')[1]
                await base.acceptInvite(result).then((res) => enviar(jsonformat(res))).catch((err) => enviar(jsonformat(err)))
            }
            
            break

case 'leave': case 'sair': case 'exit': case 'sairgp': case 'sairdogp': {
            	    
		    		
                if (!isOwner) return enviar(resposta.dono)
                await base.groupLeave(from).then((res) => enviar(jsonformat(res))).catch((err) => enviar(jsonformat(err)))
            }
            
            break

case 'kick': case 'ban': case 'banir': case 'chutar': case 'tirardogp': {
		    
		    		
		if (!isGroup) return enviar(resposta.group)
                if (!isBotGroupAdmins) return enviar(resposta.botAdmin)
                if (!isGroupAdmins) return enviar(resposta.admin)
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await base.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => enviar(jsonformat(res))).catch((err) => enviar(jsonformat(err)))
	}
	break

case 'ping': case 'botstatus': case 'statusbot': case 'status': {
            	    
		    		
                let timestamp = speed()
                let latensi = speed() - timestamp
                neww = performance.now()
                oldd = performance.now()
                respon = `🏓Velocidade de Resposta ${latensi.toFixed(4)}  _Segundos_\n\n\n⏰Tempo online : ${runtime(process.uptime())}`.trim()
                enviar(respon)
            }
            
            break

case 'link': // ©Blacĸzιn
if (!isBotGroupAdmins) return enviar(resposta.botAdmin)
                if (!isGroupAdmins) return enviar(resposta.admin)
 const linkzin = await base.groupInviteCode(from)
 enviar('https://chat.whatsapp.com/'+linkzin)
 break

	case 'add': case 'adicionar': case 'addgp': case 'adicionarnogp': {
		    
		    		
		if (!isGroup) return enviar(resposta.group)
                if (!isBotGroupAdmins) return enviar(resposta.botAdmin)
                if (!isGroupAdmins) return enviar(resposta.admin)
		let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await base.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => enviar(jsonformat(res))).catch((err) => enviar(jsonformat(err)))
	}
	
	break

case 'menu':
reply(`
╭╾────────
││𝚄𝚂𝚄𝙰𝚁𝙸𝙾
││────────
││ ${prefix}ping
││────────
││DONO
││────────
││ ${prefix}leave
││ ${prefix}join
││────────
││𝙰𝙳𝙼𝙸𝙽𝚂
││────────
││ ${prefix}link
││ ${prefix}kick
││ ${prefix}add
╰╾────────`)
break

case 'msg.vazia':
reply('')
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? base.sendMessage(from, {text: teks.trim(), mentions: memberr}) : base.sendMessage(from, {text: teks.trim(), mentions: memberr})
}
break

default:

}} catch(e) {
enviar(e)}})}
Base()


//////////////BASE MONTADA COM COMANDOS BÁSICOS SOMENTE
//////////////BY:  ™ 𝑫𝜜𝑹𝑲✞
//////////////CRIADA PELO SKITTER