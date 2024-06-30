const linkRegex = /https:/i;
export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (!m.isGroup) return false;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  const isGroupLink = linkRegex.exec(m.text);
  if (chat.antiLink2 && isGroupLink && !isAdmin) {
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
      const linkThisGroup2 = `https://www.youtube.com/`;
      const linkThisGroup3 = `https://youtu.be/`;
      if (m.text.includes(linkThisGroup) || m.text.includes(linkThisGroup2) || m.text.includes(linkThisGroup3)) return true;
    }
    await this.sendMessage(m.chat, { text: `*❱❱ 𝐑𝐄𝐆𝐋𝐀𝐒 𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓 ❰❰*\n*𝐇𝐀𝐒𝐓𝐀 𝐋𝐀 𝐏𝐑𝐎𝐗𝐈𝐌𝐀 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 @${m.sender.split`@`[0]}𝐑𝐎𝐌𝐏𝐈𝐒𝐓𝐄 𝐄𝐋 𝐑𝐄𝐆𝐋𝐀𝐌𝐄𝐍𝐓𝐎 𝐃𝐄𝐋 𝐁𝐎𝐓, 𝐀𝐃𝐈𝐎𝐒.*`, mentions: [m.sender] }, { quoted: m });
    if (!isBotAdmin) return m.reply('*❱❱ 𝐄𝐑𝐑𝐎𝐑 ❰❰ 𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓 𝐍𝐎 𝐄𝐒 𝐔𝐍 𝐀𝐃𝐌𝐈𝐍 𝐃𝐄 𝐄𝐒𝐓𝐄 𝐆𝐑𝐔𝐏𝐎.*');
    if (isBotAdmin && bot.restrict) {
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } });
      const response = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (response[0].status === '404') return;
    } else if (!bot.restrict) return m.reply('*❱❱ 𝐄𝐑𝐑𝐎𝐑 ❰❰ 𝐌𝐈 𝐂𝐑𝐄𝐀𝐃𝐎𝐑 𝐓𝐈𝐄𝐍𝐄 𝐑𝐄𝐒𝐓𝐑𝐈𝐍𝐆𝐈𝐃𝐎 𝐄𝐋 𝐔𝐒𝐎 𝐃𝐄𝐋 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐑𝐄𝐒𝐓𝐑𝐈𝐂𝐓.*');
  }
  return true;
}
export default before;
