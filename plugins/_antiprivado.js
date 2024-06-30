export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup || !m.message) return false;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return true;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`𝐒𝐀𝐋𝐔𝐃𝐎𝐒... @${m.sender.split`@`[0]}, 𝐄𝐋 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐀𝐍𝐓𝐈𝐏𝐑𝐈𝐕𝐀𝐃𝐎 𝐄𝐒𝐓𝐀 𝐀𝐂𝐓𝐈𝐕𝐎. 𝐏𝐎𝐑𝐅𝐀𝐕𝐎𝐑 𝐔𝐒𝐀 𝐄𝐋 𝐁𝐎𝐓 𝐄𝐍 𝐄𝐋 𝐆𝐑𝐔𝐏𝐎 𝐎𝐅𝐈𝐂𝐈𝐀𝐋 𝐃𝐄 𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓. ❱❱ https://chat.whatsapp.com/JqDNBOivxLTBuZugmUu9Uo`);
    await this.updateBlockStatus(m.chat, 'block');
  }
  return false;
}
export default before;
