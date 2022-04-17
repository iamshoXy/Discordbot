import { User, Message, MessageAttachment } from 'discord.js';
import * as Canvas from 'canvas';
import { join } from 'path';

export async function createRankImage(message: Message, position: number, currentLevel: number, totalEXP: number, requiredEXP: number) {
    const canvas = Canvas.createCanvas(700, 250);
	const context = canvas.getContext('2d');

    const background = await Canvas.loadImage(join(__dirname, '../assets/images/profile.jpg'));
	context.drawImage(background, 0, 0, canvas.width, canvas.height);

	context.font = applyText(canvas, message.author.username, 50);
	context.fillStyle = '#ffffff';
	context.fillText(message.author.username, 250, 100, 600);

	context.font = applyText(canvas, `Rank #${position} - Level ${currentLevel}`, 40);
	context.fillStyle = '#ffffff';
	context.fillText(`Rank #${position} - Level ${currentLevel}`, 250, 150, 600);

	context.font = applyText(canvas, `EXP: ${totalEXP}/${requiredEXP}`, 35);
	context.fillStyle = '#ffffff';
	context.fillText(`EXP: ${totalEXP}/${requiredEXP}`, 250, 240, 600);

	for (var i = 0; i < 100; i++)  {
		context.beginPath();
		context.lineWidth = 14;
		context.fillStyle = '#3a3a3b';
		context.strokeStyle = '#3a3a3b';
		context.arc(265 + (i * 4), 190, 8, 0, Math.PI * 2, true);
		context.stroke();
		context.fill();
	}

	for (var i = 0; i < 100 * (totalEXP / requiredEXP); i++)  {
		context.beginPath();
		context.lineWidth = 14;
		context.fillStyle = '#066cfa';
		context.strokeStyle = '#066cfa';
		context.arc(265 + (i * 4), 190, 8, 0, Math.PI * 2, true);
		context.stroke();
		context.fill();
	}

	context.beginPath();
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();

    const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
	context.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
    message.reply({ files: [attachment] });
}

const applyText = (canvas, text, baseSize = 70) => {
	const context = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = baseSize;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		context.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (context.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return context.font;
}