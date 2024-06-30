const toxicRegex = /SJADJASDJASJGFHJDFKHGFDJKGDFHKGDaFJKHGDKAHSKIDHUITOAIDXFOKJNFVBNCM,VBNCV,MB6/i;

export async function before(m, { isAdmin, isBotAdmin, isOwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;
  const user = global.db.data.users[m.sender];
  const chat = global.db.data.chats[m.chat];
  const isToxic = toxicRegex.exec(m.text);

  if (isToxic && chat.antiToxic && !isOwner && !isAdmin) {
    user.warn += 1;
    if (!(user.warn >= 5)) await m.reply(`*❱❱ 𝐑𝐄𝐆𝐋𝐀𝐒 𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓 ❰❰ ${user.warn == 1 ? `𝐒𝐀𝐋𝐔𝐃𝐎𝐒... @${m.sender.split`@`[0]}` : `@${m.sender.split`@`[0]}`}, 𝐌𝐄𝐍𝐂𝐈𝐎𝐍𝐀𝐑 𝐋𝐀 𝐏𝐀𝐋𝐀𝐁𝐑𝐀 "${isToxic}" 𝐄𝐒𝐓𝐀 𝐏𝐑𝐎𝐇𝐈𝐁𝐈𝐃𝐀 𝐔𝐒𝐀𝐑𝐋𝐀 𝐘𝐀 𝐐𝐔𝐄 𝐄𝐋 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐀𝐍𝐓𝐈𝐓𝐎𝐗𝐈𝐂 𝐄𝐒𝐓𝐀 𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎. 𝐀𝐃𝐕𝐄𝐑𝐓𝐄𝐍𝐂𝐈𝐀: ${user.warn}/5.*`, false, { mentions: [m.sender] });
  }

  if (user.warn >= 5) {
    user.warn = 0;
    await m.reply(`*❱❱ 𝐑𝐄𝐆𝐋𝐀𝐒 𝐒𝐘𝐒𝐓𝐄𝐌 𝐁𝐎𝐓 ❰❰ 𝐒𝐀𝐋𝐔𝐃𝐎𝐒... @${m.sender.split`@`[0]}, 𝐒𝐔𝐏𝐄𝐑𝐀𝐒𝐓𝐄 𝐄𝐋 𝐌𝐀𝐗𝐈𝐌𝐎 𝐃𝐄 𝐀𝐃𝐕𝐄𝐑𝐓𝐄𝐍𝐂𝐈𝐀𝐒, 𝐀𝐃𝐈𝐎𝐒.*`, false, { mentions: [m.sender] });
    user.banned = true;
    await mconn.conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
  }
  return false;
}
export default before;
