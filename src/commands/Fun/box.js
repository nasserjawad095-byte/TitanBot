const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('box')
    .setDescription('افتح صندوق الحظ العشوائي واحصل على جائزتك!'),

  async execute(interaction) {
    try {
      // 1. قائمة الجوائز والنتائج مع الألوان المخصصة والدرجات
      const boxItems = [
        {
          name: "🪙 صرة عملات ذهبية",
          description: "مبروك! حصلت على **100 عملة ذهبية** أضيفت لرصيدك!",
          color: 0xF1C40F, // أصفر ذهبي
          rarity: "شائع"
        },
        {
          name: "⚔️ سيف الأسطورة النادر",
          description: "عاش! حصلت على **سيف ناري نادِر** للقتال!",
          color: 0x3498DB, // أزرق
          rarity: "نادر"
        },
        {
          name: "🛡️ درع الفولاذ الصلب",
          description: "حماية ممتازة! حصلت على **درع حماية قوي**!",
          color: 0x95A5A6, // رمادي فضي
          rarity: "غير شائع"
        },
        {
          name: "👑 تاج الإمبراطور الأسطوري",
          description: "يا لك من محظوظ! حصلت على **التاج الأسطوري الأغلى**!",
          color: 0x9B59B6, // بنفسجي أسطوري
          rarity: "خرافي"
        },
        {
          name: "💥 صندوق ملغوم!",
          description: "للأسف.. انفجر الصندوق وطلع **فاضي**! حظاً أوفّر المره القادمة.",
          color: 0xE74C3C, // أحمر
          rarity: "حظ سيء"
        }
      ];

      // 2. اختيار جائزة عشوائية
      const randomReward = boxItems[Math.floor(Math.random() * boxItems.length)];

      // 3. تصميم امبيد النجاح والنتيجة
      const rewardEmbed = new EmbedBuilder()
        .setTitle('🎁 فتحت صندوق الحظ!')
        .setDescription(`أهلاً بك **${interaction.user.username}**، إليك ما حصلت عليه:\n\n### ${randomReward.name}\n>${randomReward.description}`)
        .addFields(
          { name: '✨ درجة الندرة:', value: `\`${randomReward.rarity}\``, inline: true }
        )
        .setColor(randomReward.color)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: 'TitanBot System • صندوق الحظ', iconURL: interaction.client.user.displayAvatarURL() })
        .setTimestamp();

      // إرسال الرد بالامبيد
      await interaction.reply({ embeds: [rewardEmbed] });

    } catch (error) {
      console.error('خطأ أثناء تنفيذ أمر البوكس:', error);

      // 4. تصميم امبيد الخطأ / الصلاحيات (لون أحمر)
      const errorEmbed = new EmbedBuilder()
        .setTitle('❌ عذراً، حدث خطأ!')
        .setDescription('عذراً، تعذر تنفيذ الأمر! قد يكون السبب عدم وجود صلاحيات كافية للبوت أو مشكلة مؤقتة في النواة.')
        .setColor(0xFF0000) // أحمر للخطأ
        .setFooter({ text: 'نظام إدارة الأخطاء • TitanBot' });

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
      } else {
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      }
    }
  },
};
