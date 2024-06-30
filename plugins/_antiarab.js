const handler = async (m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) => {
  if (!m.isGroup) return false;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[conn.user.jid] || {};
  if (isBotAdmin && chat.antiArab2 && !isAdmin && !isOwner && !isROwner && bot.restrict) {
    const arabicNumbers = ['212', '265', '92'];
    if (arabicNumbers.some(prefix => m.sender.startsWith(prefix))) {
      m.reply(`*[❗] En este grupo no se permiten números árabes o raros, por lo que se te sacará del grupo.*`);
      const response = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (response[0].status === '404') return;
    }
  }
};
export default handler;
