const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  const pesan = args.join` `;
const oi = `𝐂𝐀𝐍𝐀𝐋 𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓 𝐎𝐅𝐈𝐂𝐈𝐀𝐋\n https://whatsapp.com/channel/0029Vac3noUDTkJuOpfPTa39 ${pesan}\n👤 𝐓𝐎𝐓𝐀𝐋 𝐃𝐄 𝐈𝐍𝐓𝐄𝐆𝐑𝐀𝐍𝐓𝐄𝐒: _*${participants.length}*_`;
  let teks = `❰❰ 𝐄𝐓𝐈𝐐𝐔𝐄𝐓𝐀 𝐆𝐄𝐍𝐄𝐑𝐀𝐋 ❱❱\n\n ${oi}\n\n┏・𝐃𝐄𝐒𝐏𝐈𝐄𝐑𝐓𝐄𝐍!!!\n`;
  for (const mem of participants) {
    teks += `┣・🚻 @${mem.id.split('@')[0]}\n`;
  }
  teks += `┗・ 𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓 𝐎𝐅𝐈𝐂𝐈𝐀𝐋`;
  conn.sendMessage(m.chat, {text: teks, mentions: participants.map((a) => a.id)} );
};
handler.help = ['tagall <mesaje>', 'invocar <mesaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i;
handler.admin = true;
handler.group = true;
export default handler;
