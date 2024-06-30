export async function before(m, { conn, isAdmin, isBotAdmin, usedPrefix }) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  const isToxic = m.text.length > 5000;

  if (isToxic && chat.antiTraba && !isAdmin) {
    if (isAdmin) return conn.sendMessage(m.chat, { text: `𝐔𝐍 𝐀𝐃𝐌𝐈𝐍 𝐃𝐄 𝐄𝐒𝐓𝐄 𝐆𝐑𝐔𝐏𝐎 @${m.sender.split('@')[0]} 𝐀𝐇 𝐄𝐍𝐕𝐈𝐀𝐃𝐎 𝐔𝐍 𝐓𝐄𝐗𝐓𝐎 𝐂𝐎𝐍 𝐌𝐔𝐂𝐇𝐎𝐒 𝐂𝐀𝐑𝐀𝐂𝐓𝐄𝐑𝐄𝐒.`, mentions: [m.sender] });
    conn.sendMessage(m.chat, `*❱❱ 𝐑𝐄𝐆𝐋𝐀𝐒 𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓 ❰❰ 𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓 𝐃𝐄𝐓𝐄𝐂𝐓𝐎 𝐐𝐔𝐄 𝐑𝐎𝐌𝐏𝐈𝐒𝐓𝐄 𝐋𝐀𝐒 𝐑𝐄𝐆𝐋𝐀𝐒.*\n`, `${isBotAdmin ? '' : '𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓 𝐍𝐎 𝐄𝐒 𝐔𝐍 𝐀𝐃𝐌𝐈𝐍 𝐃𝐄 𝐄𝐒𝐓𝐄 𝐆𝐑𝐔𝐏𝐎.'}`, m);
    if (isBotAdmin && bot.restrict) {
      conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } });
      setTimeout(() => {
        conn.sendMessage(m.chat, { text: `𝐂𝐇𝐀𝐓 𝐋𝐄𝐈𝐃𝐎\n${'\n'.repeat(400)}\n=> 𝐄𝐋 𝐍𝐔𝐌𝐄𝐑𝐎 wa.me/${m.sender.split('@')[0]}\n=> 𝐀𝐋𝐈𝐀𝐒: ${await conn.getName(m.sender)}\n𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓 𝐃𝐄𝐓𝐄𝐂𝐓𝐎 𝐐𝐔𝐄 𝐑𝐎𝐌𝐏𝐈𝐒𝐓𝐄 𝐋𝐀𝐒 𝐑𝐄𝐆𝐋𝐀𝐒.`, mentions: [m.sender] });
      }, 0);
      setTimeout(() => {
        conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      }, 1000);
    } else if (!bot.restrict) return m.reply('[ ! ] Para realizar acciones de eliminación, mi dueño tiene que encender el modo restringido!');
  }
  return true;
}
export default before;
