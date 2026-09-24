const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('box')
    .setDescription('افتح صندوق الحظ العشوائي'),

  async execute(interaction) {
    const boxItems = [
      "🪙 حصلت على 100 عملة!",
      "⚔️ طلع لك سيف نادر!",
      "🛡️ درع حماية حديدي!",
      "💥 للأسف، الصندوق كان فارغاً!",
      "👑 مبروك! حصلت على تاج الأسطورة!"
    ];

    const randomReward = boxItems[Math.floor(Math.random() * boxItems.length)];

    await interaction.reply({
      content: `🎁 **فتحت الصندوق وطلع لك:**\n> ${randomReward}`
    });
  },
};
